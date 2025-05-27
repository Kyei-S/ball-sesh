const { Schema, model } = require('mongoose');

const SessionSchema = new Schema({
  venue: { type: String, required: true },
  time:  { type: Date,   required: true },
  status:{ type: String, enum: ['active','cancelled'], default: 'active' }
});

module.exports = model('Session', SessionSchema);
