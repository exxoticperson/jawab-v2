const { extractRoutingKeyword } = require('../config/tenants');
const { generateBookingLink } = require('./bookingService');
const { logConversation } = require('./csvLogger');
const { sendOwnerAlert } = require('./messagingService');
const { getLocalizedResponse, isEnglishText, isStopMessage } = require('../utils/dialectAdapter');

const userStates = {};
const optedOutUsers = new Set();

const complexIntentRegex = /(price|cost|insurance|payment|doctor|specialist|كم|بكم|تأمين|سعر|تكلفة|طبيب|دكتور)/i;
const negativeReviewRegex = /(bad|upset|angry|issue|problem|complain|سيء|مشكلة|زعلان|مو زين|غير راضي)/i;

const getStateKey = (clinicConfig, fromNumber) => `${clinicConfig.clinicId}:${fromNumber}`;

const cleanIncomingMessage = (messageBody = '', clinicConfig) => {
    const trimmed = messageBody.trim();
    const routingKeyword = extractRoutingKeyword(trimmed);
    const entryKeyword = clinicConfig.entryKeyword || clinicConfig.clinicId;

    if (routingKeyword && routingKeyword === entryKeyword.toUpperCase()) {
        return '';
    }

    const keywordWithBook = new RegExp(`^BOOK\\s+${entryKeyword}$`, 'i');
    return trimmed.replace(keywordWithBook, '').trim();
};

const resolveLanguagePreference = (state, messageBody) => {
    if (typeof state.isEnglish === 'boolean') {
        return state.isEnglish;
    }

    state.isEnglish = isEnglishText(messageBody);
    return state.isEnglish;
};

const clearState = (stateKey) => {
    delete userStates[stateKey];
};

const handleRecoveryFlow = async ({ clinicConfig, state, stateKey, fromNumber, messageBody }) => {
    const isEnglish = resolveLanguagePreference(state, messageBody);

    if (complexIntentRegex.test(messageBody)) {
        state.step = 'HANDOFF';
        await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'HANDOFF');
        await sendOwnerAlert(clinicConfig, 'HANDOFF', {
            patientNumber: fromNumber,
            patientName: state.name,
            issue: messageBody
        });
        return getLocalizedResponse('handoff', isEnglish);
    }

    if (state.step === 'ASK_NAME') {
        state.name = messageBody;
        state.step = 'ASK_ISSUE';
        await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'RECOVERY_NAME_CAPTURED');
        return getLocalizedResponse('askIssue', isEnglish);
    }

    if (state.step === 'ASK_ISSUE') {
        state.issue = messageBody;
        state.step = 'COMPLETE';
        await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'QUALIFIED');
        await sendOwnerAlert(clinicConfig, 'QUALIFIED', {
            patientNumber: fromNumber,
            patientName: state.name,
            issue: messageBody
        });

        const bookingLink = await generateBookingLink(clinicConfig);
        if (bookingLink) {
            await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'BOOKING_LINK_SENT');
            await sendOwnerAlert(clinicConfig, 'BOOKING_LINK_SENT', {
                patientNumber: fromNumber,
                patientName: state.name,
                issue: messageBody
            });
            clearState(stateKey);
            return `${getLocalizedResponse('provideLink', isEnglish)}\n${bookingLink}`;
        }

        await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'HANDOFF');
        await sendOwnerAlert(clinicConfig, 'HANDOFF', {
            patientNumber: fromNumber,
            patientName: state.name,
            issue: messageBody
        });
        clearState(stateKey);
        return getLocalizedResponse('provideLinkNoLink', isEnglish);
    }

    return getLocalizedResponse('alreadyHandled', isEnglish);
};

const handleConsultFollowupReply = async ({ clinicConfig, state, stateKey, fromNumber, messageBody }) => {
    const isEnglish = resolveLanguagePreference(state, messageBody);
    const bookingLink = await generateBookingLink(clinicConfig);

    await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'CONSULT_REPLY');
    await sendOwnerAlert(clinicConfig, 'CONSULT_REPLY', {
        patientNumber: fromNumber,
        patientName: state.patientName,
        issue: messageBody
    });

    clearState(stateKey);

    if (bookingLink) {
        return `${getLocalizedResponse('consultBridge', isEnglish)}\n${bookingLink}`;
    }

    return getLocalizedResponse('handoff', isEnglish);
};

const handleReviewReply = async ({ clinicConfig, state, stateKey, fromNumber, messageBody }) => {
    const isEnglish = resolveLanguagePreference(state, messageBody);

    clearState(stateKey);

    if (negativeReviewRegex.test(messageBody)) {
        await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'REVIEW_CONCERN');
        await sendOwnerAlert(clinicConfig, 'REVIEW_CONCERN', {
            patientNumber: fromNumber,
            patientName: state.patientName,
            issue: messageBody
        });
        return getLocalizedResponse('reviewConcern', isEnglish);
    }

    await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'REVIEW_REPLY');
    return getLocalizedResponse('reviewThanks', isEnglish);
};

const initializeWorkflowState = ({ clinicConfig, phoneNumber, workflowType, patientName, preferredLanguage, doctorName }) => {
    const stateKey = getStateKey(clinicConfig, phoneNumber);
    const isEnglish = preferredLanguage === 'en' ? true : preferredLanguage === 'ar' ? false : null;

    const state = {
        workflowType,
        patientName: patientName || 'there',
        doctorName: doctorName || clinicConfig.consultDoctorName || 'the doctor',
        isEnglish
    };

    userStates[stateKey] = state;

    const context = {
        clinicName: clinicConfig.name,
        patientName: patientName || 'there',
        doctorName: doctorName || clinicConfig.consultDoctorName || 'the doctor',
        reviewLink: clinicConfig.reviewLink || ''
    };

    const intent = workflowType === 'review_request' ? 'reviewRequest' : 'consultFollowup';
    return getLocalizedResponse(intent, isEnglish === true, context);
};

const processIncomingMessage = async (fromNumber, rawMessageBody, clinicConfig) => {
    const stateKey = getStateKey(clinicConfig, fromNumber);
    const messageBody = cleanIncomingMessage(rawMessageBody, clinicConfig);
    const isEnglish = isEnglishText(rawMessageBody);

    if (isStopMessage(rawMessageBody)) {
        optedOutUsers.add(stateKey);
        clearState(stateKey);
        await logConversation(clinicConfig.clinicId, fromNumber, isEnglish ? 'EN' : 'AR', 'OPTOUT');
        return getLocalizedResponse('optOut', isEnglish);
    }

    if (optedOutUsers.has(stateKey)) {
        return getLocalizedResponse('optOut', isEnglish);
    }

    let state = userStates[stateKey];
    if (!state) {
        state = {
            workflowType: 'recovery',
            step: 'ASK_NAME',
            isEnglish: messageBody ? isEnglishText(messageBody) : isEnglish
        };
        userStates[stateKey] = state;
        await logConversation(clinicConfig.clinicId, fromNumber, state.isEnglish ? 'EN' : 'AR', 'RECOVERY_STARTED');

        if (!messageBody) {
            return getLocalizedResponse('askName', state.isEnglish);
        }
    }

    if (state.workflowType === 'consult_followup') {
        return handleConsultFollowupReply({ clinicConfig, state, stateKey, fromNumber, messageBody });
    }

    if (state.workflowType === 'review_request') {
        return handleReviewReply({ clinicConfig, state, stateKey, fromNumber, messageBody });
    }

    return handleRecoveryFlow({ clinicConfig, state, stateKey, fromNumber, messageBody });
};

module.exports = { initializeWorkflowState, processIncomingMessage };
