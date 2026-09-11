const express = require('express');
const router = express.Router();
const Preference = require('../models/Preference');

router.post('/save', async (req, res) => {
  try {
    const { userId, preference } = req.body;
    const newPreference = new Preference({
      userId,
      ...preference
    });
    await newPreference.save();
    res.json(newPreference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const preferences = await Preference.find({ userId: req.params.userId });
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;