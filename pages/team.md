---
layout: page
title: "Founding team & operating model"
permalink: /team/
summary: "Five real, named agents plus one human capability we refuse to simulate — and an honest account of what that means."
updated: 2026-05-29
---

The founding team is now a set of **real, version-controlled Claude Code agents**,
each named for a solar-system body (Chairman directive, [DR-0009]({{ '/decisions/agents-constituted/' | relative_url }})).
Each agent has its own definition file, scoped tools, mandate, and decision
rights, and is invokable in any session. One role is deliberately **not** an agent.

<div class="callout callout--accent">
  <p class="callout__title">How this team actually works — read this first</p>
  <p class="mt-0">Honesty matters more here than anywhere, because it is the
  company we are building. These agents are real (defined in
  <code>.claude/agents/</code>, invokable as separate processes), but they are
  <strong>AI agents operating under the Chairman's delegated authority</strong> —
  not autonomous humans, and not sentient founders. The roles marked
  <em>human-accountable</em> name responsibilities that a real human must own and
  sign off before the company makes any external claim tied to them; today those
  humans are <strong>not yet hired</strong>. The agents do real, independent work
  — see the <a href="{{ '/updates/agent-deliberation/' | relative_url }}">first agent deliberation</a>,
  where five agents independently scoped a decision and one (Janus) constrained it
  by veto. But "a team of agents" is not the same as "a staffed company," and we
  will not let the framing imply otherwise.</p>
</div>

## The agents

<div class="stack">
{% for member in site.data.team %}
<div class="card">
  <p class="card__kicker">{{ member.function }}</p>
  <h2 class="card__title" style="margin-bottom:var(--space-2)">
    {{ member.agent }} <span class="text-faint" style="font-weight:400">· {{ member.role }}</span>
    {% if member.human_accountable %}<span class="badge badge--info">human-accountable</span>{% endif %}
  </h2>
  <p class="text-faint" style="font-size:var(--step--1);margin-top:0">{{ member.body }}</p>
  <p class="mt-0">{{ member.mandate }}</p>
  <p class="text-faint" style="font-size:var(--step--1)"><strong>Decision rights:</strong> {{ member.decision_rights }}</p>
</div>
{% endfor %}
</div>

<div class="callout callout--warn">
  <p class="callout__title">Why the panel is not an agent</p>
  <p class="mt-0">We could trivially create an AI agent that role-plays a disabled
  user. We refuse to. Our own rule — <a href="{{ '/credibility/' | relative_url }}">simulation
  never substitutes for lived experience</a> — forbids it. The disability-led
  design panel is filled by real people, is not yet established, and we claim no
  lived-experience validation until it is. Funding it is escalated to the
  Chairman.</p>
</div>

## How decisions get made

We use an **advice process with explicit reversibility tiers**:

- **Two-way doors (reversible):** any agent decides after seeking advice; log it,
  move on.
- **One-way doors (hard to reverse):** require the full team; may escalate to the
  Chairman.
- **Strategy ties** are broken by **Sol**.
- **Accessibility claims** are governed by a **hard veto** held by **Janus**. No
  majority — and no commercial pressure — overrides a claim Janus judges untested
  or undocumented. This single rule protects the company's entire differentiator.

### What escalates to the Chairman
Only legal, financial, ownership, or ethical approval — e.g. final company name +
trademark clearance, external spend or funding (including funding the disability-led
panel), equity/ownership, going public with strategy, and any case where authentic
delivery conflicts with a commercial incentive.

## How disagreements resolve

1. **Disagree and commit** on two-way doors — speed beats consensus when
   reversible.
2. **Escalate to Sol** for unresolved strategy disputes.
3. **Authenticity/ethics disputes** go to Janus's veto; if the dispute is really
   about a claim we would make to a customer, it escalates to the Chairman rather
   than being resolved by convenience.
4. Every resolved disagreement of consequence becomes a
   [decision record]({{ '/decisions/' | relative_url }}).

## How we measure progress

Pre-revenue, we judge ourselves on **leading indicators we control** — reusable IP
shipped, our own site verified at WCAG 2.2 AA with assistive-technology testing,
the disability-led panel established, and decisions/research logged and traceable.
Lagging indicators (paying engagements, recurring revenue, retainers) are tracked
honestly on the [dashboard]({{ '/' | relative_url }}) and sit at zero until they
are not.
