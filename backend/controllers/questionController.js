'use strict';

const { getSession, recordQuestion } = require('../utils/sessionManager');
const { generateQuestion }           = require('../services/openaiService');
const logger                         = require('../utils/logger');

const MAX_QUESTIONS = 7;

// ── GET /api/question/:sessionId ──────────────────────────────────────────────
const getNextQuestion = async (req, res, next) => {
  try {
    const session = getSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found or expired.' });
    }

    if (session.questionCount >= MAX_QUESTIONS) {
      return res.status(200).json({ question: 'Interview completed', done: true });
    }

    const question = await generateQuestion(
      session.resumeText,
      session.questionsAsked,
      session.answers
    );

    session.questionCount++;
    recordQuestion(req.params.sessionId, question);

    res.json({
      question,
      questionNumber: session.questionCount,
      totalQuestions: MAX_QUESTIONS,
      done: false,
    });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/question/:sessionId ─────────────────────────────────────────────
const recordAnswer = (req, res, next) => {
  try {
    const session = getSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found or expired.' });
    }

    if (session.answers.length >= MAX_QUESTIONS) {
      return res.status(400).json({ message: 'All questions have been answered.' });
    }

    const { answer } = req.body;
    session.answers.push(String(answer).slice(0, 5000));

    logger.debug(`Answer recorded for session ${req.params.sessionId}`);
    res.json({ message: 'Answer recorded.', answersSubmitted: session.answers.length });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNextQuestion, recordAnswer };
