'use strict';

const express = require('express');
const multer  = require('multer');
const router  = express.Router();

const { uploadResume }   = require('../controllers/resumeController');
const { uploadLimiter }  = require('../middleware/rateLimiter');

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: MAX_SIZE, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(Object.assign(new Error('Only PDF files are allowed.'), { status: 415 }));
    }
  },
});

// POST /api/resume/upload
router.post('/upload',
  uploadLimiter,
  upload.single('resume'),
  uploadResume
);

module.exports = router;
