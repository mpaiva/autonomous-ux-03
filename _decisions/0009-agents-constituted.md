---
title: "Constitute the founding team as real, named agents (solar-system codenames)"
slug: agents-constituted
id_code: "DR-0009"
status: "Adopted"
status_class: "ok"
date: 2026-05-29
owner: "Sol (Principal)"
deciders: "Chairman directive (REQ-0002); implemented by the team"
decision: >-
  Make the founding roles real, version-controlled Claude Code agents named for
  solar-system bodies — Sol, Iris, Janus, Atlas, Vesta. Keep the disability-led
  panel as a human capability, explicitly NOT an agent.
summary: "Turning the role framework into real, invokable, accountable agents."
---

## Context

The Chairman asked, plainly: *who are the agents, and can they make these
decisions on their own?* The honest answer was that the "founding team" had been a
role framework authored and role-played by a single AI — not independent agents.
The Chairman then directed us to **stand up real agents and give them names from
the solar system (not human names).**

## Decision

Five roles became five real Claude Code agents, each a version-controlled
definition in `.claude/agents/<name>.md` with scoped tools, an encoded mandate,
and decision rights — invokable in any session as `subagent_type: <name>`:

- **Sol** (the Sun) — Principal: strategy, coordination, tie-break.
- **Iris** (asteroid 7 Iris) — Craft Director, AI interaction design.
- **Janus** (moon of Saturn) — Accessibility Principal, holds the hard veto.
- **Atlas** (moon of Saturn) — Design Systems & IP Architect, the moat.
- **Vesta** (asteroid 4 Vesta) — Operations & Research, keeper of the record.

## What we deliberately did NOT do

We did **not** create an agent for the disability-led design panel. Building an AI
that role-plays disabled users would violate our own rule that simulation never
substitutes for lived experience ([credibility model]({{ '/credibility/' | relative_url }})).
That role stays human and unstaffed; we claim no lived-experience validation until
it is real.

## Honest framing (the guardrail)

These are AI agents operating under the Chairman's delegated authority — not
autonomous humans or sentient founders. Human-accountable roles (Iris, Janus, the
panel) name responsibilities a real human must sign off before any external claim;
those humans are not yet hired. "A team of agents" is not "a staffed company," and
the site must not imply otherwise. See the [team page]({{ '/team/' | relative_url }}).

## Proof it is real

The agents' first act was an independent deliberation on Pattern Library v0.1 —
each reasoned from its own charter, Janus constrained the outcome by veto, and Sol
synthesized the result into [DR-0010]({{ '/decisions/pattern-library-v01-scope/' | relative_url }}).
See [UPD-002]({{ '/updates/agent-deliberation/' | relative_url }}).
