const twilio = require('twilio');
const {
    extractRoutingKeyword,
    loadClinicById,
    loadClinicByKeyword,
    loadClinicConfig
} = require('../config/tenants');
const { initializeWorkflowState, processIncomingMessage } = require('../services/conversationEngine');
const {
    buildDirectRecoveryMessage,
    buildSafeEntrySms,
    sendSmsMessage,
    sendWhatsAppMessage
} = require('../services/messagingService');

const validateWorkflowRequest = (req) => {
    const configuredKey = process.env.WORKFLOW_API_KEY;
    if (!configuredKey) {
        return true;
    }

    return req.headers['x-jawab-key'] === configuredKey;
};

const buildVoiceFallbackResponse = (triggerMode) => {
    const twiml = new twilio.twiml.VoiceResponse();

    if (triggerMode === 'direct_whatsapp') {
        twiml.reject({ reason: 'busy' });
        return twiml.toString();
    }

    twiml.say(
        { voice: 'alice' },
        'We just sent you a text message with the fastest way to continue with the clinic. Please check your phone.'
    );
    twiml.hangup();
    return twiml.toString();
};

const handleIncomingCall = async (req, res) => {
    const { To, From } = req.body;
    const clinicConfig = loadClinicConfig(To);

    if (!clinicConfig) {
        return res.status(404).send('Clinic config not found');
    }

    const triggerMode = clinicConfig.triggerMode === 'direct_whatsapp' ? 'direct_whatsapp' : 'sms_to_whatsapp';

    setTimeout(async () => {
        try {
            if (triggerMode === 'direct_whatsapp') {
                await sendWhatsAppMessage({
                    to: From,
                    body: buildDirectRecoveryMessage(clinicConfig)
                });
            } else {
                await sendSmsMessage({
                    to: From,
                    body: buildSafeEntrySms(clinicConfig),
                    from: clinicConfig.twilioNumber
                });
            }
            console.log(`Recovery message sent to ${From} for clinic ${clinicConfig.name} via ${triggerMode}`);
        } catch (error) {
            console.error('Error sending recovery message:', error.message);
        }
    }, 1500);

    res.type('text/xml').send(buildVoiceFallbackResponse(triggerMode));
};

const handleIncomingWhatsApp = async (req, res) => {
    const { To, From, Body } = req.body;
    const incomingNumber = (To || '').replace('whatsapp:', '');
    const routingKeyword = extractRoutingKeyword(Body || '');
    const clinicConfig = loadClinicConfig(incomingNumber) || loadClinicByKeyword(routingKeyword);

    if (!clinicConfig) {
        const twiml = new twilio.twiml.MessagingResponse();
        twiml.message('Sorry, we could not match your message to a clinic workflow.');
        return res.type('text/xml').send(twiml.toString());
    }

    const responseText = await processIncomingMessage(From, Body || '', clinicConfig);

    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(responseText);
    res.type('text/xml').send(twiml.toString());
};

const handleWorkflowTrigger = async (req, res) => {
    if (!validateWorkflowRequest(req)) {
        return res.status(401).json({ ok: false, error: 'Invalid workflow key' });
    }

    const { clinicId, patientNumber, workflowType, patientName, preferredLanguage, doctorName } = req.body;

    if (!clinicId || !patientNumber || !workflowType) {
        return res.status(400).json({ ok: false, error: 'clinicId, patientNumber, and workflowType are required' });
    }

    const clinicConfig = loadClinicById(clinicId);
    if (!clinicConfig) {
        return res.status(404).json({ ok: false, error: 'Clinic not found' });
    }

    if (workflowType === 'consult_followup' && !clinicConfig.consultFollowupEnabled) {
        return res.status(400).json({ ok: false, error: 'Consult follow-up is disabled for this clinic' });
    }

    if (workflowType === 'review_request' && !clinicConfig.reviewFlowEnabled) {
        return res.status(400).json({ ok: false, error: 'Review flow is disabled for this clinic' });
    }

    const outboundMessage = initializeWorkflowState({
        clinicConfig,
        phoneNumber: patientNumber,
        workflowType,
        patientName,
        preferredLanguage,
        doctorName
    });

    await sendWhatsAppMessage({
        to: patientNumber,
        body: `${outboundMessage}\n\nReply STOP to opt out.`
    });

    return res.status(200).json({
        ok: true,
        clinicId,
        patientNumber,
        workflowType
    });
};

module.exports = {
    handleIncomingCall,
    handleIncomingWhatsApp,
    handleWorkflowTrigger
};
