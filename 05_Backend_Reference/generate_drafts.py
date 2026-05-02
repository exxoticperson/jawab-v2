import csv

input_file = "02_Outreach_and_Data/01_READY_TO_SEND_TOP30_WORKING.csv"
output_file = "02_Outreach_and_Data/01_FINAL_DRAFTED_EMAILS.csv"

def generate_email(clinic, angle, pain_proof):
    name = clinic['Doctor Name'] if clinic['Doctor Name'] else clinic['Clinic Name']
    # If it's a clinic name, don't say Dr. Clinic, just say Hi Team
    greeting = f"Hi {name}" if "Dr." in name else f"Hi {name} Team"
    
    body = f"{greeting},\n\n"
    body += "I was auditing your clinic's digital footprint and noticed something. "
    
    if "Website unreachable" in pain_proof or "Website suspended" in pain_proof:
        body += "It looks like your website is currently unreachable. "
    elif "WhatsApp" in pain_proof:
        body += "I saw you use a direct mobile/WhatsApp path. "
    else:
        body += f"I noticed: {pain_proof.split('.')[0]}. "
        
    body += f"Usually, {angle.lower()}\n\n"
    body += "I built Jawab—a bilingual Arabic-English recovery engine for UAE dental clinics. It catches these missed inquiries instantly and moves them back to WhatsApp to secure the booking.\n\n"
    body += "I have a 60-second demo of exactly how it recovers leads for your clinic. Mind if I send you the link?\n\n"
    body += "Best,\nAdam"
    return body

try:
    with open(input_file, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        
    drafts = []
    for row in rows:
        if row.get('Status') == 'Not Contacted' or row.get('Status') == 'Ready To Send Today':
            if row['Email'] if 'Email' in row else '': # We don't have Emails in the current CSV, so we leave it blank for manual insertion or future enrichment
                pass
            drafts.append({
                "Clinic": row['Clinic Name'],
                "Subject": f"{row['Clinic Name']} - Inbound Lead Recovery",
                "Email Body": generate_email(row, row['OfferAngle'], row['PainProof']),
                "Action": row['NextAction']
            })

    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=["Clinic", "Subject", "Email Body", "Action"])
        writer.writeheader()
        writer.writerows(drafts)
    print("Drafts generated successfully.")
except Exception as e:
    print("Error:", e)
