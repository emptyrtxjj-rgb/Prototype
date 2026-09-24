const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

router.post('/classify', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, опишите ситуацию.'
      });
    }

    const classification = await aiService.classifyHelpRequest(query);
    res.json({ success: true, data: classification });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
