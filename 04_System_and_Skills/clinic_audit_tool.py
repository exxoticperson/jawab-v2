"""
Jawab Clinic Audit Automator
=============================
Automates parts of the mystery shop protocol:
- Website speed check via PageSpeed Insights API (free, no key needed for basic)
- Google Maps data extraction (uses existing Playwright approach, improved)
- AI visibility check template
- Outputs a structured audit CSV

Requirements:
    pip install playwright httpx
    playwright install chromium

Usage:
    python clinic_audit_tool.py
"""

import asyncio
import httpx
import csv
import json
import os
from datetime import datetime

# --- Configuration ---
CLINICS_CSV = os.path.join(os.path.dirname(__file__), "..", "02_Outreach_and_Data", "01_READY_TO_SEND_TOP30_WORKING.csv")
OUTPUT_CSV = os.path.join(os.path.dirname(__file__), "..", "02_Outreach_and_Data", "04_AUDIT_RESULTS.csv")


async def check_pagespeed(url: str) -> dict:
    """Check website speed using Google PageSpeed Insights API (free, no key needed)."""
    if not url or url == "No Website" or "://" not in url:
        return {"speed_score": "N/A", "load_time": "N/A", "mobile_friendly": "N/A"}

    api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=mobile"

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(api_url)
            if resp.status_code == 200:
                data = resp.json()
                score = data.get("lighthouseResult", {}).get("categories", {}).get("performance", {}).get("score", 0)
                fcp = data.get("lighthouseResult", {}).get("audits", {}).get("first-contentful-paint", {}).get("displayValue", "N/A")
                return {
                    "speed_score": int(score * 100) if score else 0,
                    "load_time": fcp,
                    "mobile_friendly": "Yes" if score and score > 0.5 else "No"
                }
    except Exception as e:
        print(f"  [!] PageSpeed error for {url}: {e}")

    return {"speed_score": "Error", "load_time": "Error", "mobile_friendly": "Error"}


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
        print("    Make sure you run this from the 04_System_and_Skills directory")
        return

    with open(CLINICS_CSV, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        clinics = list(reader)

    print(f"[*] Loaded {len(clinics)} clinics from CSV")
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
    results.sort(key=lambda x: x["Revenue Leak Score"], reverse=True)

    # Save
    fieldnames = list(results[0].keys()) if results else []
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    print("=" * 60)
    print(f"AUDIT COMPLETE — {len(results)} clinics scored")
    print(f"Results saved to: {OUTPUT_CSV}")
    print()
    print("TOP 10 BY SCORE:")
    print("-" * 60)
    for r in results[:10]:
        print(f"  {r['Revenue Leak Score']:>3}/100 | {r['Clinic Name']:<40} | {r['Jawab Angle']}")
    print()
    print("Next step: Run mystery shop protocol on the top 10, then send outreach.")


if __name__ == "__main__":
    asyncio.run(main())
