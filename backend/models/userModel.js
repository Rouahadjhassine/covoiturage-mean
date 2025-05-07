const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { // ← Ajouté ici
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'passager', 'conducteur'],
    default: 'passager'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
