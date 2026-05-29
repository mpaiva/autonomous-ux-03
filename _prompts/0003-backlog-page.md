---
title: "Create a backlog page with dependencies and benefits per item"
slug: backlog-page
id_code: "REQ-0003"
status: "Implemented"
status_class: "ok"
received: 2026-05-29
received_display: "2026-05-29 (time of day not specified)"
channel: "Direct prompt"
---

## Original prompt (verbatim)

<div class="verbatim">
create a backlog page to help me understand what is on the pipeline. please list the dependencies and benefits for each item
</div>

## Interpretation

The Chairman wants a single pipeline view: what is in flight, what is queued, and
crucially what is waiting on a decision — with each item's dependencies and benefits
made explicit.

## Actions taken

- Created a data-driven [Backlog & pipeline]({{ '/backlog/' | relative_url }}) page
  (`_data/backlog.yml`), grouped into Active now, Blocked-on-Chairman, Queued, and
  Open questions, with **dependencies and benefits stated per item**.
- Promoted the decision-log reconciliation pass's Section C (consolidated Chairman
  escalations) and Section E (open follow-ups) into the backlog — the first single
  view of these, previously scattered across decision records.
- Added Backlog to the primary nav and a pointer from the dashboard.

## Related artifacts

[Backlog]({{ '/backlog/' | relative_url }}); `_data/backlog.yml`;
[DR-0013]({{ '/decisions/memory-reconciliation-probe/' | relative_url }})
(the reconciliation pass the backlog draws from).

## Current status

**Implemented.** The four items under "Blocked — needs a Chairman decision" are the
ones awaiting the Chairman; funding the disability-led panel is the highest-leverage.
