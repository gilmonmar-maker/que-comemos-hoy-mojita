const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const Preference = require('../models/Preference');
const DISHES_DATABASE = require('../data/dishes');

router.post('/recommend', async (req, res) => {
  try {
    const { userId, answers, preferences } = req.body;
    
    const userPreferences = await Preference.find({ userId }).sort({ timestamp: -1 }).limit(50);
    
    const scoredDishes = DISHES_DATABASE.map(dish => {
      let score = 50;
      
      if (answers[0] && dish.attributes.light) score += 10;
      if (answers[1] && dish.attributes.vegetarian) score += 15;
      if (answers[2] && dish.attributes.spicy) score += 10;
      if (answers[3] && dish.attributes.quick) score += 15;
      if (answers[4] && !dish.attributes.vegetarian) score += 10;
      if (answers[5] && dish.attributes.international) score += 10;
      if (answers[6]) score += 5;
      if (answers[7] && dish.attributes.traditional) score += 10;
      if (answers[8] && dish.attributes.seafood) score += 10;
      if (answers[9] && dish.attributes.lowCalorie) score += 15;
      
      const loved = userPreferences.filter(p => p.dishName === dish.name && p.rating === 'love').length;
      const disliked = userPreferences.filter(p => p.dishName === dish.name && p.rating === 'dislike').length;
      
      score += (loved * 20);
      score -= (disliked * 30);
      
      return { ...dish, score };
    });
    
    const topDishes = scoredDishes.sort((a, b) => b.score - a.score).slice(0, 3);
    
    res.json({ dishes: topDishes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;