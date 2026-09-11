const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { dish } = req.query;
    
    const searchUrl = `https://www.googleapis.com/customsearch/v1`;
    const params = {
      q: `${dish} recipe`,
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
      key: process.env.GOOGLE_API_KEY,
      searchType: 'image'
    };
    
    const response = await axios.get(searchUrl, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/recipe-link/:dishName', async (req, res) => {
  try {
    const { dishName } = req.params;
    
    const searchUrl = `https://www.googleapis.com/customsearch/v1`;
    const params = {
      q: `${dishName} receta`,
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
      key: process.env.GOOGLE_API_KEY,
      num: 1
    };
    
    const response = await axios.get(searchUrl, { params });
    const firstResult = response.data.items?.[0];
    
    res.json({
      title: firstResult?.title,
      link: firstResult?.link,
      snippet: firstResult?.snippet
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;