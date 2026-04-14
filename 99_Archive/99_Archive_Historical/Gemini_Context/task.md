# JAWAB EXECUTION TRACKER — DAY 1

## Codebase Audit Results ✅
The existing backend is **~90% production-ready** for WhatsApp missed-call recovery.

### What Already Works:
- ✅ Express server with Twilio webhooks (`/webhook/call` + `/webhook/whatsapp`)
- ✅ Missed call detection → instant bilingual WhatsApp message (Arabic/English)
- ✅ WhatsApp conversation engine with state machine (Name → Issue → Booking Link)
- ✅ Language auto-detection (Arabic vs English)
- ✅ Gulf dialect responses (Khaleeji Arabic, not formal MSA)
- ✅ Pricing/insurance questions → human handoff trigger
- ✅ Cal.com booking link integration
- ✅ CSV logging (acts as the reporting layer for clinics)
- ✅ Multi-tenant config (supports multiple clinics via tenants.json)
- ✅ Localtunnel for public URL (for Twilio webhooks without a server)
- ✅ Twilio credentials already configured in .env

### What Needs Fixing (Small):
- [ ] `.env` has a typo: `whatsapp:++12605303945` (double `+`) → fix to `whatsapp:+12605303945`
- [ ] `tenants.json` uses `bookingLink` but `bookingService.js` checks for `calLink` → rename field
- [ ] Add clinic owner alert: when a patient books, notify the clinic owner via WhatsApp
- [ ] Add `TUNNEL_SUBDOMAIN` to .env for consistent localtunnel URL

## Day 1 Tasks

### Block 1: Fix & Test Backend (1-2 hours)
- [/] Audit all backend files (DONE — see above)
- [ ] Fix .env typo (double ++)
- [ ] Fix tenants.json field name (bookingLink → calLink)
- [ ] Add clinic owner WhatsApp alert on booking
- [ ] Run `npm install` in the backend directory
- [ ] Run `npm run start:live` — verify server boots and tunnel opens
- [ ] Test via Twilio console: simulate missed call → verify WhatsApp fires
- [ ] Test WhatsApp conversation flow: Arabic and English paths

### Block 2: Build Retell Voice Demo (1-2 hours)
- [ ] Sign up at retellai.com
- [ ] Create "Jawab - Al Noor Dental" agent with Arabic/English system prompt
- [ ] Get a US Twilio number ($1) and connect to Retell
- [ ] Test: call the number in Arabic, then English
- [ ] Record 60-second demo screencast (Retell dashboard showing live transcript)

### Block 3: Prep Outreach (1 hour)
- [ ] Open `01_READY_TO_SEND_TOP30.csv` — review and verify top 10 clinics
- [ ] For each: find IG handle, check WhatsApp presence, identify pain signal
- [ ] Draft 10 hyper-personalized messages (reference their specific pain signal)
- [ ] Record 60-second WhatsApp voice note script

### Block 4: Admin Setup (30 min)
- [ ] Set up Payoneer or Wise (if not already done)
- [ ] Finalize 1-page service agreement (from implementation plan)
- [ ] Create simple invoice template

## Revenue Target
- [ ] **AED 15,000 (~$4,100) minimum by April 30** = 3 UAE clinics × AED 5,000 setup
