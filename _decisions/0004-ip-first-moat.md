---
title: "Build reusable IP first — the moat before the marketing"
slug: ip-first-moat
id_code: "DR-0004"
status: "Adopted"
status_class: "ok"
date: 2026-05-29
owner: "Design Systems & IP Architect"
deciders: "Founding team (unanimous)"
decision: >-
  Treat reusable IP as the first priority, not a someday product. Build the
  Accessible AI Pattern Library v0.1 and an AI UX accessibility evaluation
  scorecard before scaling go-to-market.
summary: "Why the moat comes first, and what we build first."
---

## Context

Competitive research delivered the sharpest finding of formation: the niche is
**underserved but not automatically defensible**. As taste-plus-services, the
position is absorbable by a larger AI studio or by an accessibility incumbent
moving upstream. The incumbents that endure all built proprietary assets (axe,
ARC, automated remediation, a disabled-tester panel).

## Decision

Sequence IP by leverage (full roadmap on [IP roadmap]({{ '/ip-roadmap/' | relative_url }})):

1. **Accessible AI Pattern Library v0.1** — patterns for streaming/generative,
   agentic, conversational, and voice interfaces.
2. **AI UX Accessibility Heuristics + Evaluation Scorecard.**
3. Publishable **Inclusive AI Interaction Guidelines.**
4. **Design-system accessibility hardening method.**
5. Later: agentic review workflows and tooling.

## Why this order

The pattern library and scorecard (a) sit in the white space no one owns, (b)
directly power the signature AI Interface Accessibility Review, and (c) are
publishable for credibility and inbound demand. They are the highest-leverage
first move.

## Consequences

- Phase 1 is measured primarily on **IP artifacts shipped**, not pipeline.
- Mitigates the top risk ([R-01]({{ '/risks/' | relative_url }})). Without this,
  [DR-0001]({{ '/decisions/positioning-wedge/' | relative_url }}) is exposed.
