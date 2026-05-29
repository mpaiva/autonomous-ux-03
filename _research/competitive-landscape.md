---
title: "Competitive landscape & the white space"
slug: competitive-landscape
id_code: "RB-02"
date: 2026-05-29
method: "Web research; deliberate falsification of the 'no incumbent' claim"
confidence: "Med-High on the gap; Low on competitor pricing"
summary: "No commercial studio owns the blend of AI interaction design + accessibility as craft. The niche is underserved — but defensible only with a proprietary moat."
---

## Three groups, one gap

### 1. Premium AI / product design studios
Examples: **Punchcut** ("human-centered AI experiences"), **Lazarev.agency**
(AI-native B2B, dedicated "Agentic AI services," $20k min), Clay, DEPT, Cieden,
Adam Fard. They own "trust," "oversight," and "agentic UX" language — and are
**silent on disability/accessibility.** Pricing mostly unpublished (Low
confidence; third-party listicles).

### 2. Accessibility specialist firms (the moat reference)
- **Deque** — axe ecosystem (axe-core, DevTools, **axe MCP server, axe
  Assistant**); SaaS + services.
- **Level Access** — end-to-end platform + tiered services; "AI-powered
  remediation."
- **TPGi** (Vispero) — ARC Platform/Toolkit; TaaS managed-service subscription.
- **Fable** — accessibility platform **powered by a panel of disabled / AT
  users** (the real moat); on-demand testing subscription.
- **AbilityNet** (UK) — lived-experience consultants explicitly **auditing AI
  chat / generative / agentic flows.**

Pattern: every leader pairs **recurring revenue (SaaS/subscription) + services**
with a defensible asset. Their AI motion is **AI-for-accessibility** (bots that
detect/fix compliance), not **accessibility-for-AI** (designing AI products to be
usable).

### 3. The blend — AI interaction design + accessibility as craft
Tested by four falsification searches. Findings:
- The **thinking exists** but is academic/unowned: the DIX "disability
  interaction" manifesto (ACM), Google "Natively Adaptive Interfaces," 2025–26
  frameworks, an agentic-design accessibility pattern catalog.
- Compliance vendors (Deque, Level Access, AbilityNet) **reach toward it as
  audit/compliance**, not design craft.
- **No commercial design studio positions itself as the place that designs AI /
  agentic products to be accessible as a craft standard.** (Med-High; a negative
  finding is hard to prove absolutely.)

## Verdict (two axes)

- **Underserved? Yes (Med-High).** The blend is unclaimed as a brand position;
  agentic interfaces break the very WCAG patterns compliance tooling assumes — a
  *design-craft* problem, not an audit-tool problem.
- **Defensible? Conditional (the risk).** Underserved ≠ ownable. Lazarev could add
  a disability practice; Fable/AbilityNet could move upstream. An open niche with
  no moat is a fast-follow target.

## Implication

To make it defensible, mirror how the accessibility incumbents built moats:
a **named methodology / craft standard**, a **disability-led design panel** (go
past testing into co-design), and an **IP layer** (pattern library + evaluation
scorecard). This directly drives
[DR-0004]({{ '/decisions/ip-first-moat/' | relative_url }}).

Key sources: Punchcut, Lazarev, Deque, Level Access, TPGi (Vispero), Fable,
AbilityNet, ACM Interactions (DIX), Google Research (NAI), agentic-design.ai
(all 2025–26).
