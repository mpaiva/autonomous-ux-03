---
title: "OpenAI voices via BYOK + a stateless relay (CORS-verified)"
slug: byok-openai-voices
id_code: "DR-0016"
status: "Corrected — direct BYOK (relay retained, pending confirmation)"
status_class: "warn"
date: 2026-05-29
updated: 2026-05-30
owner: "Iris/Sol (build); Chairman (confirmation)"
deciders: "Sol, under Chairman directive (REQ-0008); corrected per REQ-0012"
decision: >-
  Implement OpenAI premium voices as Bring-Your-Own-Key: the user enters their own
  key, stored only in their browser, and the browser calls OpenAI directly. (An
  earlier version routed through a relay on a mistaken CORS finding — see the
  correction below. The relay is retained as an optional fallback pending
  confirmation that the direct call speaks.)
summary: "BYOK, called directly from the browser. An earlier 'relay required' claim was a test-environment artifact — corrected."
---

## Correction (2026-05-30, REQ-0012)

The Chairman pointed to another of his sites (Stratum) that does BYOK OpenAI TTS
**directly from the browser, with no relay.** That prompted a re-test of the CORS
claim below — with a proper control this time. The result overturned it:

- A **control preflighted POST to a known CORS-friendly endpoint (httpbin) also
  failed** with the same "Failed to fetch" in the test browser. So the original
  failure was the **sandboxed test environment blocking all preflighted cross-origin
  POSTs**, not OpenAI. My earlier "OpenAI blocks browser POST (verified)" was an
  artifact — an over-claim, and exactly the failure mode this company exists to avoid.

**What changed:** the client now calls OpenAI **directly** (as Stratum does), so BYOK
works on the public site with no relay and no owner deploy — the user just enters
their key. The browser-voice fallback remains, so if any runtime *does* block the
direct call, it degrades gracefully.

**What is NOT yet claimed:** that the direct call *succeeds* in a real browser. I
disproved "blocked"; I have not proved "works" (I cannot make a cross-origin POST
from the test sandbox at all). Pending the Chairman's confirmation that Stratum's
OpenAI voice actually speaks (vs. silently falling back), the **relay in `proxy/` is
retained** as an optional fallback. If confirmed, the relay and its docs will be
removed.

---

## Original record (superseded where it claims a relay is required)

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

## Chairman decision (2026-05-29, REQ-0009)

Asked whether to use a company key via an `.env` file, the Chairman **confirmed
BYOK** and declined the funded-for-everyone model. Rationale: on a public static
site, a company key would either be exposed (in client JS / public repo) or, if held
in the relay, would pay for all visitors and be an abuse target. BYOK keeps spend at
zero and removes the abuse surface. The relay still *optionally* supports an
encrypted `OPENAI_API_KEY` secret (for local testing or a future gated/funded use),
never stored in the repo; `.gitignore` blocks accidental key commits.

## Honest limits

Audio playback was verified for the browser engine and the full BYOK UI/state
machine; the OpenAI path could not be end-to-end tested without a deployed relay +
a real key (no company key by design). Per [DR-0002]({{ '/decisions/authenticity-guardrails/' | relative_url }})
the feature is "built to standard," not "verified accessible," until the
[panel]({{ '/decisions/fund-panel-pilot/' | relative_url }}) validates it.
