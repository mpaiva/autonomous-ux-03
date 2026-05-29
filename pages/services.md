---
layout: page
title: "Service model"
permalink: /services/
summary: "A ladder: land with productized offers, expand into premium AI product design, retain with recurring revenue. We optimize for the annuity."
updated: 2026-05-29
---

Our service model is a deliberate ladder. Productized offers are easy to buy and
produce the finding that justifies more work. Premium project design is the
flagship and the margin. Recurring revenue is the annuity we optimize for —
because an accessibility conformance report is only valid for the version it
tested, demand regenerates on the client's own ship cadence.

{% for tier in site.data.services.tiers %}
## {{ tier.name }}

<p class="lede">{{ tier.intent }}</p>
<p class="text-faint">
  <span class="badge badge--neutral">{{ tier.model }}</span>
  {% if tier.recurring %}<span class="badge badge--ok">recurring revenue</span>{% endif %}
</p>

<ul>
{% for offer in tier.offers %}<li>{{ offer }}</li>
{% endfor %}</ul>
{% endfor %}

## Pricing posture

We do **not** compete on per-page audit rates (a documented race to the bottom
around $100–$250/page). We price accessibility *into* senior AI product-design
engagements and standing retainers, where margin and stickiness live. Detailed
rate-card work is deferred until we validate willingness to pay with real
proposals — public pricing for premium design and retainers is thin, and we will
not invent a rate card we cannot defend. See
[DR-0005]({{ '/decisions/pricing-posture/' | relative_url }}).

## The signature offer

The **AI Interface Accessibility Review** is our category-defining productized
offer. It covers exactly what commodity audits and overlays cannot: streaming and
generative output, conversational focus management, per-message screen-reader
navigation, "an agent is acting on your behalf" states, voice/text parity, and
AI-disclosure UX. It is powered by our
[reusable IP]({{ '/ip-roadmap/' | relative_url }}) and is the cleanest expression
of the wedge.
