const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    organizer: { type: String, required: true },
    location: { type: String, required: true },
    dateTime: { type: Date, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    remainingSeats: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);
