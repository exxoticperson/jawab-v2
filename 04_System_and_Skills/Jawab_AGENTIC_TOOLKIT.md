# Jawab Agentic Toolkit — What's Real, What's Shiny, What To Use

## 1. Instagram AI Connection (YOUR MAIN ASK)

### Reading DMs / Shared Reels via API

**The official way:** Instagram Messaging API (via Meta)

Requirements:
- Instagram Business or Creator account
- Connected to a Facebook Page
- Meta Developer App with `instagram_manage_messages` permission
- Webhooks set up to receive messages

What you CAN do:
- Receive webhook notifications when someone DMs you
- Read message content (text, shared media URLs)
- Reply to DMs automatically (within 24-hour window after they message first)
- Get shared reel URLs from conversations

What you CANNOT do:
- Cold-DM strangers via API
- Access historical DM conversations easily (only new incoming via webhook)
- Scrape DMs from personal accounts

### Getting Reels You Sent Yourself (Your Specific Use Case)

**Best approach — Instagram Data Download:**

1. Go to Instagram → Settings → Accounts Center → Your Information and Permissions → Download your information
2. Select JSON format
3. Download — you'll get a `messages.json` with all DM history including shared reel URLs
4. Parse that JSON with a Python script (below)

**Script to extract reel URLs from your data download:**

```python
"""
Extract shared reel URLs from Instagram data download.
After downloading your Instagram data (JSON format), run this script.
"""
import json
import os

# Path to your Instagram data download
DATA_DIR = r"C:\Users\krx15\Downloads\instagram_data"  # Change this

def extract_reels(data_dir):
    messages_path = os.path.join(data_dir, "your_instagram_activity", "messages", "inbox")
    
    reels = []
    
    if not os.path.exists(messages_path):
        # Try alternative path structure
        messages_path = os.path.join(data_dir, "messages", "inbox")
    
    if not os.path.exists(messages_path):
        print(f"Cannot find messages at {messages_path}")
        print("Check your download folder structure and update DATA_DIR")
        return reels
    
    for chat_folder in os.listdir(messages_path):
        chat_path = os.path.join(messages_path, chat_folder)
        if not os.path.isdir(chat_path):
            continue
        
        # Look for message JSON files
        for filename in os.listdir(chat_path):
            if filename.endswith(".json"):
                filepath = os.path.join(chat_path, filename)
                with open(filepath, "r", encoding="utf-8") as f:
                    try:
                        data = json.load(f)
                    except json.JSONDecodeError:
                        continue
                
                messages = data.get("messages", [])
                for msg in messages:
                    # Check for shared media / links
                    content = msg.get("content", "")
                    share = msg.get("share", {})
                    
                    # Shared reel URLs
                    if share and share.get("link", ""):
                        link = share["link"]
                        if "reel" in link or "reels" in link or "/p/" in link:
                            reels.append({
                                "url": link,
                                "sender": msg.get("sender_name", ""),
                                "timestamp": msg.get("timestamp_ms", 0),
                                "chat": chat_folder,
                                "text": share.get("share_text", "")
                            })
                    
                    # Links in message text
                    if "instagram.com/reel" in content or "instagram.com/reels" in content:
                        reels.append({
                            "url": content,
                            "sender": msg.get("sender_name", ""),
                            "timestamp": msg.get("timestamp_ms", 0),
                            "chat": chat_folder,
                            "text": ""
                        })
    
    return reels


def main():
    reels = extract_reels(DATA_DIR)
    
    print(f"Found {len(reels)} shared reels")
    print()
    
    for i, reel in enumerate(reels[:20], 1):
        print(f"{i}. {reel['url']}")
        print(f"   From: {reel['sender']} | Chat: {reel['chat']}")
        print()
    
    # Save to file
    output_path = os.path.join(DATA_DIR, "extracted_reels.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(reels, f, indent=2, ensure_ascii=False)
    print(f"Saved to {output_path}")


if __name__ == "__main__":
    main()
```

### Analyzing Reels with AI

Once you have reel URLs, you can:

1. **Download them** using `instaloader` or `yt-dlp`
2. **Transcribe audio** using OpenAI Whisper API or free local whisper
3. **Analyze visuals** using GPT-4o (accepts video frames) or Gemini (accepts video)
4. **Summarize content** using Claude or GPT

```python
"""
Download and analyze Instagram reels with AI.
Requires: pip install instaloader openai
"""
import instaloader
import openai

# Download a reel by URL
L = instaloader.Instaloader()
# L.login("username", "password")  # Only if needed for private content

def download_reel(url):
    """Download a single reel by URL."""
    shortcode = url.strip("/").split("/")[-1]
    if "?" in shortcode:
        shortcode = shortcode.split("?")[0]
    post = instaloader.Post.from_shortcode(L.context, shortcode)
    L.download_post(post, target="downloaded_reels")
    return post

def analyze_with_ai(caption, comments_text=""):
    """Analyze reel content with AI."""
    client = openai.OpenAI()  # Uses OPENAI_API_KEY env var
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": f"""Analyze this Instagram reel:

Caption: {caption}

What is the content about?
What hooks/techniques are used?
What can I learn from this for my own content?
Rate the content quality 1-10.
"""
        }]
    )
    return response.choices[0].message.content
```

---

## 2. Computer Use — What's Real

### What "Computer Use" Means

AI that can control your screen — click, type, navigate, fill forms. Like having a virtual assistant operating your computer.

### Best Options Right Now

| Tool | What It Does | Cost | Difficulty |
|------|-------------|------|------------|
| **browser-use** (Python) | AI controls a browser via Playwright | Free + LLM API cost | Medium |
| **Claude Computer Use** | Claude operates your full desktop | API cost | Medium |
| **Open Interpreter** | AI runs commands and controls apps | Free + LLM API cost | Easy |
| **Playwright** (what you have) | Script browser automation | Free | Easy |

### browser-use — Best for Your Use Case

```bash
pip install browser-use
```

```python
"""
browser-use example: automated Instagram DM reading.
Requires: pip install browser-use langchain-openai
Set env: OPENAI_API_KEY=your_key
"""
from browser_use import Agent
from langchain_openai import ChatOpenAI

import asyncio

async def main():
    agent = Agent(
        task="Go to instagram.com, log in, go to my DMs with [backup account name], and list the last 10 shared reels with their URLs.",
        llm=ChatOpenAI(model="gpt-4o"),
    )
    result = await agent.run()
    print(result)

asyncio.run(main())
```

**Warning:** browser-use is powerful but:
- Uses LLM API calls (costs money per action)
- Can be slow (each click = API call)
- Instagram may flag automated login
- Best for one-off tasks, not constant automation

### Open Interpreter — Good for Quick Tasks

```bash
pip install open-interpreter
interpreter
```

Then just talk to it: "Open Instagram in Chrome, go to my DMs, screenshot the last 10 messages"

---

## 3. Outreach Automation

### What You CAN Automate

| Channel | Can Automate? | How |
|---------|--------------|-----|
| WhatsApp (business-initiated) | ✅ Yes | WhatsApp Cloud API + approved templates |
| WhatsApp (reply to incoming) | ✅ Yes | Webhook + API |
| Email | ✅ Yes | Gmail API or SMTP or Instantly/Lemlist |
| Instagram DM (reply to incoming) | ✅ Yes | Instagram Messaging API webhook |
| Instagram DM (cold outreach) | ❌ No via API | Must be manual |
| LinkedIn | ⚠️ Gray area | Phantom Buster / manual |

### For Jawab Outreach Specifically

**Phase 1 — Manual + Templates (now)**

Don't automate cold outreach yet. Manual is better because:
- You're sending 5-10/day, not 500
- Each message needs mystery-shop findings (personalized)
- Automation at low volume looks lazy, not efficient

**Phase 2 — Semi-Automated (after 50+ sends)**

Use Make.com to:
1. Read clinic data from Google Sheets
2. Generate personalized message from template
3. Queue it for you to review and send manually

**Phase 3 — Automated Follow-Up (after first client)**

Use Make.com + WhatsApp Cloud API to:
1. Auto-send follow-up Day 4, Day 9, Day 21 messages
2. Track opens/replies in Sheets
3. Alert you when someone replies

---

## 4. MCP Servers — The Game Changer

MCP (Model Context Protocol) lets AI models connect to real tools. Think of it as giving Claude or GPT hands to use Instagram, Google Sheets, WhatsApp, etc.

### How It Works

```
You (in Claude Desktop) → MCP Server → Instagram API
                        → Google Sheets API
                        → WhatsApp API
                        → File System
```

You say: "Check my last 10 Instagram DMs and summarize them"
Claude calls the MCP server → MCP calls Instagram API → returns data → Claude summarizes

### Setting Up an Instagram MCP Server

```bash
# Install FastMCP
pip install fastmcp
```

```python
"""
Simple Instagram MCP Server
Exposes Instagram actions as tools that Claude/GPT can call.
Requires: Meta Developer App + Instagram Business Account
"""
from fastmcp import FastMCP
import httpx

mcp = FastMCP("instagram-tools")

INSTAGRAM_ACCESS_TOKEN = "your_token_here"
INSTAGRAM_ACCOUNT_ID = "your_account_id"

@mcp.tool()
async def get_recent_media(limit: int = 10) -> str:
    """Get recent Instagram posts/reels from your account."""
    url = f"https://graph.instagram.com/v21.0/{INSTAGRAM_ACCOUNT_ID}/media"
    params = {
        "fields": "id,caption,media_type,media_url,timestamp,permalink",
        "limit": limit,
        "access_token": INSTAGRAM_ACCESS_TOKEN
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(url, params=params)
        return resp.text

@mcp.tool()
async def get_conversations(limit: int = 10) -> str:
    """Get recent DM conversations."""
    url = f"https://graph.instagram.com/v21.0/{INSTAGRAM_ACCOUNT_ID}/conversations"
    params = {
        "fields": "participants,messages{message,from,created_time,attachments}",
        "limit": limit,
        "access_token": INSTAGRAM_ACCESS_TOKEN
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(url, params=params)
        return resp.text

@mcp.tool()
async def get_account_insights() -> str:
    """Get Instagram account insights (reach, impressions, etc)."""
    url = f"https://graph.instagram.com/v21.0/{INSTAGRAM_ACCOUNT_ID}/insights"
    params = {
        "metric": "impressions,reach,profile_views",
        "period": "day",
        "access_token": INSTAGRAM_ACCESS_TOKEN
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(url, params=params)
        return resp.text

if __name__ == "__main__":
    mcp.run()
```

### MCP Servers You Should Know About

| Server | What It Does | Where |
|--------|-------------|-------|
| Instagram MCP | Read posts, DMs, insights | mcpmarket.com |
| Google Sheets MCP | Read/write sheets | Built into many tools |
| WhatsApp MCP | Send/receive messages | Custom build |
| File System MCP | Read/write local files | Built into Claude Desktop |
| Browser MCP | Control browser | browsertools.agentdesk.ai |
| Composio | Connect to 1000+ apps | composio.dev |

---

## 5. Visual Packages

If you mean design/brand assets for Jawab outreach:

### What You Need

1. **Proposal PDF template** — for sending after discovery calls
2. **Audit report PDF** — the visual version of the scorecard
3. **Demo video thumbnail** — for WhatsApp/IG shares
4. **WhatsApp profile image** — Jawab branded
5. **Instagram highlight covers** — if using IG for Jawab

### Tools

- **Canva** — fastest for templates
- **Figma** — best for custom design
- **v0.dev** (by Vercel) — generate UI components from prompts
- **Lovable/Bolt** — generate full landing pages from prompts

---

## 6. What Else You're Missing

### Things That Would Make You More Dangerous

| Tool/Concept | What It Does | Priority |
|-------------|-------------|----------|
| **n8n** (self-hosted) | Free Make.com alternative, more powerful | Medium |
| **Cursor IDE** | AI-first code editor, faster than manual coding | High |
| **yt-dlp** | Download any video from any platform | High (for reel analysis) |
| **Whisper** | Free audio transcription (OpenAI, runs locally) | Medium |
| **Clay** | Lead enrichment — finds emails, LinkedIn, etc from company names | Later |
| **Instantly** | Cold email automation at scale | Later |
| **Phantom Buster** | LinkedIn/IG automation (gray area) | Optional |
| **Loom** | Quick video recording for audits | High |
| **Tally** | Free form builder (better than Google Forms) | Medium |
| **Notion** | Client workspace / proposal delivery | Medium |

### The Stack That Makes You Most Agentic

```
Level 1 (NOW):
├── Playwright (browser automation you already have)
├── Python scripts (audit tool, scraper you already have)
├── Google Sheets (CRM)
├── WhatsApp Business (outreach)
├── Vercel (demo hosting)
└── Loom (video audits)

Level 2 (THIS MONTH):
├── Meta Developer Account (WhatsApp + Instagram APIs)
├── Make.com (workflow automation)
├── browser-use (AI-controlled browser for complex tasks)
├── Instagram data download + reel analysis script
└── yt-dlp + Whisper (download + transcribe content)

Level 3 (AFTER FIRST CLIENT):
├── MCP servers (connect Claude to your tools)
├── n8n (self-hosted automation)
├── Composio (connect AI to Google Sheets, etc)
├── Custom WhatsApp webhook handler
└── Automated weekly report generation
```

---

## 7. Priority Order — What To Do First

1. **Download your Instagram data** (takes 24-48 hours for Instagram to prepare it)
2. **Install yt-dlp** — `pip install yt-dlp` — download reels by URL right now
3. **Install browser-use** — `pip install browser-use` — AI browser automation
4. **Set up Meta Developer account** — unlocks WhatsApp + Instagram APIs
5. **Set up Make.com** — connects everything without code
6. **Build one MCP server** — start with Google Sheets, then add Instagram

Everything else is Level 3. Don't touch it until you have a paying client.
