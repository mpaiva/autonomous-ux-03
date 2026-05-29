---
title: "OpenAI voices via BYOK + a stateless relay (CORS-verified)"
slug: byok-openai-voices
id_code: "DR-0016"
status: "Scaffolded — deploy relay to enable"
status_class: "warn"
date: 2026-05-29
owner: "Iris/Sol (build); Chairman (deploy decision)"
deciders: "Sol, under Chairman directive (REQ-0008)"
decision: >-
  Implement OpenAI premium voices as Bring-Your-Own-Key: the user enters their own
  key, stored only in their browser. Because OpenAI blocks authenticated browser
  POST (verified), requests pass through a tiny stateless relay that never stores
  the key. Scaffolded and ready; enabling it is a one-time owner deploy (free tier).
summary: "BYOK removes the funding problem; a stateless relay is the one unavoidable piece (CORS)."
---

## Context

Refines [DR-0015]({{ '/decisions/listen-feature/' | relative_url }}). The Chairman
asked for OpenAI voices via **BYOK** — the user enters their own key client-side —
to avoid a company-funded key and a stateful server.

## The verified constraint

Before building, we probed OpenAI's API from the live site's browser origin:

- `GET /v1/models` with a dummy key → **401** (request reached OpenAI; CORS allowed).
- `POST /v1/audio/speech` and `POST /v1/models` (JSON) → **"Failed to fetch"**.
- Control endpoints (httpbin, GitHub) → 200 (the browser itself can do cross-origin).

Conclusion: **OpenAI permits browser GETs but blocks authenticated browser POSTs
(CORS preflight).** TTS is a POST, so a *pure* client-side BYOK call to OpenAI is
impossible — a hard wall on OpenAI's side, not a code bug. (This probe is exactly
why we verify before building.)

## Decision

BYOK is still right — it removes the funding/company-key problem. The only piece
that must be server-side is a **stateless relay** to get past CORS:

- **Client (shipped):** a "Voice settings" panel lets the user choose the OpenAI
  engine and paste **their own key**, stored only in their browser (sessionStorage
  by default; localStorage if they tick "remember"). A "Forget key" button clears
  it. The browser voice remains the default and the automatic fallback.
- **Relay (scaffolded):** `proxy/openai-tts-worker.js` — a Cloudflare Worker (free
  tier) that forwards the user's key to OpenAI's speech endpoint **only**, never
  storing, logging, or inspecting it, restricted to our origin.

## Security model

The key lives only in the user's browser and is sent only to the relay → OpenAI →
discarded. Our site has no backend or analytics, and the repo is public, so this is
auditable. The relay can only call the fixed OpenAI speech URL (not a general
proxy). Users are advised to use a usage-capped key. The user pays OpenAI; the
company funds nothing.

## To enable (owner, one-time, free)

1. Deploy the Worker (`proxy/README.md` — `wrangler deploy`, free tier).
2. Set `RELAY_URL` in `assets/js/listen.js` to the Worker URL.
3. Redeploy the site. Until then the OpenAI option is disabled and Listen uses the
   free browser voice — no relay required.

## Honest limits

Audio playback was verified for the browser engine and the full BYOK UI/state
machine; the OpenAI path could not be end-to-end tested without a deployed relay +
a real key (no company key by design). Per [DR-0002]({{ '/decisions/authenticity-guardrails/' | relative_url }})
the feature is "built to standard," not "verified accessible," until the
[panel]({{ '/decisions/fund-panel-pilot/' | relative_url }}) validates it.
