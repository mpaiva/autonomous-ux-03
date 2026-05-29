---
title: "Listen feature — Web Speech API now; cloud (OpenAI) TTS deferred"
slug: listen-feature
id_code: "DR-0015"
status: "Adopted (Web Speech shipped)"
status_class: "ok"
date: 2026-05-29
owner: "Iris (interaction) + Janus (accessibility gate); Sol coordinated"
deciders: "Sol, under Chairman directive (REQ-0007)"
decision: >-
  Ship a "Listen to this page" read-aloud control on every page using the browser's
  built-in Web Speech API (no key, no server, no cost, secure on static hosting).
  Defer cloud/OpenAI TTS — it needs a server-side proxy + a funded key, which is a
  Chairman spend/infra decision.
summary: "Read-aloud on every page, done securely and accessibly — with the premium-voice path flagged for the Chairman."
---

## Context

The Chairman asked for a "Listen" feature to hear every page, suggesting the OpenAI
voice API for streaming TTS.

## The constraint that drove the decision

This site is **static** (GitHub Pages) — there is no server. A cloud TTS API (OpenAI
or any) requires an **API key**, and a key in client-side JavaScript on a public site
is **exposed to everyone** — a security and cost liability. Using OpenAI safely
requires a **server-side proxy** (a serverless function holding the key) **plus a
funded key**. Both are external spend + new infrastructure.

## Decision

Ship now with the browser's **Web Speech API** (`SpeechSynthesis`):

- **No key, no server, no cost**, and secure on static hosting.
- Appears on **every page** (injected by `assets/js/listen.js` from the default
  layout) as a "Listen to this page" control with Play / Pause / Resume / Stop.
- **Progressive enhancement:** if the API is unsupported, no control renders and the
  page is unaffected (the site already works with zero JavaScript).

## Accessibility design (built to standard; not yet *claimed* conformant)

A read-aloud feature done carelessly is an anti-pattern — so: it is **opt-in and
never autoplays** (WCAG 1.4.2), uses a **real, labelled `<button>`** with a polite
`role="status"`, is **keyboard operable** with visible focus, has **≥44px targets**,
reads main content in document order (skipping nav/footer/the control itself), and
**does not replace or fight assistive technology** — screen-reader users can simply
ignore it. Per our own rule ([DR-0002]({{ '/decisions/authenticity-guardrails/' | relative_url }})),
this is built to be accessible but is **not "verified accessible" until it passes
Janus + lived-experience validation** — which makes it an ideal first task for the
[panel pilot]({{ '/decisions/fund-panel-pilot/' | relative_url }}).

Automated check after shipping: Lighthouse accessibility **100** with the control
present (automated only — manual AT testing pending).

## Escalated to the Chairman

**Premium cloud voices (e.g. OpenAI) are deferred, not rejected.** Enabling them
requires (1) a small **serverless proxy** to hold the key server-side (off GitHub
Pages — e.g. Cloudflare Worker / Netlify / Vercel function), and (2) a **funded
OpenAI API key** (usage-based spend). That is a financial + infrastructure decision
for the Chairman. We can scaffold the proxy so it is turnkey on approval. Tracked on
the [backlog]({{ '/backlog/' | relative_url }}).
