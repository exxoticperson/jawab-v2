const generateBookingLink = async (clinicConfig) => {
    if (clinicConfig.bookingMethod === 'cal.com' && (clinicConfig.bookingLink || clinicConfig.calLink)) {
        return clinicConfig.bookingLink || clinicConfig.calLink;
    }

    if (clinicConfig.bookingLink) {
        return clinicConfig.bookingLink;
    }

    return null;
};

const checkAvailability = async (timeString, clinicConfig) => {
    return true;
};

module.exports = { generateBookingLink, checkAvailability };
