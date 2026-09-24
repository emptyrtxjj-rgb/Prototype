const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const roomsRouter = require('./routes/rooms');
const announcementsRouter = require('./routes/announcements');
const lostFoundRouter = require('./routes/lostFound');
const scheduleRouter = require('./routes/schedule');
const aiRouter = require('./routes/ai');
const navigationRouter = require('./routes/navigation');
const helpRouter = require('./routes/help');
const ecoRouter = require('./routes/eco');

app.use('/api/rooms', roomsRouter);
app.use('/api/announcements', announcementsRouter);
app.use('/api/lost-found', lostFoundRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/mentor', aiRouter);
app.use('/api/navigation', navigationRouter);
app.use('/api/help', helpRouter);
app.use('/api/eco', ecoRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Smart School KZ API Core v2.4'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    error: 'Внутренняя ошибка сервера API.'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Smart School KZ API] Server active on http://127.0.0.1:${PORT}`);
  });
}

module.exports = app;
