// routes/commentRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true });

const auth = require('../middleware/authMiddleware');
const {
  addComment,
  getCommentsByBlog,
} = require('../controllers/commentController');

// Now handles: GET/POST /api/blogs/:blogId/comments
router.route('/:blogId/comments')
  .get(getCommentsByBlog)
  .post(auth, addComment);

module.exports = router;
