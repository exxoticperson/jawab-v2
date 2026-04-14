# JAWAB — Final Operating Blueprint v3

> **Gulf-first, Arabic-English missed-call recovery, WhatsApp booking & voice answering system for dental clinics**
> *Final optimization pass — March 21, 2026*

---

## 1 · EXECUTIVE VERDICT

You are a dentist who has worked customer service. You understand the front-desk failure from both sides. That is the moat — not the tech stack, not the AI label.

**Jawab is not "just a WhatsApp bot."**

Jawab is a **bilingual AI front-desk system** that recovers missed calls via WhatsApp *and* answers calls with an AI voice receptionist — in Arabic and English. WhatsApp deploys first because it's faster, cheaper, and easier to prove. Voice answers calls as the upgrade layer. Both are part of the product from Day 1 in positioning and selling.

**Positioning line:**
> *كل مكالمة لها جواب — Every call gets a Jawab.*

**Pitch (15 seconds):**
> *Jawab catches your clinic's missed calls and answers them — via WhatsApp instantly, and by voice when you're ready. Arabic and English. Automatically.*

**Offer framing:**
> *500 AED to set up. 900/month to run. 14-day money-back guarantee. If we don't recover your missed patients, full refund. You keep every lead either way.*

**Founder closing line:**
> *"I'm a dentist who's worked the front desk. I know what happens when that phone rings and nobody picks up — the patient calls someone else. That's why I built Jawab. Can I show you what it does in 60 seconds?"*

**The name angle — use it everywhere:**
- *"Every patient deserves a Jawab"* (every patient deserves an answer)
- *"Your clinic's Jawab"* (your clinic's answer)
- *"Jawab — لا مكالمة بدون رد"* (no call without a reply)
- Use the Arabic double meaning in every pitch: Jawab = answer AND the solution. Gulf clinic owners will get it instantly.

---

## 2 · WHAT CHANGES FROM V2

| Area | V2 | V3 | Why |
|------|----|----|-----|
| **Product positioning** | "WhatsApp-first recovery system" | "Bilingual AI front-desk: WhatsApp recovery + voice answering" | Not a WhatsApp bot. Full front-desk AI. Voice is in the offer even if WhatsApp ships first. |
| **Lead sourcing** | Manus only | Manus + Google Maps API + Google Places scraping | Google native tools are free/cheap, structured, and keep working after Manus expires |
| **Payment** | Bank transfer + Wise | Tap (Gulf-native) + Stripe + card links | Bank transfer has friction. Tap is the Stripe of the Gulf — card payments, instant, no wire hassle |
| **Pricing floor** | 250 AED allowed in escalation | Hard floor: 500 setup / 900 monthly. No discounting. | Dental clinics in the Gulf spend more on a single crown. Don't undervalue. |
| **Gulf Arabic dialect** | "Test with Gulf Arabic" | Full dialect guide with Khaleeji phrases built into conversation engine | Gulf dialect is the trust signal. MSA sounds robotic. Khaleeji sounds real. |
| **Onboarding** | Checklist in blueprint | Professional standalone onboarding document clinic can review independently | Clinic owner must understand Jawab even when founder isn't talking |
| **Jawab branding** | Name mentioned | Name weaponized in every script, pitch, close, and demo | The Arabic angle is the strongest creative asset. Use it 10x harder. |
| **Codex build scope** | Minimal MVP | Future-proofed: multi-tenant, modular engine, structured logging | Build once properly. Don't touch MVP again. |
| **Voice layer** | "Later, ignore for now" | In the offer and demo as upcoming capability. V1 deploys WhatsApp. V1.5 adds voice. | Clinics buy the vision. Voice is the exciting part. WhatsApp is the working part. |

---

## 3 · MARKET SEQUENCING

### Dubai → Sharjah → Abu Dhabi (Then Saudi)

| City | Wave | Why |
|------|------|-----|
| **Dubai** | Wave 1 (Days 1–14) | Highest premium private dental density. Most bilingual. Most Instagram-active. Most receptive to tech. Easiest to research. |
| **Sharjah** | Wave 2 (Days 10–21) | Adjacent, same ecosystem, slightly less saturated. Strong mid-tier clinics. |
| **Abu Dhabi** | Wave 3 (Days 14–28) | Premium but more corporate/chain. Longer sales cycles. Enter with Dubai proof. |
| **Riyadh + Jeddah** | Wave 4 (Month 2+) | Massive but Arabic-dominant, different business culture. Needs proof + testimonial. |

---

## 4 · ICP & TARGET CLINIC PROFILE

| Attribute | Criteria |
|-----------|----------|
| **Type** | Private dental clinic, owner-operated or manager-accessible |
| **Size** | 1–3 locations |
| **Specialty** | Cosmetic, implant, or aesthetic dentistry (highest patient LTV, most competitive, most urgent about missed calls) |
| **City** | Dubai → Sharjah → Abu Dhabi |
| **Digital signal** | Active Instagram, Google Business listing, website |
| **Pain signal** | Google reviews mentioning call issues, wait times, "couldn't reach," booking friction |
| **Decision maker** | Owner-dentist or clinic manager |
| **Disqualifier** | Large chains, no online presence, dedicated call centers |

---

## 5 · OFFER & COMMERCIAL STRUCTURE

### The Offer

| Element | Detail |
|---------|--------|
| **Setup fee** | 500 AED (one-time) |
| **Monthly** | 900 AED/month |
| **What's included** | Missed call → instant WhatsApp recovery (bilingual AR/EN) → patient intake → booking request/link → staff alerts → weekly recovery report. Voice call answering included in Growth tier. |
| **Guarantee** | 14-day money-back: if system doesn't generate ≥ 5 qualified missed-call recovery conversations, full refund of setup + first month |
| **Guarantee boundary** | Covers system outcomes only: missed-call detections, messages sent, patient replies, booking requests. Does NOT guarantee revenue, show-up rates, or treatment acceptance. |

### Offer Ladder

| Tier | Setup (AED) | Monthly (AED) | What's Included |
|------|-------------|---------------|-----------------|
| **Starter** | 500 | 900 | WhatsApp missed-call recovery, bilingual, FAQ handling, staff alerts, weekly report |
| **Growth** | 1,500 | 1,800 | + Voice call answering (AI receptionist), appointment reminders, no-show follow-up, monthly analytics |
| **Scale** | Custom | Custom | + Multi-location, PMS integration, custom workflows, premium support |

> [!IMPORTANT]
> **Sell the full vision, deploy in layers.** When pitching, position Jawab as a complete AI front-desk system (WhatsApp + voice). Start delivery with WhatsApp because it ships faster. Add voice as the paid upgrade. Clinics buy the future, not just the present feature.

### Pricing Floor

**Hard floor. Do not go below these numbers:**
- Minimum setup: 500 AED
- Minimum monthly: 900 AED
- A Gulf dental clinic spends more than 900 AED on a single porcelain crown. Your system recovers multiple patients per month. Do not undervalue.

### Payment Methods

| Method | Use Case |
|--------|----------|
| **Tap** (tap.company) | Gulf-native payment gateway. Card payments, instant. The "Stripe of the Gulf." Best for recurring billing. |
| **Stripe** | International fallback. Works if clinic prefers card payment via link. |
| **Card payment link** | Send a simple payment link via WhatsApp after closing. Lowest friction. |
| **Instapay / Vodafone Cash** | Egypt-only fallback for warm-intro Egyptian clients. Not for Gulf pipeline. |

> [!TIP]
> **Set up a Tap account immediately.** Free to register. You'll have a payment link ready before your first close. No bank transfer friction, no "waiting for wire" delays.

---

## 6 · V1 PRODUCT DEFINITION

### Core Flow

```
Missed Call (Twilio detects unanswered)
    ↓ (< 30 seconds)
Instant WhatsApp Message (bilingual: Arabic + English)
    ↓
Patient Replies → Language locked to their choice
    ↓
Short Intake: name, concern, preferred time
    ↓
[Decision Gate]
  → Simple booking → Cal.com link or manual request
  → FAQ (hours, location, parking) → Auto-answer
  → Clinical / complex / insurance → Human handoff
    ↓
Confirmation + Logging (Google Sheets)
    ↓
Staff Alert (WhatsApp or email to clinic owner)
```

### Gulf Arabic Dialect Guide

> [!IMPORTANT]
> **MSA (فصحى) sounds robotic in WhatsApp. Gulf dialect (خليجي) sounds real.** The conversation engine must use Khaleeji-flavored Arabic, not formal Arabic.

| Context | ❌ MSA (Robotic) | ✅ Khaleeji (Natural) |
|---------|-----------------|----------------------|
| Greeting | مرحباً بك في عيادتنا | هلا والله! أهلاً فيك |
| Sorry we missed you | نعتذر عن عدم الرد على مكالمتك | سوري ما قدرنا نرد عليك |
| How can I help? | كيف يمكننا مساعدتك؟ | شلون أقدر أساعدك؟ |
| Would you like to book? | هل ترغب في حجز موعد؟ | تبي تحجز موعد؟ |
| What time works? | ما الوقت المناسب لك؟ | متى يناسبك؟ |
| Got it | تم استلام طلبك | تمام، وصلني |
| One moment | لحظة من فضلك | لحظة وأرتب لك |
| Thank you | شكراً لتواصلكم معنا | مشكور/ة، تسلم/ي |
| Goodbye | مع السلامة ونتمنى لك يوماً سعيداً | الله يسلمك، نشوفك إن شاء الله |

**Implementation rules:**
- First message: Semi-formal Gulf (هلا! لاحظنا إنك اتصلت — شلون نقدر نساعدك؟)
- Subsequent messages: Match patient's formality level
- If patient uses MSA → reply in MSA. If patient uses dialect → reply in dialect.
- Common Gulf expressions to recognize: إي (yes), لا (no), إن شاء الله (God willing = yes/maybe), يعطيك العافية (thank you/greeting), الحين (now), وايد (very/a lot), زين (good/okay)
- Handle transliterated Arabic (Arabizi): "shloon a7jz maw3d?" = "how to book appointment?"

### Behavior Rules

| Scenario | Response |
|----------|----------|
| Missed call — business hours | WhatsApp within 30s: "هلا! سوري ما قدرنا نرد — شلون أقدر أساعدك؟ / Hi! Sorry we missed your call — how can I help?" |
| Missed call — after hours | "حالياً مقفلين بس أقدر أحجز لك بكرة. متى يناسبك؟ / We're closed but I can book you for tomorrow. What works?" |
| Patient sends voice note | "يا هلا! أقدر أساعدك أكثر بالكتابة — ممكن تكتب لي سؤالك؟ 😊" |
| Clinical question | Immediate handoff: "سؤال حلو — خلني أوصلك بالفريق الطبي عشان يعطونك الجواب الصح" |
| Angry / urgent | "أفهمك وما ألومك. خلني أوصلك بأحد من الفريق حالياً" |
| Can't understand | "ممكن توضح لي أكثر؟" + handoff after 2 unclear rounds |
| Returning caller | "هلا! رجعت لنا — شلون أقدر أساعدك هالمرة؟" |
| 2-hour timeout (business hours) | One follow-up: "بس أتأكد — بعدك تبي تحجز؟" Then stop. |

### Patient-Side Principles

- Feels like texting a helpful clinic assistant in Khaleeji Arabic or natural English
- No menus, no numbered options — conversational only
- First message arrives before patient calls another clinic
- Any confusion → human handoff, never loops

### Clinic-Side Experience

- **Zero training.** Staff alert when handoff needed + weekly report.
- **No new software.** Alerts via WhatsApp/email. Reports via Google Sheet.
- **Onboarding: 30 minutes max.** Professional onboarding document sent beforehand.

### V1.5 Roadmap (Voice — Sell Now, Deploy After First 3 Clients)

| Component | Tool | Status |
|-----------|------|--------|
| AI voice receptionist (inbound calls) | Vapi or Retell | Builds after WhatsApp proven |
| Bilingual voice (Arabic + English) | ElevenLabs voice clone + Vapi | Test after 3 paying clients |
| Call → WhatsApp escalation | Twilio call forwarding → voice AI → WhatsApp follow-up | Architecture designed in V1, deployed in V1.5 |

**In every pitch, say:** *"Jawab handles missed calls on WhatsApp today. Voice call answering is coming next — same system, same dashboard, same languages."*

### Success Metrics

| Metric | Target |
|--------|--------|
| Time to first response | < 30 seconds |
| Patient reply rate | > 40% |
| Booking conversion (from replied) | > 25% |
| Recovered bookings per clinic per week | ≥ 3 |
| First paid client | Within 14 days |

---

## 7 · LEAD SOURCING SYSTEM

### Volume Layers

| Layer | Volume | Purpose |
|-------|--------|---------|
| **Full sourced** | 300–500 clinics | Total pipeline across Dubai, Sharjah, Abu Dhabi |
| **Outbound batch** | Top 100 | Immediate outreach pool |
| **High-personalization** | Top 30 | Hand-crafted outreach per clinic |

### Sourcing Tools (Layered)

**Layer 1: Manus (this week — time-limited)**
- Primary scraping engine for bulk data
- Handles: Google Maps extraction, review analysis, Instagram profiles, websites
- Output: Full enriched spreadsheet → see separate Manus prompt file

**Layer 2: Google Maps Platform (ongoing after Manus expires)**

| Tool | Use | Cost |
|------|-----|------|
| **Google Maps / Places API** | Programmatic extraction of dental clinics by city + category | $0.032/request (Nearby Search). ~$16 for 500 clinics. |
| **Google Business Profile** | Review text, ratings, phone numbers, hours, photos | Included in Places API response |
| **Outscraper** (outscraper.com) | No-code Google Maps scraper. Enter "dental clinic Dubai" → get CSV with name, phone, rating, reviews, website | Free tier: 500 records. Paid: $3/1000. |

**Layer 3: Instagram Research**
- Manual or scripted profile analysis for cosmetic/implant clinics
- Look for: follower count, posting frequency, WhatsApp in bio, DM responsiveness

**Layer 4: Google Sheets Enrichment Pipeline**
- All sources feed into one master Google Sheet
- Auto-score ICP fit using a formula: specialty match (1pt) + digital presence (1pt) + pain signals (1pt) = 0-3 score
- Sort descending. Top 100 = outbound. Top 30 = high-touch.

> [!TIP]
> **Use Outscraper for the quick-start.** Enter "dental clinic Dubai" "cosmetic dentist Dubai" "implant dentist Dubai" → get 300+ results with phone, website, reviews in minutes. Free tier covers your first 500 records. Layer Manus on top for deeper enrichment.

### Data Per Clinic

| Field | Source |
|-------|--------|
| Clinic name | Google Maps / Outscraper |
| Phone number | Google Maps / website |
| WhatsApp (if visible) | Website / Instagram bio |
| Instagram handle | Google search / website |
| Website URL | Google Maps |
| Google rating + review count | Google Maps |
| Pain signal reviews | Manus deep scan / manual |
| Specialty | Website / Instagram |
| Owner name | Website / LinkedIn |
| Chain vs independent | Website / Google Maps |
| ICP score (0-3) | Calculated from above |

---

## 8 · OUTREACH SYSTEM

### Staged Automation Plan

| Stage | What | How | When |
|-------|------|-----|------|
| **1** | Lead sourcing + scraping | Automated: Manus + Outscraper + Google Maps API | Day 1-2 |
| **2** | Lead enrichment + scoring | Automated: Google Sheets formulas + Manus review analysis | Day 1-3 |
| **3** | First-message drafting | Semi-automated: AI drafts, founder reviews/edits | Day 2+ |
| **4** | First-message sending | Manual in batches (10-15/day) | Day 3+ |
| **5** | Replies, conversations, closing | Founder-led, always | Ongoing |
| **6** | Selective send automation | Only after 50+ manual sends prove messaging | Week 3+ |

### Message Templates

**WhatsApp (Top 30 — High personalization):**
> *د. [الاسم] — شفت [specific: "ريفيوهات المرضى يذكرون صعوبة التواصل" / "شغلكم الجميل بالإنستغرام بس اتصلت على الرقم وما أحد رد"].*
>
> *أنا طبيب أسنان وعندي خبرة بخدمة العملاء. بنيت نظام اسمه جواب — يمسك كل مكالمة فايتة ويتواصل مع المريض بالواتساب فوراً — عربي وإنجليزي.*
>
> *عندي عرض سريع ٦٠ ثانية. تبي تشوفه؟*
>
> *(English version if needed:)*
> *Dr. [Name] — I noticed [specific observation]. I'm a dentist who built Jawab, a system that catches every missed call and follows up via WhatsApp — Arabic and English. I have a 60-second walkthrough. Want to see it?*

**WhatsApp (Standard — Next 70):**
> *هلا د. [الاسم] — سؤال سريع: كم مكالمة تقريباً يفوّت عليكم الريسبشن باليوم؟*
>
> *أنا بمجال طب الأسنان وسويت نظام يمسك المكالمات الفايتة ويحجز أوتوماتيك بالواتساب — عربي وإنجليزي. عندي عرض قصير لعيادات الخليج.*
>
> *أرسله لك؟*

### Objection Handling

| Objection | Response |
|-----------|----------|
| "We have a receptionist" | "تمام — جواب يمسك اللي يفوتها. لما تكون على خط ثاني، أو وقت الغدا، أو بعد الدوام. شبكة أمان، مو بديل." |
| "We're too busy" | "هذي بالضبط المشكلة. لما تكونون مشغولين، مكالمات تضيع. جواب يشتغل بالخلفية. التركيب ٣٠ دقيقة بس." |
| "How do I know it works?" | "ضمان ١٤ يوم. إذا ما جاب ٥ محادثات على الأقل، كامل المبلغ يرجع. واللي سجلناه لكم تخلونه." |
| "Is it expensive?" | "٩٠٠ درهم بالشهر. إذا رجّع لكم حتى استشارة زراعة وحدة كانت بتروح، دفع نفسه." |
| "I need to think" | "أكيد، ما عليك ضغط. هذا رابط العرض — شوفه لما يناسبك. 👋" |

### Follow-Up Sequence

| Day | Action |
|-----|--------|
| 0 | Initial message |
| 2 | If seen, no reply: "بس أتأكد وصلتك الرسالة — أقدر أرسل لك العرض متى ما يناسبك" |
| 5 | Final: "ما عليه إذا التوقيت مو مناسب. هذا رابط العرض للمستقبل: [link]. أتمنى لك ولعيادتك التوفيق 🙏" |
| After 5 | Stop. Move on. |

### Call Close Script (10 Minutes)

**0–2 min:** *"أنا طبيب أسنان واشتغلت بخدمة العملاء — يعني شايف المشكلة من الطرفين. العيادات تخسر مرضى كل يوم بسبب مكالمات ما ينرد عليها ومعظمهم ما يدرون كم."*

**2–4 min:** *"شلون تتعاملون مع المكالمات الفايتة حالياً؟ عندكم نظام ولا تروح مع الريح؟"*

**4–6 min:** *"خلني أوريك شلون جواب يشتغل — ٦٠ ثانية بس."*

**6–8 min:** *"بناءً على اللي قلت لي، لو جواب يمسك حتى [X] مكالمة بالأسبوع، هذي [Y] مرضى كانوا بيروحون لغيركم."*

**8–10 min:** *"التركيب ٥٠٠ درهم، بعدها ٩٠٠ بالشهر. ضمان ١٤ يوم — إذا ما جاب نتيجة، كامل الفلوس ترجع. نبدأ؟"*

---

## 9 · DEMO SYSTEM

### Two Assets

| Asset | Purpose | Ready |
|-------|---------|-------|
| **Polished walkthrough (60–90s)** | Send in outreach, embed in follow-ups | Day 2-3 |
| **Fast live explanation** | Conversations, calls, DMs — no video needed | Day 1 |

### Fast Live Explanation

> *"الفكرة بسيطة: مريض يتصل على عيادتك وما حد يرد. خلال ٣٠ ثانية، جواب يرسل له واتساب — بالعربي أو الإنجليزي. يقول له 'سوري ما قدرنا نرد، شلون أقدر أساعدك تحجز؟' المريض يرد، يعطي اسمه وشنو يبي، ويا يحصل رابط حجز أو نبلغ فريقكم. كل أسبوع تحصل تقرير: كم مكالمة مسكنا، كم مريض رجعنا. هذا هو."*

### Demo Video Scenes

| Scene | Duration | Visual | Voiceover |
|-------|----------|--------|-----------|
| 1 — Problem | 10s | Phone ringing, no answer | *"كل يوم، عيادات تخسر مرضى بسبب مكالمات ما ينرد عليها"* |
| 2 — Jawab triggers | 10s | Missed call → WhatsApp sent | *"جواب يمسك المكالمة ويرسل واتساب فوراً — بلغة المريض"* |
| 3 — Arabic convo | 15s | Gulf Arabic WhatsApp flow | *"المريض يرد بالعربي. الاسم، المشكلة، الوقت. محجوز."* |
| 4 — English convo | 15s | English WhatsApp flow | *"نفس الشي بالإنجليزي. بدون قوائم. بدون فورمات. محادثة طبيعية."* |
| 5 — Staff alert | 10s | Owner gets alert | *"صاحب العيادة يشوف بالضبط مين رجع ومتى حجز"* |
| 6 — Report | 10s | Weekly sheet | *"آخر الأسبوع: تقرير واضح. مكالمات فايتة. مرضى رجعوا. إيرادات انحفظت."* |
| 7 — CTA | 10s | جواب logo | *"جواب — كل مكالمة لها جواب."* |

---

## 10 · BUILD SYSTEM (CODEX)

### Architecture — Future-Proofed

Build this once. Build it right. Don't touch it again.

```
[Twilio] → webhook → [Render (Node.js backend)]
                         ↓
              [Conversation Engine (modular)]
              ├── Language Detector
              ├── Intent Classifier
              ├── Booking Handler
              ├── FAQ Handler
              ├── Handoff Handler
              └── Dialect Adapter (Gulf/MSA/EN)
                    ↓           ↓
           [Twilio WhatsApp]  [Cal.com API]
                    ↓           ↓
              [Structured Logging → Google Sheets]
                    ↓
           [Staff Alert Engine (WhatsApp/email)]
                    ↓
           [Multi-Tenant Config (per-clinic settings)]
```

### Build Order

| Priority | Component | Details |
|----------|-----------|---------|
| 1 | **Project scaffold** | Node.js + Express. Environment config. Multi-tenant clinic config (JSON per clinic: name, number, hours, location, FAQ, booking method, alerts). |
| 2 | **Twilio webhook** | Missed call detection. Inbound WhatsApp message handler. Outbound message sender. |
| 3 | **Conversation engine** | Modular state machine: GREETING → INTAKE → BOOKING → CONFIRMATION → HANDOFF. Each state is a separate module. |
| 4 | **Dialect adapter** | Gulf Arabic response library (see Section 6 dialect guide). Language detection from patient's first reply. Arabizi handler. |
| 5 | **Cal.com integration** | Booking link generation. Availability check. Fallback to manual booking request. |
| 6 | **Structured logging** | Google Sheets API: clinic, timestamp, patient number (hashed), language, detected intent, outcome, booking status. Auto-summary formulas. |
| 7 | **Staff alert system** | WhatsApp message or email to clinic owner on: handoff trigger, new booking, daily summary. Full conversation context forwarded. |
| 8 | **Error/fallback handling** | Timeout logic, unrecognized input, system downtime fallback message, UptimeRobot integration. |
| 9 | **Voice-ready architecture** *(scaffold only)* | Vapi/Retell webhook endpoint stub. Call-to-WhatsApp escalation route. Don't build voice logic yet — just the plumbing so it plugs in later. |

### Multi-Tenant from Day 1

Each clinic = a JSON config file:
```json
{
  "clinicId": "clinic_dubai_smile",
  "name": "Dubai Smile Dental",
  "phone": "+97144XXXXXX",
  "hours": { "weekday": "09:00-21:00", "friday": "09:00-12:00", "saturday": "10:00-18:00" },
  "location": "https://maps.google.com/...",
  "faq": { "parking": "Free parking in building basement", "insurance": "We accept all major insurance" },
  "bookingMethod": "cal.com",
  "calLink": "https://cal.com/dubai-smile/appointment",
  "alertContacts": [{ "name": "Dr. Ahmed", "whatsapp": "+971...", "email": "..." }],
  "greeting": "هلا والله! أهلاً فيك في عيادة دبي سمايل",
  "dialect": "khaleeji"
}
```
Adding a new clinic = adding a new config file. No code changes. No redeployment.

---

## 11 · PILOT SYSTEM

### Structure

| Element | Detail |
|---------|--------|
| **Setup** | 500 AED (paid before deployment via Tap payment link) |
| **Monthly** | 900 AED (first month charged at setup) |
| **Guarantee** | 14-day money-back: ≥ 5 qualified recovery conversations or full refund |
| **Scope** | One number, WhatsApp recovery, bilingual, weekly report |
| **Onboarding** | 30-min call + professional onboarding document sent beforehand |

### Professional Onboarding Document (Send Before Call)

**Create a clean 1-page PDF or Canva document titled:**

**"Your Jawab Setup Guide — جواب"**

Contents:
1. **What Jawab does** (3 bullet points, bilingual)
   - يمسك كل مكالمة فايتة ويتواصل مع المريض بالواتساب فوراً
   - يتكلم عربي وإنجليزي أوتوماتيك
   - يحجز أو ينقل للفريق حسب الحاجة
2. **What we need from you** (onboarding checklist — bilingual)
   - رقم العيادة / Clinic phone number
   - ساعات العمل / Business hours
   - الموقع / Location link
   - جهة التواصل للتنبيهات / Alert contact (WhatsApp + email)
   - طريقة الحجز المفضلة / Booking preference
   - أسئلة شائعة / FAQs (parking, insurance, etc.)
3. **What to expect**
   - Setup takes 48 hours
   - You'll receive staff alerts via WhatsApp when a handoff is needed
   - Weekly report every Sunday showing recovered patients
4. **Your guarantee**
   - 14-day money-back guarantee
   - If Jawab doesn't generate ≥ 5 recovery conversations, full refund
5. **Contact**: Your name + WhatsApp

**Why this matters:** Clinic owner reviews this at their own pace. When the onboarding call happens, they've already processed the basics. Faster setup, fewer questions, more professional impression.

---

## 12 · PRICING LOGIC

| Decision | Rationale |
|----------|-----------|
| **500 AED setup** | Signals professionalism. Filters freebie hunters. Below pain threshold for Gulf clinics. |
| **900 AED/month** | ≈ $245/mo. One recovered implant consultation = 3-6 months of fees. |
| **Hard floor: never discount below 500/900** | Gulf dental clinics charge thousands per case. 900/mo is already generous. Discounting signals you don't believe in your product. |
| **Growth at 1,800 AED** | Natural upsell after 30-60 days. Includes voice. Never mention Day 1. |
| **Tap for payment** | Frictionless. Send link, clinic pays with card. No wire transfer delays. |

---

## 13 · TOOL-BY-TOOL RULES

### Codex
**For:** All build work. **Expanded scope:** Multi-tenant scaffold, modular conversation engine, dialect adapter, structured logging, voice-ready architecture stub. Build once, build right.

### Manus (Expires ~7 days)
**For:** Bulk research, scraping, enrichment, competitor intelligence. **See separate Manus prompt file** for exact agent instructions. Front-load everything to Days 1-3.

### Google Maps / Outscraper
**For:** Structured lead extraction that continues after Manus expires. **Use Outscraper** (outscraper.com) for instant CSV exports with no code. Free tier = 500 records.

### Twilio / WhatsApp
**For:** Core production: missed call webhooks + WhatsApp messaging. **Apply for WhatsApp Business API Day 1.** Sandbox for testing while waiting.

### Tap (tap.company)
**For:** Gulf-native payment collection. **Set up Day 1.** Free account. Generate payment links. Send via WhatsApp after closing.

### Render
**For:** Backend hosting. Free tier or Starter. Auto-deploy from Git.

### Cal.com
**For:** Patient booking. Free plan for MVP. Optional — manual booking fallback if clinic prefers.

### Google Sheets
**For:** Lead tracking, conversation logging, weekly reports. One sheet per clinic. Don't over-engineer.

### ElevenLabs
**For:** Demo voiceover only. Not production.

---

## 14 · EXECUTION TIMELINE

### TODAY (Day 1)

| # | Task | Time | Tool |
|---|------|------|------|
| 1 | Apply for Twilio WhatsApp Business API | 15 min | Twilio |
| 2 | Set up Tap payment account | 15 min | tap.company |
| 3 | Launch Manus with full agent prompt (see separate file) | 30 min | Manus |
| 4 | Run Outscraper: "dental clinic Dubai" + "cosmetic dentist Dubai" + "implant dentist Dubai" | 15 min | Outscraper |
| 5 | Create lead-tracking Google Sheet | 20 min | Sheets |
| 6 | Write + practice fast live explanation (Arabic + English) | 15 min | — |
| 7 | Start Codex: project scaffold + Twilio webhook + WhatsApp reply + multi-tenant config | 1 hr | Codex |

### DAYS 2-3

| # | Task | Tool |
|---|------|------|
| 8 | Merge Manus + Outscraper data. Score clinics. Rank top 100 / top 30. | Sheets |
| 9 | Review/refine personalized angles for top 30 | Manual + AI |
| 10 | Create onboarding document (PDF/Canva) | Canva |
| 11 | Record polished demo (60-90s) with Gulf Arabic narration | ElevenLabs + screen recorder |
| 12 | Send first batch: 10-15 messages to top 30 | Manual |
| 13 | Codex builds: conversation engine, dialect adapter, Cal.com, Sheets logging | Codex |

### DAYS 4-7

| # | Task | Tool |
|---|------|------|
| 14 | Send 10-15 messages/day from top 100 | Manual |
| 15 | Reply to all responses within 2 hours. Book calls. | Manual |
| 16 | Codex completes: staff alerts, error handling, voice-ready stubs | Codex |
| 17 | Deploy on Render. Test your own number (AR Gulf dialect + EN). | Render |
| 18 | **Day 5 checkpoint:** No pilot conversation? → Escalation protocol. | — |

### DAYS 8-14

| # | Task | Tool |
|---|------|------|
| 19 | Close first paid client. Send payment link (Tap). Onboard. | Manual + Tap |
| 20 | Deploy on their number. Monitor 48 hours. | Twilio + Render |
| 21 | Daily 1-min update to clinic owner (first 3 days). | WhatsApp |
| 22 | Continue outreach. Open Sharjah wave. | Manual |
| 23 | Day 14: Proof asset from pilot data. | Sheets + Canva |
| 24 | Convert to continued monthly. Close second client. | Manual |

---

## 15 · FAILURE POINTS & PREEMPTIVE FIXES

### Day 5 Escalation Protocol

| Action | Detail |
|--------|--------|
| **Increase volume** | 20-30 messages/day |
| **Tighten ICP** | Cosmetic/implant only |
| **Simplify pitch** | Pain + credibility + "want to see it?" |
| **Stop building** | Imperfect product with a client > perfect product with none |
| **Switch channel** | Instagram DM if WhatsApp isn't getting opens |
| ~~**Reduce pricing**~~ | ❌ **Do NOT drop below 500/900.** If clinics aren't responding, the problem is messaging, not price. |

### Risk Register

| Risk | Mitigation |
|------|------------|
| **WhatsApp API delayed** | Apply Day 1. Sandbox for testing. Pre-recorded demo as backup. |
| **Low response rate** | Day 5 escalation. Improve personalization. Switch channels. |
| **Arabic dialect sounds robotic** | Gulf dialect guide in conversation engine. Test with native speakers before pilot. Khaleeji, not MSA. |
| **Clinic ghosts after agreement** | Payment before deployment via Tap link. Money = commitment. |
| **System downtime** | UptimeRobot. Fallback SMS: "شكراً لاتصالك — بنرد عليك قريب" |
| **Founder overbuilds** | If coding Day 3 with 0 messages sent → stop coding. This plan forces commercial before technical. |
| **Gulf data privacy** | Privacy note in first WhatsApp. Proper policy before scaling past 5 clinics. |

---

## 16 · FINAL RECOMMENDATION

Jawab is a bilingual AI front-desk system — not a WhatsApp bot. Position it that way. Sell the full vision (WhatsApp + voice). Deploy WhatsApp first because it ships in days. Add voice after 3 paying clients prove the model.

Build the backend once, build it right, with multi-tenant architecture so adding a clinic is adding a config file, not touching code. Use Gulf Arabic dialect, not MSA. Use the Jawab name in every pitch — the Arabic wordplay is your strongest creative asset.

Get to first payment within 14 days. Everything else is secondary.

---

## 17 · NON-NEGOTIABLES

1. **WhatsApp API + Tap account: Day 1.**
2. **Every message personalized.** Generic = blocked.
3. **Gulf dialect, not MSA.** Khaleeji sounds real. MSA sounds robotic.
4. **Payment before deployment.** Tap link. No invoicing friction.
5. **Hard pricing floor: 500 setup / 900 monthly.** No discounts.
6. **Sell as a dentist.** Your identity is the moat.
7. **Ship V1 in 6 days.** Multi-tenant, modular, but shipped.
8. **Outreach starts Day 3.** Even with imperfect assets.
9. **Day 5 escalation mandatory** if no pilot conversation.
10. **Use the name.** "كل مكالمة لها جواب" — in every pitch, demo, and follow-up.

---

## 18 · WHAT TO IGNORE

- Dashboards, voice-first, multi-specialty, hiring, company registration
- Price discounting below floor
- Social media posting as Day 1 priority
- Competitors who aren't in the Gulf and don't speak Arabic
- Your instinct to overbuild — the plan counters it
- Unnecessary tools: Mac mini, VPS, Claude Max, Claude Code

---

## 19 · IMMEDIATE NEXT MOVE

**Right now. This order.**

1. **Apply for Twilio WhatsApp Business API**
2. **Set up Tap account** (tap.company)
3. **Run Outscraper** for "dental clinic Dubai" — instant CSV, free
4. **Launch Manus** with the full agent prompt (see `manus_agent_prompt.md`)
5. **Create lead-tracking Google Sheet**
6. **Write your fast live explanation** in Gulf Arabic + English
7. **Start Codex build** with multi-tenant scaffold

> [!CAUTION]
> **Day 3 rule still applies.** If you're coding and haven't sent 10 outreach messages, stop coding. Conversations with real clinic owners are the highest-leverage activity this week.

---

*جواب — كل مكالمة لها جواب* 🦷
