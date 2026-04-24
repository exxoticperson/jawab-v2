# External Skill Intake

This file records what was actually useful from the external repos and local Antigravity material. It is a filter, not a second source of truth.

## Final Rule

Do not install or copy full external systems into Jawab unless they directly improve this week's execution.

Useful patterns become small local skills. Everything else stays reference-only.

## Sources Reviewed

- `gsd-build/gsd-2`
- `gsd-build/get-shit-done`
- `snarktank/ralph`
- `coleam00/Archon`
- `multica-ai/multica`
- `superryeti/Email-Crawler-Lead-Generator`
- `xeneta/LeadQualifier`
- local Antigravity Jawab files under `C:\Users\x\.gemini\antigravity\brain`

## Patterns To Keep

### Source-Of-Truth Fidelity

Borrowed from GSD planning and verification agents.

Before generating strategy, copy, pricing, or dashboard changes, check the current Jawab source-of-truth files and reject older archived pricing or voice-first positioning.

Local skill: `source_of_truth_guard.md`

### Small Verifiable Work Units

Borrowed from Ralph PRD/story sizing.

Break work into small tasks that can be completed and checked in one session. Avoid vague tasks like "make dashboard better" unless converted into concrete acceptance criteria.

Local skill: `execution_verification.md`

### Goal-Backward Verification

Borrowed from GSD verifier.

Do not trust summaries. Verify the actual file, row, message, or screenshot exists and supports the goal.

Local skill: `execution_verification.md`

### Lead Pain Extraction

Borrowed from Antigravity Jawab lead material.

Every lead should have one concrete pain proof before outreach: missed call, broken website, no WhatsApp path, booking friction, review complaint, or high-ticket service leak.

Existing skill: `lead_pain_proofing.md`

### Dialect And Market Copy

Borrowed from Antigravity's Gulf translator and Majlis-level tone concepts.

Use Arabic only when it helps trust, and avoid stiff MSA. Do not fake a dialect if uncertain; keep the message short and natural.

Local skill: `gulf_dialect_copy.md`

### Economic Loss Audit

Borrowed from Antigravity's economic impact auditor concept.

Translate the pain into clinic money: missed implant consult, unbooked veneer inquiry, delayed WhatsApp reply, or patient going to the next clinic.

Local skill: `clinic_economic_audit.md`

### Lightweight Agent Roles

Borrowed from Multica and the existing Jawab operating model.

Agents are role boundaries, not bureaucracy. Keep roles to OS, Leads, Outreach, Assets, Ops, and Skill-Writer.

Existing file: `Jawab_AGENT_OPERATING_MODEL.md`

## Patterns To Ignore For Now

- Full GSD/Archon/Ralph orchestration engines.
- Autonomous long-loop coding systems.
- Heavy local agent daemons.
- Machine-learning lead scoring from `LeadQualifier`.
- Bulk email crawling as the first channel.
- Social intent scraping, ad spying, trend sentinels, and 24/7 monitoring.
- Any skill from the 60-skill manifest that does not help outreach, proof, or closing this week.

## Repo-Specific Takeaways

### GSD / Get Shit Done

Keep: planning discipline, locked-decision fidelity, verification gates, anti-scope-drift checks.

Skip: installing the whole system, complex phase machinery, large agent taxonomies.

### Ralph

Keep: one-task-per-session sizing, acceptance criteria, dependency order.

Skip: autonomous PRD execution loops for Jawab business ops.

### Archon

Keep: deterministic workflow thinking.

Skip: YAML workflow engine for now.

### Multica

Keep: agents as named teammates with role ownership.

Skip: managed agent platform setup.

### Email Crawler

Keep: later backup email extraction from clinic websites.

Skip: using scraping as the first GTM motion.

### LeadQualifier

Keep: the idea that lead scoring needs labeled outcomes.

Skip: ML scoring until Jawab has enough real outreach and close data.

## When To Revisit

Revisit external tooling only after one of these happens:

- 100+ manual touches create repeated enrichment pain.
- 2+ clinics are live and reporting becomes repetitive.
- The dashboard needs a serious interaction redesign.
- Outreach replies reveal a repeatable objection pattern.
- A workflow is repeated 3 times and still costs attention.
