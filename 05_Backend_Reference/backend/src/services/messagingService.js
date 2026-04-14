const twilio = require('twilio');

let cachedClient = null;

const getClient = () => {
    if (!cachedClient) {
        cachedClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    return cachedClient;
};

const normalizePhoneNumber = (value = '') => value.toString().trim();

const normalizeWhatsAppAddress = (value = '') => {
    const trimmed = normalizePhoneNumber(value);
    return trimmed.startsWith('whatsapp:') ? trimmed : `whatsapp:${trimmed}`;
};

const sanitizeDigits = (value = '') => value.toString().replace(/\D/g, '');

const buildWhatsAppEntryLink = (clinicConfig) => {
    const rawNumber = clinicConfig.whatsappEntryNumber || process.env.TWILIO_WHATSAPP_NUMBER || '';
    const entryNumber = sanitizeDigits(rawNumber);
    const routingKeyword = clinicConfig.entryKeyword || clinicConfig.clinicId;
    const prefilledText = encodeURIComponent(`BOOK ${routingKeyword}`);

    if (!entryNumber) {
        return null;
    }

    return `https://wa.me/${entryNumber}?text=${prefilledText}`;
};

const buildSafeEntrySms = (clinicConfig) => {
    const link = buildWhatsAppEntryLink(clinicConfig);
    const clinicName = clinicConfig.name || 'the clinic';

    if (!link) {
        return `We missed your call from ${clinicName}. Please message us on WhatsApp to continue your booking request.`;
    }

    return [
        `We missed your call from ${clinicName}.`,
        `Continue on WhatsApp here: ${link}`,
        'Reply STOP to opt out of follow-up messages.'
    ].join(' ');
};

const buildDirectRecoveryMessage = (clinicConfig) => {
    const greetingKhaleeji = clinicConfig.greetingKhaleeji || 'هلا! لاحظنا اتصالكم. شلون أقدر أساعدكم بحجز موعد؟';
    const greetingEnglish = clinicConfig.greetingEnglish || 'Hi! We noticed you called. How can I help you book an appointment?';

    return [
        `🇦🇪 ${greetingKhaleeji}`,
        `🇬🇧 ${greetingEnglish}`,
        'Reply STOP to opt out.'
    ].join('\n\n');
};

const sendWhatsAppMessage = async ({ to, body, from }) => {
    return getClient().messages.create({
        body,
        from: normalizeWhatsAppAddress(from || process.env.TWILIO_WHATSAPP_NUMBER),
        to: normalizeWhatsAppAddress(to)
    });
};

const sendSmsMessage = async ({ to, body, from }) => {
    const smsFrom = normalizePhoneNumber(from || process.env.TWILIO_SMS_NUMBER);
    if (!smsFrom) {
        throw new Error('Missing SMS sender number. Set TWILIO_SMS_NUMBER or pass a from number.');
    }

    return getClient().messages.create({
        body,
        from: smsFrom,
        to: normalizePhoneNumber(to)
    });
};

const sendOwnerAlert = async (clinicConfig, eventType, details = {}) => {
    if (!clinicConfig || !clinicConfig.alertWhatsApp) {
        return;
    }

    const labels = {
        QUALIFIED: 'Qualified patient conversation',
        HANDOFF: 'Patient needs human follow-up',
        BOOKING_LINK_SENT: 'Booking link delivered',
        CONSULT_REPLY: 'Post-consult patient replied',
        REVIEW_CONCERN: 'Patient left review-related concern'
    };

    const summary = labels[eventType] || eventType;
    const patientNumber = details.patientNumber || 'unknown number';
    const patientName = details.patientName ? ` (${details.patientName})` : '';
    const issue = details.issue ? `\nIssue: ${details.issue}` : '';

    const body = [
        `Jawab alert: ${summary}`,
        `Patient: ${patientNumber}${patientName}${issue}`
    ].join('\n');

    await sendWhatsAppMessage({
        to: clinicConfig.alertWhatsApp,
        body
    });
};

module.exports = {
    buildDirectRecoveryMessage,
    buildSafeEntrySms,
    buildWhatsAppEntryLink,
    normalizePhoneNumber,
    sendOwnerAlert,
    sendSmsMessage,
    sendWhatsAppMessage
};
