'use strict';

const pdfParse           = require('pdf-parse');
const { createSession }  = require('../utils/sessionManager');
const logger             = require('../utils/logger');

const MAX_PDF_SIZE = 5 * 1024 * 1024;  // 5 MB
const MIN_TEXT_LEN = 50;               // reject near-empty PDFs

// ── POST /api/resume/upload ───────────────────────────────────────────────────
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Double-check MIME type (multer filter is the first gate)
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(415).json({ message: 'Only PDF files are accepted.' });
    }

    if (req.file.size > MAX_PDF_SIZE) {
      return res.status(413).json({ message: 'File too large. Maximum size is 5 MB.' });
    }

    let pdfData;
    try {
      pdfData = await pdfParse(req.file.buffer);
    } catch {
      return res.status(422).json({ message: 'Could not parse PDF. Please upload a text-based PDF.' });
    }

    const text = pdfData.text?.trim() || '';
    if (text.length < MIN_TEXT_LEN) {
      return res.status(422).json({
        message: 'Resume appears to be empty or is an image-only PDF. Please upload a text-based resume.',
      });
    }

    const sessionId = createSession(text);
    logger.info(`Session created: ${sessionId} (${text.length} chars) from ${req.ip}`);

    res.status(201).json({ sessionId, message: 'Resume processed successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadResume };
