'use strict';

const crypto = require('crypto');
const logger = require('./logger');

// ── In-process session store ─────────────────────────────────────────────────
// Sessions live in RAM for fast access during an interview. Each session
// auto-expires after SESSION_TTL_MS to prevent memory leaks.
//
// For multi-instance deployments, swap this out for a Redis-backed store
// (see the commented `RedisSessionManager` at the bottom of this file).

const SESSION_TTL_MS    = 60 * 60 * 1000;   // 1 hour
const MAX_SESSIONS      = 5_000;             // hard cap — reject beyond this
const MAX_RESUME_CHARS  = 30_000;            // ~10 pages of text
const MAX_ANSWERS       = 10;
const MAX_QUESTIONS     = 10;

const sessions = new Map();

/**
 * Purge sessions that have exceeded their TTL.
 * Called lazily on every write to avoid a separate timer.
 */
const purgeExpired = () => {
  const now = Date.now();
  for (const [id, s] of sessions) {
    if (now - s.createdAt > SESSION_TTL_MS) sessions.delete(id);
  }
};

/**
 * Create a new session.
 * @param {string} resumeText - Extracted PDF text.
 * @returns {string} sessionId
 */
const createSession = (resumeText) => {
  purgeExpired();

  if (sessions.size >= MAX_SESSIONS) {
    logger.warn('Session limit reached — purging oldest 10%');
    // Evict the 10% oldest entries
    const toEvict = Math.ceil(MAX_SESSIONS * 0.1);
    let count = 0;
    for (const id of sessions.keys()) {
      if (count++ >= toEvict) break;
      sessions.delete(id);
    }
  }

  const truncated = resumeText.slice(0, MAX_RESUME_CHARS);
  const sessionId = crypto.randomUUID();

  sessions.set(sessionId, {
    resumeText:     truncated,
    answers:        [],
    questionsAsked: [],
    questionCount:  0,
    createdAt:      Date.now(),
  });

  return sessionId;
};

/**
 * Retrieve session. Returns null if not found or expired.
 */
const getSession = (sessionId) => {
  if (!sessionId || typeof sessionId !== 'string') return null;
  // Basic UUID-format guard (prevent path traversal etc.)
  if (!/^[0-9a-f-]{36}$/.test(sessionId)) return null;

  const session = sessions.get(sessionId);
  if (!session) return null;

  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(sessionId);
    return null;
  }
  return session;
};

/**
 * Append an answer to the session.
 * Returns false if the session is full.
 */
const recordAnswer = (sessionId, answer) => {
  const session = getSession(sessionId);
  if (!session) return false;
  if (session.answers.length >= MAX_ANSWERS) return false;
  if (typeof answer !== 'string') return false;

  session.answers.push(answer.slice(0, 5000)); // cap individual answer length
  return true;
};

/**
 * Record a generated question.
 */
const recordQuestion = (sessionId, question) => {
  const session = getSession(sessionId);
  if (!session) return false;
  if (session.questionsAsked.length >= MAX_QUESTIONS) return false;
  session.questionsAsked.push(question.slice(0, 1000));
  return true;
};

/**
 * Permanently delete a session (call after evaluation).
 */
const deleteSession = (sessionId) => {
  sessions.delete(sessionId);
};

/**
 * Exposed for metrics / health endpoints only.
 */
const stats = () => ({ active: sessions.size, limit: MAX_SESSIONS });

module.exports = {
  createSession,
  getSession,
  recordAnswer,
  recordQuestion,
  deleteSession,
  stats,
  // Legacy compat aliases
  saveAnswer:   recordAnswer,
  saveQuestion: recordQuestion,
};
