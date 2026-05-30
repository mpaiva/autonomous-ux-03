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
  // OpenAI BYOK is called directly from the browser (confirmed working). The user's
  // key never leaves their browser except in the request to OpenAI. If a runtime
  // ever blocks the direct call, the code degrades to the browser voice.
  var TTS_URL = 'https://api.openai.com/v1/audio/speech';

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
  var K = { engine: 'penumbra.listen.engine', key: 'penumbra.listen.openaiKey', voice: 'penumbra.listen.voice', remember: 'penumbra.listen.remember', rate: 'penumbra.listen.rate', pitch: 'penumbra.listen.pitch' };
  function get(k) { try { return localStorage.getItem(k) || sessionStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function getNum(k, def) { var v = parseFloat(get(k)); return isNaN(v) ? def : v; }
  function put(k, v, persist) { try { (persist ? localStorage : sessionStorage).setItem(k, v); (persist ? sessionStorage : localStorage).removeItem(k); } catch (e) {} }
  function del(k) { try { sessionStorage.removeItem(k); localStorage.removeItem(k); } catch (e) {} }
  function remembering() { return get(K.remember) === '1'; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

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

    // Speed applies to both engines; pitch applies to the browser voice.
    var rate = slider('listen-rate', 'Speed', 0.5, 2, 0.1, K.rate, true);
    var pitch = slider('listen-pitch', 'Pitch', 0, 2, 0.1, K.pitch, false);
    d.appendChild(rate.wrap);
    d.appendChild(pitch.wrap);

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
      rate.refresh();
      pitch.refresh();
    };
    return d;
  }

  function slider(id, labelText, min, max, step, storeKey, isRate) {
    var wrap = el('div', 'listen__slider');
    var lab = document.createElement('label'); lab.className = 'listen__label'; lab.setAttribute('for', id);
    var out = document.createElement('output'); out.className = 'listen__val';
    function fmt(v) { return isRate ? v.toFixed(1) + '×' : v.toFixed(1); }
    var val = getNum(storeKey, 1);
    lab.appendChild(document.createTextNode(labelText + ' '));
    out.textContent = fmt(val); lab.appendChild(out);
    var inp = document.createElement('input');
    inp.type = 'range'; inp.id = id; inp.className = 'listen__range';
    inp.min = min; inp.max = max; inp.step = step; inp.value = val;
    inp.setAttribute('aria-valuetext', fmt(val));
    inp.addEventListener('input', function () {
      var v = parseFloat(inp.value); out.textContent = fmt(v); inp.setAttribute('aria-valuetext', fmt(v));
      put(storeKey, String(v), remembering());
    });
    wrap.appendChild(lab); wrap.appendChild(inp);
    return { wrap: wrap, refresh: function () { var v = getNum(storeKey, 1); inp.value = v; out.textContent = fmt(v); inp.setAttribute('aria-valuetext', fmt(v)); } };
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
      if (t) blocks.push({ el: n, text: t });
    });
    return blocks;
  }
  function buildQueue(blocks, max) {
    var q = [];
    blocks.forEach(function (b) {
      if (b.text.length <= max) { q.push({ el: b.el, text: b.text }); return; }
      var sentences = b.text.match(/[^.!?]+[.!?]*/g) || [b.text];
      var buf = '';
      sentences.forEach(function (s) { if ((buf + s).length > max && buf) { q.push({ el: b.el, text: buf.trim() }); buf = ''; } buf += s; });
      if (buf.trim()) q.push({ el: b.el, text: buf.trim() });
    });
    return q;
  }

  // ── Read-along highlight ──────────────────────────────────────────────
  var hlEl = null;
  function prefersReducedMotion() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function highlight(el) {
    if (el === hlEl) return;
    clearHighlight();
    if (!el) return;
    hlEl = el;
    el.classList.add('listen-reading');
    try { el.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' }); }
    catch (e) { try { el.scrollIntoView(); } catch (e2) {} }
  }
  function clearHighlight() { if (hlEl) { hlEl.classList.remove('listen-reading'); hlEl = null; } }

  // ── Playback state ────────────────────────────────────────────────────
  var state = 'idle', engineInUse = 'browser';
  var bq = [], bidx = 0;
  var ai = { q: [], idx: 0, audio: null, abort: null, urls: {} };

  function setPlayingUI() { setPlayLabel('Pause', '⏸'); playBtn.setAttribute('aria-pressed', 'true'); stopBtn.hidden = false; state = 'playing'; status.textContent = 'Playing…'; }
  function reset(msg) { if (synth) synth.cancel(); aiTeardown(); clearHighlight(); state = 'idle'; bq = []; bidx = 0; setPlayLabel('Listen to this page', '▶'); playBtn.setAttribute('aria-pressed', 'false'); stopBtn.hidden = true; status.textContent = msg || ''; }
  function chosenEngine() { return (get(K.engine) === 'openai' && hasAudio && get(K.key)) ? 'openai' : 'browser'; }

  function browserNext() {
    if (bidx >= bq.length) { reset('Finished.'); return; }
    highlight(bq[bidx].el);
    var u = new SpeechSynthesisUtterance(bq[bidx].text);
    u.rate = clamp(getNum(K.rate, 1), 0.5, 2);
    u.pitch = clamp(getNum(K.pitch, 1), 0, 2);
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
    return fetch(TTS_URL, { method: 'POST', signal: ai.abort.signal, headers: headers, body: JSON.stringify({ model: OPENAI_MODEL, voice: voice, input: ai.q[i].text, speed: clamp(getNum(K.rate, 1), 0.25, 4) }) })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
      .then(function (b) { var u = URL.createObjectURL(b); ai.urls[i] = u; return u; });
  }
  function aiPlayIdx() {
    if (ai.idx >= ai.q.length) { reset('Finished.'); return; }
    highlight(ai.q[ai.idx].el);
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
