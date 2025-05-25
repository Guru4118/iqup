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
const generateQuestion = async (resumeText, questions = [], answers = []) => {
  const qnaHistory = questions.map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i]}`).join('\n');

  const body = {
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [
      { role: "system", content: "You are an interviewer." },
      {
        role: "user",
        content: `Based on this resume:\n"""${resumeText}"""\nAnd previous Q&A:\n${qnaHistory}\nAsk the next relevant technical question that has not been asked before. Avoid repeating similar topics or phrasing.`,
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
 */const evaluateAnswers = async (resumeText, questions, answers) => {
  const body = {
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [
      {
        role: "system",
        content: "You are a technical interviewer evaluating a candidate's answers step-by-step using chain of thought reasoning.",
      },
      {
        role: "user",
        content: `You are given a candidate's resume and a list of interview questions with their corresponding answers. Evaluate each answer step-by-step, considering clarity, technical correctness, and communication. Then provide individual scores and a final summary with an overall rating.

Resume:
"""${resumeText}"""

Interview Evaluation:
${questions.map((q, i) => `
Q${i + 1}: ${q}
A${i + 1}: ${answers[i]}
Step-by-step evaluation:`).join('\n')}

Please follow this format:
- Step-by-step analysis for each Q&A
- Score for each (out of 10)
- Summary: strengths, weaknesses, communication, technical skills
- Final score (out of 10)
`,
      },
    ],
    temperature: 0.7,
    max_tokens: 800,
  };

  try {
    const response = await axios.post(MODEL_ENDPOINT, body, { headers });
    console.log("API response:", response.data);

    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error("No choices returned from the model.");
    }

    const content = response.data.choices[0].message?.content;
    if (!content) {
      throw new Error("No message content in choices[0].");
    }

    return content.trim();
  } catch (error) {
    console.error("Error evaluating answers:", error.response?.data || error.message);
    return "Error evaluating answers.";
  }
};




module.exports = {
  generateQuestion,
  evaluateAnswers,
};
