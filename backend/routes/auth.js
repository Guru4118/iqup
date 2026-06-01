'use strict';

const express = require('express');
const router  = express.Router();

const { register, login, logout, getMe } = require('../controllers/userController');
const { protect }                         = require('../middleware/authMiddleware');
const { authLimiter }                     = require('../middleware/rateLimiter');
const { registerRules, loginRules, validate } = require('../validators');

// POST /api/auth/register
router.post('/register',
  authLimiter,
  registerRules,
  validate,
  register
);

// POST /api/auth/login
router.post('/login',
  authLimiter,
  loginRules,
  validate,
  login
);

// POST /api/auth/logout
router.post('/logout', logout);

// GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;
