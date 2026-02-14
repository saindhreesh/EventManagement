const express = require('express');
const { getEvents, getEventById, createEvent } = require('../controllers/eventController');
const { registerForEvent, cancelRegistration } = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', createEvent); // For initial data entry or admin

router.post('/:eventId/register', protect, registerForEvent);
router.delete('/:eventId/register', protect, cancelRegistration);

module.exports = router;
