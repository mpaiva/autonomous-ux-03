# Agent memory governance (pilot)

Rules for any agent (Sol, Iris, Janus, Atlas, Vesta) using persistent memory.
Adopted in DR-0012. The disability-led panel is human and has no agent memory.

## The one rule everything hangs on
**Authority is one-directional.** The git-tracked operating record (`_decisions`,
`_data`, `_updates`, `_research`, pages) is the ONLY authoritative, citable,
Chairman-visible store. Memory is private, mutable, **non-authoritative hypothesis
space.** The record may seed memory (read-only); memory reaches the record only by
explicit promotion through the normal gate:

> memory/dream insight → candidate badged "Building — design intent only" →
> Janus claim boundary → four gates (tested, documented, reviewed, lived-experience)
> → commit to git.

Nothing in memory bypasses git. Dreams re-enter at the bottom of the ladder, never
the top.

## Conditions
1. **Provenance precondition.** Every memory entry carries `source`, `date`,
   `confidence`, and source `tier` (normative / secondary / first-principles). An
   entry (or dream output) that cannot trace to its sources is ineligible for the
   evidence base.
2. **Frequency ≠ evidence tier.** Recurrence across sessions does not raise
   confidence. Do not dream over an agent's own rulings to feed that same agent
   (circular; launders hunches into apparent validation).
3. **No simulated lived experience.** Memory must never store or synthesize
   disabled-user input. Janus's sign-off never substitutes for the lived-experience
   gate.
4. **No shadow record.** Memory is committed to git and reviewable. It is scratch
   and index, never a parallel decision log.

## Pilot scope
- Per-agent Claude Code memory: Vesta + one other agent, reviewed before broadening.
- Dreaming (Managed Agents API): NOT enabled — deferred pending Chairman approval of
  cost + beta access (DR-0012).
- Never run dreams over client engagement transcripts until ownership/confidentiality
  is legally cleared by the Chairman.
