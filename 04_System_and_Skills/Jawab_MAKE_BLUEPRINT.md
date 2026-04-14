# Jawab Make Blueprint

## Stack

- `Twilio Studio`: inbound voice/SMS routing
- `Make.com`: orchestration and branching
- `Google Sheets` or `Airtable`: clinic, lead, and proof database
- `Cal.com`: booking links and optional booking webhooks
- `Retell`: sales demo and selective voice pilot only
- `Make Data Store`: optional lightweight state for opt-outs and workflow state

## Core Principle

The local Node backend is now a `logic spec`, not the production system.

Production for the 21-day sprint is:

`Twilio + Make + Sheets/Airtable + Cal.com`

## Data Model

### Table 1: Clinics

- `clinic_id`
- `clinic_name`
- `city`
- `timezone`
- `owner_name`
- `owner_whatsapp`
- `main_phone`
- `whatsapp_number`
- `instagram`
- `website`
- `trigger_mode`
- `voice_overflow_mode`
- `booking_link`
- `review_link`
- `entry_keyword`
- `consult_doctor_name`
- `consent_mode`
- `status`

### Table 2: Leads

- `lead_id`
- `clinic_id`
- `patient_phone`
- `patient_name`
- `source`
- `workflow_type`
- `language`
- `status`
- `pain_or_intent`
- `booking_status`
- `handoff_status`
- `last_inbound_at`
- `last_touch_at`
- `opt_out`
- `notes`

### Table 3: Outreach

- `clinic_id`
- `pain_proof`
- `channel`
- `status`
- `last_touch_date`
- `next_action`
- `warm_intro_path`
- `offer_angle`

## Scenario 1: Safe SMS-to-WhatsApp Entry

### Use

Default mode when clinic does not have a clean WhatsApp opt-in path.

### Trigger

- Twilio Studio receives missed call or unanswered branch

### Flow

1. `Twilio Studio`
   - inbound call to clinic routing number
   - no answer / busy / fallback branch
   - invoke Make webhook
2. `Make Webhook`
   - receive `From`, `To`, timestamp
3. `Lookup Clinic`
   - search clinic record by Twilio number
4. `Compose Entry Link`
   - generate `wa.me` link with `BOOK <entry_keyword>`
5. `Send SMS`
   - text patient:
   - clinic missed your call
   - continue on WhatsApp here
   - include opt-out language if relevant
6. `Log Lead`
   - create/update lead row in Sheets/Airtable
7. `Optional Owner Alert`
   - only if clinic wants real-time missed-call awareness

### Failure Points

- bad number formatting
- SMS sender not configured
- Twilio Studio branch misconfigured

## Scenario 2: Direct WhatsApp Recovery

### Use

Only for clinics with compliant WhatsApp opt-in or active service-window logic.

### Trigger

- inbound WhatsApp message via Twilio
- or approved template-triggered outbound recovery

### Flow

1. `Twilio WhatsApp Webhook`
   - send inbound event to Make webhook
2. `Lookup Clinic + Lead`
3. `Check Opt-Out`
   - stop if opted out
4. `Check Service Window`
   - if inside 24-hour customer service window, continue free-form
   - if outside, use approved template only
5. `Language Detection`
   - simple Arabic/English heuristic or branch by keyword
6. `State Branch`
   - new conversation -> ask name
   - after name -> ask issue
   - pricing/insurance/complex -> handoff
   - qualified -> send booking link or alert owner
7. `Log Outcome`
8. `Update last_inbound_at / last_touch_at`

### Failure Points

- WhatsApp template approval not ready
- assuming free-form is allowed outside the window
- mixing too many branches in one scenario

## Scenario 3: Consult Follow-up

### Use

High-value implant, veneer, cosmetic, and treatment-plan follow-up.

### Trigger Options

- staff updates row in Sheets/Airtable
- Make form submission
- scheduled check against “consult completed” rows

### Flow

1. `Trigger`
   - clinic staff submits patient details
2. `Lookup Clinic`
3. `Delay`
   - wait 24-48 hours
4. `Send WhatsApp Follow-up`
   - mention clinic name and doctor name
5. `On Reply`
   - booking link
   - owner handoff
   - FAQ response if safe
6. `Log Outcome`

### Failure Points

- staff not actually submitting consults
- overcomplicated branching
- sending follow-up without documented patient contact basis

## Scenario 4: Review Request

### Use

Post-visit honest review request only.

### Trigger

- staff marks checkout complete
- Make form submission

### Flow

1. `Trigger`
2. `Lookup Clinic + review_link`
3. `Send Review Request`
   - honest review ask
   - no incentives
   - no gating
4. `On Reply`
   - neutral/positive -> thank you
   - negative -> alert clinic owner
5. `Log Outcome`

### Failure Points

- trying to “generate 5-star reviews”
- review gating or sentiment filtering

## Scenario 5: Voice Overflow

### Use

Premium add-on only.

### Rule

Deploy only when clinic routing economics make sense.

### Allowed

- cloud PBX like `3CX`, `RingCentral`, similar
- sane local routing option

### Not Allowed

- blind UAE landline forwarding to expensive US endpoints

### Role in Sprint

- primary use now is `sales demo`
- secondary use is `selective pilot`

## Make Scenario Build Order

1. `Clinic lookup + data model`
2. `Safe SMS-to-WhatsApp entry`
3. `Inbound WhatsApp recovery`
4. `Owner alert`
5. `Consult follow-up`
6. `Review request`
7. `Weekly proof report`

## Weekly Report Output

- clinic name
- week range
- missed conversations detected
- conversations recovered
- qualified leads
- booking links sent
- human handoffs
- consult follow-ups sent
- review requests sent
- top objection
- next recommendation

## Rules

- keep each workflow in a separate Make scenario
- do not overbuild multi-tenant logic on day one
- do not rely on your laptop
- do not promise voice deployment unless routing is already confirmed
- do not use more automation than the clinic can operationally handle
