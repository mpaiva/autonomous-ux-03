# OpenAI TTS relay (BYOK)

A **stateless** relay that lets the "Listen" feature use OpenAI's premium voices
with a **user-supplied key** (BYOK). It exists only to bypass a hard CORS limit:
we verified that OpenAI blocks authenticated browser `POST` requests, so the page
cannot call `/v1/audio/speech` directly. This relay forwards the user's own key to
OpenAI and streams the audio back. **It never stores, logs, or inspects the key.**

The user pays OpenAI with their own key; the relay holds no secret and is free to
run on Cloudflare's Workers free tier.

## Try it locally (hear the voices on your machine, nothing exposed)

`listen.js` automatically points at `http://localhost:8787` when the site is served
from localhost, so testing is one command after a one-time key setup:

```bash
cd proxy
cp .dev.vars.example .dev.vars          # gitignored; paste your key into it
wrangler dev                            # relay runs at http://localhost:8787
```

Then serve the site locally (`bundle exec jekyll serve --port 4112`), open a page,
choose **OpenAI voice** in "Voice settings", and press Listen. With `.dev.vars` set,
you don't even need to enter a key in the browser — the local relay uses it. Nothing
leaves your machine, and production is unaffected (it has no relay URL).

## Deploy (Cloudflare Workers — free)

```bash
npm install -g wrangler          # one-time
wrangler login
# from this proxy/ directory:
wrangler deploy openai-tts-worker.js --name penumbra-tts-relay
```

You'll get a URL like `https://penumbra-tts-relay.<you>.workers.dev`.

## Wire it up

1. In `openai-tts-worker.js`, confirm `ALLOWED_ORIGINS` includes your site origin
   (defaults: `https://mpaiva.github.io` and `http://localhost:4112`).
2. In `assets/js/listen.js`, set `RELAY_URL` to your Worker URL.
3. Rebuild/redeploy the site. The "Voice settings" panel will now offer the OpenAI
   engine; end-users paste their own OpenAI key (stored only in their browser).

Until `RELAY_URL` is set, the OpenAI option stays disabled and "Listen" uses the
free, built-in browser voice — no relay required.

## Two key models

**BYOK (default).** Each listener sends their own key; the relay forwards it. No
key is stored anywhere on the server. Nothing to configure here.

**Funded (your key serves everyone).** Store *your* key as an encrypted Worker
secret — never in the repo, never in client JS:

```bash
wrangler secret put OPENAI_API_KEY        # paste your key when prompted
# local testing instead: copy .dev.vars.example -> .dev.vars, paste key, `wrangler dev`
```

The Worker uses the caller's key if present, otherwise falls back to this secret.

> ⚠️ Funded mode pays for **all** callers from your key. A public endpoint is an
> abuse target. Before enabling it, add **Cloudflare rate-limiting** and an OpenAI
> **monthly spend cap**, and keep the origin restriction. For a public site, BYOK
> is the safer default.

A real key must **never** go in `.env`/source/the repo (the repo is public and the
site is static — it would be exposed). It belongs only in `wrangler secret` /
`.dev.vars` (gitignored).

## Security notes

- The relay only ever calls the fixed OpenAI **speech** URL — it cannot be reused
  as a general OpenAI proxy.
- Requests are restricted to your origin(s) via `ALLOWED_ORIGINS`.
- The key lives only in the user's browser (sessionStorage by default; localStorage
  if they tick "remember on this device") and is sent per-request to the relay,
  which passes it to OpenAI and forgets it. Our site has no analytics or backend,
  and the repo is public, so this is auditable.
- Recommend users create a usage-capped key.

## Alternatives

Any equivalent stateless function host works (Netlify/Vercel/Deno Deploy/AWS
Lambda). Port the same logic: handle CORS + `OPTIONS`, require a `Bearer`
Authorization, forward to `https://api.openai.com/v1/audio/speech`, stream back.
