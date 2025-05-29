// Load environment variables & connect to MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import models
const Session = require('./models/session');
const Booking = require('./models/booking');

// Set up Express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Seed data for demo
const sessions = [
  {
    _id: '1',
    venue: 'Northampton Goals NN3 6BL',
    time: new Date().setHours(18, 0, 0), // today at 6pm
    status: 'active',
  },
  {
    _id: '2',
    venue: 'Northampton Goals NN3 6BL',
    time: new Date(Date.now() + 86400000).setHours(18, 0, 0), // tomorrow 6pm
    status: 'cancelled',
  },
];

// Sessions listing endpoint
app.get('/sessions', (req, res) => {
  res.json(sessions);
});



// --- Session CRUD ---

// List all sessions
app.get('/sessions', async (req, res) => {
  const sessions = await Session.find();
  res.json(sessions);
});

// Create a new session (admin)
app.post('/sessions', async (req, res) => {
  const session = await Session.create(req.body);
  res.status(201).json(session);
});

// Update a session’s status (e.g. cancel)
app.patch('/sessions/:id/status', async (req, res) => {
  const session = await Session.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(session);
});

// --- Booking CRUD ---

// List all bookings (admin view)
app.get('/bookings', async (req, res) => {
  const bookings = await Booking.find().populate('session');
  res.json(bookings);
});

// Create a new booking (public)
app.post('/bookings', async (req, res) => {
  const { session: sessionId, name, contact } = req.body;
  if (!sessionId || !name || !contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const booking = await Booking.create({ session: sessionId, name, contact });
  res.status(201).json(booking);
});

// Start the server
app.listen(port, () => {
  console.log(`Backend API listening on http://localhost:${port}`);
});
