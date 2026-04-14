# Jawab Backend

This backend now supports the `hybrid` Jawab model:

- `Mode A`: safe SMS-to-WhatsApp entry for missed calls
- `Mode B`: direct WhatsApp recovery for clinics with compliant opt-in
- `Mode C`: staff-triggered follow-up for consult and review workflows

## Endpoints

- `POST /webhook/call`
  - Twilio voice webhook
  - sends either:
    - SMS with WhatsApp entry link, or
    - direct WhatsApp recovery message
- `POST /webhook/whatsapp`
  - Twilio WhatsApp webhook
  - handles inbound patient conversation
- `POST /workflow/trigger`
  - internal/staff-trigger endpoint
  - supports:
    - `consult_followup`
    - `review_request`

## Trigger Modes

Set per tenant in `src/config/tenants.json`.

- `sms_to_whatsapp`
  - safest default
  - missed call triggers SMS with `wa.me` link and routing keyword
- `direct_whatsapp`
  - only use when the clinic already has a compliant WhatsApp opt-in path
- `staff_trigger`
  - use for post-consult and post-visit follow-up workflows

## Workflow Trigger Payload

```json
{
  "clinicId": "demo_clinic",
  "patientNumber": "+971500000000",
  "workflowType": "consult_followup",
  "patientName": "Sara",
  "preferredLanguage": "ar",
  "doctorName": "Dr. Noor"
}
```

Optional header:

```text
x-jawab-key: <WORKFLOW_API_KEY>
```

If `WORKFLOW_API_KEY` is not set in `.env`, the endpoint stays open for local MVP usage.

## Required Tenant Fields

- `clinicId`
- `entryKeyword`
- `twilioNumber`
- `triggerMode`
- `voiceOverflowMode`
- `bookingLink`
- `alertWhatsApp`
- `consultFollowupEnabled`
- `reviewFlowEnabled`

## Current Flow Behavior

### Recovery Sprint

1. patient misses the clinic
2. Jawab sends SMS or WhatsApp depending on trigger mode
3. patient enters WhatsApp flow
4. Jawab captures name
5. Jawab captures issue
6. Jawab alerts owner
7. Jawab sends booking link or hands off

### Consult Follow-up

1. staff triggers the workflow manually
2. patient gets a WhatsApp follow-up
3. any reply is treated as a live opportunity
4. Jawab alerts owner and sends booking link if configured

### Review Request

1. staff triggers the workflow manually
2. patient gets an honest review request with the clinic link
3. negative replies alert the owner

## Run

```powershell
npm install
npm run start:live
```

Keep the terminal open while testing. `start:live` boots Express and opens a localtunnel URL for Twilio webhooks.
