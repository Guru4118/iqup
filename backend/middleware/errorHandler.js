'use strict';

const logger = require('../utils/logger');

/**
 * Express 4-arg error handler.
 * - Never leaks stack traces to the client in production.
 * - Translates known error types to appropriate HTTP codes.
 */
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  // Always log the full error server-side
  logger.error({
    message: err.message,
    stack:   err.stack,
    url:     req.originalUrl,
    method:  req.method,
    ip:      req.ip,
  });

  // ── Mongoose CastError (invalid ObjectId) ──────────────────────────────
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource identifier.' });
  }

  // ── Mongoose ValidationError ───────────────────────────────────────────
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(422).json({ message: 'Validation failed.', errors: messages });
  }

  // ── Mongoose duplicate key ─────────────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({ message: `${field} is already taken.` });
  }

  // ── JWT errors ─────────────────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  // ── Multer errors (file upload) ────────────────────────────────────────
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File too large. Maximum size is 5 MB.' });
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ message: 'Unexpected file field.' });
  }

  // ── CORS ───────────────────────────────────────────────────────────────
  if (err.message && err.message.startsWith('CORS:')) {
    return res.status(403).json({ message: 'Not allowed by CORS.' });
  }

  // ── Generic fallback ───────────────────────────────────────────────────
  const status  = err.statusCode || err.status || 500;
  const message = (isProd && status === 500)
    ? 'An unexpected error occurred.'
    : err.message;

  res.status(status).json({
    message,
    ...(isProd ? {} : { stack: err.stack }),
  });
};
