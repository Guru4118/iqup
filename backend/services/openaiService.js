const axios = require('axios');
require('dotenv').config();


const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;


const MODEL_ENDPOINT = 'https://api.together.xyz/v1/chat/completions';

const headers = {
  Authorization: `Bearer ${TOGETHER_API_KEY}`,
  'Content-Type': 'application/json',
};


/**
 * Generates the next interview question based on resume and previous answers.
 * @param {string} resumeText - Text extracted from the resume.
 * @param {Array} answers - Array of previous answers.
 * @returns {Promise<string>} - Next interview question.
 */
const generateQuestion = async (resumeText, answers) => {
  const body = {
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [
      { role: "system", content: "You are an interviewer." },
      {
        role: "user",
        content: `Based on this resume:\n"""${resumeText}"""\nAnd previous Q&A: ${JSON.stringify(
          answers
        )}\nAsk the next relevant technical question.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 200,
  };

  try {
    const response = await axios.post(MODEL_ENDPOINT, body, { headers });
    return (
      response.data.choices?.[0]?.message?.content.trim() ||
      "No question generated."
    );
  } catch (error) {
    console.error("Error generating question:", error.response?.data || error.message);
    return "Error generating question.";
  }
};


/**
 * Evaluates the candidate's answers and provides a score and feedback.
 * @param {string} resumeText - Text extracted from the resume.
 * @param {Array} answers - Array of answers to evaluate.
 * @returns {Promise<string>} - Evaluation feedback and score.
 */
const evaluateAnswers = async (resumeText, answers) => {
  const body = {
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [
      { role: "system", content: "You are a technical interviewer evaluating a candidate." },
      {
        role: "user",
        content: `Evaluate this candidate based on resume:\n"""${resumeText}"""\nAnswers:\n${answers.map((a, i) => `Q${i + 1}: ${a}`).join('\n')}\nGive scores and feedback for each. Then, give an overall rating.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  };

  try {
    const response = await axios.post(MODEL_ENDPOINT, body, { headers });
    return (
      response.data.choices?.[0]?.message?.content.trim() ||
      "No evaluation generated."
    );
  } catch (error) {
    console.error("Error evaluating answers:", error.response?.data || error.message);
    return "Error evaluating answers.";
  }
};


module.exports = {
  generateQuestion,
  evaluateAnswers,
};
