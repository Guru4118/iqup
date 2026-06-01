'use strict';

const rateLimit = require('express-rate-limit');
const logger    = require('../utils/logger');

/**
 * Creates a rate limiter with standardised headers and logging.
 */
const createLimiter = (options) =>
  rateLimit({
    standardHeaders: true,   // Return rate limit info in `RateLimit-*` headers
    legacyHeaders:   false,  // Disable `X-RateLimit-*` headers
    handler: (req, res, _next, options) => {
      logger.warn(`Rate limit hit: ${req.ip} → ${req.originalUrl}`);
      res.status(options.statusCode).json({
        message: options.message || 'Too many requests — please try again later.',
        retryAfter: Math.ceil(options.windowMs / 1000),
      });
    },
    ...options,
  });

// ── Tier 1: Global fallback — all routes ─────────────────────────────────────
const globalLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: 300,
  message: 'Too many requests from this IP.',
});

// ── Tier 2: Auth routes — brute-force protection ─────────────────────────────
// Tight window to block credential stuffing attacks.
const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: 10,
  message: 'Too many login attempts. Try again in 15 minutes.',
  skipSuccessfulRequests: true,  // only count failures toward the limit
});

// ── Tier 3: Resume upload — OpenAI cost & abuse protection ───────────────────
const uploadLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 5,
  message: 'Upload limit reached. You may submit 5 resumes per hour.',
});

// ── Tier 4: AI question generation — OpenAI cost control ─────────────────────
const questionLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 50,
  message: 'Question generation limit reached. Try again in an hour.',
});

// ── Tier 5: Evaluation — expensive AI call ───────────────────────────────────
const evaluationLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Evaluation limit reached. Try again in an hour.',
});

// ── Tier 6: Blog reads — generous ────────────────────────────────────────────
const blogReadLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

// ── Tier 7: Blog writes — admin-only, still protect ──────────────────────────
const blogWriteLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: 'Blog write limit reached.',
});

module.exports = {
  globalLimiter,
  authLimiter,
  uploadLimiter,
  questionLimiter,
  evaluationLimiter,
  blogReadLimiter,
  blogWriteLimiter,
};
