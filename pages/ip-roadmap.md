---
layout: page
title: "Reusable IP roadmap"
permalink: /ip-roadmap/
summary: "The moat. Underserved is not the same as defensible — so we build proprietary, reusable IP first, sequenced by leverage."
updated: 2026-05-29
---

Our competitive research delivered a blunt verdict: the Accessible AI UX niche is
**underserved but not automatically defensible**. Sold as taste plus services, it
is next quarter's line item for a bigger player. The accessibility incumbents
built moats — axe, ARC, automated remediation, a disabled-tester panel. We need
ours.

So reusable IP is not a "someday product." It is the **first priority**,
sequenced by leverage: build first the assets that sit in the white space nobody
owns, that power our productized offers, and that are publishable for credibility.

{% assign items = site.data.ip | sort: "order" %}
<ol class="stack" style="list-style:none;padding:0">
{% for item in items %}
<li class="card">
  <p class="card__kicker">Priority {{ item.order }} · <span class="badge badge--{{ item.status_class }}">{{ item.status }}</span></p>
  <h2 class="card__title" style="margin-bottom:var(--space-2)">{{ item.name }}</h2>
  <p class="mt-0"><strong>What:</strong> {{ item.what }}</p>
  <p class="text-soft"><strong>Why this order:</strong> {{ item.why_first }}</p>
</li>
{% endfor %}
</ol>

## How IP supports services

Every artifact does double duty. The **pattern library** and **evaluation
scorecard** power the signature
[AI Interface Accessibility Review]({{ '/services/' | relative_url }}). The
**hardening method** productizes a recurring service line. The publishable
**guidelines** generate inbound credibility. Project work feeds the IP; the IP
makes project work faster, more consistent, and more defensible — a compounding
loop.

## Could the IP become a product?

Possibly. The evaluation scorecard and pattern library could mature into a
subscription product (the model the accessibility incumbents proved). We are not
committing to that yet — we will let real engagements tell us which artifact has
standalone pull before we invest in productizing it.
