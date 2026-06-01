'use strict';

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss        = require('xss-clean');
const hpp        = require('hpp');
const compression = require('compression');

const db              = require('./config/db');
const redisClient     = require('./config/redis');
const logger          = require('./utils/logger');
const errorHandler    = require('./middleware/errorHandler');
const { globalLimiter } = require('./middleware/rateLimiter');

// ── Route imports ──────────────────────────────────────────────────────────
const authRoutes       = require('./routes/auth');
const resumeRoutes     = require('./routes/resumeRoutes');
const questionRoutes   = require('./routes/questionRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const blogRoutes       = require('./routes/blogRoutes');
const commentRoutes    = require('./routes/commentRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security headers ────────────────────────────────────────────────────────
app.use(helmet());
app.set('trust proxy', 1); // trust first proxy (Render/Heroku)

// ── CORS ────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, mobile apps, same-origin)
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin '${origin}' not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body parsing & sanitisation ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));            // hard cap on JSON body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());   // strip $ and . from req.body/params/query
app.use(xss());             // sanitise HTML in body
app.use(hpp());             // prevent HTTP parameter pollution

// ── Compression & logging ───────────────────────────────────────────────────
app.use(compression());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));
}

// ── Global rate limiter (applied to every route) ────────────────────────────
app.use(globalLimiter);

// ── Health check (no auth, no rate limit) ───────────────────────────────────
app.get('/health', (_req, res) =>
  res.json({ status: 'ok', env: process.env.NODE_ENV, uptime: process.uptime() })
);

// ── API routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/resume',   resumeRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/evaluate', evaluationRoutes);
app.use('/api/blogs',    blogRoutes);
app.use('/api/blogs',    commentRoutes);   // /api/blogs/:blogId/comments

// ── 404 catch ────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

// ── Centralised error handler ────────────────────────────────────────────────
app.use(errorHandler);

// ── Graceful shutdown ────────────────────────────────────────────────────────
const shutdown = async (signal) => {
  logger.info(`${signal} received — shutting down gracefully`);
  server.close(async () => {
    try {
      await redisClient.quit();
      logger.info('Redis disconnected');
    } catch { /* ignore */ }
    process.exit(0);
  });
  setTimeout(() => { logger.error('Force exit after timeout'); process.exit(1); }, 10_000);
};

// ── Boot ─────────────────────────────────────────────────────────────────────
const boot = async () => {
  await db();

  // Connect Redis (non-fatal; app degrades gracefully without cache)
  try {
    if (!redisClient.isOpen) await redisClient.connect();
    logger.info('Redis connected');
  } catch (err) {
    logger.warn(`Redis unavailable — caching disabled: ${err.message}`);
  }

  const server = app.listen(PORT, () =>
    logger.info(`Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
  );

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
  process.on('uncaughtException',  err => { logger.error('Uncaught exception', err); process.exit(1); });
  process.on('unhandledRejection', err => { logger.error('Unhandled rejection', err); process.exit(1); });

  return server;
};

boot().catch(err => { console.error('Boot failed:', err); process.exit(1); });

module.exports = app; // for testing
