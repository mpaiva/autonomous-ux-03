# Changelog

All notable changes to the operating record. Newest first.

## 2026-05-30 — Local-dev path for OpenAI voices (REQ-0010)

- listen.js auto-targets http://localhost:8787 only when served from localhost
  (production stays disabled); OpenAI engine sends BYOK key if present else lets the
  relay use its .dev.vars secret. Added proxy/wrangler.toml; relay CORS accepts any
  localhost origin; README one-command quickstart. Verified: enabled on localhost,
  disabled on the live site.

## 2026-05-29 — Key model confirmed: BYOK (REQ-0009)

- Chairman asked about an .env key; confirmed BYOK over a funded key (no key in the
  public repo/site — it would be exposed). Relay now optionally accepts an encrypted
  OPENAI_API_KEY secret (local/future use, never in source); .gitignore hardened
  against key commits; added proxy/.dev.vars.example + wrangler secret docs.

## 2026-05-29 — OpenAI voices via BYOK scaffolded (REQ-0008, DR-0016)

- Verified OpenAI blocks authenticated browser POST (CORS) — pure client-side BYOK
  to OpenAI is impossible; a stateless relay is required.
- Shipped client-side BYOK UI (Voice settings: user enters own key, stored in their
  browser; engine choice; forget-key; browser-voice fallback). Scaffolded a free,
  stateless Cloudflare Worker relay (proxy/) that forwards the user's key and never
  stores it. Enabling = one-time owner deploy + set RELAY_URL. Decisions 15 -> 16.

## 2026-05-29 — "Listen" feature on every page (REQ-0007, DR-0015)

- Shipped a "Listen to this page" read-aloud control on every page via the browser
  Web Speech API (assets/js/listen.js) — no key/server/cost, secure on static
  hosting, opt-in, keyboard/AT friendly, progressive enhancement. Lighthouse a11y
  100 with control present.
- Did NOT embed an OpenAI key client-side (exposed on a static site). Cloud voices
  deferred to a Chairman decision (proxy + funded key); added to backlog. DR-0015.
- Fixed a CSS bug found in visual testing (class display overrode [hidden] on the
  Stop button). Decisions 14 -> 15.

## 2026-05-29 — Panel operational kit produced (REQ-0006)

- Janus, Vesta, and Sol produced the turnkey operational kit for the panel pilot,
  assembled on a new page (/panel/): recruitment brief, coverage matrix, validation
  protocol (4 gates), fair-pay schedule (balanced to $25k), consent template, and a
  platform evaluation with real quotes (Fable ~$3,750 published). Linked from
  DR-0014 + backlog. Logged REQ-0006. (Scratch agent files cleaned up.)

## 2026-05-29 — Panel pilot APPROVED (REQ-0005, DR-0014)

- Chairman approved PROP-0001 Option A: ~$25k disability-led validation panel pilot.
  Recorded as DR-0014; PROP-0001 flipped to Approved; backlog item moved from
  "Blocked" to active. Panel metric "Not established" -> "Pilot approved". Decisions
  13 -> 14. Next: agents prepare the operational kit; humans hire/contract/pay.

## 2026-05-29 — Disability-led panel proposal (REQ-0004, PROP-0001)

- Sol produced a decision-ready proposal for a paid disability-led validation panel
  (PROP-0001): recommends a lean pilot (~$25k/3mo), benchmarked cost ranges (flagged),
  fair pay centered, first job = validate our own site. Awaiting Chairman decision.
- Added a `proposals` collection + listing + nav entry for awaiting-decision
  artifacts; backlog item now points to PROP-0001. Logged REQ-0004.

## 2026-05-29 — Backlog & pipeline page (REQ-0003) + 2nd reconciliation pass

- Ran the 2nd memory-reconciliation pass over the decision log (25 candidate
  entries); top output was a consolidated list of all 5 open Chairman escalations.
- Created the data-driven Backlog & pipeline page (`/backlog/`, `_data/backlog.yml`)
  with dependencies + benefits per item, grouped Active / Blocked-on-Chairman /
  Queued / Open. Promoted reconciliation Section C (escalations) + E (follow-ups)
  into it. Added Backlog to nav + a dashboard pointer. Logged REQ-0003.

## 2026-05-29 — Reconciliation candidates reviewed & promoted

- Reviewed the 16 first-pass candidates. Promoted 3 to the authoritative record,
  each labeled with confidence + provenance: audit-price contradiction → DR-0005;
  recurring-revenue-from-three-angles (Med) → DR-0003; craft-gap = regulatory-seam
  (Med) → DR-0001. Rest kept as candidate / already recorded. Disposition logged in
  DR-0013; candidate file marked reviewed (stays non-authoritative).

## 2026-05-29 — Memory-reconciliation probe built & run (DR-0013)

- Chairman greenlit building our own consolidation probe (working name "memory
  reconciliation", never "Dreaming"). Atlas wrote `.claude/memory-reconciliation-spec.md`;
  Janus pre-committed the claim boundary + naming + veto condition; Vesta ran the
  first pass over our research briefs (`.claude/memory/reconciliation-candidates/2026-05-29-research.md`,
  16 candidate entries) — caught a real price-range contradiction, surfaced one
  cross-brief synthesis, flagged the unpublished-pricing gap. Decisions 12 -> 13.

## 2026-05-29 — Memory & Dreaming evaluated (DR-0012)

- Vesta + Atlas independently evaluated adopting Claude's Memory and Dreaming
  features. Adopted: pilot per-agent memory now (conditions enforced); defer
  Dreaming pending Chairman approval of cost + beta access; add "accessible
  agent-memory & dreaming UX" as a v0.2 IP candidate.
- Added `.claude/MEMORY-GOVERNANCE.md` (one-directional authority; provenance;
  no simulated lived experience; no shadow record). Decisions metric 11 -> 12.
- Escalated to Chairman: Dreaming cost/beta access; and running dreams over client
  transcripts (IP-ownership/confidentiality — blocked until cleared).

## 2026-05-29 — Mission articulated (DR-0011)

- Sol articulated the company mission at the Chairman's request; logged as DR-0011
  and surfaced on the dashboard. Mission distinguished from the (revisable) thesis.
- Decisions metric 10 -> 11.

## 2026-05-29 — Agents made real (Chairman directive REQ-0002)

- Constituted the founding team as five real Claude Code agents in
  `.claude/agents/` — Sol, Iris, Janus, Atlas, Vesta (solar-system codenames,
  DR-0009). Disability-led panel deliberately kept human, not an agent.
- Agents ran their first real deliberation; Sol synthesized it into DR-0010
  (Pattern Library v0.1 scope). Logged as UPD-002.
- Rewrote the Team page with an honest account of what the agents are/are not.
- Logged REQ-0002 verbatim. Escalated to Chairman: funding a disability-led
  validation panel.
- Fixed earlier defect: stylesheet was served as HTML (catch-all layout default);
  removed front matter so CSS serves verbatim.

## 2026-05-29 — Published (Chairman-approved)

- Chairman approved publishing. Created public repo `mpaiva/autonomous-ux-03`,
  enabled GitHub Pages via Actions. Live at
  https://mpaiva.github.io/autonomous-ux-03/.
- Set `url`/`baseurl` so canonical links and the sitemap/robots use absolute
  production URLs (fixes the only production SEO finding).

## 2026-05-29 — Phase 0: Formation

- Founding team self-organized (5 roles + disability-led panel to build).
- Adopted founding thesis: premium AI product design studio, inclusive by default
  (DR-0001).
- Logged 8 founding decisions (DR-0001 … DR-0008).
- Recorded 3 cited research briefs (RB-01 market, RB-02 competitive, RB-03
  regulatory/pricing).
- Defined credibility model, service ladder, IP roadmap, and risk register.
- Stood up the Jekyll operating-record site (dashboard, thesis, team, services,
  IP roadmap, credibility, risks, decisions, research, updates, Chairman log).
- Logged founding mandate verbatim as REQ-0001.
- Added GitHub Actions deploy workflow (dormant pending Chairman approval to
  publish).
