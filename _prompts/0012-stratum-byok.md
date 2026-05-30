---
title: "Study how Stratum enables BYOK elegantly"
slug: stratum-byok
id_code: "REQ-0012"
status: "Implemented — confirmed; relay removed"
status_class: "ok"
received: 2026-05-30
received_display: "2026-05-30 (time of day not specified)"
channel: "Direct prompt"
---

## Original prompt (verbatim)

<div class="verbatim">
have a look at https://mpaiva-cc.github.io/stratum/ and how they enable BYOK ellegantly
</div>

## What we learned

Stratum's "Echo" widget does BYOK OpenAI TTS by calling
`https://api.openai.com/v1/audio/speech` **directly from the browser — no relay.**
That contradicted my earlier claim that OpenAI blocks browser POST, so I re-tested
with a proper control: a preflighted POST to a CORS-friendly endpoint (httpbin)
**also failed** in the test browser. So my original "block" was a **test-environment
artifact**, not OpenAI. (Stratum's `echo-key.json` returns 404 — they are not
exposing a key publicly; good.)

## Actions taken

- Corrected the Listen feature to call OpenAI **directly** (BYOK), so premium voices
  now work on the public site — the user just enters their key, no relay, no owner
  deploy. The browser-voice fallback remains for graceful degradation.
- Corrected the record honestly in
  [DR-0016]({{ '/decisions/byok-openai-voices/' | relative_url }}) rather than
  swapping one over-claim for another: I disproved "blocked"; I have **not** proved
  "works" (I cannot make a cross-origin POST from the test sandbox).
- **Retained** the relay in `proxy/` as an optional fallback pending confirmation.

## Confirmation

The Chairman confirmed Stratum's Listen plays the **OpenAI voice** (not a fallback).
Direct browser→OpenAI BYOK works; the **relay was removed**.

## Current status

**Implemented & confirmed.** Direct BYOK live on every page; relay deleted. Also
adopted a UX idea from Stratum's Echo panel: **speed (and pitch) controls** (REQ-0013).
