---
title: "Implement a 'Listen' feature to hear every page"
slug: listen-feature
id_code: "REQ-0007"
status: "Implemented (free tier); upgrade flagged"
status_class: "ok"
received: 2026-05-29
received_display: "2026-05-29 (time of day not specified)"
channel: "Direct prompt"
---

## Original prompt (verbatim)

<div class="verbatim">
implement a "listen" feature. I want to be able to listen to every page in this site. you can use the openAI voice API for streamining the text to voice
</div>

## Interpretation

Add read-aloud to every page. The Chairman suggested the OpenAI voice API; we
treated that as permissive, not mandatory, and chose the approach that is secure on
static hosting.

## Decision & actions

- Shipped a "Listen to this page" control on **every page** using the browser's
  **Web Speech API** — no key, no server, no cost, secure on GitHub Pages
  (`assets/js/listen.js`, included from the default layout). Play / Pause / Resume /
  Stop; opt-in; never autoplays; keyboard + AT friendly. See
  [DR-0015]({{ '/decisions/listen-feature/' | relative_url }}).
- **Did not** embed an OpenAI key client-side — on a static public site a key is
  exposed to everyone. Cloud voices are deferred to a Chairman decision (proxy +
  funded key); tracked on the [backlog]({{ '/backlog/' | relative_url }}).
- Fixed a CSS bug caught in visual testing (the Stop button stayed visible because a
  class `display` overrode the `[hidden]` attribute). Re-verified; Lighthouse
  accessibility 100 with the control present (manual AT testing still pending).

## Current status

**Implemented (free, on every page).** Premium cloud voices await a Chairman
decision on spend + a small serverless proxy, which we can scaffold on approval.
