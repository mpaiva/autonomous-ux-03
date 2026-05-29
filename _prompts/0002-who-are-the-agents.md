---
title: "Who are the agents? Can they decide on their own? — stand up real agents"
slug: agents-question
id_code: "REQ-0002"
status: "Implemented"
status_class: "ok"
received: 2026-05-29
received_display: "2026-05-29 (time of day not specified)"
channel: "Direct prompt + follow-up selection"
---

## Original prompt (verbatim)

<div class="verbatim">
who are the agents? Can they make these decisions on their own?
</div>

Follow-up directive (verbatim selection in response to options offered):

<div class="verbatim">
Stand up real agents and give them names, but not human names, think of names from the solar system
</div>

## Interpretation

The Chairman probed whether the "founding team" represented real autonomous
decision-makers. The honest answer was no — it had been a role framework authored
and role-played by one AI (with three real research sub-agents used during
formation). Rather than only clarifying in words, the Chairman directed us to make
the agents real and to give them solar-system codenames (not human names).

## Decisions influenced

- [DR-0009 — Constitute the founding team as real, named agents]({{ '/decisions/agents-constituted/' | relative_url }})
- [DR-0010 — Pattern Library v0.1 scope]({{ '/decisions/pattern-library-v01-scope/' | relative_url }})
  (the agents' first real deliberation)

## Actions taken

- Created five real Claude Code agents in `.claude/agents/` — **Sol, Iris, Janus,
  Atlas, Vesta** — each version-controlled, scoped, and invokable.
- Deliberately did **not** create an agent for the disability-led panel (no
  simulated lived experience).
- Ran the agents on a real decision and recorded the result
  ([UPD-002]({{ '/updates/agent-deliberation/' | relative_url }})).
- Rewrote the [team page]({{ '/team/' | relative_url }}) with an explicit, honest
  account of what the agents are and are not.

## Related artifacts

`.claude/agents/{sol,iris,janus,atlas,vesta}.md`; the
[team page]({{ '/team/' | relative_url }}); DR-0009; DR-0010; UPD-002.

## Current status

**Implemented.** One item escalated to the Chairman: funding a paid disability-led
validation panel (the lived-experience gate for any future conformance claim).
