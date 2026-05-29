# Reconciliation candidate — decision log (DR-0001 through DR-0013)

> **NON-AUTHORITATIVE CANDIDATE — design intent, unverified.**
> This file is a memory-reconciliation pass output, not the operating record. It
> carries **no authority on its own**. Everything here is a candidate / hypothesis /
> design intent and is **unverified**. Nothing here is promoted, validated, or proven;
> do not write "validated / verified / proven / confirmed / our research shows."
> It re-enters the four-gate claim ladder **at the bottom**: candidate → Janus claim
> boundary → tested · documented · reviewed · lived-experience → commit to git.
> Authority is one-directional (MEMORY-GOVERNANCE.md, DR-0012; Janus boundary, DR-0013).
> Do not cite this file as a source.

**Pass:** second memory-reconciliation pass · **Date run:** 2026-05-29 · **Scope:** the
decision log `_decisions/` (DR-0001 through DR-0013), read-only; no input modified.
**Run by:** Vesta.

**Inputs (read-only):**
`_decisions/0001-positioning-wedge.md`, `0002-authenticity-guardrails.md`,
`0003-service-ladder.md`, `0004-ip-first-moat.md`, `0005-pricing-posture.md`,
`0006-target-customers.md`, `0007-governance-model.md`, `0008-company-name.md`,
`0009-agents-constituted.md`, `0010-pattern-library-v01-scope.md`, `0011-mission.md`,
`0012-memory-and-dreaming.md`, `0013-memory-reconciliation-probe.md`.

## Conventions used in this pass

- **sources[]** lists the in-repo decision-record paths that resolve. Where a claim is
  a cross-decision synthesis produced by this pass, all the DRs it draws on are listed.
- **Tier rubric** (confidence comes from tier, **never** from how many DRs repeat a
  thing): *normative* = a binding rule the company has adopted as governing law for
  itself (governance, authenticity gate, one-directional authority — may be High because
  the decision record IS the authority on the company's own intent); *secondary* =
  a strategic bet or market-contingent rationale (Med or Low); *first-principles* =
  cross-decision synthesis produced by this pass (capped at Med — observations, not law).
- **Frequency does NOT raise tier.** A principle recurring across ten DRs is reported as
  a fact about the corpus, not as stronger evidence.
- **status** is verbatim on every entry, as required.

---

## A. Cross-decision dependencies / coherence

Which decisions rest on which, and whether the chain is internally consistent.

- insight/claim: The whole strategy is a dependency chain rooted in one conditional — the premium positioning wedge (DR-0001) is explicitly declared safe ONLY if the IP-first moat (DR-0004) and the credibility/authenticity model (DR-0002) hold, so DR-0001 is load-bearing-downward but conditional-upward on DR-0002 and DR-0004.
  sources[]: ["_decisions/0001-positioning-wedge.md", "_decisions/0002-authenticity-guardrails.md", "_decisions/0004-ip-first-moat.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: DR-0001 states the conditional in its own text ("only safe alongside DR-0004 and the credibility model"). This is the company's own stated logic, not an inference — hence High on the normative tier (authority over the company's intent), not because it recurs.

- insight/claim: The authenticity four-gate rule (DR-0002) is the single most depended-on decision in the log — DR-0005 (no invented rate card = authenticity violation), DR-0009 (no disability-panel agent = no simulated lived experience), DR-0010 (claim boundary + fourth gate), DR-0011 (the "do it for real or don't claim it" caveat), DR-0012 and DR-0013 (memory must never simulate disabled users) all derive from or restate it.
  sources[]: ["_decisions/0002-authenticity-guardrails.md", "_decisions/0005-pricing-posture.md", "_decisions/0009-agents-constituted.md", "_decisions/0010-pattern-library-v01-scope.md", "_decisions/0011-mission.md", "_decisions/0012-memory-and-dreaming.md", "_decisions/0013-memory-reconciliation-probe.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: Reported as a structural fact about the corpus — six later DRs cite or re-apply DR-0002's gates. Frequency is described, not used to raise tier; tier is High because the decision record is authoritative over the company's own adopted rule.

- insight/claim: The four-gate ladder is applied consistently as the company scales it from accessibility claims (DR-0002) to pattern-library claims (DR-0010) to memory/dream outputs (DR-0012, DR-0013) — the same four gates (tested · documented · reviewed · lived-experience) and the same "Janus sign-off never substitutes for the lived-experience gate" carve-out appear unchanged in each, which is internal coherence rather than drift.
  sources[]: ["_decisions/0002-authenticity-guardrails.md", "_decisions/0010-pattern-library-v01-scope.md", "_decisions/0012-memory-and-dreaming.md", "_decisions/0013-memory-reconciliation-probe.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: The gate wording is reused verbatim across four DRs with no contradiction. Logged as a coherence observation.

- insight/claim: The service ladder (DR-0003) and pricing posture (DR-0005) are a matched pair — DR-0003 designs productized audits as a "land" motion always tied upward to design + retainers, and DR-0005 enforces that same tie ("never sold as a price-shopped commodity"), so the two decisions encode the same anti-commoditization rule from the product and the pricing side.
  sources[]: ["_decisions/0003-service-ladder.md", "_decisions/0005-pricing-posture.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Cross-decision coherence observation; both DRs cross-reference each other. Capped at Med (this is a synthesis of intent, market-contingent).

- insight/claim: The "valid only for the version it tested" logic is one mechanism reused for two purposes — DR-0003 uses it to explain why ACR demand regenerates per release (the recurring annuity), and DR-0010 uses it to justify pinning WCAG version + AT matrix + test date so patterns go stale and trigger re-verification (defensibility via re-test cadence) — the same staleness principle drives both the business model and the IP integrity rule.
  sources[]: ["_decisions/0003-service-ladder.md", "_decisions/0010-pattern-library-v01-scope.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Synthesis connecting DR-0003's revenue rationale to DR-0010's structural rule via a shared mechanism. DR-0010 itself names the link ("the same 'valid only for the version tested' logic that drives the retainer annuity"). Capped at Med.

- insight/claim: The agent framework is itself dependency-ordered — DR-0009 constitutes the five agents, and the proof it offered that they are "real" is that they independently produced DR-0010 (the agents deliberated, Janus vetoed, Sol synthesized), so DR-0010 is cited as evidence for DR-0009's own claim.
  sources[]: ["_decisions/0009-agents-constituted.md", "_decisions/0010-pattern-library-v01-scope.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: DR-0009 names DR-0010 as its proof-of-realness; DR-0010's header credits the agent deliberation. Mutually referencing but not circular in the governance sense (different claims). Capped at Med.

- insight/claim: Mission (DR-0011) and the positioning thesis (DR-0001) are deliberately separated as purpose-vs-bet — DR-0011 states the mission "should survive any pivot" while the thesis is "revisable if the market proves it wrong," which means a future reversal of DR-0001 would NOT invalidate DR-0011, an intentional firebreak in the dependency chain.
  sources[]: ["_decisions/0011-mission.md", "_decisions/0001-positioning-wedge.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: DR-0011 explicitly draws the mission/thesis boundary. Logged because it changes how to read the whole chain: the strategy DRs are revisable, the mission and the authenticity/governance DRs are intended to endure.

## B. Tensions / contradictions between decisions

Precise about what is a real conflict versus a pending, already-routed scope change.

- insight/claim: The v0.2 pattern-library scope is the subject of a PENDING, ACKNOWLEDGED scope-change, not a contradiction — DR-0010 fixed v0.2's deferred scope as exactly two items (conversational error/recovery; reduced-motion generative loaders), and DR-0012 adds "accessible agent-memory & dreaming UX" as a third v0.2 candidate while explicitly noting "it changes the v0.2 scope fixed in DR-0010" and routing the priority call to Sol — so the later decision flags its own scope impact and defers resolution rather than silently overriding.
  sources[]: ["_decisions/0010-pattern-library-v01-scope.md", "_decisions/0012-memory-and-dreaming.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: This is the item the task asked to scrutinize. Verdict: NOT a real conflict. DR-0012's own text names DR-0010 and assigns the prioritization to Sol. It is a clean, self-disclosed scope addition awaiting an owner's call — the one open follow-up is that v0.2 scope now has three candidate items and no recorded prioritization decision yet (see Section E).

- insight/claim: The company name is the only formally UNSETTLED decision in the log — DR-0008 is status "Provisional" with final approval reserved to the Chairman, while every other DR is "Adopted," so anything in the record that treats "Penumbra" as final would be ahead of the actual decision state.
  sources[]: ["_decisions/0008-company-name.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: Not a contradiction between two DRs, but a status tension between DR-0008's provisional state and its use as the brand across the operating record. DR-0008 itself frames the name as "a single configuration value" trivially changed, which contains the risk.

- insight/claim: There is a potential over-reach point, not a contradiction, around recurrence and confidence — DR-0001 and DR-0003 carry "Supporting synthesis" blocks promoted from the first reconciliation pass, each explicitly capped at "Medium confidence — a cross-brief hypothesis, not a finding," which is consistent with the frequency-≠-tier rule (DR-0012/DR-0013); the records did NOT upgrade those syntheses on promotion, so the guardrail held.
  sources[]: ["_decisions/0001-positioning-wedge.md", "_decisions/0003-service-ladder.md", "_decisions/0012-memory-and-dreaming.md", "_decisions/0013-memory-reconciliation-probe.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Checked specifically for a frequency-laundering violation (the thing DR-0012/0013 forbid). Found none — the promoted syntheses stayed at Med and kept their "hypothesis, not finding" label. Logged as a clean coherence check, not a tension.

## C. Consolidated open escalations to the Chairman

Every item across all DRs flagged as needing Chairman approval (legal / financial /
ownership / ethical), gathered in one place. No single existing artifact lists them all.
Each carries its source DR. The criteria themselves come from DR-0007.

- insight/claim: ESCALATION CRITERIA (the rule itself) — per DR-0007, only legal, financial, ownership, or ethical matters escalate to the Chairman: examples named are final company name + trademark clearance, external spend or funding, equity/ownership structure, going public with strategic material, and any case where authentic delivery conflicts with a commercial incentive.
  sources[]: ["_decisions/0007-governance-model.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: This is the definitional source for what counts as an escalation; the items below are the concrete instances raised so far.

- insight/claim: ESCALATION — Company name + trademark: approve "Penumbra" (or choose an alternate such as Liminal / Even) AND authorize a trademark search and clearance in the relevant Nice classes/jurisdictions; flagged because a publicly-traded company (Penumbra, Inc., medical devices) uses the name in an unrelated class and clearance is a legal determination reserved to the Chairman. [legal/ownership]
  sources[]: ["_decisions/0008-company-name.md", "_decisions/0007-governance-model.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: Open. DR-0008 status is Provisional pending this. DR-0007 names "final company name + trademark clearance" as a Chairman matter.

- insight/claim: ESCALATION — Disability-led validation panel: authorize scoping and funding of a paid disability-led validation panel as the v0.1 → conformance path; flagged because the fourth gate (validation by lived experience) cannot be satisfied without it and committing that capability is a resourcing/authenticity matter the agents cannot decide. [financial/ethical]
  sources[]: ["_decisions/0010-pattern-library-v01-scope.md", "_decisions/0009-agents-constituted.md", "_decisions/0002-authenticity-guardrails.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: Open and recurring — surfaced as the resourcing blocker in DR-0010, named in DR-0009 (the panel stays human and unstaffed), and rooted in DR-0002's fourth gate. The single highest-leverage external dependency: until funded, NO conformance/lived-experience claim is possible anywhere in the company.

- insight/claim: ESCALATION — Dreaming cost + beta access: approve external spend and Managed Agents API beta access before piloting Anthropic's managed Dreaming; flagged as a one-way door requiring external spend, with the amount deliberately left unknown ("we will not invent a figure"). [financial]
  sources[]: ["_decisions/0012-memory-and-dreaming.md", "_decisions/0013-memory-reconciliation-probe.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: Open. Raised in DR-0012, reaffirmed unchanged in DR-0013 ("no external spend / managed-Dreaming beta without Chairman approval").

- insight/claim: ESCALATION — Dreams/reconciliation over client engagement transcripts: clear the IP-ownership and confidentiality question (who owns the abstraction minted from a client session) before any consolidation pass is ever run over client material; barred until then. [ownership/legal/confidentiality]
  sources[]: ["_decisions/0012-memory-and-dreaming.md", "_decisions/0013-memory-reconciliation-probe.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: Open. Raised in DR-0012, reaffirmed in DR-0013 ("No client transcripts until the Chairman clears IP/confidentiality; none exist yet"). Distinct from the cost/beta escalation above — this one is about ownership of derived IP, not spend.

## D. Emergent operating principles

Recurring rules distilled from across the corpus. These are observations about what the
record consistently does, not new law — capped at Med per the task.

- insight/claim: AUTHENTICITY GATE — "do it for real or do not claim it": no external claim of conformance, lived-experience validation, AT-testing, or a track record is permitted until it is genuinely earned through the four gates; the company holds this standard before it has earned the evidence (pre-revenue, no panel, site not independently verified).
  sources[]: ["_decisions/0002-authenticity-guardrails.md", "_decisions/0010-pattern-library-v01-scope.md", "_decisions/0011-mission.md", "_decisions/0001-positioning-wedge.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Distilled recurring principle. Appears as the explicit subject of DR-0002, the claim boundary of DR-0010, and the "honest caveat" of DR-0011. Capped at Med (observation, not new law); the underlying DR-0002 rule is itself the authoritative source.

- insight/claim: ONE-DIRECTIONAL AUTHORITY — only the git-tracked operating record is authoritative, citable, and Chairman-visible; memory, dreams, and reconciliation candidates are private, mutable, non-authoritative hypothesis space that can reach the record ONLY by promotion through the gate, never by bypassing git; outputs re-enter the claim ladder at the bottom, never the top.
  sources[]: ["_decisions/0012-memory-and-dreaming.md", "_decisions/0013-memory-reconciliation-probe.md", "_decisions/0010-pattern-library-v01-scope.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Distilled principle; stated as "the load-bearing rule" in DR-0012 and the binding boundary in DR-0013. Capped at Med as a distillation; this very file is governed by it.

- insight/claim: HUMAN-ACCOUNTABLE / NO SIMULATION — roles that require lived experience or human sign-off (the disability-led panel, the human accountable for Iris/Janus claims) stay human and explicitly un-agented; the company will not build an AI that role-plays disabled users, and an agent's sign-off never substitutes for the lived-experience gate.
  sources[]: ["_decisions/0009-agents-constituted.md", "_decisions/0002-authenticity-guardrails.md", "_decisions/0010-pattern-library-v01-scope.md", "_decisions/0012-memory-and-dreaming.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Distilled recurring rule; the "no simulated lived experience" clause appears in DR-0002, DR-0009, DR-0010, and DR-0012. Frequency described, not used to raise tier. Capped at Med.

- insight/claim: REVERSIBILITY-TIERED DECISIONS — the company sorts decisions into two-way doors (any agent decides after advice, log and move on) and one-way doors (full team, may escalate to Chairman), and labels its own decisions accordingly; e.g. the memory pilot is explicitly framed as a reversible two-way door taken without escalation, while Dreaming is a one-way door requiring approval.
  sources[]: ["_decisions/0007-governance-model.md", "_decisions/0012-memory-and-dreaming.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Distilled operating principle; DR-0007 defines the tiers and DR-0012 applies the label explicitly to its own two sub-decisions. Capped at Med.

- insight/claim: PROVENANCE AS A PRECONDITION — every memory/candidate/dream entry must carry source + date + confidence + tier or it is ineligible for the evidence base; a dedup that strips provenance yields an ineligible entry; this rule is treated as non-negotiable across the memory decisions.
  sources[]: ["_decisions/0012-memory-and-dreaming.md", "_decisions/0013-memory-reconciliation-probe.md", "_decisions/0010-pattern-library-v01-scope.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Distilled principle; stated in DR-0012's conditions, DR-0013's spec, and applied in DR-0010's evidence-and-gaps section. Capped at Med.

- insight/claim: DEFENSIBILITY LIVES IN ASSETS, NOT PROSE — the recurring strategic rule is that the position is "underserved but not automatically defensible," so the moat must be proprietary assets (pattern library, scorecard, evidence base, re-test cadence, a disability-led panel) built before scaling go-to-market, not the marketing or the taste.
  sources[]: ["_decisions/0004-ip-first-moat.md", "_decisions/0001-positioning-wedge.md", "_decisions/0010-pattern-library-v01-scope.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Distilled principle; DR-0004 states it as its core finding, DR-0001 names it as the conditional, DR-0010 locates defensibility "in the evidence base + scorecard + re-test cadence, not the prose." Capped at Med.

## E. Stale / superseded / needing follow-up

- insight/claim: OPEN FOLLOW-UP — v0.2 pattern-library scope now has three candidate items (conversational error/recovery and reduced-motion generative loaders from DR-0010, plus accessible agent-memory & dreaming UX from DR-0012) but NO recorded prioritization decision; DR-0012 routed the call to Sol and it does not appear resolved in the log.
  sources[]: ["_decisions/0010-pattern-library-v01-scope.md", "_decisions/0012-memory-and-dreaming.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: The concrete open item behind Section B's scope-change finding. Needs a Sol decision record to close.

- insight/claim: OPEN FOLLOW-UP — DR-0008 (company name) is the one Provisional decision; it stays open until the Chairman approves a name and authorizes trademark clearance, after which it should move to Adopted or be replaced. Treat "Penumbra" as a changeable config value until then.
  sources[]: ["_decisions/0008-company-name.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: Tracks with the Section C name escalation; flagged here as the record-state item to update on resolution.

- insight/claim: NOT STALE (verified) — the first reconciliation pass (DR-0013) is fully reconciled with its promotions: the three promoted syntheses appear as "Supporting synthesis / Evidence note" blocks in DR-0001, DR-0003, and DR-0005, each dated 2026-05-29 and labeled with confidence + provenance, matching DR-0013's recorded disposition; no orphaned or contradicted promotion was found.
  sources[]: ["_decisions/0013-memory-reconciliation-probe.md", "_decisions/0001-positioning-wedge.md", "_decisions/0003-service-ladder.md", "_decisions/0005-pricing-posture.md"]
  date: 2026-05-29
  confidence: High
  tier: normative
  status: "candidate — design intent, unverified"
  recurrence-note: A reconciliation check, not a finding of staleness — logged so the next pass need not re-verify it. The promotion pipeline (candidate → review → labeled promotion) is internally consistent across these four records.

- insight/claim: NEEDS PERIODIC RE-CHECK — the regulatory dates underpinning DR-0006 (HHS §504 WCAG 2.1 AA, 11 May 2026; EAA in force; ADA Title II 2027/2028) sit in the research briefs, not the decision log, and at least one (EU AI Act timing) was flagged as in flux in the first pass; DR-0006's segment urgency depends on dates that should be re-confirmed before external use.
  sources[]: ["_decisions/0006-target-customers.md"]
  date: 2026-05-29
  confidence: Med
  tier: first-principles
  status: "candidate — design intent, unverified"
  recurrence-note: Cross-corpus follow-up — the decision log leans on dated regulatory facts maintained elsewhere; flagged so date-drift in the briefs propagates to a DR-0006 re-check, not silently. Capped at Med.

---

## Pass honesty note

The decision log is more interconnected than the research briefs but also more
internally disciplined, so the yield is a different shape: fewer surprises, more
structure made explicit. The genuinely useful output of this pass is **Section C** —
the first single consolidated list of all five open Chairman escalations (name/trademark,
disability-led panel funding, Dreaming cost+beta, client-transcript IP ownership, plus
the DR-0007 criteria), which no existing artifact gathers in one place.

On tensions: the v0.2 scope question (DR-0010 vs DR-0012) that the task asked to probe
is **a pending, self-disclosed scope change, NOT a contradiction** — DR-0012 names
DR-0010 and routes the priority to Sol. The only genuinely unsettled decision is the
provisional company name (DR-0008). I checked specifically for a frequency-laundering
violation (recurrence used to inflate confidence, forbidden by DR-0012/0013) and found
none — the promoted syntheses stayed at Med.

Sections A and D largely make the corpus's own internal logic explicit rather than
adding new claims; they are useful as a map, not as new evidence, and Section D is
honestly capped at Med as observation. Net: **modest new propositional content, real
organizational value** — chiefly the escalations roll-up.

## Review disposition (2026-05-29)

This candidate has been **reviewed**. **Section C (5 open Chairman escalations) and
Section E (open follow-ups: v0.2 prioritization, provisional name, regulatory-date
re-check) were promoted** into the new authoritative **Backlog & pipeline** page
(`_data/backlog.yml` → `/backlog/`). Sections A and D (dependency map + emergent
operating principles) were kept as candidate — useful as a map, not promoted, to
avoid duplicating the decisions' own text. This file remains a non-authoritative
candidate; the promotions live in the backlog and decision records, not here.
