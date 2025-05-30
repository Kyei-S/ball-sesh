// backend/src/models/session.js
const { Schema, model } = require('mongoose');

const SessionSchema = new Schema({
  venue: { type: String, required: true },
  time:  { type: Date,   required: true },
  status:{ type: String, enum: ['active','cancelled'], default: 'active' },
  price: { type: Number, required: true }   // <-- ADD THIS LINE
});

module.exports = model('Session', SessionSchema);
