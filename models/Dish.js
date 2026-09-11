const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true
  },
  description: String,
  type: String,
  origin: String,
  image: String,
  prepTime: String,
  difficulty: String,
  recipeLink: String,
  tags: [String],
  attributes: {
    vegetarian: Boolean,
    vegan: Boolean,
    spicy: Boolean,
    light: Boolean,
    quick: Boolean,
    traditional: Boolean,
    international: Boolean,
    seafood: Boolean,
    lowCalorie: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Dish', dishSchema);