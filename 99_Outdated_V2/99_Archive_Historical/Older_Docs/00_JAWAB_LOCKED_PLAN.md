# Jawab Locked Plan

## Core Decision

Jawab is a `Dental Patient Recovery Infrastructure` offer.

We are not leading with:

- AI receptionist
- full front-desk replacement
- lead generation
- deep clinic software integrations

We are leading with:

`Jawab helps private dental clinics recover missed, delayed, and post-consult patient conversations in Arabic and English before they leak to another clinic.`

## Business Model

### Primary Offer

`Jawab Recovery Sprint`

Includes:

- missed-call recovery
- missed-inquiry follow-up
- bilingual Arabic/English qualification
- booking link delivery or staff handoff
- weekly recovery report

### Add-Ons

- `Jawab Consult Follow-up`
- `Jawab Reviews`
- `Jawab Voice`
- `Jawab Digital Foundation`

## Pricing

- UAE founding offer: `AED 5,000 upfront` including setup + first 30 days, then `AED 1,500/month`
- UAE floor: `AED 3,500 upfront`
- Egypt semi-warm offer: `EGP 25,000 upfront`, then `EGP 7,500/month`
- Consult follow-up add-on: `AED 750-1,500/month`
- Reviews add-on: `AED 750-1,250/month`
- Website upsell: `AED 6,000-15,000`

## Guarantee

- setup is non-refundable after deployment
- if the sprint does not produce `5 qualified recovery conversations` in 14 days, continue optimizing free until it does or the clinic exits before month 2

## Stack Decision

For the next 21 days:

- production path: `Twilio + Make.com + Google Sheets/Airtable + Cal.com`
- voice: `Retell` for demo and selective premium pilot only
- local Node backend: `reference spec only`, not the production backbone

## Trigger Modes

### Mode A: Safe SMS-to-WhatsApp Entry

- default mode
- missed call triggers SMS with WhatsApp entry link
- safest for compliance and speed

### Mode B: Direct WhatsApp Recovery

- only for clinics with compliant opt-in or approved WhatsApp path

### Mode C: Staff-Triggered Follow-up

- used for consult follow-up and review-request flows

## Voice Rule

- voice is a demo weapon first
- voice is a premium add-on second
- deploy voice overflow only if routing economics and infrastructure are sane
- do not blindly forward UAE landlines to US numbers

## GTM Order

1. warm and semi-warm dental network
2. top 10 UAE clinics from the working list
3. rest of top 30 UAE clinics
4. wider UAE database
5. KSA later, after proof

## Daily 3-Hour Rhythm

### Hour 1

- research 10 clinics
- verify Instagram, website, WhatsApp path, and service focus
- record one pain proof

### Hour 2

- send personalized WhatsApp voice notes, IG DMs, and manual emails
- ask 2 warm contacts for intros

### Hour 3

- reply to all warm responses
- send demo link
- run calls
- close on Recovery Sprint

## Today’s First 10 Clinics

1. Hollywood Smile Clinic
2. Dr. Michael's Dental Clinic
3. Dentzz Dental Care Centre
4. Leila Hariri Dental & Medical Aesthetics
5. NOA Dental Clinic
6. Dr Joy Dental Clinic
7. DRFK Turkish International Day Surgery Center LLC
8. Dr Pauls Dental Clinic LLC
9. Sejovi Dental & Implant Center
10. Dentist Direct Dubai

## Current Priorities

1. finalize the top-10 working sheet with pain-proof notes
2. finalize one WhatsApp recovery demo
3. finalize one voice demo
4. finalize one-page offer
5. start outreach

## Do Not Do Right Now

- do not keep researching endlessly
- do not make the local backend your production system
- do not build n8n locally unless absolutely necessary
- do not overbuild lead-gen or websites before first closes
- do not promise integrations you cannot deploy this week
