const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  dishId: String,
  dishName: String,
  rating: {
    type: String,
    enum: ['love', 'skip', 'dislike']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

preferenceSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Preference', preferenceSchema);