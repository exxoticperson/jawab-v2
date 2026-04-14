# DAY 1 ACTION KIT: JAWAB VOICE AGENT BUILD

Everything below is copy-paste ready. Do not overthink. Do not customize yet. Build it, test it, record it.

---

## STEP 1: Sign Up for Retell AI

1. Go to **https://www.retellai.com**
2. Click "Get Started" → sign up with Google
3. You will get **free trial credits** (enough for ~60 minutes of calls)
4. You are now in the dashboard

---

## STEP 2: Create the Agent

In the Retell dashboard:
1. Click **"Create Agent"**
2. Choose **"Single Prompt"** (this is simple enough for one prompt)
3. Name it: **"Jawab - Al Noor Dental"**

### LLM Model Selection
- Choose **GPT-4o** or **Claude 3.5 Sonnet** (whichever is available — both work great)

### Voice Selection
- Pick a **female voice** with a warm, professional tone
- If ElevenLabs voices are available, pick one that sounds natural
- Test a few — you want it to sound like a real receptionist, not a robot

### System Prompt — COPY THIS EXACTLY:

```
## Identity
You are Noor, the AI receptionist for Al-Noor Dental Clinic. You answer phone calls on behalf of the clinic 24 hours a day, 7 days a week. You are warm, professional, and efficient. You speak both Arabic and English fluently.

## Language Detection
- Listen to the caller's first words carefully.
- If they speak Arabic, respond entirely in Arabic for the rest of the call.
- If they speak English, respond entirely in English for the rest of the call.
- If unclear, greet them in Arabic first, then offer English.

## Style Guardrails
- Be concise. Keep responses to 1-2 sentences maximum.
- Be conversational and natural. Use contractions in English. Use colloquial but professional Arabic, not overly formal MSA.
- Be warm and empathetic. Patients calling a dental clinic may be in pain or anxious.
- Never say you are an AI unless directly asked. If asked, say: "I'm Noor, the clinic's virtual assistant. How can I help you today?"
- Ask only ONE question at a time. Never stack multiple questions.

## Response Guidelines
- Speak dates in natural form: "Tuesday, April fifteenth" not "4/15"
- Speak times in natural form: "Three thirty in the afternoon" not "15:30"
- Speak phone numbers digit by digit with pauses
- If you need to spell something, do it slowly letter by letter

## Task Flow (Follow these steps in order)

### Step 1: Greeting
- Arabic: "أهلاً وسهلاً، معك نور من عيادة النور للأسنان. كيف أقدر أساعدك؟"
- English: "Hi there, this is Noor from Al-Noor Dental Clinic. How can I help you today?"

### Step 2: Identify Intent
Listen to the caller and determine their need:
- **New appointment**: Proceed to Step 3
- **Existing appointment** (reschedule/cancel): Ask for their name, then proceed to Step 3
- **Emergency/pain**: Express empathy, then say "I recommend coming in as soon as possible. Let me find the earliest available slot for you." Proceed to Step 3.
- **General question** (pricing, location, services): Answer briefly if you can, then ask "Would you like to book an appointment?"
- **Not a patient** (sales call, vendor): Politely say "Thank you, but we're not interested at this time. Have a good day." End call.

### Step 3: Collect Information
Collect the following, ONE question at a time:
1. Full name
2. Preferred date and time (offer: "Do you prefer morning or afternoon?")
3. Phone number (for confirmation SMS)

### Step 4: Book the Appointment
Once you have the name, preferred time, and phone number:
- Use the check_availability function to verify the slot
- If available: Use the book_appointment function to confirm
- If not available: Suggest 2 alternative times and ask which works better

### Step 5: Confirm and Close
- Repeat the appointment details back to the caller
- Arabic: "تمام، حجزتلك موعد يوم [day] الساعة [time]. هنرسلك رسالة تأكيد. شكراً لاتصالك بعيادة النور!"
- English: "Perfect, I've booked you in for [day] at [time]. You'll receive a confirmation message shortly. Thank you for calling Al-Noor Dental!"

## Boundaries
- Do NOT provide medical advice. If asked medical questions, say: "That's a great question for the doctor. I can book you a consultation so they can help you directly."
- Do NOT discuss pricing in detail. Say: "Pricing depends on the specific treatment. The doctor will discuss that with you during your visit. Would you like to book a consultation?"
- Do NOT make up information about the clinic. If you don't know something, say: "Let me have the team get back to you on that. Can I take your number?"
```

---

## STEP 3: Set Up Cal.com (Free Calendar)

1. Go to **https://cal.com** → Sign up (free)
2. Click **"Event Types"** → Create a new event type
3. Name it: **"Dental Appointment"**
4. Set duration: **30 minutes**
5. Set your available hours (use Gulf timezone, e.g., GMT+4 for UAE or GMT+2 for Egypt)
6. Save the event type
7. Note down two things:
   - Your **Cal.com API Key** (Settings → Developer → API Keys → Create)
   - Your **Event Type ID** (it's the number in the URL when you click on your event type, e.g., `cal.com/event-types/12345` → ID is `12345`)

---

## STEP 4: Connect Calendar Functions in Retell

Back in your Retell AI agent settings:

1. Go to the **"Functions"** tab
2. Click **"Add Function"**
3. Add: **"Check Calendar Availability"**
   - Platform: Cal.com
   - API Key: paste your Cal.com API key
   - Event Type ID: paste your event type ID
   - Timezone: set to your target market (e.g., `Asia/Dubai` or `Africa/Cairo`)
4. Add another function: **"Book Calendar"**
   - Same settings as above
5. Save

Your agent can now check real availability AND book real appointments during a live phone call.

---

## STEP 5: Get a Phone Number

In the Retell AI dashboard:
1. Go to **"Phone Numbers"**
2. Click **"Buy Number"**
3. Options:
   - **US/UK number**: Available directly through Retell (~$1/mo) — good for testing
   - **Local Gulf number**: You may need to connect your own Twilio account
     - Sign up at **twilio.com**
     - Buy a number in your target country (UAE, Egypt, Saudi)
     - Connect Twilio to Retell via the "Import Number" option
4. Assign the phone number to your **"Jawab - Al Noor Dental"** agent

**For today:** Just get ANY number to test with. You can get a local Gulf number later. The demo works regardless of the number's country code.

---

## STEP 6: Test It

1. Pull out your personal phone
2. Call the number you just provisioned
3. **Test 1 (Arabic):** Say "السلام عليكم، عايز أحجز موعد" — verify it responds in Arabic, asks your name, collects info, and books
4. **Test 2 (English):** Call again. Say "Hi, I'd like to book an appointment for teeth whitening" — verify it switches to English
5. **Test 3 (Edge case):** Say "How much does a root canal cost?" — verify it deflects gracefully and tries to book

If anything breaks, tweak the system prompt. The most common fix is making instructions more explicit.

---

## STEP 7: Record the Demo (YOUR #1 SALES WEAPON)

This is the single most important thing you do today.

### Setup:
- Open your laptop screen recorder (Windows: Win+G for Game Bar, or use OBS)
- Put your phone on speaker next to your laptop mic
- Have the Retell dashboard open showing the live call transcript (so the viewer can read along)

### Script (what you say on the call):

**[Start recording your screen. Show the Retell dashboard. Dial the number on your phone on speaker.]**

*[Phone rings, AI picks up]*

**AI:** "أهلاً وسهلاً، معك نور من عيادة النور للأسنان. كيف أقدر أساعدك؟"

**You (in Arabic):** "مرحبا، أنا عايز أحجز موعد لتنظيف الأسنان لو سمحتي"

*[Let the AI respond naturally — it will ask your name, preferred time, etc.]*

*[Complete the booking flow until you hear the confirmation]*

**[Stop recording. You now have a 60-90 second clip of an AI answering a phone call in Arabic, qualifying a patient, and booking an appointment in real-time.]**

### Why this demo destroys everything else:
- It's not a screenshot
- It's not a chatbot in a browser
- It's a REAL PHONE CALL with a REAL AI speaking ARABIC
- No clinic owner has ever seen this before
- They will immediately think: "I need this"

---

## STEP 8: Prepare Tomorrow's Outreach

While your email domains warm up overnight, prepare these:

### Apollo.io Lead Scraping
1. Sign up at **apollo.io** (free tier = 50 leads/month, but you can get more with trial)
2. Search filters:
   - **Industry:** Dental, Healthcare, Medical Spa, Aesthetics
   - **Location:** Egypt, UAE, Saudi Arabia, Kuwait, Qatar, Bahrain
   - **Company size:** 1-50 employees
   - **Job titles:** Owner, Manager, Director, CEO
3. Export to CSV

### Instantly.ai Setup
1. Sign up at **instantly.ai** (~$30/mo)
2. Buy 2-3 sending domains (e.g., jawab-dental.com, getnoor.com) — ~$10 each from Namecheap
3. Set up email accounts on those domains
4. Add them to Instantly and start the warmup (takes 2-3 days, but you can start sending carefully on Day 3)

---

## CHECKLIST — DO NOT SLEEP UNTIL THESE ARE DONE:

- [ ] Retell AI account created
- [ ] Agent built with the system prompt above
- [ ] Cal.com connected with real availability
- [ ] Phone number provisioned and assigned
- [ ] 3 test calls completed (Arabic, English, edge case)
- [ ] Demo recorded (60-90 seconds, Arabic call flow)
- [ ] Apollo.io account created and first 50 leads exported
- [ ] Instantly.ai account created and domains purchased
- [ ] Outreach emails drafted (copy from the Implementation Plan)

**Tomorrow morning: outreach begins. The demo goes out. The war starts.**
