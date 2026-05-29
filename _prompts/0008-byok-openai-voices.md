---
title: "Scaffold the OpenAI proxy using a BYOK (client-side key) approach"
slug: byok-openai-voices
id_code: "REQ-0008"
status: "Implemented (scaffolded; owner deploy to enable)"
status_class: "ok"
received: 2026-05-29
received_display: "2026-05-29 (time of day not specified)"
channel: "Direct prompt"
---

## Original prompt (verbatim)

<div class="verbatim">
yes, scaffold the OpenAI proxy, but use the BYOK approach, where the user enters the key on the client side
</div>

## Interpretation

Use Bring-Your-Own-Key: the listener enters their own OpenAI key in the browser
(no company-funded key), ideally avoiding a server.

## Finding that shaped the build

We verified that OpenAI **blocks authenticated browser POST** (CORS preflight
fails), so a pure client-side BYOK call to OpenAI's TTS endpoint is impossible. BYOK
still removes the funding problem, but one **stateless relay** is unavoidable for
the network hop. Surfaced this rather than shipping something broken or silently
switching to a stateful proxy. See
[DR-0016]({{ '/decisions/byok-openai-voices/' | relative_url }}).

## Actions taken

- Shipped the client-side BYOK experience: a "Voice settings" panel to enter and
  store the user's own key in their browser (session by default; "remember" →
  local; "Forget key" clears it), pick a voice, and choose the engine. Browser
  voice stays the default + automatic fallback.
- Scaffolded a stateless relay (`proxy/openai-tts-worker.js` + `proxy/README.md`,
  free Cloudflare Workers tier) that forwards the user's key to OpenAI and forgets
  it — restricted to our origin and the speech endpoint only.
- Verified the UI, settings persistence, and fallback; Lighthouse a11y 100.

## Current status

**Scaffolded.** Enabling OpenAI voices is a one-time, free owner deploy (deploy the
Worker, set `RELAY_URL`). Until then, Listen uses the free browser voice.
