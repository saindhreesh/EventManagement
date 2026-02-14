const express = require('express');
const { getUserDashboard } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', protect, getUserDashboard);

module.exports = router;
