const mongoose = require('mongoose');

const trajetSchema = new mongoose.Schema({
  conducteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  depart: {
    type: String,
    required: true,
    trim: true
  },
  arrivee: {
    type: String,
    required: true,
    trim: true
  },
  passagers: {
    type: Number,
    required: true,
    min: 1
  },
  dateDepart: {
    type: Date,
    required: true
  },
  dateArrivee: {
    type: Date,
    required: true
  },
  datePublication: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trajet', trajetSchema);
