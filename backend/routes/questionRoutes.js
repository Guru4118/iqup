'use strict';

const express = require('express');
const router  = express.Router();

const { getNextQuestion, recordAnswer } = require('../controllers/questionController');
const { questionLimiter }               = require('../middleware/rateLimiter');
const { sessionIdParam, answerRules, validate } = require('../validators');

// GET /api/question/:sessionId
router.get('/:sessionId',
  questionLimiter,
  sessionIdParam,
  validate,
  getNextQuestion
);

// POST /api/question/:sessionId
router.post('/:sessionId',
  questionLimiter,
  sessionIdParam,
  answerRules,
  validate,
  recordAnswer
);

module.exports = router;
