const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
    const { search, category, location, date } = req.query;
    let query = {};

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
        query.category = category;
    }
    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }
    if (date) {
        query.dateTime = { $gte: new Date(date) };
    }

    try {
        const events = await Event.find(query).sort({ dateTime: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
