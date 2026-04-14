const fs = require('fs');
const path = require('path');

const normalizePhone = (value = '') => value.toString().replace(/[^+\d]/g, '');

const loadAllClinicConfigs = () => {
    const configPath = path.join(__dirname, 'tenants.json');
    const rawData = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(rawData);
};

const loadClinicConfig = (incomingNumber) => {
    try {
        const tenants = loadAllClinicConfigs();
        const normalizedIncoming = normalizePhone(incomingNumber);

        const match = tenants.find((tenant) => {
            const candidates = [
                tenant.twilioNumber,
                tenant.phone,
                tenant.whatsappEntryNumber
            ].filter(Boolean).map(normalizePhone);

            return candidates.some((candidate) => candidate && normalizedIncoming.includes(candidate));
        });

        return match || tenants[0];
    } catch (e) {
        console.error('Failed to load clinic configs', e.message);
        return null;
    }
};

const loadClinicById = (clinicId) => {
    try {
        return loadAllClinicConfigs().find((tenant) => tenant.clinicId === clinicId) || null;
    } catch (e) {
        console.error('Failed to load clinic by id', e.message);
        return null;
    }
};

const loadClinicByKeyword = (keyword) => {
    if (!keyword) {
        return null;
    }

    try {
        const normalizedKeyword = keyword.trim().toUpperCase();
        return loadAllClinicConfigs().find((tenant) => (tenant.entryKeyword || '').toUpperCase() === normalizedKeyword) || null;
    } catch (e) {
        console.error('Failed to load clinic by keyword', e.message);
        return null;
    }
};

const extractRoutingKeyword = (messageBody = '') => {
    const match = messageBody.trim().match(/^(?:BOOK\s+)?([A-Z0-9_-]{2,})$/i);
    return match ? match[1].toUpperCase() : null;
};

module.exports = {
    extractRoutingKeyword,
    loadAllClinicConfigs,
    loadClinicById,
    loadClinicByKeyword,
    loadClinicConfig,
    normalizePhone
};
