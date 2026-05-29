/* ─────────────────────────────────────────────────────────────────────────
   Listen — read the current page aloud. Two engines:

   1. Browser voice (default): the built-in Web Speech API. No key, no network,
      no cost. Always available where supported.
   2. OpenAI voice (BYOK, optional): higher-quality voices using the USER'S OWN
      OpenAI key, entered in "Voice settings" and stored only in their browser
      (sessionStorage by default; localStorage if they tick "remember"). Because
      OpenAI blocks authenticated browser POST (verified — CORS preflight fails),
      requests go through a tiny stateless relay (see proxy/). Set RELAY_URL below
      after deploying it; until then the OpenAI option stays disabled.

   The user's key is never sent to us (this site has no backend/analytics) — only
   to the relay, which forwards it to OpenAI and forgets it. The repo is public, so
   that is auditable.

   Progressive enhancement: if no speech engine is available, no control renders.
   Accessibility intent (built to standard; validated by the panel, not yet claimed
   conformant): opt-in, never autoplays, real labelled controls, keyboard operable,
   does not replace or fight assistive technology.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── Owner config ───────────────────────────────────────────────────────
  // Set this to your deployed relay URL (see proxy/README.md) to enable OpenAI
  // voices. Leave empty to offer the free browser voice only.
  var RELAY_URL = '';

  var OPENAI_VOICES = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
  var OPENAI_MODEL = 'gpt-4o-mini-tts';

  var synth = window.speechSynthesis;
  var hasBrowserTTS = !!synth && typeof window.SpeechSynthesisUtterance !== 'undefined';
  var hasAudio = typeof window.Audio !== 'undefined' && typeof window.fetch !== 'undefined';
  if (!hasBrowserTTS && !(RELAY_URL && hasAudio)) return; // nothing we can do

  var main = document.getElementById('main');
  if (!main) return;

  // ── Settings storage (session by default; local if "remember") ──────────
  var K = {
    engine: 'penumbra.listen.engine',
    key: 'penumbra.listen.openaiKey',
    voice: 'penumbra.listen.voice',
    remember: 'penumbra.listen.remember'
  };
  function get(k) { try { return localStorage.getItem(k) || sessionStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function set(k, v, persist) { try { (persist ? localStorage : sessionStorage).setItem(k, v); (persist ? sessionStorage : localStorage).removeItem(k); } catch (e) {} }
  function del(k) { try { sessionStorage.removeItem(k); localStorage.removeItem(k); } catch (e) {} }
  function remembering() { return get(K.remember) === '1'; }

  // ── Build the control ───────────────────────────────────────────────────
  var bar = document.createElement('div');
  bar.className = 'listen';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Listen to this page');

  var playBtn = document.createElement('button');
  playBtn.type = 'button';
  playBtn.className = 'listen__btn listen__btn--play';
  playBtn.setAttribute('aria-pressed', 'false');

  var stopBtn = document.createElement('button');
  stopBtn.type = 'button';
  stopBtn.className = 'listen__btn listen__btn--stop';
  stopBtn.hidden = true;
  stopBtn.innerHTML = '<span aria-hidden="true">■</span> Stop';

  var status = document.createElement('span');
  status.className = 'listen__status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');

  function setPlayLabel(label, icon) {
    playBtn.innerHTML = '<span aria-hidden="true">' + icon + '</span> ' + label;
  }
  setPlayLabel('Listen to this page', '▶');

  bar.appendChild(playBtn);
  bar.appendChild(stopBtn);
  bar.appendChild(buildSettings());
  bar.appendChild(status);

  var hostEl = main.querySelector('.container') || main;
  hostEl.insertBefore(bar, hostEl.firstChild);

  // ── Settings panel ──────────────────────────────────────────────────────
  function buildSettings() {
    var d = document.createElement('details');
    d.className = 'listen__settings';
    var s = document.createElement('summary');
    s.className = 'listen__btn';
    s.innerHTML = '<span aria-hidden="true">⚙</span> Voice settings';
    d.appendChild(s);

    var wrap = document.createElement('div');
    wrap.className = 'listen__panel';

    // Engine choice
    var fs = document.createElement('fieldset');
    fs.className = 'listen__fieldset';
    fs.innerHTML = '<legend>Voice</legend>';
    var engine = get(K.engine) || 'browser';
    fs.appendChild(radio('listen-engine', 'browser', 'Browser voice (free, no setup)', engine === 'browser'));
    var openaiAvailable = !!RELAY_URL && hasAudio;
    fs.appendChild(radio('listen-engine', 'openai',
      'OpenAI voice — your own key' + (openaiAvailable ? '' : ' (not enabled yet)'),
      engine === 'openai', !openaiAvailable));
    wrap.appendChild(fs);

    if (openaiAvailable) {
      var keyId = 'listen-openai-key';
      var keyLabel = document.createElement('label');
      keyLabel.setAttribute('for', keyId);
      keyLabel.className = 'listen__label';
      keyLabel.textContent = 'Your OpenAI API key';
      var keyInput = document.createElement('input');
      keyInput.id = keyId; keyInput.type = 'password'; keyInput.className = 'listen__input';
      keyInput.autocomplete = 'off'; keyInput.spellcheck = false;
      keyInput.placeholder = 'sk-…'; keyInput.value = get(K.key);

      var voiceId = 'listen-openai-voice';
      var voiceLabel = document.createElement('label');
      voiceLabel.setAttribute('for', voiceId); voiceLabel.className = 'listen__label';
      voiceLabel.textContent = 'Voice';
      var voiceSel = document.createElement('select');
      voiceSel.id = voiceId; voiceSel.className = 'listen__input';
      var savedVoice = get(K.voice) || OPENAI_VOICES[0];
      OPENAI_VOICES.forEach(function (v) {
        var o = document.createElement('option'); o.value = v; o.textContent = v;
        if (v === savedVoice) o.selected = true; voiceSel.appendChild(o);
      });

      var rememberWrap = document.createElement('label');
      rememberWrap.className = 'listen__check';
      var remember = document.createElement('input');
      remember.type = 'checkbox'; remember.checked = remembering();
      rememberWrap.appendChild(remember);
      rememberWrap.appendChild(document.createTextNode(' Remember on this device (otherwise cleared when you close the tab)'));

      var saveBtn = document.createElement('button');
      saveBtn.type = 'button'; saveBtn.className = 'listen__btn'; saveBtn.textContent = 'Save';
      var forgetBtn = document.createElement('button');
      forgetBtn.type = 'button'; forgetBtn.className = 'listen__btn'; forgetBtn.textContent = 'Forget key';

      var note = document.createElement('p');
      note.className = 'listen__note';
      note.innerHTML = 'Your key is stored only in your browser and sent only to OpenAI (via a stateless relay) — never to this site, which has no backend. You are billed by OpenAI for usage. <a href="https://platform.openai.com/api-keys">Get a key</a>; a usage-capped key is recommended.';

      saveBtn.addEventListener('click', function () {
        var persist = remember.checked;
        set(K.remember, persist ? '1' : '0', persist);
        if (keyInput.value.trim()) set(K.key, keyInput.value.trim(), persist); else del(K.key);
        set(K.voice, voiceSel.value, persist);
        status.textContent = 'Voice settings saved.';
      });
      forgetBtn.addEventListener('click', function () {
        del(K.key); keyInput.value = ''; status.textContent = 'Key forgotten.';
      });
      document.querySelectorAll('input[name="listen-engine"]').forEach(function (r) {
        r.addEventListener('change', function () { set(K.engine, r.value, remembering()); });
      });

      wrap.appendChild(keyLabel); wrap.appendChild(keyInput);
      wrap.appendChild(voiceLabel); wrap.appendChild(voiceSel);
      wrap.appendChild(rememberWrap);
      var btns = document.createElement('div'); btns.className = 'listen__btns';
      btns.appendChild(saveBtn); btns.appendChild(forgetBtn);
      wrap.appendChild(btns);
      wrap.appendChild(note);
    } else {
      var owner = document.createElement('p');
      owner.className = 'listen__note';
      owner.textContent = 'OpenAI voices are not enabled. The site owner can turn them on by deploying the stateless relay (see proxy/README.md) and setting RELAY_URL — no shared key required; each listener brings their own.';
      wrap.appendChild(owner);
      document.querySelectorAll && setTimeout(function () {
        var rs = bar.querySelectorAll('input[name="listen-engine"]');
        rs.forEach(function (r) { r.addEventListener('change', function () { set(K.engine, r.value, remembering()); }); });
      }, 0);
    }

    d.appendChild(wrap);
    return d;
  }

  function radio(name, value, label, checked, disabled) {
    var l = document.createElement('label'); l.className = 'listen__check';
    var i = document.createElement('input');
    i.type = 'radio'; i.name = name; i.value = value;
    if (checked) i.checked = true; if (disabled) i.disabled = true;
    l.appendChild(i); l.appendChild(document.createTextNode(' ' + label));
    return l;
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
      sentences.forEach(function (s) {
        if ((buf + s).length > max && buf) { q.push(buf.trim()); buf = ''; }
        buf += s;
      });
      if (buf.trim()) q.push(buf.trim());
    });
    return q;
  }

  // ── Shared state ─────────────────────────────────────────────────────
  var state = 'idle';        // idle | playing | paused
  var engineInUse = 'browser';
  var bq = [], bidx = 0;     // browser queue
  var ai = { q: [], idx: 0, audio: null, abort: null, urls: {} };

  function setPlayingUI() {
    setPlayLabel('Pause', '⏸'); playBtn.setAttribute('aria-pressed', 'true');
    stopBtn.hidden = false; state = 'playing'; status.textContent = 'Playing…';
  }
  function reset(msg) {
    if (synth) synth.cancel();
    aiTeardown();
    state = 'idle'; bq = []; bidx = 0;
    setPlayLabel('Listen to this page', '▶'); playBtn.setAttribute('aria-pressed', 'false');
    stopBtn.hidden = true; status.textContent = msg || '';
  }

  function chosenEngine() {
    return (get(K.engine) === 'openai' && RELAY_URL && hasAudio && get(K.key)) ? 'openai' : 'browser';
  }

  // ── Browser engine ────────────────────────────────────────────────────
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

  // ── OpenAI engine (BYOK via relay) ────────────────────────────────────
  function aiTeardown() {
    if (ai.abort) { try { ai.abort.abort(); } catch (e) {} }
    if (ai.audio) { try { ai.audio.pause(); } catch (e) {} ai.audio = null; }
    Object.keys(ai.urls).forEach(function (k) { try { URL.revokeObjectURL(ai.urls[k]); } catch (e) {} });
    ai = { q: [], idx: 0, audio: null, abort: null, urls: {} };
  }
  function aiClip(i) {
    if (ai.urls[i]) return Promise.resolve(ai.urls[i]);
    var key = get(K.key), voice = get(K.voice) || OPENAI_VOICES[0];
    return fetch(RELAY_URL, {
      method: 'POST', signal: ai.abort.signal,
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: OPENAI_MODEL, voice: voice, input: ai.q[i] })
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.blob();
    }).then(function (b) { var u = URL.createObjectURL(b); ai.urls[i] = u; return u; });
  }
  function aiPlayIdx() {
    if (ai.idx >= ai.q.length) { reset('Finished.'); return; }
    aiClip(ai.idx).then(function (url) {
      if (state === 'idle') return;
      ai.audio.src = url;
      var p = ai.audio.play(); if (p && p.catch) p.catch(function () {});
      status.textContent = 'Playing…';
      if (ai.idx + 1 < ai.q.length) aiClip(ai.idx + 1).catch(function () {});
    }).catch(function (err) {
      if (err && err.name === 'AbortError') return;
      var first = ai.idx === 0;
      aiTeardown(); state = 'idle';
      if (first) {
        // fall back to the free browser voice so the user still gets audio
        status.textContent = 'OpenAI voice unavailable (' + (err && err.message || 'error') + '). Using the browser voice.';
        browserStart();
      } else {
        reset('OpenAI voice stopped (' + (err && err.message || 'error') + ').');
      }
    });
  }
  function aiStart() {
    engineInUse = 'openai';
    ai.q = buildQueue(getBlocks(), 500);
    if (!ai.q.length) { status.textContent = 'Nothing to read on this page.'; return; }
    ai.idx = 0; ai.abort = new AbortController();
    ai.audio = new Audio();
    ai.audio.addEventListener('ended', function () {
      if (state === 'playing' && engineInUse === 'openai') {
        if (ai.urls[ai.idx]) { URL.revokeObjectURL(ai.urls[ai.idx]); delete ai.urls[ai.idx]; }
        ai.idx++; aiPlayIdx();
      }
    });
    setPlayingUI(); status.textContent = 'Loading…'; aiPlayIdx();
  }

  // ── Unified controls ──────────────────────────────────────────────────
  playBtn.addEventListener('click', function () {
    if (state === 'idle') {
      engineInUse = chosenEngine();
      if (engineInUse === 'openai') aiStart(); else browserStart();
    } else if (state === 'playing') {
      if (engineInUse === 'openai') { if (ai.audio) ai.audio.pause(); }
      else if (synth) synth.pause();
      state = 'paused'; setPlayLabel('Resume', '▶'); status.textContent = 'Paused.';
    } else if (state === 'paused') {
      if (engineInUse === 'openai') { if (ai.audio) ai.audio.play(); }
      else if (synth) synth.resume();
      state = 'playing'; setPlayLabel('Pause', '⏸'); status.textContent = 'Playing…';
    }
  });
  stopBtn.addEventListener('click', function () { reset('Stopped.'); });

  window.addEventListener('beforeunload', function () { if (synth) synth.cancel(); aiTeardown(); });
  window.addEventListener('pagehide', function () { if (synth) synth.cancel(); aiTeardown(); });
})();
