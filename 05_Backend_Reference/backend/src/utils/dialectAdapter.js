const responses = {
    greeting: {
        khaleeji: 'سوري ما قدرنا نرد عليك. شلون أقدر أساعدك؟',
        en: 'Sorry we missed your call. How can I help you today?'
    },
    askName: {
        khaleeji: 'ممكن الاسم الكريم؟',
        en: 'May I have your name, please?'
    },
    askIssue: {
        khaleeji: 'حياك الله. شنو الخدمة اللي تحتاجها؟ مثل فحص، تنظيف، ألم، أو استشارة.',
        en: 'Thanks. What do you need help with today? For example: checkup, cleaning, pain, or a consultation.'
    },
    provideLink: {
        khaleeji: 'تمام، تقدر تختار الوقت المناسب من هذا الرابط:',
        en: 'Perfect. You can pick a suitable time from this link:'
    },
    provideLinkNoLink: {
        khaleeji: 'تمام، سجلت طلبك وببلغ فريق العيادة يتواصل معاك بأقرب وقت.',
        en: 'Perfect. I logged your request and the clinic team will follow up with you shortly.'
    },
    handoff: {
        khaleeji: 'أكيد. بخلي فريق العيادة يتواصل معاك مباشرة عشان يساعدك بشكل أدق.',
        en: 'Of course. I will have the clinic team follow up with you directly so they can help properly.'
    },
    alreadyHandled: {
        khaleeji: 'تم التبليغ وتقدر تتواصل مع الفريق مباشرة. إذا تحتاج شيء إضافي أنا حاضر.',
        en: 'The team has already been notified. If you need anything else, let me know.'
    },
    optOut: {
        khaleeji: 'تم إيقاف الرسائل. إذا احتجت العيادة مرة ثانية، أرسل لنا رسالة جديدة في أي وقت.',
        en: 'You have been opted out of follow-up messages. If you need the clinic again, just send a new message anytime.'
    },
    consultFollowup: {
        khaleeji: 'مرحبا {{patientName}}، هذه متابعة من {{clinicName}} بعد استشارتك مع {{doctorName}}. إذا عندك أي سؤال أو حاب تكمل الخطوة الجاية، رد على هذه الرسالة وأنا أساعدك.',
        en: 'Hi {{patientName}}, this is a follow-up from {{clinicName}} after your consultation with {{doctorName}}. If you have any questions or want help with the next step, reply here and I will help you.'
    },
    consultBridge: {
        khaleeji: 'أكيد. أقدر أخلي فريق العيادة يتواصل معاك، أو إذا يناسبك تقدر تختار وقت مناسب من الرابط التالي:',
        en: 'Absolutely. I can have the clinic team contact you, or if you prefer you can choose a suitable time from the link below:'
    },
    reviewRequest: {
        khaleeji: 'مرحبا {{patientName}}، نشكرك على زيارتك لـ {{clinicName}}. إذا يناسبك، هذا رابط سريع لترك تقييمك الصادق عن تجربتك معنا: {{reviewLink}}',
        en: 'Hi {{patientName}}, thanks for visiting {{clinicName}}. If you are happy to, here is a quick link to leave an honest review about your experience with us: {{reviewLink}}'
    },
    reviewThanks: {
        khaleeji: 'شكرا لك، نقدر وقتك ودعمك للعيادة.',
        en: 'Thank you. We really appreciate your time and support.'
    },
    reviewConcern: {
        khaleeji: 'آسفين إذا كانت تجربتك مو مثالية. ببلغ فريق العيادة يتواصل معاك مباشرة ويحاول يحل الموضوع.',
        en: 'I am sorry your experience was not ideal. I will notify the clinic team so they can follow up with you directly.'
    }
};

const fillTemplate = (template, context = {}) =>
    template.replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] || '');

const getLocalizedResponse = (intent, isEnglish = false, context = {}) => {
    const responseSet = responses[intent];
    if (!responseSet) {
        return '';
    }

    const template = isEnglish ? responseSet.en : responseSet.khaleeji;
    return fillTemplate(template, context).trim();
};

const isEnglishText = (text = '') => {
    if (!text.trim()) {
        return false;
    }

    const engMatches = text.match(/[a-zA-Z]/g);
    const engCount = engMatches ? engMatches.length : 0;
    return engCount >= (text.length / 2);
};

const isStopMessage = (text = '') => /^(stop|unsubscribe|cancel|قف|إيقاف|ايقاف)$/i.test(text.trim());

module.exports = { getLocalizedResponse, isEnglishText, isStopMessage };
