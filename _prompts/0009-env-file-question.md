---
title: "Can we set an .env file for the OpenAI key?"
slug: env-file-question
id_code: "REQ-0009"
status: "Answered — BYOK confirmed"
status_class: "ok"
received: 2026-05-29
received_display: "2026-05-29 (time of day not specified)"
channel: "Direct prompt"
---

## Original prompt (verbatim)

<div class="verbatim">
I have an openAI key, can we set an .env file?
</div>

## Interpretation & answer

The Chairman has an OpenAI key and asked about an `.env` file. **A static-site/repo
`.env` is unsafe** — this repo is public and the site is static, so any key Jekyll
reads at build time ships in the published JavaScript (world-readable), and a
committed `.env` is in public git history. A key only stays secret when read by a
server that never ships it to the browser.

Presented three models (local-testing-only, keep BYOK, fund-for-everyone) with the
cost/abuse trade-offs. **The Chairman chose to keep BYOK** — each visitor uses their
own key; the company key is not used on the public site (no spend, no abuse surface).

## Actions taken

- Confirmed BYOK as the public model (see
  [DR-0016]({{ '/decisions/byok-openai-voices/' | relative_url }})).
- Made the relay Worker *optionally* accept an encrypted `OPENAI_API_KEY` secret
  (for local testing / future funded use) — used only if no caller key is sent;
  never baked into source.
- Hardened `.gitignore` against committing real keys; added a `.dev.vars.example`
  template (no real key) and documented `wrangler secret` / `.dev.vars` in
  `proxy/README.md`.

## Current status

**Answered.** Public site stays BYOK; no key lives in the repo or the static site.
A key, if ever used, goes only into `wrangler secret` or a gitignored local
`.dev.vars`.
