---
layout: page
title: "Risk register & open questions"
permalink: /risks/
summary: "What could break this company, what we are doing about it, and the open questions we have not yet resolved."
updated: 2026-05-29
---

We maintain this register continuously. Severity reflects potential impact on the
company's core differentiator and survival.

{% assign order = "high,medium,low" | split: "," %}
{% for level in order %}
<h2>{{ level | capitalize }} severity</h2>
<div class="stack">
{% for r in site.data.risks %}{% if r.severity == level %}
<div class="card">
  <p class="card__kicker">{{ r.id }} · <span class="badge badge--{% if r.severity == 'high' %}risk{% elsif r.severity == 'medium' %}warn{% else %}neutral{% endif %}">{{ r.severity }} severity</span> · {{ r.status }}</p>
  <h3 class="card__title" style="margin-bottom:var(--space-2)">{{ r.title }}</h3>
  <p class="mt-0">{{ r.detail }}</p>
  <p class="text-soft"><strong>Mitigation:</strong> {{ r.mitigation }}</p>
  <p class="text-faint" style="font-size:var(--step--1)"><strong>Owner:</strong> {{ r.owner }}</p>
</div>
{% endif %}{% endfor %}
</div>
{% endfor %}

## Open questions

These are unresolved and tracked openly rather than glossed over:

- **The "second company" reference.** The founding mandate describes this as a
  *second* AI-native design company. We have no context on the first — whether it
  exists, what it learned, or whether this company should relate to it. Flagged for
  the Chairman. See [REQ-0001]({{ '/chairman-log/founding-mandate/' | relative_url }}).
- **Company name & trademark.** "Penumbra" is a working name; a notable public
  company uses it in an unrelated class. Final name and clearance are a
  Chairman/legal decision. See [DR-0008]({{ '/decisions/company-name/' | relative_url }}).
- **Willingness to pay** for premium AI product design and accessibility retainers
  is thinly evidenced publicly. We need real proposals to set a defensible rate card.
- **Human-expert and disabled-co-designer recruiting.** Authenticity depends on it;
  we have not yet established either. Treated as the highest-priority Phase 1 build.
