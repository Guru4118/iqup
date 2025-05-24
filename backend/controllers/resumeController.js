const pdfParse = require('pdf-parse');
const { createSession } = require('../utils/sessionManager');

const uploadResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const pdfData = await pdfParse(req.file.buffer);
    const sessionId = createSession(pdfData.text);
    res.json({ sessionId, message: 'Resume processed' });
  } catch (err) {
    res.status(500).json({ message: 'PDF parsing failed', error: err.message });
  }
};

module.exports = { uploadResume };
