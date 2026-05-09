# Jawab Automation & API Integration Guide

## What You Can Automate Right Now (No API Keys Needed)

### 1. Website Speed Audits — PageSpeed Insights

**Already built:** `04_System_and_Skills/clinic_audit_tool.py`

This script reads your clinic CSV and checks every website's mobile speed using Google's free PageSpeed API. No API key needed.

```bash
pip install httpx
python 04_System_and_Skills/clinic_audit_tool.py
```

### 2. Lead Scraping — Playwright (Already Built)

**Already built:** `04_System_and_Skills/mega_lead_scraper.py`

Scrapes Google Maps for dental clinics. Already works. Tips to make it better:

- Run in headful mode (already set)
- Add randomized delays between clicks (2-5 seconds)
- If Google blocks you, wait 30 minutes and try again
- Consider using a different Chrome profile to avoid CAPTCHA

```bash
pip install playwright
playwright install chromium
python 04_System_and_Skills/mega_lead_scraper.py
```

---

## What You Can Automate With Free Accounts

### 3. WhatsApp Cloud API (via Meta Developer Account)

This is your Twilio replacement. Free tier: 1,000 service conversations/month.

**Setup Steps:**

1. Go to https://developers.facebook.com
2. Click "My Apps" → "Create App"
3. Select "Business" type
4. Choose "Connect with customers through WhatsApp"
5. Link your Meta Business Portfolio (create one if needed)
6. Add WhatsApp product → Set up
7. Add your UAE phone number (the one you're getting)
8. Verify with SMS or voice call
9. Get your **Phone Number ID** and **WhatsApp Business Account ID**
10. Generate a **Temporary Access Token** for testing

**Sending a test message (Python):**

```python
import httpx

PHONE_NUMBER_ID = "your_phone_number_id"
ACCESS_TOKEN = "your_access_token"

url = f"https://graph.facebook.com/v21.0/{PHONE_NUMBER_ID}/messages"
headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Content-Type": "application/json"
}
payload = {
    "messaging_product": "whatsapp",
    "to": "971XXXXXXXXX",  # recipient number with country code
    "type": "text",
    "text": {"body": "Hi, this is a test from Jawab."}
}

response = httpx.post(url, headers=headers, json=payload)
print(response.json())
```

**Message Templates (for business-initiated messages):**

You need pre-approved templates for outbound messages. Create them in Meta Business Manager → WhatsApp → Message Templates.

Example template for missed call follow-up:

```
Name: missed_call_followup
Language: Arabic
Category: Marketing

Body:
أهلاً، لاحظنا إنك اتصلت بعيادة {{1}}. كيف نقدر نساعدك؟

Variables:
{{1}} = Clinic Name
```

**Webhooks (receiving messages):**

Configure in App Dashboard → WhatsApp → Configuration → Webhooks.
Point to your server URL (can use Make.com webhook URL instead of building a server).

### 4. Instagram Messaging API

Instagram DMs can be automated through the **Instagram Graph API** (Messenger platform for Instagram).

**Requirements:**
- Meta Developer account (same as WhatsApp)
- Instagram Professional account (Business or Creator)
- Facebook Page connected to the Instagram account
- App must have `instagram_manage_messages` permission

**What you can do:**
- Receive DMs via webhook
- Reply to DMs programmatically
- Send ice-breaker messages
- Cannot cold-DM strangers via API (only respond to existing conversations)

**For cold outreach on Instagram:** This must stay manual or use Instagram's built-in Quick Replies / saved responses. The API does not allow unsolicited first messages.

**For responding to clinic inquiries (client-side):** Once a patient DMs, you can auto-respond via webhook + API.

### 5. Make.com (Free Tier: 1,000 operations/month)

Make.com is the no-code glue between everything.

**Key scenarios to build:**

**Scenario 1: Missed Call → WhatsApp Recovery**
```
Trigger: Webhook (from phone system or manual input)
→ Lookup clinic details (Google Sheets)
→ Compose WhatsApp message (Arabic/English)
→ Send via WhatsApp Cloud API
→ Log to Google Sheets
→ Optional: alert clinic owner
```

**Scenario 2: New WhatsApp Reply → Staff Alert**
```
Trigger: WhatsApp webhook (incoming message)
→ Parse message
→ Lookup clinic
→ Format staff handoff summary
→ Send to staff contact via WhatsApp
→ Log to Sheets
```

**Scenario 3: Weekly Report Generator**
```
Trigger: Schedule (every Monday 9 AM)
→ Read week's data from Sheets
→ Calculate metrics
→ Format report
→ Send to clinic owner via WhatsApp/email
```

### 6. Google Sheets API (Free)

Use Google Sheets as your CRM until you need Airtable.

**Setup:**
1. Go to https://console.cloud.google.com
2. Create a project
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON key
6. Share your sheets with the service account email

**Python usage:**

```python
import gspread
from google.oauth2.service_account import Credentials

creds = Credentials.from_service_account_file("service_account.json", scopes=[
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
])
gc = gspread.authorize(creds)
sheet = gc.open("Jawab CRM").sheet1

# Add a new lead
sheet.append_row(["Dr. Thomas", "Dubai", "Implant", "WhatsApp", "2026-05-02"])
```

---

## What You Can Automate After First Client

### 7. Twilio (if you get it)

Twilio is useful for:
- SMS fallback
- Voice call detection (missed call trigger)
- WhatsApp Business API (alternative to Meta direct)

**If Twilio is hard to get**, skip it. Use Meta WhatsApp Cloud API directly + Make.com. Twilio is not a blocker.

### 8. Cal.com (Free Tier)

Booking link for clinic patients. Set up one booking page per clinic client.

```
URL: cal.com/jawab/[clinic-name]
Duration: 15 or 30 minutes
```

### 9. Vercel (You Have It)

Deploy your demos:

```bash
cd 03_Demo_and_Assets
# Create a vercel.json
echo '{"cleanUrls": true}' > vercel.json

# Deploy
npx vercel --prod
```

Your `jawab_demo.html` and `jawab_lost_patient_calculator.html` become live URLs you can send in outreach.

---

## Apify Alternative — Your Scrapers Are Fine

You asked if not having Apify is a problem. **No.**

Your `mega_lead_scraper.py` already:
- Scrapes 3 cities
- Clicks into each card for deep data
- Gets name, phone, website, rating

To make it more robust without Apify:

1. **Add random delays** (2-5 seconds between clicks)
2. **Add retry logic** for failed extractions
3. **Save progress incrementally** (so you don't lose data if it crashes)
4. **Run in batches** (20 clinics at a time, then pause)

If you want Apify later, their Google Maps Scraper gives you 100+ fields including emails and social links for about $5/1,000 results.

---

## Agentic Tools You Should Know About

### n8n (Self-Hosted Alternative to Make)

- Free, self-hosted
- More powerful than Make for complex workflows
- Can run on Render.com for free
- Useful if Make's 1,000 ops/month limit hits

### Composio / MCP Servers

- Connect AI models to real tools (Google, WhatsApp, Sheets, etc.)
- Useful for building AI agents that can actually execute tasks
- New and evolving fast

### Browser Automation Tools

- **Playwright** (what you already use) — best for scraping
- **Puppeteer** — alternative, also good
- **Selenium** — older, less recommended

### AI Coding Assistants

You already have Antigravity (me). Also useful:
- **Claude Code** — for longer coding sessions
- **Cursor** — AI-first code editor
- **v0.dev** — generate UI components from prompts (by Vercel)

---

## Priority Order: What To Set Up When

### Today (takes 30 min total)

- [ ] Deploy demos to Vercel
- [ ] Run `clinic_audit_tool.py` on your top 30

### This Week

- [ ] Set up Meta Developer Account
- [ ] Set up WhatsApp Cloud API with UAE number
- [ ] Set up Google Cloud project + Sheets API
- [ ] Set up Make.com free account
- [ ] Create first Make scenario (manual webhook → WhatsApp message)

### After First Client

- [ ] Build Make scenario for missed call → recovery
- [ ] Build Make scenario for weekly report
- [ ] Set up Cal.com booking pages
- [ ] Consider n8n if Make limits hit

### After 3 Clients

- [ ] Consider Apify for bulk scraping
- [ ] Consider Airtable if Sheets gets messy
- [ ] Consider HubSpot free CRM
- [ ] Consider Retell/Vapi for voice demo
