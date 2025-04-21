const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    default: 'passager' // tu choisis le rôle par défaut ici
  }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
