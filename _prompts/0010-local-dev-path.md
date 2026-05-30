---
title: "Wire up the local-dev path for OpenAI voices"
slug: local-dev-path
id_code: "REQ-0010"
status: "Implemented"
status_class: "ok"
received: 2026-05-30
received_display: "2026-05-30 (time of day not specified)"
channel: "Direct prompt"
---

## Original prompt (verbatim)

<div class="verbatim">
yes, wire up the local-dev path
</div>

## Interpretation

Make it one command for the Chairman to hear the OpenAI voices locally with their
own key, without exposing anything publicly.

## Actions taken

- `listen.js`: `RELAY_URL` auto-points at `http://localhost:8787` only when the page
  is served from localhost; production stays empty (OpenAI disabled). The OpenAI
  engine no longer requires a browser-entered key — it sends BYOK if present, else
  lets the relay use its `.dev.vars` secret.
- Added `proxy/wrangler.toml`; relay CORS now accepts any localhost origin for dev.
- `proxy/README.md`: a one-command local quickstart (`cp .dev.vars.example .dev.vars`
  → `wrangler dev`).

## Current status

**Implemented & verified.** On localhost the OpenAI option is enabled (key input +
voice picker); on the live site it stays disabled (no relay). Public site remains
BYOK ([DR-0016]({{ '/decisions/byok-openai-voices/' | relative_url }})).
