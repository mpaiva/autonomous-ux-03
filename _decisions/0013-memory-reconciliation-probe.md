---
title: "Build our own memory-reconciliation probe (not 'Dreaming') — greenlit and run"
slug: memory-reconciliation-probe
id_code: "DR-0013"
status: "Adopted — first pass run"
status_class: "ok"
date: 2026-05-29
owner: "Sol (Principal)"
deciders: "Chairman greenlight; Atlas (architecture), Janus (gate + naming), Vesta (operation)"
decision: >-
  Build a home-grown memory-consolidation probe — working name "memory
  reconciliation," never "Dreaming." A research probe, not infrastructure. Spec
  written, claim boundary pre-committed, and a first pass run over our own research.
summary: "We built the function ourselves, under our own governance, and ran it once."
---

The Chairman asked Sol whether we could simulate or build our own Dreaming, then
greenlit Sol's plan. We can build the *function* of Dreaming — periodic memory
consolidation with provenance and a review gate — with tools we already have, and
learn the inclusive-UX problem firsthand. We are **not** competing with Anthropic's
managed Dreaming; we plan to adopt that later
([DR-0012]({{ '/decisions/memory-and-dreaming/' | relative_url }})).

## What was built and run (all in this repo)

- **Architecture (Atlas):** a one-page spec at `.claude/memory-reconciliation-spec.md`.
  Inputs are read-only (our own memory + non-client research/decision/prompt logs);
  a Claude pass dedups, reconciles, and surfaces cross-session insight into a **new**
  candidate (input never modified); output lands as a non-authoritative candidate in
  `.claude/memory/reconciliation-candidates/`; manual/Actions trigger, not automatic.
- **First pass (Vesta):** ran over the three research briefs →
  `.claude/memory/reconciliation-candidates/2026-05-29-research.md` (16
  provenance-tagged candidate entries). It caught a **genuine contradiction** (our
  own briefs give non-overlapping audit-price ranges), surfaced one cross-brief
  synthesis (recurring-revenue is supported from competitive + regulatory + pricing
  angles at once), and flagged the biggest gap (premium/retainer pricing is
  unpublished — the basis of [DR-0005]({{ '/decisions/pricing-posture/' | relative_url }})).
  Vesta judged the pass **only modestly useful** (curated inputs) and said so rather
  than inflating it.

## Janus's pre-committed boundary (binding)

- **Naming:** "memory reconciliation" is acceptable. Calling it **"Dreaming" is
  forbidden** — that is Anthropic's named, deferred feature; borrowing the name
  would claim a capability we chose not to adopt. It also may not be described as
  equalling or replicating managed Dreaming.
- **Claim boundary:** every output entry is "candidate — design intent, unverified."
  Forbidden: "validated / verified / proven / confirmed / our research shows."
  Permissible: "candidate / hypothesis / design intent / unverified / Building."
- **Gates before any promotion or external statement:** tested → documented →
  reviewed (Janus) → validated by lived experience. **Recurrence in the
  consolidation does not raise an entry's confidence tier.**
- **Veto condition:** Janus blocks the probe if it is ever built so an output can
  reach the git-authoritative record or an external claim **without** passing the
  candidate → four-gate path. Any auto-promotion that bypasses git is the tripwire.

## Why this is on-thesis

Building it forces us to confront the very questions the v0.2 "accessible
agent-memory & dreaming UX" candidate is about — how to disclose accessibly that an
agent reorganized its memory, how to show provenance, what correct/forget controls
cost cognitively. Designed from lived friction, not speculation.

## Escalations (unchanged)

- **No client transcripts** until the Chairman clears IP/confidentiality (none exist
  yet; the probe runs only on our own material).
- **No external spend / managed-Dreaming beta** without Chairman approval.

## First-pass review & promotion outcome (2026-05-29)

The 16 candidates were reviewed at the Chairman's request. None were accessibility
*conformance* claims, so Janus's veto was not triggered (they are market/strategy
findings). **Three were promoted** into the authoritative record, each clearly
labeled with confidence and provenance:

- **Audit-price contradiction** → [DR-0005]({{ '/decisions/pricing-posture/' | relative_url }})
  (our own briefs quote non-overlapping ranges — reinforces "no rate card yet").
- **Recurring-revenue supported from three angles** (Med hypothesis) →
  [DR-0003]({{ '/decisions/service-ladder/' | relative_url }}).
- **Craft gap = regulatory seam** (Med hypothesis) →
  [DR-0001]({{ '/decisions/positioning-wedge/' | relative_url }}).

**Not promoted (kept as candidate / already recorded):** the deduped regulatory
facts (EAA, ADA Title II dates, HHS §504) and the evidence gaps (no AI-UX TAM,
litigation figure via secondary blog, unpublished premium pricing, the "no studio
owns the blend" unprovable negative, EAA penalty amounts) — all already live in the
research briefs and decisions; promoting them would be duplication. Two further
Section-C syntheses (defensibility=moat; field-wide accessibility blind spot) simply
restate reasoning already in DR-0004 and the thesis.

**Honest takeaway:** with already-curated briefs as inputs, the probe yielded one
genuinely new decision-relevant finding (the price contradiction) plus two useful
syntheses. Modest, as Vesta predicted — but real, and the pipeline (candidate →
review → labeled promotion) worked end to end.

## Next

Keep the probe manual and time-boxed. Higher-yield next target would be a
*less-curated* corpus (e.g. raw session transcripts or the decision log over time),
where consolidation has more to find. Owners: Atlas (architecture), Vesta
(operation), Janus (gate).
