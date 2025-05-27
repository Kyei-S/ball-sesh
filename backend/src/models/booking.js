const { Schema, model } = require('mongoose');

const BookingSchema = new Schema({
  session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  name:    { type: String, required: true },
  contact: { type: String, required: true },
  status:  { type: String, default: 'confirmed' }
});

module.exports = model('Booking', BookingSchema);
