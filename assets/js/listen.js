/* ─────────────────────────────────────────────────────────────────────────
   Listen — read the current page aloud.

   UX: "Listen to this page" just works with the free, built-in browser voice.
   When premium voices are available (a relay is configured), a small "Voice"
   button opens a simple modal where the user pastes their own OpenAI key (BYOK).
   That's the whole flow — no inline settings, radios, or toggles.

   The key is stored only in the user's browser (sessionStorage by default;
   localStorage if they tick "remember") and sent only to OpenAI via a stateless
   relay (OpenAI blocks direct browser POST). The site has no backend; the repo is
   public, so this is auditable.

   Progressive enhancement: if no speech engine is available, no control renders.
   Accessibility: opt-in, never autoplays, real labelled controls, native <dialog>
   focus management, keyboard operable; does not replace or fight assistive tech.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── TTS endpoint ─────────────────────────────────────────────────────────
  // OpenAI BYOK is called DIRECTLY from the browser (the standard approach, as on
  // Stratum). An earlier probe suggested OpenAI blocked browser POST, but that was
  // a sandbox artifact — a control POST to a CORS-friendly endpoint failed the same
  // way, so the failure was the test environment, not OpenAI. If a specific runtime
  // ever blocks the direct call, the code falls back to the browser voice; you can
  // also set RELAY_URL to a stateless relay (see proxy/) as an override.
  var OPENAI_ENDPOINT = 'https://api.openai.com/v1/audio/speech';
  var RELAY_URL = '';
  var TTS_URL = RELAY_URL || OPENAI_ENDPOINT;

  var OPENAI_VOICES = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
  var OPENAI_MODEL = 'gpt-4o-mini-tts';

  var synth = window.speechSynthesis;
  var hasBrowserTTS = !!synth && typeof window.SpeechSynthesisUtterance !== 'undefined';
  var hasAudio = typeof window.Audio !== 'undefined' && typeof window.fetch !== 'undefined';
  var premium = hasAudio; // OpenAI BYOK needs only the user's key — available everywhere
  if (!hasBrowserTTS && !premium) return;

  var main = document.getElementById('main');
  if (!main) return;

  // ── Settings storage ─────────────────────────────────────────────────────
  var K = { engine: 'penumbra.listen.engine', key: 'penumbra.listen.openaiKey', voice: 'penumbra.listen.voice', remember: 'penumbra.listen.remember' };
  function get(k) { try { return localStorage.getItem(k) || sessionStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function put(k, v, persist) { try { (persist ? localStorage : sessionStorage).setItem(k, v); (persist ? sessionStorage : localStorage).removeItem(k); } catch (e) {} }
  function del(k) { try { sessionStorage.removeItem(k); localStorage.removeItem(k); } catch (e) {} }
  function remembering() { return get(K.remember) === '1'; }

  // ── Control bar ──────────────────────────────────────────────────────────
  var bar = document.createElement('div');
  bar.className = 'listen';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Listen to this page');

  var playBtn = el('button', 'listen__btn listen__btn--play'); playBtn.type = 'button'; playBtn.setAttribute('aria-pressed', 'false');
  var stopBtn = el('button', 'listen__btn listen__btn--stop'); stopBtn.type = 'button'; stopBtn.hidden = true;
  stopBtn.innerHTML = '<span aria-hidden="true">■</span> Stop';
  var status = el('span', 'listen__status'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');

  function setPlayLabel(label, icon) { playBtn.innerHTML = '<span aria-hidden="true">' + icon + '</span> ' + label; }
  setPlayLabel('Listen to this page', '▶');

  bar.appendChild(playBtn);
  bar.appendChild(stopBtn);

  var voiceBtn = null, dialog = null;
  if (premium) {
    voiceBtn = el('button', 'listen__btn listen__btn--voice'); voiceBtn.type = 'button';
    bar.appendChild(voiceBtn);
    dialog = buildDialog();
    bar.appendChild(dialog);
    voiceBtn.addEventListener('click', openDialog);
    updateVoiceBtn();
  }
  bar.appendChild(status);

  var hostEl = main.querySelector('.container') || main;
  hostEl.insertBefore(bar, hostEl.firstChild);

  // ── Voice modal ──────────────────────────────────────────────────────────
  function buildDialog() {
    var d = document.createElement('dialog');
    d.className = 'listen__dialog';
    var titleId = 'listen-dialog-title';
    d.setAttribute('aria-labelledby', titleId);

    var head = el('div', 'listen__dialoghead');
    var h = document.createElement('h2'); h.id = titleId; h.textContent = 'Voice';
    var x = el('button', 'listen__close'); x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.innerHTML = '<span aria-hidden="true">×</span>';
    head.appendChild(h); head.appendChild(x); d.appendChild(head);

    var intro = el('p', 'listen__note');
    intro.textContent = 'The browser voice is free and needs no setup. For higher-quality voices, use your own OpenAI key.';
    d.appendChild(intro);

    var keyLabel = document.createElement('label'); keyLabel.className = 'listen__label'; keyLabel.setAttribute('for', 'listen-key'); keyLabel.textContent = 'OpenAI API key';
    var keyInput = document.createElement('input'); keyInput.id = 'listen-key'; keyInput.type = 'password'; keyInput.className = 'listen__input';
    keyInput.autocomplete = 'off'; keyInput.spellcheck = false; keyInput.placeholder = 'sk-…'; keyInput.setAttribute('autofocus', '');

    var voiceLabel = document.createElement('label'); voiceLabel.className = 'listen__label'; voiceLabel.setAttribute('for', 'listen-voice'); voiceLabel.textContent = 'Voice';
    var voiceSel = document.createElement('select'); voiceSel.id = 'listen-voice'; voiceSel.className = 'listen__input';
    OPENAI_VOICES.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.textContent = v; voiceSel.appendChild(o); });

    var remWrap = document.createElement('label'); remWrap.className = 'listen__check';
    var rem = document.createElement('input'); rem.type = 'checkbox';
    remWrap.appendChild(rem); remWrap.appendChild(document.createTextNode(' Remember on this device (otherwise cleared when you close the tab)'));

    var actions = el('div', 'listen__actions');
    var useAi = el('button', 'listen__btn listen__btn--primary'); useAi.type = 'button'; useAi.textContent = 'Use OpenAI voice';
    var useBrowser = el('button', 'listen__btn'); useBrowser.type = 'button'; useBrowser.textContent = 'Use free browser voice';
    actions.appendChild(useAi); actions.appendChild(useBrowser);

    var forget = el('button', 'listen__btn listen__forget'); forget.type = 'button'; forget.textContent = 'Forget saved key';

    var note = el('p', 'listen__note');
    note.innerHTML = 'Your key is stored only in your browser and sent only to OpenAI (directly, from your browser) — never to this site, which has no backend. You are billed by OpenAI. <a href="https://platform.openai.com/api-keys">Get a key</a>; a usage-capped key is recommended.';

    d.appendChild(keyLabel); d.appendChild(keyInput);
    d.appendChild(voiceLabel); d.appendChild(voiceSel);
    d.appendChild(remWrap); d.appendChild(actions); d.appendChild(forget); d.appendChild(note);

    function close(msg) { try { d.close(); } catch (e) {} if (msg) status.textContent = msg; if (lastFocus) lastFocus.focus(); }
    x.addEventListener('click', function () { close(); });
    useBrowser.addEventListener('click', function () {
      put(K.engine, 'browser', remembering()); updateVoiceBtn(); close('Using the free browser voice.');
    });
    useAi.addEventListener('click', function () {
      var persist = rem.checked;
      put(K.remember, persist ? '1' : '0', persist);
      if (keyInput.value.trim()) put(K.key, keyInput.value.trim(), persist);
      put(K.voice, voiceSel.value, persist);
      put(K.engine, 'openai', persist);
      updateVoiceBtn();
      close('Using the OpenAI voice (' + voiceSel.value + ').');
    });
    forget.addEventListener('click', function () { del(K.key); keyInput.value = ''; updateVoiceBtn(); refreshDialog(); status.textContent = 'Saved key forgotten.'; });

    d.addEventListener('cancel', function () { if (lastFocus) setTimeout(function () { lastFocus.focus(); }, 0); });

    d._refresh = function () {
      keyInput.value = get(K.key);
      voiceSel.value = get(K.voice) || OPENAI_VOICES[0];
      rem.checked = remembering();
      forget.hidden = !get(K.key);
    };
    return d;
  }

  var lastFocus = null;
  function openDialog() { lastFocus = voiceBtn; refreshDialog(); if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', ''); }
  function refreshDialog() { if (dialog && dialog._refresh) dialog._refresh(); }
  function updateVoiceBtn() {
    if (!voiceBtn) return;
    var usingAi = get(K.engine) === 'openai' && get(K.key);
    voiceBtn.innerHTML = '<span aria-hidden="true">⚙</span> Voice: ' + (usingAi ? 'OpenAI' : 'browser');
  }

  // ── Readable text ─────────────────────────────────────────────────────
  var BLOCK_SEL = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,dt,dd,th,td,figcaption,summary';
  function getBlocks() {
    var blocks = [];
    main.querySelectorAll(BLOCK_SEL).forEach(function (n) {
      if (n.closest('.listen')) return;
      if (n.closest('[aria-hidden="true"]')) return;
      if (n.classList.contains('visually-hidden') || n.closest('.visually-hidden')) return;
      if (n.querySelector(BLOCK_SEL)) return;
      var t = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (t) blocks.push(t);
    });
    return blocks;
  }
  function buildQueue(blocks, max) {
    var q = [];
    blocks.forEach(function (b) {
      if (b.length <= max) { q.push(b); return; }
      var sentences = b.match(/[^.!?]+[.!?]*/g) || [b];
      var buf = '';
      sentences.forEach(function (s) { if ((buf + s).length > max && buf) { q.push(buf.trim()); buf = ''; } buf += s; });
      if (buf.trim()) q.push(buf.trim());
    });
    return q;
  }

  // ── Playback state ────────────────────────────────────────────────────
  var state = 'idle', engineInUse = 'browser';
  var bq = [], bidx = 0;
  var ai = { q: [], idx: 0, audio: null, abort: null, urls: {} };

  function setPlayingUI() { setPlayLabel('Pause', '⏸'); playBtn.setAttribute('aria-pressed', 'true'); stopBtn.hidden = false; state = 'playing'; status.textContent = 'Playing…'; }
  function reset(msg) { if (synth) synth.cancel(); aiTeardown(); state = 'idle'; bq = []; bidx = 0; setPlayLabel('Listen to this page', '▶'); playBtn.setAttribute('aria-pressed', 'false'); stopBtn.hidden = true; status.textContent = msg || ''; }
  function chosenEngine() { return (get(K.engine) === 'openai' && hasAudio && get(K.key)) ? 'openai' : 'browser'; }

  function browserNext() {
    if (bidx >= bq.length) { reset('Finished.'); return; }
    var u = new SpeechSynthesisUtterance(bq[bidx]);
    u.onend = function () { if (state === 'playing' && engineInUse === 'browser') { bidx++; browserNext(); } };
    u.onerror = function () { reset(); };
    synth.speak(u);
  }
  function browserStart() {
    if (!hasBrowserTTS) { status.textContent = 'No voice engine available.'; return; }
    engineInUse = 'browser'; synth.cancel();
    bq = buildQueue(getBlocks(), 240);
    if (!bq.length) { status.textContent = 'Nothing to read on this page.'; return; }
    bidx = 0; setPlayingUI(); browserNext();
  }

  function aiTeardown() {
    if (ai.abort) { try { ai.abort.abort(); } catch (e) {} }
    if (ai.audio) { try { ai.audio.pause(); } catch (e) {} ai.audio = null; }
    Object.keys(ai.urls).forEach(function (k) { try { URL.revokeObjectURL(ai.urls[k]); } catch (e) {} });
    ai = { q: [], idx: 0, audio: null, abort: null, urls: {} };
  }
  function aiClip(i) {
    if (ai.urls[i]) return Promise.resolve(ai.urls[i]);
    var key = get(K.key), voice = get(K.voice) || OPENAI_VOICES[0];
    var headers = { 'Content-Type': 'application/json' };
    if (key) headers['Authorization'] = 'Bearer ' + key;
    return fetch(TTS_URL, { method: 'POST', signal: ai.abort.signal, headers: headers, body: JSON.stringify({ model: OPENAI_MODEL, voice: voice, input: ai.q[i] }) })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
      .then(function (b) { var u = URL.createObjectURL(b); ai.urls[i] = u; return u; });
  }
  function aiPlayIdx() {
    if (ai.idx >= ai.q.length) { reset('Finished.'); return; }
    aiClip(ai.idx).then(function (url) {
      if (state === 'idle') return;
      ai.audio.src = url; var p = ai.audio.play(); if (p && p.catch) p.catch(function () {});
      status.textContent = 'Playing…';
      if (ai.idx + 1 < ai.q.length) aiClip(ai.idx + 1).catch(function () {});
    }).catch(function (err) {
      if (err && err.name === 'AbortError') return;
      var first = ai.idx === 0; aiTeardown(); state = 'idle';
      if (first) { status.textContent = 'OpenAI voice unavailable (' + (err && err.message || 'error') + '). Using the browser voice.'; browserStart(); }
      else { reset('OpenAI voice stopped (' + (err && err.message || 'error') + ').'); }
    });
  }
  function aiStart() {
    engineInUse = 'openai';
    ai.q = buildQueue(getBlocks(), 500);
    if (!ai.q.length) { status.textContent = 'Nothing to read on this page.'; return; }
    ai.idx = 0; ai.abort = new AbortController(); ai.audio = new Audio();
    ai.audio.addEventListener('ended', function () {
      if (state === 'playing' && engineInUse === 'openai') { if (ai.urls[ai.idx]) { URL.revokeObjectURL(ai.urls[ai.idx]); delete ai.urls[ai.idx]; } ai.idx++; aiPlayIdx(); }
    });
    setPlayingUI(); status.textContent = 'Loading…'; aiPlayIdx();
  }

  playBtn.addEventListener('click', function () {
    if (state === 'idle') { engineInUse = chosenEngine(); if (engineInUse === 'openai') aiStart(); else browserStart(); }
    else if (state === 'playing') { if (engineInUse === 'openai') { if (ai.audio) ai.audio.pause(); } else if (synth) synth.pause(); state = 'paused'; setPlayLabel('Resume', '▶'); status.textContent = 'Paused.'; }
    else if (state === 'paused') { if (engineInUse === 'openai') { if (ai.audio) ai.audio.play(); } else if (synth) synth.resume(); state = 'playing'; setPlayLabel('Pause', '⏸'); status.textContent = 'Playing…'; }
  });
  stopBtn.addEventListener('click', function () { reset('Stopped.'); });

  window.addEventListener('beforeunload', function () { if (synth) synth.cancel(); aiTeardown(); });
  window.addEventListener('pagehide', function () { if (synth) synth.cancel(); aiTeardown(); });

  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
})();
