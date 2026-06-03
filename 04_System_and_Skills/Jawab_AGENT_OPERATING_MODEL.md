# Jawab Agent Operating Model

## Command Structure

This chat is the `Orchestrator`.

Everything else reports back here.

## Active Roles

### 1. Jawab-OS

The main orchestrator.

Owns:

- strategy
- priorities
- pricing approval
- offer scope
- stack decisions
- final outbound approval
- final implementation approval

### 2. Jawab-Leads

Owns:

- target list quality
- clinic ranking
- pain-proof collection
- contactability
- warm intro paths
- daily top-10 batch

Output format:

- clinic
- pain proof
- best first channel
- reason this clinic now
- next action

### 3. Jawab-Outreach

Owns:

- WhatsApp voice note scripts
- IG DMs
- manual emails
- follow-ups
- objection snippets
- call prep bullets

Output format:

- first message
- follow-up
- reason angle was chosen
- risk note if any

### 4. Jawab-Assets

Owns:

- one-page offer
- Loom/demo script
- onboarding checklist
- proof/report formatting
- case-study drafts

Output format:

- polished copy
- short asset structures
- close-ready collateral

### 5. Jawab-Ops

Owns:

- Twilio/Make workflow design
- deployment instructions
- CRM/logging structure
- workflow SOPs
- technical risk notes

Output format:

- implementation-ready blueprint
- field definitions
- failure points

### 6. Skill-Writer

Owns:

- task framing before execution
- reusable local skill creation
- existing skill reuse checks
- adjacent-skill adaptation
- prompt quality upgrades for recurring work

Output format:

- cleaned task brief
- matched skill or no-skill decision
- new skill recommendation when repetition is real
- short routing note

## Jawab Agentic: Deployed Agent Roles & Rules

For client deployments of the premium Jawab Agentic tier (AED 8,500 setup), the system deploys three specialized autonomous agents that coordinate with each other and the clinic's staff.

### 1. Mystery Shop Auditor Agent
- **Ownership**: Technical setup by `Jawab-Ops`; persona scripts by `Jawab-Outreach`.
- **Trigger**: Runs autonomously 3 times per week at randomized times (peak hours, lunch breaks, and after-hours).
- **Behavior**: Uses virtual numbers and diverse patient personas (e.g., cosmetic consultation, emergency crown, booking reschedule) to test WhatsApp, phone lines, and web forms.
- **Reporting**: Measures exact response times, language accuracy (Arabic/English), and path friction. Pushes raw audit logs to the Daily WhatsApp Brief Agent.
- **Guardrail**: Never tests the same clinic channel more than once in a 24-hour window to avoid disrupting normal staff operations.

### 2. WhatsApp Recovery Agent
- **Ownership**: Configured by `Jawab-Ops` using the clinic-approved handbook curated by `Jawab-Assets`.
- **Trigger**: Activated when a patient thread is flagged as "dropped" (e.g., no response to a treatment plan within 24 hours, missed call backup, or after-hours WhatsApp message).
- **Behavior**: Engages the patient in bilingual (Arabic/English) natural chat. Qualifies patient interest, answers procedure/pricing FAQs, and pushes them to book.
- **Handoff Rules**:
  - **Medical Advice / Diagnosis**: The agent must reply: *"For your safety, I will have our clinical team contact you directly to discuss this details."* and sets status to `STAFF_HANDOFF`.
  - **Frustration / Complaints**: Halts automated messages instantly and sends a high-priority alert to the clinic staff.
  - **Booking**: Logs details in the recovery tracker and schedules a staff verification check.

### 3. Daily WhatsApp Brief Agent
- **Ownership**: Setup and formatting verified by `Jawab-Ops` and `Jawab-Assets`.
- **Trigger**: Runs automatically every morning at 8:00 AM (local clinic time).
- **Behavior**: Consolidates and formats data from the Auditor and Recovery Agent from the previous 24 hours.
- **Output**: Pushes a structured summary via WhatsApp to the clinic owner containing:
  - *Leak Alerts*: Audit response time failures or broken paths.
  - *Recoveries*: Number of patients qualified and booked, with estimated saved revenue.
  - *Staff Tasks*: Highlighted manual handoffs or unresolved complex patient inquiries.

## Rules

- Only `Jawab-Leads` changes lead ranking or enrichment logic.
- Only `Jawab-Outreach` writes outbound copy and designs Mystery Shop personas.
- Only `Jawab-Assets` creates collateral and approves client handbooks.
- Only `Jawab-Ops` changes delivery mechanics, setups Jawab Agentic integrations, and monitors agent status.
- Only `Skill-Writer` decides whether a recurring workflow should become a reusable local skill.
- Only `Jawab-OS` changes strategy.
- All deployed Jawab Agentic runs must strictly adhere to the Medical Advice and Frustration handoff rules.

## Daily Rhythm

### Start of Day

Jawab-OS defines:

- today’s top objective
- today’s top 10 clinics
- active offer

### Mid-Cycle

- Jawab-Leads updates target quality
- Jawab-Outreach drafts messages
- Jawab-Assets updates demo/offer collateral
- Jawab-Ops handles delivery blockers
- Skill-Writer checks whether the task should route through an existing skill or create a new one

### End of Day

Jawab-OS records:

- what was sent
- who replied
- what objections appeared
- what to change tomorrow

## Memory Hub in This Chat

Keep the running state in these sections:

- `Offer`
- `Pricing`
- `Current stack`
- `Today’s top 10 clinics`
- `Warm intro opportunities`
- `Live assets`
- `Objections seen`
- `Active experiments`
- `Blocked items`
- `Next actions`
- `Active skills`
- `Skills to create next`
- `External patterns accepted`
- `External patterns rejected`

## Current Operating Decision

- production path: `Twilio + Make + Sheets/Airtable + Cal.com`
- local Node backend: `reference spec only`
- sales focus: `top 10 UAE clinics first this morning, then warm intros in parallel`

## External Skill Intake

External repos and Antigravity materials are treated as pattern sources, not automatic dependencies.

Before importing anything, route through:

- `source_of_truth_guard`
- `execution_verification`
- `EXTERNAL_SKILL_INTAKE.md`

Current accepted patterns:

- source-of-truth fidelity
- small verifiable work units
- goal-backward verification
- lead pain extraction
- Gulf dialect copy
- conservative economic audit
