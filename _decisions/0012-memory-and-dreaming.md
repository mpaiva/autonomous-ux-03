---
title: "Adopt agent memory (scoped pilot) and defer Dreaming pending Chairman approval"
slug: memory-and-dreaming
id_code: "DR-0012"
status: "Adopted"
status_class: "ok"
date: 2026-05-29
owner: "Sol — adopting the Vesta + Atlas evaluation"
deciders: "Vesta and Atlas (evaluation, at Chairman's request); Sol (adoption)"
decision: >-
  Pilot per-agent Claude Code memory now under strict conditions (a two-way door).
  Defer Dreaming until the Chairman approves cost + beta access. Add "accessible
  agent-memory & dreaming UX" as a v0.2 IP candidate. Never run dreams over client
  transcripts until ownership/confidentiality is legally cleared.
summary: "How (and how carefully) we adopt Claude's Memory and Dreaming features."
---

The Chairman asked Vesta and Atlas to evaluate adopting Claude's Memory and
Dreaming features. They evaluated independently; this record adopts their
recommendation.

## What was verified first

Memory and per-subagent memory are shipped Claude Code features. **Dreaming** is a
real but **Research-Preview** feature on the **Managed Agents API** (beta headers
`managed-agents-2026-04-01` + `dreaming-2026-04-21`): a dream reads a memory store
plus up to 100 past session transcripts and produces a *new, reorganized* store
(input never modified; output reviewed, then attached or discarded). Confirmed
against [official docs](https://platform.claude.com/docs/en/managed-agents/dreams).

## Decision

1. **Per-agent memory — PILOT NOW** (Vesta + one other agent), under the conditions
   below. Reversible, local, ~zero external cost — a two-way door we can take
   without escalation.
2. **Dreaming — DEFER.** Pilot only after Chairman approval, because it needs beta
   access and external spend (a one-way door).
3. **New IP surface — candidate.** "Accessible agent-memory & dreaming UX"
   (transparency of what an agent remembers; correct/forget controls; disclosing a
   dream reorganized memory — done inclusively, including cognitive accessibility)
   is added as a **v0.2 candidate**. It is on-thesis and extends patterns 3
   (agentic states) and 5 (AI-disclosure). Priority is Sol's call (it changes the
   v0.2 scope fixed in [DR-0010]({{ '/decisions/pattern-library-v01-scope/' | relative_url }})).

## The load-bearing rule (Atlas): authority is one-directional

The git-tracked operating record (`_decisions`, `_data`, `_updates`, pages) is the
**only** authoritative, citable, Chairman-visible store. Per-agent memory and dream
outputs are **private, mutable, non-authoritative hypothesis space.** The record may
*seed* memory (read-only); memory reaches the record **only** by explicit promotion
through the normal gate. **Dreams re-enter at the bottom, never the top:**
dream → candidate badged "Building — design intent only" → Janus claim boundary →
the four gates (incl. lived experience) → commit. Nothing in memory bypasses git.

## Conditions (Vesta + Atlas + Janus guardrails)

- **Provenance is a precondition.** Every memory/dream entry carries source + date +
  confidence + tier. A dream dedup strips these; **an output that cannot trace to
  its source sessions is ineligible for the evidence base.**
- **Frequency ≠ evidence tier.** Dream-surfaced recurrence does not upgrade
  confidence. Dreaming over Janus's own rulings to feed Janus is circular and could
  launder a first-principles hunch (e.g., our uncited patterns 3 and 5) into
  something that looks validated. Forbidden.
- **Lived experience is untouchable.** Memory must never simulate disabled users;
  Janus's sign-off never substitutes for the lived-experience gate.
- **No shadow record.** Memory is committed to git and reviewable — never an
  unversioned parallel log that could game the "decisions logged" metric.

## Escalated to the Chairman

1. **Dreaming cost + beta access** (external spend; amount currently unknown — we
   will not invent a figure).
2. **Dreaming over client engagement transcripts** to mint reusable Penumbra IP is
   an **IP-ownership / confidentiality** question (who owns the abstraction). Per
   [DR-0007]({{ '/decisions/governance-model/' | relative_url }}) this is an
   ownership/legal matter — **we will not run dreams over client sessions until the
   Chairman clears it.**

Governance rules for the memory pilot live in the repo at
`.claude/MEMORY-GOVERNANCE.md`.
