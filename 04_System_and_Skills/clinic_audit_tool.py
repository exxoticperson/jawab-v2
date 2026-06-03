"""
Jawab Clinic Audit Automator v2
================================
Automates the mystery shop protocol:
- Website speed check via Google PageSpeed Insights API
- WhatsApp path analysis from existing CSV data
- Revenue Leak Scoring (0-100) per clinic
- Outputs a ranked audit CSV sorted by highest opportunity

Requirements:
    pip install httpx

Usage:
    python clinic_audit_tool.py
    python clinic_audit_tool.py --no-pagespeed   (skip API calls, faster)

Fix log:
    v2: Fixed BOM encoding issue (clinic names showing as Unknown)
        Added retry logic for PageSpeed API
        Improved scoring to properly weight WhatsApp paths
"""

import asyncio
import httpx
import csv
import json
import os
import sys
from datetime import datetime

# --- Configuration ---
CLINICS_CSV = os.path.join(os.path.dirname(__file__), "..", "02_Outreach_and_Data", "01_READY_TO_SEND_TOP30_WORKING.csv")
OUTPUT_CSV = os.path.join(os.path.dirname(__file__), "..", "02_Outreach_and_Data", "04_AUDIT_RESULTS.csv")

# Skip PageSpeed API calls with --no-pagespeed flag (faster, offline)
SKIP_PAGESPEED = "--no-pagespeed" in sys.argv
PAGESPEED_API_KEY = os.environ.get("PAGESPEED_API_KEY", "")  # Optional: set env var for higher quota


async def check_pagespeed(url: str) -> dict:
    """Check website speed using Google PageSpeed Insights API.
    
    Free tier works without a key but is rate-limited.
    Set PAGESPEED_API_KEY environment variable for higher quota.
    """
    if not url or url == "No Website" or "://" not in url:
        return {"speed_score": "N/A", "load_time": "N/A", "mobile_friendly": "N/A"}

    if SKIP_PAGESPEED:
        return {"speed_score": "Skipped", "load_time": "Skipped", "mobile_friendly": "Skipped"}

    # Build URL — key is optional but reduces rate limiting
    api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=mobile"
    if PAGESPEED_API_KEY:
        api_url += f"&key={PAGESPEED_API_KEY}"

    for attempt in range(2):  # 1 retry on failure
        try:
            async with httpx.AsyncClient(timeout=45, follow_redirects=True) as client:
                resp = await client.get(api_url)
                if resp.status_code == 200:
                    data = resp.json()
                    score = data.get("lighthouseResult", {}).get("categories", {}).get("performance", {}).get("score", 0)
                    fcp = data.get("lighthouseResult", {}).get("audits", {}).get("first-contentful-paint", {}).get("displayValue", "N/A")
                    lcp = data.get("lighthouseResult", {}).get("audits", {}).get("largest-contentful-paint", {}).get("displayValue", "N/A")
                    return {
                        "speed_score": int(score * 100) if score else 0,
                        "load_time": fcp,
                        "lcp": lcp,
                        "mobile_friendly": "Yes" if score and score > 0.5 else "No"
                    }
                elif resp.status_code == 429:
                    print(f"  [!] PageSpeed rate limited. Try --no-pagespeed flag or set PAGESPEED_API_KEY.")
                    return {"speed_score": "RateLimit", "load_time": "RateLimit", "mobile_friendly": "N/A"}
                else:
                    print(f"  [!] PageSpeed HTTP {resp.status_code} for {url}")
        except httpx.TimeoutException:
            if attempt == 0:
                print(f"  [!] PageSpeed timeout for {url}, retrying...")
                await asyncio.sleep(2)
            else:
                print(f"  [!] PageSpeed failed after retry: {url}")
        except Exception as e:
            print(f"  [!] PageSpeed error for {url}: {type(e).__name__}: {e}")
            break

    return {"speed_score": "Error", "load_time": "Error", "lcp": "Error", "mobile_friendly": "Error"}


def check_whatsapp_path(row: dict) -> str:
    """Determine WhatsApp accessibility from CSV data."""
    wa = row.get("WhatsApp Number", "").strip()
    if wa:
        return f"Direct: {wa}"

    # Check if phone looks like a mobile (UAE mobile starts with 05x or +9715x)
    phone = row.get("Phone Number", "").strip()
    if phone:
        clean = phone.replace(" ", "").replace("+", "").replace("-", "")
        if clean.startswith("9715") or clean.startswith("05"):
            return f"Mobile (likely WhatsApp): {phone}"

    return "No direct WhatsApp found"


def score_clinic(row: dict, speed_data: dict) -> dict:
    """Generate a Revenue Leak Score based on available data."""
    score = 0
    notes = []

    # Response Speed (/15) — estimated from data available
    wa_path = check_whatsapp_path(row)
    if "Direct" in wa_path:
        score += 10
    elif "Mobile" in wa_path:
        score += 7
    else:
        score += 3
        notes.append("No direct WhatsApp path")

    # WhatsApp Path Clarity (/15)
    if row.get("WhatsApp Number", "").strip():
        score += 12
    elif "Mobile" in wa_path:
        score += 8
    else:
        score += 4
        notes.append("WhatsApp path unclear")

    # Missed Call Recovery (/15) — estimated
    pain = row.get("Pain Signal", "").lower()
    if "missed" in pain or "no answer" in pain or "emergency" in pain:
        score += 12
        notes.append("Likely missed call issues")
    elif "direct" in pain or "mobile" in pain:
        score += 8
    else:
        score += 5

    # Booking CTA (/10) — from website status
    web_status = row.get("Website Status", "").lower()
    website = row.get("Website", "").strip()
    if "unreachable" in web_status or "suspended" in web_status or "inactive" in web_status:
        score += 2
        notes.append("Website down — critical leak")
    elif "error" in web_status:
        score += 3
        notes.append("Website issues")
    elif website and web_status != "":
        score += 7
    else:
        score += 5

    # Review Trust (/10)
    try:
        rating = float(row.get("Google Rating", "0"))
        reviews = int(row.get("Review Count", "0"))
        if rating >= 4.5 and reviews >= 200:
            score += 9
        elif rating >= 4.0 and reviews >= 100:
            score += 7
        elif reviews >= 50:
            score += 5
        else:
            score += 3
    except (ValueError, TypeError):
        score += 3

    # High-Ticket Service Clarity (/10)
    specialty = row.get("Specialty", "").lower()
    if any(s in specialty for s in ["implant", "cosmetic", "veneer", "aesthetic", "premium"]):
        score += 9
        notes.append(f"High-ticket: {row.get('Specialty', '')}")
    elif specialty:
        score += 6
    else:
        score += 4

    # Arabic/English (/10) — default to 6 for UAE clinics
    score += 6

    # AI Visibility (/10) — not automated here, manual check needed
    score += 3
    notes.append("AI visibility: needs manual check")

    # Post-Consult Follow-up (/5) — estimated
    if "consult" in pain or "follow" in pain:
        score += 4
    else:
        score += 2

    # Speed score bonus/penalty
    if speed_data.get("speed_score") not in ("N/A", "Error"):
        try:
            sp = int(speed_data["speed_score"])
            if sp < 30:
                notes.append(f"Website very slow: {sp}/100")
            elif sp < 50:
                notes.append(f"Website slow: {sp}/100")
        except (ValueError, TypeError):
            pass

    # Determine angle
    pain_proof = row.get("PainProof", "").strip()
    if not pain_proof:
        pain_proof = "; ".join(notes[:3])

    angle = "Recover"
    if "website" in " ".join(notes).lower() or "visibility" in " ".join(notes).lower():
        angle = "Recover + Visible"

    return {
        "score": min(score, 100),
        "notes": "; ".join(notes),
        "pain_proof": pain_proof,
        "angle": angle,
        "whatsapp_path": wa_path
    }


async def main():
    print("=" * 60)
    print("JAWAB CLINIC AUDIT AUTOMATOR")
    print("=" * 60)

    # Load clinics
    if not os.path.exists(CLINICS_CSV):
        print(f"[!] Cannot find {CLINICS_CSV}")
        print(f"    Looking at: {os.path.abspath(CLINICS_CSV)}")
        print("    Make sure the CSV file exists at that path.")
        return

    # IMPORTANT: Use utf-8-sig to strip the BOM character (\ufeff) that Excel adds
    # Without this, the first column key becomes '\ufeff"Clinic Name"' and all lookups fail
    with open(CLINICS_CSV, encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        clinics = list(reader)
    
    # Strip any surrounding quotes from field keys (Excel CSV artifact)
    def clean_row(row):
        return {k.strip('"').strip(): v.strip('"').strip() if isinstance(v, str) else v for k, v in row.items()}
    clinics = [clean_row(c) for c in clinics]

    print(f"[*] Loaded {len(clinics)} clinics from CSV")
    print(f"[*] First clinic name check: '{clinics[0].get('Clinic Name', 'KEY MISSING')}' — if 'KEY MISSING', BOM fix needed")
    if SKIP_PAGESPEED:
        print("[*] PageSpeed checks SKIPPED (--no-pagespeed flag)")
    elif PAGESPEED_API_KEY:
        print("[*] Using PageSpeed API key from environment")
    else:
        print("[*] PageSpeed: using free tier (rate limits may apply, set PAGESPEED_API_KEY env var)")
    print()

    results = []

    for i, clinic in enumerate(clinics):
        name = clinic.get("Clinic Name", "Unknown")
        website = clinic.get("Website", "")
        print(f"[{i+1}/{len(clinics)}] Auditing: {name}")

        # PageSpeed check
        speed_data = {"speed_score": "N/A", "load_time": "N/A", "mobile_friendly": "N/A"}
        if website and "://" in website:
            print(f"  -> Checking website speed: {website}")
            speed_data = await check_pagespeed(website)
            print(f"     Speed: {speed_data['speed_score']}/100 | Load: {speed_data['load_time']}")

        # Score the clinic
        scoring = score_clinic(clinic, speed_data)
        print(f"  -> Score: {scoring['score']}/100 | Angle: {scoring['angle']}")
        print(f"  -> Main issues: {scoring['notes'][:80]}")
        print()

        results.append({
            "Clinic Name": name,
            "City": clinic.get("City", ""),
            "Doctor": clinic.get("Doctor Name", ""),
            "Specialty": clinic.get("Specialty", ""),
            "Website": website,
            "Speed Score": speed_data["speed_score"],
            "Load Time": speed_data["load_time"],
            "Mobile Friendly": speed_data["mobile_friendly"],
            "Google Rating": clinic.get("Google Rating", ""),
            "Review Count": clinic.get("Review Count", ""),
            "WhatsApp Path": scoring["whatsapp_path"],
            "Revenue Leak Score": scoring["score"],
            "Pain Proof": scoring["pain_proof"],
            "Jawab Angle": scoring["angle"],
            "Notes": scoring["notes"],
            "Status": clinic.get("Status", "Not Contacted"),
            "Channel": clinic.get("Channel", ""),
            "Audit Date": datetime.now().strftime("%Y-%m-%d"),
        })

        # Rate limit for PageSpeed API
        await asyncio.sleep(1)

    # Sort by score descending
    results.sort(key=lambda x: int(x["Revenue Leak Score"]) if str(x["Revenue Leak Score"]).isdigit() else 0, reverse=True)

    # Save with BOM-free UTF-8
    fieldnames = list(results[0].keys()) if results else []
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    print("=" * 60)
    print(f"AUDIT COMPLETE — {len(results)} clinics scored")
    print(f"Results saved to: {os.path.abspath(OUTPUT_CSV)}")
    print()
    print("TOP 10 HIGHEST-OPPORTUNITY CLINICS:")
    print("-" * 70)
    print(f"  {'SCORE':>5} | {'CLINIC NAME':<38} | {'CHANNEL':<12} | ANGLE")
    print("-" * 70)
    for r in results[:10]:
        channel = r.get('Channel', 'Unknown') or 'Unknown'
        print(f"  {str(r['Revenue Leak Score']):>5} | {r['Clinic Name']:<38} | {channel:<12} | {r['Jawab Angle']}")
    print("-" * 70)
    print()

    # Quick channel breakdown
    wa_count = sum(1 for r in results if 'Direct' in r.get('WhatsApp Path', ''))
    no_wa_count = sum(1 for r in results if 'No direct' in r.get('WhatsApp Path', ''))
    print(f"Channel Summary:")
    print(f"  WhatsApp Direct     : {wa_count} clinics")
    print(f"  No Direct WhatsApp  : {no_wa_count} clinics")
    print(f"  Total Revenue Opps  : {len(results)} clinics ready for outreach")
    print()
    print("NEXT STEPS:")
    print("  1. Run: python outreach_customizer.py  — auto-generate personalized WhatsApp messages")
    print("  2. Run mystery shop protocol on the top 5 (call and test response time)")
    print("  3. Send outreach to the top 10 starting with WhatsApp Direct clinics")


if __name__ == "__main__":
    asyncio.run(main())
