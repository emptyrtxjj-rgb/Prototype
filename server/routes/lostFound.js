const express = require('express');
const router = express.Router();
let lostFoundData = require('../data/lostFound.json');

router.get('/', (req, res) => {
  res.json({ success: true, data: lostFoundData });
});

router.post('/', (req, res) => {
  const { title, location, description, date, category } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Введите название предмета.'
    });
  }

  if (!location || !location.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Укажите место находки.'
    });
  }

  const newItem = {
    id: `LF-${Date.now().toString().slice(-4)}`,
    title: title.trim(),
    location: location.trim(),
    date: date || 'Сегодня',
    category: category || 'other',
    description: (description || '').trim() || 'Описание отсутствует',
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  };

  lostFoundData.items.unshift(newItem);
  lostFoundData.stats.found += 1;
  lostFoundData.stats.pending += 1;

  res.status(201).json({
    success: true,
    message: 'Запись успешно добавлена.',
    data: newItem,
    stats: lostFoundData.stats
  });
});

module.exports = router;
