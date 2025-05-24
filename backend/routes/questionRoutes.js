const express = require('express');
const { getNextQuestion, recordAnswer } = require('../controllers/questionController');

const router = express.Router();

router.get('/:sessionId', getNextQuestion);
router.post('/:sessionId', recordAnswer);

module.exports = router;
