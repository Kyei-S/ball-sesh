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
    price: 8, // Add price
  },
  {
    _id: '2',
    venue: 'Northampton Goals NN3 6BL',
    time: new Date(Date.now() + 86400000).setHours(18, 0, 0), // tomorrow 6pm
    status: 'cancelled',
    price: 8, // Add price
  },
];

// Sessions listing endpoint
app.get('/sessions', (req, res) => {
  res.json(sessions);
});


// --- SESSION ROUTES ---

// List all sessions
app.get('/api/sessions', async (req, res) => {
  const sessions = await Session.find();
  res.json(sessions);
});

// Create a new session (admin)
app.post('/api/sessions', async (req, res) => {
  const session = await Session.create(req.body);
  res.status(201).json(session);
});

// Update all session details
app.put('/api/sessions/:id', async (req, res) => {
  const session = await Session.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(session);
});

// Delete a session
app.delete('/api/sessions/:id', async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Update only status (keep for quick status change)
app.patch('/api/sessions/:id/status', async (req, res) => {
  const session = await Session.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(session);
});

// Get all bookings for a specific session (roster)
app.get('/api/sessions/:id/bookings', async (req, res) => {
  const bookings = await Booking.find({ session: req.params.id });
  res.json(bookings);
});

// --- BOOKING ROUTES ---

// List all bookings (admin)
app.get('/api/bookings', async (req, res) => {
  const bookings = await Booking.find().populate('session');
  res.json(bookings);
});

// Create a new booking (public)
app.post('/api/bookings', async (req, res) => {
  const { session: sessionId, name, contact } = req.body;
  if (!sessionId || !name || !contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const booking = await Booking.create({ session: sessionId, name, contact });
  res.status(201).json(booking);
});

// Stripe integration
const Stripe = require('stripe');

// Check if STRIPE_SECRET_KEY is loaded
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in the environment variables');
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { sessionId, name, email } = req.body;

    // Fetch session details from the database
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    // Debug logs
    console.log('SESSION:', session);
    console.log('SESSION PRICE:', session.price);

    // Ensure session has a price
    if (!session.price) {
      return res.status(400).json({ error: 'Session price is missing' });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `Booking for ${session.venue}`,
              description: `Football session by ${name}`,
            },
            unit_amount: session.price * 100, // Convert pounds to pence
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        sessionId,
        player: name,
      },
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: stripeSession.url });
  } catch (err) {
    console.error('Error creating Stripe session:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend API listening on http://localhost:${port}`);
  });
}

// 👇 Add this line at the very end:
module.exports = app;