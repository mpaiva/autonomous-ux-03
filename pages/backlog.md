---
layout: page
title: "Backlog & pipeline"
permalink: /backlog/
summary: "What's in flight, what's blocked on a Chairman decision, what's queued next, and the open questions — with the dependencies and benefits for each item."
updated: 2026-05-29
---

This is the company's pipeline at a glance. Items are grouped by **what we can move
on now**, **what is blocked on a decision only the Chairman can make**, **what is
queued next**, and **open questions**. Each item states its **dependencies** (what
must happen first) and its **benefit** (why it matters / what it unlocks).

The "blocked" and "open" items were consolidated from the decision-log
reconciliation pass — previously they were scattered across individual decision
records with no single view.

{% for group in site.data.backlog.groups %}
## {{ group.name }}

<p class="lede">{{ group.blurb }}</p>

<div class="stack">
{% for item in group.items %}
<div class="card">
  <h3 class="card__title" style="margin-bottom:var(--space-2)">
    {{ item.title }}
    <span class="badge badge--{{ item.status_class }}">{{ item.status }}</span>
  </h3>
  <dl class="meta-grid" style="margin-top:var(--space-3)">
    <dt>Owner</dt><dd>{{ item.owner }}</dd>
    <dt>Dependencies</dt><dd>{{ item.dependencies }}</dd>
    <dt>Benefit</dt><dd>{{ item.benefit }}</dd>
    {% if item.refs %}<dt>Refs</dt><dd>{% for r in item.refs %}<a href="{{ r.url | relative_url }}">{{ r.label }}</a>{% unless forloop.last %} · {% endunless %}{% endfor %}</dd>{% endif %}
  </dl>
</div>
{% endfor %}
</div>
{% endfor %}

---

<div class="callout callout--accent">
  <p class="callout__title">For the Chairman</p>
  <p class="mt-0">The four items under <strong>"Blocked — needs a Chairman
  decision"</strong> are the ones waiting on you. The highest-leverage is
  <strong>funding the disability-led validation panel</strong> — until it exists, no
  conformance or lived-experience claim is possible anywhere in the company.</p>
</div>
