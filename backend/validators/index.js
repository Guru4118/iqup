'use strict';

const { body, param, validationResult } = require('express-validator');

/**
 * Middleware that reads express-validator errors and returns 422 if any.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed.',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// ── Auth ──────────────────────────────────────────────────────────────────────
const registerRules = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .isLength({ min: 2, max: 30 }).withMessage('Username must be 2–30 characters.')
    .matches(/^[a-zA-Z0-9_.-]+$/).withMessage('Username may only contain letters, numbers, _, ., -'),
  body('email')
    .trim().normalizeEmail()
    .isEmail().withMessage('A valid email is required.'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.'),
];

const loginRules = [
  body('email').trim().normalizeEmail().isEmail().withMessage('Valid email required.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

// ── Blog ──────────────────────────────────────────────────────────────────────
const blogRules = [
  body('title')
    .trim().notEmpty().withMessage('Title is required.')
    .isLength({ max: 200 }).withMessage('Title must be under 200 characters.'),
  body('content')
    .trim().notEmpty().withMessage('Content is required.')
    .isLength({ max: 50_000 }).withMessage('Content is too long.'),
];

// ── Comment ───────────────────────────────────────────────────────────────────
const commentRules = [
  body('text')
    .trim().notEmpty().withMessage('Comment text is required.')
    .isLength({ max: 2000 }).withMessage('Comment must be under 2000 characters.'),
];

// ── Session / answers ─────────────────────────────────────────────────────────
const answerRules = [
  body('answer')
    .trim().notEmpty().withMessage('Answer is required.')
    .isLength({ max: 5000 }).withMessage('Answer is too long (max 5000 chars).'),
];

const sessionIdParam = [
  param('sessionId')
    .trim()
    .matches(/^[0-9a-f-]{36}$/).withMessage('Invalid session ID.'),
];

module.exports = {
  validate,
  registerRules,
  loginRules,
  blogRules,
  commentRules,
  answerRules,
  sessionIdParam,
};
