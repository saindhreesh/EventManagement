const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

process.on('uncaughtException', err => {
    console.error('UNCAUGHT EXCEPTION 💥');
    console.error(err);
});

process.on('unhandledRejection', err => {
    console.error('UNHANDLED PROMISE 💥');
    console.error(err);
});


const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // VERY IMPORTANT



app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/user', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Event Management API Running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
