const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    registrationTime: { type: Date, default: Date.now },
    status: { type: String, enum: ['registered', 'cancelled'], default: 'registered' },
});

module.exports = mongoose.model('Registration', RegistrationSchema);
