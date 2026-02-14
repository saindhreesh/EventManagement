const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.getUserDashboard = async (req, res) => {
    const userId = req.user.id;

    try {
        const registrations = await Registration.find({ userId, status: 'registered' }).populate('eventId');

        const now = new Date();
        const upcomingEvents = [];
        const pastEvents = [];

        registrations.forEach(reg => {
            if (reg.eventId.dateTime >= now) {
                upcomingEvents.push(reg.eventId);
            } else {
                pastEvents.push(reg.eventId);
            }
        });

        res.json({
            upcomingEvents,
            pastEvents,
            totalRegistrations: registrations.length,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
