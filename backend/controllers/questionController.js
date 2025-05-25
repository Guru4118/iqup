const { getSession, saveQuestion } = require('../utils/sessionManager');
const { generateQuestion } = require('../services/openaiService');

const MAX_QUESTIONS = 5;

const getNextQuestion = async (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) return res.status(404).json({ message: 'Session not found' });

  if (session.questionCount >= MAX_QUESTIONS) {
    return res.status(200).json({ message: 'Interview completed' });
  }

  try {
    const question = await generateQuestion(session.resumeText, session.answers, session.questionsAsked || []);
    
    session.questionCount++;
    session.questionsAsked = session.questionsAsked || [];
    session.questionsAsked.push(question);

    const ttsUrl = `https://fake-tts-service.com/speak?text=${encodeURIComponent(question)}`;
    res.json({ question, ttsUrl });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate question', error: err.message });
  }
};

const recordAnswer = (req, res) => {
  const { answer } = req.body;
  const session = getSession(req.params.sessionId);

  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  // Limit to 5 answers
  if (session.answers.length >= 5) {
    return res.status(400).json({ message: 'Answer limit reached. Only 5 answers allowed per session.' });
  }

  session.answers.push(answer);
  res.json({ message: 'Answer recorded' });
};


module.exports = {
  getNextQuestion,
  recordAnswer
};
