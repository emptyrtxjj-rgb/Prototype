const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

// Auto-load .env from project root if it exists
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

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
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Smart School KZ API Core v2.4',
    aiIntegration: {
      geminiConfigured: hasGemini,
      openAiConfigured: hasOpenAI,
      activeEngine: hasGemini ? 'Google Gemini AI' : hasOpenAI ? 'OpenAI GPT' : 'Deterministic Academic Heuristics'
    }
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
    const hasGemini = Boolean(process.env.GEMINI_API_KEY);
    const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
    console.log(`[Smart School KZ API] Server active on http://127.0.0.1:${PORT}`);
    console.log(`[Smart School KZ API] AI Engine: ${hasGemini ? 'Google Gemini' : hasOpenAI ? 'OpenAI' : 'Local Heuristic Solver (Ready for API Key)'}`);
  });
}

module.exports = app;
