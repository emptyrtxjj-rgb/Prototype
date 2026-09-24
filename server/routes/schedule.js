const express = require('express');
const router = express.Router();
const scheduleData = require('../data/schedule.json');
const aiService = require('../services/aiService');

router.get('/', (req, res) => {
  res.json({ success: true, data: scheduleData });
});

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, укажите ваши пожелания к расписанию.'
      });
    }

    const result = await aiService.generateSchedule(prompt);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
