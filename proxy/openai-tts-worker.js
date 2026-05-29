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

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: cors });
    }

    const auth = request.headers.get("Authorization") || "";
    if (!auth.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Missing Authorization (your OpenAI key)." }), {
        status: 401,
        headers: { ...cors, "Content-Type": "application/json" },
      });
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
