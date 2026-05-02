# Jawab Payment Path

## Primary Method: Cenoa (US Bank Account)

You have Cenoa, which provides a US bank account. This is your primary receiving path.

### How It Works

1. Quote the client in their local currency (AED / KWD / SAR / USD)
2. Send invoice with USD amount and your Cenoa US bank details
3. Client transfers via international bank transfer or SWIFT to your US account
4. You receive in USD through Cenoa
5. Convert or hold as needed

### Invoice Payment Details Block

```
Payment Details:

Bank: [Cenoa US Bank Name]
Account Holder: [Your Legal Name]
Account Number: [Cenoa Account Number]
Routing Number: [Cenoa Routing Number]
SWIFT/BIC: [If applicable]
Reference: Jawab - [Clinic Name]

Alternative: Payoneer payment link (if available)
```

## Backup Methods

### Bank Transfer to Egyptian Account

For warm/founding clients who prefer direct transfer:

- Provide your Egyptian bank IBAN
- Client pays via international SWIFT transfer
- Slower and may have higher fees

### Payoneer (if you set up later)

- Send payment request link
- Client pays by card or bank transfer
- You receive in Payoneer balance
- Withdraw to Egyptian bank or Cenoa

### Wise (if verified)

- Provide Wise USD/EUR receiving details
- Useful for European or UK clients

## Do Not Use

- Stripe (not available for Egyptian recipients directly)
- Crypto (too much friction for clinic owners)
- Cash (no tracking, no receipt)
- PayPal (fees too high, disputes risky)

## Currency Strategy

| Market | Quote In | Receive In |
|--------|----------|------------|
| UAE | AED | USD via Cenoa |
| Kuwait | KWD | USD via Cenoa |
| Saudi | SAR | USD via Cenoa |
| International | USD | USD via Cenoa |
| Egypt (warm) | EGP or USD | Egyptian bank or Cenoa |

## Invoice Process

1. Use invoice template from `06_Client_Ops/jawab_invoice_template.md`
2. Fill in clinic details, service, amount in local currency AND USD equivalent
3. Include payment details block above
4. Send via WhatsApp or email
5. Follow up if not paid within 3 business days
6. Send receipt after payment confirmation
7. Begin setup only after proof of transfer

## Payment Terms

- Setup fee is non-refundable after setup work begins
- Monthly fees due on the first day of each service period
- 30-day written notice required for cancellation
- Receipt issued after payment confirmation

## Action Items

- [ ] Get your Cenoa US bank account details ready
- [ ] Fill in the invoice template with real Cenoa details
- [ ] Create one test invoice PDF
- [ ] Test that the payment path works with a small transfer if possible
