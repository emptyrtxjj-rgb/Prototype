const express = require('express');
const router = express.Router();
const roomsData = require('../data/rooms.json');

router.get('/', (req, res) => {
  res.json({ success: true, count: roomsData.length, data: roomsData });
});

module.exports = router;
