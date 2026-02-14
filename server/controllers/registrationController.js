const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.registerForEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.remainingSeats <= 0) {
            return res.status(400).json({ message: 'No seats available' });
        }

        const existingRegistration = await Registration.findOne({ userId, eventId, status: 'registered' });
        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        const registration = await Registration.create({ userId, eventId });
        event.remainingSeats -= 1;
        await event.save();

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.cancelRegistration = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;

    try {
        const registration = await Registration.findOne({ userId, eventId, status: 'registered' });
        if (!registration) return res.status(404).json({ message: 'Registration not found' });

        registration.status = 'cancelled';
        await registration.save();

        const event = await Event.findById(eventId);
        event.remainingSeats += 1;
        await event.save();

        res.json({ message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
