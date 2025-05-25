const { getSession, deleteSession } = require('../utils/sessionManager');
const { evaluateAnswers } = require('../services/openaiService');

const evaluate = async (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) return res.status(404).json({ message: 'Session not found' });

  // if (session.answers.length < 5) {
  //   return res.status(400).json({ message: 'Minimum 5 answers required' });
  // }

  try {
const result = await evaluateAnswers(session.resumeText, session.questionsAsked, session.answers);
    deleteSession(req.params.sessionId);
    res.json({ evaluation: result });
  } catch (err) {
    res.status(500).json({ message: 'Evaluation failed', error: err.message });
  }
};

module.exports = { evaluate };
