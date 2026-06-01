'use strict';

const { getSession, deleteSession } = require('../utils/sessionManager');
const { evaluateAnswers }           = require('../services/openaiService');
const logger                        = require('../utils/logger');

// ── GET /api/evaluate/:sessionId ──────────────────────────────────────────────
const evaluate = async (req, res, next) => {
  const { sessionId } = req.params;
  const session = getSession(sessionId);

  if (!session) {
    return res.status(404).json({ message: 'Session not found or expired.' });
  }

  if (session.answers.length === 0) {
    return res.status(400).json({ message: 'No answers to evaluate. Please complete at least one question.' });
  }

  try {
    logger.info(`Evaluating session ${sessionId}: ${session.answers.length} answers`);

    const evaluation = await evaluateAnswers(
      session.resumeText,
      session.questionsAsked,
      session.answers
    );

    // Delete session AFTER we have the evaluation — even if AI call failed
    // (the finally block guarantees cleanup)
    res.json({ evaluation });
  } catch (err) {
    next(err);
  } finally {
    // Always delete the session after evaluation attempt to honour our
    // privacy promise: no data retained after session ends.
    deleteSession(sessionId);
    logger.info(`Session deleted: ${sessionId}`);
  }
};

module.exports = { evaluate };
