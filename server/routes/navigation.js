const express = require('express');
const router = express.Router();
const roomsData = require('../data/rooms.json');

router.post('/route', (req, res) => {
  const { from, to } = req.body;

  if (!to || !to.toString().trim()) {
    return res.status(400).json({
      success: false,
      error: 'Пожалуйста, выберите кабинет назначения.'
    });
  }

  const fromStr = (from || '101').toString().trim();
  const toStr = to.toString().trim();

  // Find rooms in database
  const fromRoom = roomsData.find(r => r.number === fromStr || r.id === fromStr);
  const toRoom = roomsData.find(r => r.number === toStr || r.id === toStr);

  if (!toRoom) {
    return res.status(404).json({
      success: false,
      error: `Кабинет ${toStr} не найден. Проверьте номер или обратитесь на пост охраны.`
    });
  }

  const startRoom = fromRoom || roomsData[0];
  const floorDiff = Math.abs(toRoom.floor - startRoom.floor);

  // Dynamic route steps generation
  const steps = [];
  steps.push(`${startRoom.floor} этаж, выход из кабинета ${startRoom.number}`);
  steps.push('Движение по главному коридору');

  if (floorDiff > 0) {
    steps.push(`Переход по центральной лестнице на ${toRoom.floor} этаж`);
  }

  steps.push(`Поворот к ${toRoom.wing === 'west' ? 'западному' : toRoom.wing === 'east' ? 'восточному' : 'центральному'} крылу`);
  steps.push(`Прибытие: Кабинет ${toRoom.number} (${toRoom.name})`);

  // Distance and time calculation
  const distanceMeters = Math.round(75 + floorDiff * 55 + Math.random() * 20);
  const timeSeconds = Math.round((distanceMeters / 1.15));
  const timeFormatted = `≈ ${Math.floor(timeSeconds / 60)} мин ${timeSeconds % 60} сек`;

  res.json({
    success: true,
    data: {
      from: `Кабинет ${startRoom.number}`,
      to: `Кабинет ${toRoom.number}`,
      fromRoom: startRoom,
      toRoom: toRoom,
      steps,
      time: timeFormatted,
      timeSeconds,
      distance: `≈ ${distanceMeters} м`,
      distanceMeters,
      floorDiff,
      requiresStairs: floorDiff > 0
    }
  });
});

module.exports = router;
