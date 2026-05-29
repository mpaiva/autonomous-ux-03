# Changelog

All notable changes to the operating record. Newest first.

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
