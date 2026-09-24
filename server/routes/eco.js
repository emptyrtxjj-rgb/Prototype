const express = require('express');
const router = express.Router();
const ecoData = require('../data/eco.json');

router.get('/', (req, res) => {
  res.json({ success: true, data: ecoData });
});

module.exports = router;
