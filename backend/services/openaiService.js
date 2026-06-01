'use strict';

const axios  = require('axios');
const logger = require('../utils/logger');

const AI_API_KEY     = process.env.AI_API_KEY;
const MODEL_ENDPOINT = process.env.AI_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const MODEL          = process.env.AI_MODEL || 'llama-3.3-70b-versatile';
const REQUEST_TIMEOUT = 30_000;
const MAX_RETRIES     = 2;

const headers = () => ({
  Authorization: `Bearer ${AI_API_KEY}`,
  'Content-Type': 'application/json',
});
/**
 * Call the Together AI API with automatic retry on transient 5xx errors.
 */
const callAI = async (body, attempt = 1) => {
  try {
    const res = await axios.post(MODEL_ENDPOINT, body, {
      headers: headers(),
      timeout: REQUEST_TIMEOUT,
    });
    return res.data;
  } catch (err) {
    const status = err.response?.status;
    const isTransient = !status || status >= 500;

    if (isTransient && attempt <= MAX_RETRIES) {
      const delay = attempt * 1000;
      logger.warn(`AI API error (attempt ${attempt}), retrying in ${delay}ms: ${err.message}`);
      await new Promise(r => setTimeout(r, delay));
      return callAI(body, attempt + 1);
    }

    logger.error(`AI API failed after ${attempt} attempt(s): ${err.response?.data?.error || err.message}`);
    throw err;
  }
};

/**
 * Sanitise free-text before inserting into a prompt to prevent
 * prompt-injection attacks (e.g. "Ignore previous instructions").
 */
const sanitise = (text = '') =>
  text
    .replace(/[\x00-\x1F\x7F]/g, ' ')   // strip control chars
    .replace(/```/g, "'''")              // neutralise code-fence injections
    .slice(0, 15_000);                   // hard cap

/**
 * Generate the next interview question.
 */
const generateQuestion = async (resumeText, questionsAsked = [], answers = []) => {
  if (!AI_API_KEY) throw new Error('AI_API_KEY is not configured.');

  const safeResume = sanitise(resumeText);
  const history = questionsAsked
    .map((q, i) => `Q${i + 1}: ${sanitise(q)}\nA${i + 1}: ${sanitise(answers[i] || 'No answer')}`)
    .join('\n');

  const body = {
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are a professional technical interviewer. ' +
          'Ask one clear, relevant interview question based on the candidate\'s resume. ' +
          'Do NOT answer it. Do NOT include any preamble or numbering. ' +
          'Output only the question sentence.',
      },
      {
        role: 'user',
        content:
          `Resume:\n"""\n${safeResume}\n"""\n\n` +
          (history ? `Previous questions and answers:\n${history}\n\n` : '') +
          'Ask the next unique interview question that has not been covered yet. ' +
          'Focus on technical depth, real project experience, or problem-solving.',
      },
    ],
    temperature: 0.7,
    max_tokens:  200,
  };

  const data = await callAI(body);
  const question = data.choices?.[0]?.message?.content?.trim();

  if (!question) throw new Error('AI returned empty question.');
  return question;
};

/**
 * Evaluate all answers and return structured feedback.
 */
const evaluateAnswers = async (resumeText, questions = [], answers = []) => {
  if (!AI_API_KEY) throw new Error('AI_API_KEY is not configured.');

  const safeResume = sanitise(resumeText);
  const qna = questions
    .map((q, i) =>
      `Q${i + 1}: ${sanitise(q)}\nA${i + 1}: ${sanitise(answers[i] || 'No answer provided')}`
    )
    .join('\n\n');

  const body = {
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are an expert technical interviewer providing structured, constructive feedback. ' +
          'Be specific, fair, and professional. Never fabricate technical facts.',
      },
      {
        role: 'user',
        content:
          `Evaluate the following interview session.\n\n` +
          `Resume:\n"""\n${safeResume}\n"""\n\n` +
          `Interview Q&A:\n${qna}\n\n` +
          `Please provide:\n` +
          `1. Per-answer evaluation: clarity, technical correctness, communication (score /10)\n` +
          `2. Overall strengths and specific areas for improvement\n` +
          `3. A final score out of 100\n` +
          `Format your response with clear section headers.`,
      },
    ],
    temperature: 0.5,
    max_tokens:  1000,
  };

  const data = await callAI(body);
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) throw new Error('AI returned empty evaluation.');
  return content;
};

module.exports = { generateQuestion, evaluateAnswers };
