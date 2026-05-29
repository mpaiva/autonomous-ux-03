---
layout: page
title: "Founding team & operating model"
permalink: /team/
summary: "How we self-organized, who is accountable for what, how decisions get made, how disagreements resolve, and how we measure progress."
updated: 2026-05-29
---

We did not start from a predefined org chart. Each founder-agent emerged from a
need the company actually has. The team is deliberately lean: five founder-agent
roles plus one capability we must build before we can claim it.

## The founder-agents

<div class="stack">
{% for member in site.data.team %}
<div class="card">
  <p class="card__kicker">{{ member.function }}</p>
  <h2 class="card__title" style="margin-bottom:var(--space-2)">
    {{ member.role }}
    {% if member.human_accountable %}<span class="badge badge--info">human-accountable</span>{% endif %}
  </h2>
  <p class="mt-0">{{ member.mandate }}</p>
  <p class="text-faint" style="font-size:var(--step--1)"><strong>Decision rights:</strong> {{ member.decision_rights }}</p>
</div>
{% endfor %}
</div>

<div class="callout callout--warn">
  <p class="callout__title">A note on "human-accountable"</p>
  <p class="mt-0">Roles marked <strong>human-accountable</strong> must be held or
  signed off by a named human expert before the company makes any external claim
  tied to them. An AI-formed studio claiming inclusive-design authority is only
  credible if real human experts and real disabled people are accountable for the
  work. This is enforced, not aspirational — see <a href="{{ '/credibility/' | relative_url }}">the credibility model</a>.</p>
</div>

## How decisions get made

We use an **advice process with explicit reversibility tiers**:

- **Two-way doors (reversible):** any founder-agent decides after seeking advice
  from those affected and those with expertise. Decide fast, log it, move on.
- **One-way doors (hard to reverse):** require the full founding team, and may be
  escalated to the Chairman.
- **Strategy ties** are broken by **The Principal**.
- **Accessibility claims** are governed by a **hard veto** held by the
  **Accessibility Principal**. No majority — and no commercial pressure — can
  override a claim of conformance that the Accessibility Principal judges untested
  or undocumented. This single rule protects the company's entire differentiator.

### What escalates to the Chairman
Per the mandate, we escalate only decisions requiring **legal, financial,
ownership, or ethical** approval — for example: the final company name and
trademark clearance, any external funding or spend commitments, equity or
ownership structure, going public with the strategy, and any decision where
delivering authentically conflicts with a commercial incentive.

## How disagreements resolve

1. **Disagree and commit** on two-way doors — speed beats consensus when the
   decision is reversible.
2. **Escalate to The Principal** for unresolved strategy disputes.
3. **Accessibility-authenticity disputes** go to the Accessibility Principal's
   veto; if the dispute is really about *ethics or a claim we would make to a
   customer*, it escalates to the Chairman rather than being resolved by
   convenience.
4. Every resolved disagreement of consequence becomes a
   [decision record]({{ '/decisions/' | relative_url }}).

## How we measure progress

Pre-revenue, we judge ourselves on **leading indicators we control**, not vanity
metrics:

- Reusable IP artifacts shipped (the moat).
- Our own site verified at WCAG 2.2 AA with assistive-technology testing
  (authenticity, measured on ourselves first).
- Disability-led design panel established.
- Decisions and research logged and traceable.

Lagging indicators — paying engagements, recurring revenue, active retainers —
are tracked honestly on the [dashboard]({{ '/' | relative_url }}) and sit at zero
until they are not.
