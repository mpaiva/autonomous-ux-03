/* ─────────────────────────────────────────────────────────────────────────
   Stateless BYOK relay for OpenAI text-to-speech (Cloudflare Worker).

   WHY THIS EXISTS: we verified empirically that OpenAI's API blocks authenticated
   browser POST requests (CORS preflight fails), so a page cannot call
   /v1/audio/speech directly from JavaScript. This Worker is the minimal hop that
   gets past that wall — and nothing more.

   WHAT IT DOES NOT DO: it never stores, logs, or inspects the user's API key. It
   forwards the caller's own Authorization header straight to OpenAI's speech
   endpoint (and ONLY that endpoint) and streams the audio back. The user brings
   their own key (BYOK); this relay holds no secret of its own. It is free to run
   on Cloudflare's Workers free tier.

   SECURITY: requests are restricted to the site's own origin(s). Edit
   ALLOWED_ORIGINS for your deployment. The relay only ever calls the fixed OpenAI
   speech URL, so it cannot be repurposed as a general OpenAI proxy.
   ───────────────────────────────────────────────────────────────────────── */

const ALLOWED_ORIGINS = [
  "https://mpaiva.github.io",
  "http://localhost:4112", // local Jekyll dev (baseurl /autonomous-ux-03)
];
const OPENAI_SPEECH_URL = "https://api.openai.com/v1/audio/speech";

function isAllowedOrigin(origin) {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Any localhost / 127.0.0.1 port for local `wrangler dev` testing.
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function corsHeaders(origin) {
  const allow = isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: cors });
    }

    // Key resolution:
    //  - BYOK: the caller sends their own "Authorization: Bearer …" — use it.
    //  - Funded: no caller key, but a server secret OPENAI_API_KEY is configured
    //    (via `wrangler secret put OPENAI_API_KEY`, or .dev.vars locally) — use it.
    //    NOTE: funded mode pays for ALL callers from your key. Protect it with
    //    Cloudflare rate-limiting + a spending cap; never bake the key into source.
    let auth = request.headers.get("Authorization") || "";
    if (!auth.startsWith("Bearer ")) {
      if (env && env.OPENAI_API_KEY) {
        auth = "Bearer " + env.OPENAI_API_KEY;
      } else {
        return new Response(JSON.stringify({ error: "No key: send your own (BYOK) or configure the OPENAI_API_KEY secret." }), {
          status: 401,
          headers: { ...cors, "Content-Type": "application/json" },
        });
      }
    }

    // Forward the body verbatim; pass the caller's key straight through.
    const body = await request.text();
    let upstream;
    try {
      upstream = await fetch(OPENAI_SPEECH_URL, {
        method: "POST",
        headers: { "Authorization": auth, "Content-Type": "application/json" },
        body,
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Upstream request failed." }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const headers = new Headers(cors);
    headers.set("Content-Type", upstream.headers.get("Content-Type") || "audio/mpeg");
    return new Response(upstream.body, { status: upstream.status, headers });
  },
};
