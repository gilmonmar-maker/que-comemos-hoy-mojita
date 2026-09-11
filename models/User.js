const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  preferences: {
    vegetarian: { type: Boolean, default: null },
    spicy: { type: Boolean, default: null },
    light: { type: Boolean, default: null },
    international: { type: Boolean, default: null }
  }
});

module.exports = mongoose.model('User', userSchema);