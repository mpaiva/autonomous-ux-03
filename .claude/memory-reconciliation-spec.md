# Memory reconciliation — spec (internal probe)

Owner: Atlas · Status: probe · Governs against: `.claude/MEMORY-GOVERNANCE.md`, `_decisions/0012-memory-and-dreaming.md`

## Purpose
A time-boxed **research probe** of a home-built memory-consolidation pass (working
name **memory reconciliation**). It is **not** infrastructure and **not** a competitor
to Anthropic's managed **Dreaming** feature — we plan to **adopt managed Dreaming
later** once cost + beta access clear (DR-0012). The probe exists to learn whether a
lightweight Claude pass over our own material surfaces useful, traceable insight under
our one-directional authority rule, before we commit to the managed path.

## Inputs (read-only)
Our **own** agent memory plus our **own non-client** material:
- per-agent Claude Code memory (under `.claude/memory/`)
- decision log — `_decisions/`
- research briefs — `_research/`
- prompt log — `_prompts/`

**Explicitly excluded: NO client engagement transcripts** (ownership/confidentiality is
unresolved; barred until the Chairman clears it — DR-0012). Inputs are opened read-only
and **never modified**.

## Process
A single Claude pass that:
1. **Dedups** near-identical entries by **unioning their `sources[]`** — provenance is
   merged, never stripped. (A dedup that drops source/date/tier yields an
   ineligible entry — DR-0012.)
2. **Reconciles** stale or contradicted entries against the current git record, flagging
   the conflict rather than silently overwriting.
3. **Surfaces cross-session insight** into a **new output file**. Recurrence is reported
   as a fact about sources, **never as a confidence boost** (frequency ≠ evidence tier).
   Confidence is assigned from **source tier only**, not from how often something recurred.

The input store is never edited; the pass only ever writes a new candidate file.

## Output
Location: `.claude/memory/reconciliation-candidates/<date>-<scope>.md`
(e.g. `2026-05-29-pattern-library.md`). The file is a **non-authoritative CANDIDATE**.
It is committed to git and reviewable — **not a shadow/unversioned side-channel**
(MEMORY-GOVERNANCE.md, no-shadow-record).

### Entry format
Each entry MUST carry all fields. An entry that cannot trace to its sources is
**ineligible** and is dropped.

```
- insight/claim: <single claim, one sentence>
  sources[]: [<path or session id>, ...]   # required; must resolve
  date: <YYYY-MM-DD>
  confidence: High | Med | Low              # from source tier, not recurrence
  tier: normative | secondary | first-principles
  status: "candidate — design intent, unverified"   # always, verbatim
```

## Review gate (authority is one-directional)
The candidate output re-enters the **four-gate claim ladder at the BOTTOM**. It carries
no authority on its own. Promotion to the git-authoritative record happens **only** via
the normal path:

> reconciliation candidate → **Janus** claim boundary → four gates
> (**tested · documented · reviewed · lived-experience**) → commit to git.

Janus is the claim boundary, not a generic reviewer. Nothing in memory bypasses git;
candidates re-enter at the bottom, never the top. **One-directional authority holds.**

## Scheduling
**Manual trigger only**, or a **GitHub Actions** run kicked off deliberately. **Not
automatic** — no daemon, no on-write hook, no recurring background job.

## Guardrails (per MEMORY-GOVERNANCE.md)
- **Circularity ban.** Do not reconcile an agent's own rulings to feed that same agent —
  this launders a hunch into apparent validation. Reconciliation never raises an
  agent's confidence in its own prior output.
- **No simulated lived experience.** The pass must never store or synthesize
  disabled-user input. Janus's sign-off never substitutes for the lived-experience gate.
- **Provenance is a precondition** (every entry: source, date, confidence, tier).
- **No shadow record** — candidates are git-tracked and reviewable.

## Honest limits
This is a probe, not a product. It will **not** match managed Dreaming's scaling or
robustness (transcript volume, reorganization quality, isolation guarantees). If the
probe shows value, the intended path is to **adopt managed Dreaming**, not to harden
this script into infrastructure.
