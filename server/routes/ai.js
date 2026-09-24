const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, введите текст для анализа (минимум 20 символов).'
      });
    }

    const analysis = await aiService.analyzeText(text);
    res.json({ success: true, data: analysis });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
