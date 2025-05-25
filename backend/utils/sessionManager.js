const sessions = {};

/**
 * Creates a new session with the provided resume text.
 * Initializes answers and questionsAsked arrays.
 */
const createSession = (text) => {
  const sessionId = Date.now().toString();
  sessions[sessionId] = {
    resumeText: text,
    answers: [],
    questionsAsked: [], // Add this to track asked questions
    questionCount: 0
  };
  return sessionId;
};

/**
 * Retrieves session by ID.
 */
const getSession = (sessionId) => sessions[sessionId];

/**
 * Saves an answer to the session.
 */
const saveAnswer = (sessionId, answer) => {
  const session = sessions[sessionId];
  if (session) {
    session.answers.push(answer);
  }
};

/**
 * Saves a question to the session.
 */
const saveQuestion = (sessionId, question) => {
  const session = sessions[sessionId];
  if (session) {
    session.questionsAsked.push(question);
  }
};

/**
 * Deletes a session by ID.
 */
const deleteSession = (sessionId) => delete sessions[sessionId];

module.exports = {
  createSession,
  getSession,
  saveAnswer,
  saveQuestion, // Export the new function
  deleteSession
};
