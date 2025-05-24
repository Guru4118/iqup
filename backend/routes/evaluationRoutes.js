const express = require('express');
const { evaluate } = require('../controllers/evaluationController');

const router = express.Router();
router.get('/:sessionId', evaluate);

module.exports = router;
