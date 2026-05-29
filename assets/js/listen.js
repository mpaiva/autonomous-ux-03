/* ─────────────────────────────────────────────────────────────────────────
   Listen — read the current page aloud using the browser's built-in Web Speech
   API (SpeechSynthesis). Progressive enhancement: if the API is unsupported, no
   control is rendered and the page is unaffected.

   Why this and not a cloud TTS API here: this site is static (GitHub Pages), so
   there is no safe place to hold an API key client-side. Web Speech needs no key,
   no server, and no cost. A premium cloud-voice upgrade (e.g. OpenAI) would
   require a server-side proxy + funded key — tracked separately (DR-0015).

   Accessibility intent (to be validated by the panel, not yet claimed conformant):
   - Opt-in only; never autoplays (WCAG 1.4.2 friendly).
   - A real <button>, clearly labelled, keyboard operable, with a polite status.
   - Does not replace or fight assistive technology — it is an option to ignore.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') return;

  var main = document.getElementById('main');
  if (!main) return;

  // ── Build the control ────────────────────────────────────────────────
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
  bar.appendChild(status);

  var host = main.querySelector('.container') || main;
  host.insertBefore(bar, host.firstChild);

  // ── Gather readable text, in document order, without duplication ──────
  var BLOCK_SEL = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,dt,dd,th,td,figcaption,summary';

  function getBlocks() {
    var blocks = [];
    main.querySelectorAll(BLOCK_SEL).forEach(function (n) {
      if (n.closest('.listen')) return;                 // skip our own control
      if (n.closest('[aria-hidden="true"]')) return;    // skip hidden-from-AT
      if (n.classList.contains('visually-hidden') || n.closest('.visually-hidden')) return;
      if (n.querySelector(BLOCK_SEL)) return;            // container of blocks; its children are captured
      var t = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (t) blocks.push(t);
    });
    return blocks;
  }

  // Chunk to ~240 chars to avoid the Chrome long-utterance cut-off and keep
  // onend firing reliably between segments.
  function buildQueue(blocks) {
    var q = [];
    blocks.forEach(function (b) {
      if (b.length <= 240) { q.push(b); return; }
      var sentences = b.match(/[^.!?]+[.!?]*/g) || [b];
      var buf = '';
      sentences.forEach(function (s) {
        if ((buf + s).length > 240 && buf) { q.push(buf.trim()); buf = ''; }
        buf += s;
      });
      if (buf.trim()) q.push(buf.trim());
    });
    return q;
  }

  // ── State machine: idle | playing | paused ────────────────────────────
  var queue = [], idx = 0, state = 'idle';

  function reset(finishedMsg) {
    synth.cancel();
    queue = []; idx = 0; state = 'idle';
    setPlayLabel('Listen to this page', '▶');
    playBtn.setAttribute('aria-pressed', 'false');
    stopBtn.hidden = true;
    status.textContent = finishedMsg || '';
  }

  function speakNext() {
    if (idx >= queue.length) { reset('Finished.'); return; }
    var u = new SpeechSynthesisUtterance(queue[idx]);
    u.onend = function () { if (state === 'playing') { idx++; speakNext(); } };
    u.onerror = function () { reset(); };
    synth.speak(u);
  }

  function play() {
    synth.cancel();
    queue = buildQueue(getBlocks());
    if (!queue.length) { status.textContent = 'Nothing to read on this page.'; return; }
    idx = 0; state = 'playing';
    setPlayLabel('Pause', '⏸');
    playBtn.setAttribute('aria-pressed', 'true');
    stopBtn.hidden = false;
    status.textContent = 'Playing…';
    speakNext();
  }

  playBtn.addEventListener('click', function () {
    if (state === 'idle') {
      play();
    } else if (state === 'playing') {
      synth.pause(); state = 'paused';
      setPlayLabel('Resume', '▶');
      status.textContent = 'Paused.';
    } else if (state === 'paused') {
      synth.resume(); state = 'playing';
      setPlayLabel('Pause', '⏸');
      status.textContent = 'Playing…';
    }
  });

  stopBtn.addEventListener('click', function () { reset('Stopped.'); });

  // Stop audio when navigating away (multi-page site).
  window.addEventListener('beforeunload', function () { synth.cancel(); });
  window.addEventListener('pagehide', function () { synth.cancel(); });
})();
