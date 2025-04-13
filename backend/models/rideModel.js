const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
