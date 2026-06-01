'use strict';

const express = require('express');
const router  = express.Router();

const { evaluate }           = require('../controllers/evaluationController');
const { evaluationLimiter }  = require('../middleware/rateLimiter');
const { sessionIdParam, validate } = require('../validators');

// GET /api/evaluate/:sessionId
router.get('/:sessionId',
  evaluationLimiter,
  sessionIdParam,
  validate,
  evaluate
);

module.exports = router;
