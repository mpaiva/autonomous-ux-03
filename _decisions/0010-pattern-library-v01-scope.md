---
title: "Accessible AI Pattern Library v0.1 — scope, structure, and claim boundary"
slug: pattern-library-v01-scope
id_code: "DR-0010"
status: "Adopted"
status_class: "ok"
date: 2026-05-29
owner: "Sol (Principal)"
deciders: "Sol, synthesizing Iris, Atlas, Janus, Vesta"
decision: >-
  Ship v0.1 with five patterns, badged 'Building — design intent only.' Structure
  per Atlas's template; claim boundary set and vetoed by Janus; evidence and honest
  gaps tracked by Vesta. Funding a disability-led validation panel is escalated.
summary: "The first reusable-IP decision — made by the agents, coordinated by Sol."
---

This decision was produced by the agents deliberating independently and Sol
synthesizing — see [UPD-002]({{ '/updates/agent-deliberation/' | relative_url }}).

## Decision

Accessible AI Pattern Library **v0.1 ships all five patterns** Iris proposed,
badged **"Building — design intent only"** per Janus. No pattern is dropped:
Vesta's constraints are honesty-flags, not exclusions, and Janus's veto triggers on
conformance *claims*, not on shipping clearly-labelled hypotheses.

**v0.1 scope (craft order, Iris):**
1. Streaming output announced without chaos (focus/live-region on streamed tokens)
2. Per-message navigation & structure for generated content
3. "An agent is acting on your behalf" — oversight / status / interruption
4. Voice/text parity
5. AI-disclosure UX

Deferred to v0.2: conversational error/recovery; reduced-motion generative loaders.

## Structure (Atlas)

Each pattern is one entry in a new `_patterns` collection, organized by surface,
at citable permalinks. A 14-field template governs each entry (id, name, surface,
problem/applies-when, pattern, anti-patterns, token bindings, WCAG *mapping* — never
a claim, heuristic ids, scorecard criteria, test protocol, verification status,
version + pinned spec/AT-matrix/date, changelog). Patterns **pin** the WCAG version,
AT matrix, and test date so they go stale and trigger re-verification — the same
"valid only for the version tested" logic that drives the retainer annuity.
Defensibility lives in the evidence base + scorecard integration + re-test cadence,
not the prose.

## Claim boundary (Janus — binding, not overridable)

- **MAY say:** "proposed patterns / design intent / designed *against* WCAG 2.2 AA
  (target, not result) / not yet AT-tested or validated by disabled users."
- **MAY NOT say:** "conformant / tested with screen-reader users / validated by
  disabled users / verified / certified."
- **Four gates** before any conformance claim: tested, documented, reviewed
  (Janus sign-off), validated by lived experience — and Janus's sign-off does
  **not** substitute for the lived-experience gate.
- **Veto stands** if v0.1 asserts or implies conformance, AT results, or
  disabled-user validation not cleared for that exact version.

## Evidence & honest gaps (Vesta)

Every pattern carries source + date + confidence and a source tier
(normative / secondary / first-principles), labelled **"Proposed — not validated."**
**Stated up front:** patterns 3 (agentic states) and 5 (AI-disclosure) have **no
direct citation** in our evidence base — tagged first-principles, lowest confidence.
The "IP artifacts shipped" metric stays **0** and `ip.yml` stays "Next milestone"
until v0.1 is durably published; a companion indicator will distinguish *drafted*
from *AT-validated*.

## Escalated to the Chairman

The fourth gate — validation by lived experience — requires a disability-led panel.
Funding and committing that capability is a resourcing/authenticity matter the
agents cannot decide. **Recommendation:** authorize scoping and funding of a paid
disability-led validation panel as the v0.1 → conformance path.
