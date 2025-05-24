const sessions = {};

const createSession = (text) => {
  const sessionId = Date.now().toString();
  sessions[sessionId] = { resumeText: text, answers: [], questionCount: 0 };
  return sessionId;
};

const getSession = (sessionId) => sessions[sessionId];
const saveAnswer = (sessionId, answer) => sessions[sessionId]?.answers.push(answer);
const deleteSession = (sessionId) => delete sessions[sessionId];

module.exports = {
  createSession,
  getSession,
  saveAnswer,
  deleteSession
};
