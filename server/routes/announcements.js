const express = require('express');
const router = express.Router();
const announcementsData = require('../data/announcements.json');

router.get('/', (req, res) => {
  res.json({ success: true, count: announcementsData.length, data: announcementsData });
});

module.exports = router;
