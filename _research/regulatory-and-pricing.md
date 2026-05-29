---
title: "Regulatory drivers, VPAT/ACR, and pricing"
slug: regulatory-and-pricing
id_code: "RB-03"
date: 2026-05-29
method: "Web research across primary (gov) and secondary (vendor/legal) sources"
confidence: "High on regulation; Low on pricing (vendor-listed, lead-gen-biased)"
summary: "Regulation + procurement gates create recurring demand on the client's ship cadence. The annuity is per-release ACRs + retainers, not one-off audits."
---

## Regulatory drivers (status as of 2026)

- **EAA** — in force since 28 June 2025. **France filed the first EAA lawsuits in
  Nov 2025** (Auchan, Carrefour, E.Leclerc, Picard); Sweden and the Netherlands
  launched enforcement; NL audits planned for spring 2026. **Penalties are
  per-member-state, not EU-wide** (e.g. Ireland ~€60k + criminal sanctions; Sweden
  up to ~€900k) — do not quote a single "EU fine." (Level Access, Fieldfisher;
  Med confidence on amounts — verify national transpositions before client use.)
- **ADA Title II** — WCAG 2.1 AA; **deadlines extended 20 April 2026** to
  **26 Apr 2027** (pop. 50k+) and **26 Apr 2028** (smaller). Requirement
  unchanged. DOJ explicitly cited **overestimating generative-AI remediation
  readiness** — a useful sales talking point. (Federal Register; K&L Gates; Deque
  — High.)
- **HHS §504** — WCAG 2.1 AA, **11 May 2026, no extension.** Most urgent US driver.
- **Section 508** — binds federal ICT to **WCAG 2.0 AA** (the legally binding
  benchmark; movement to 2.1/2.2 is practice, not yet mandate — do not overstate).
- **EU AI Act** — Article 50 transparency + high-risk obligations slated for
  **2 Aug 2026** but **in flux (Digital Omnibus amendments in trilogue)**.
  Penalties up to €15M / 3% turnover (high-risk). The accessibility ×
  AI-transparency seam is the studio's sharpest differentiator. (Med on dates.)

## VPAT / ACR — the recurring-revenue engine

- A VPAT (ITI template) becomes an **ACR** once filled with test results — the
  deliverable buyers actually want. Editions: 508, EU (EN 301 549), WCAG, INT.
- Per Section508.gov, **an ACR is effectively a prerequisite for US government
  purchase** (only the government can claim an exception). Now standard in private
  B2B procurement and at renewal. (High — primary gov source.)
- **An ACR is only valid for the version it tested.** Every meaningful release
  outdates it: audit → remediation → ACR → re-audit each release → renewal. **Sell
  the ACR as a per-release subscription, not a one-time doc.**

## Pricing benchmarks (Low–Med — vendor-listed, treat as order-of-magnitude)

| Service | Realistic range |
|---|---|
| Audit — small/mid site | $1,500–$5,500 |
| Audit — per page | $100–$250 |
| Audit — enterprise / complex auth app | $15,000–$50,000+ |
| VPAT/ACR — template only | $350 (WCAG) / $550 (508) / $650 (EU) |
| VPAT/ACR — full service | $2,000–$10,000 |
| Remediation sprint (project) | $15,000–$200,000+ |
| Design-system a11y hardening | $10,000–$50,000 (single source) |
| Monitoring / retainer | $500–$2,000/mo |
| Expert hours | ~$150–$200/hr |

Weakest lines: design-system hardening and design-review pricing (essentially
unpublished). Validate against GSA/state RFP awards + direct quotes before a real
rate card.

## Procurement angle — the sharpest pitch

Accessibility conformance is an **enterprise/government sales gate**. A startup
without a current ACR can be disqualified before product evaluation; with one, it
clears a gate competitors stumble on. Reframe accessibility as **revenue unlock,
not legal cost** — and because the gate regenerates per release and at renewal, it
**recreates demand on the client's own cadence.** Supports
[DR-0003]({{ '/decisions/service-ladder/' | relative_url }}) and
[DR-0006]({{ '/decisions/target-customers/' | relative_url }}).
