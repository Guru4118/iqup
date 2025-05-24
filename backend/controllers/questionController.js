const { getSession } = require('../utils/sessionManager');
const { generateQuestion } = require('../services/openaiService');

const getNextQuestion = async (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) return res.status(404).json({ message: 'Session not found' });

  try {
    const question = await generateQuestion(session.resumeText, session.answers);
    session.questionCount++;
    const ttsUrl = `https://fake-tts-service.com/speak?text=${encodeURIComponent(question)}`;
    res.json({ question, ttsUrl });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate question', error: err.message });
  }
};

const recordAnswer = (req, res) => {
  const { answer } = req.body;
  const session = getSession(req.params.sessionId);
  if (!session) return res.status(404).json({ message: 'Session not found' });

  session.answers.push(answer);
  res.json({ message: 'Answer recorded' });
};

module.exports = {
  getNextQuestion,
  recordAnswer
};
