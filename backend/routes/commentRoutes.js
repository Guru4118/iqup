'use strict';

const express = require('express');
// mergeParams lets us access :blogId from the parent router
const router  = express.Router({ mergeParams: true });

const { getCommentsByBlog, addComment, deleteComment } =
  require('../controllers/commentController');
const { protect }                = require('../middleware/authMiddleware');
const { commentRules, validate } = require('../validators');

// GET  /api/blogs/:blogId/comments
router.get('/:blogId/comments', getCommentsByBlog);

// POST /api/blogs/:blogId/comments
router.post('/:blogId/comments',
  protect,
  commentRules,
  validate,
  addComment
);

// DELETE /api/blogs/:blogId/comments/:commentId
router.delete('/:blogId/comments/:commentId',
  protect,
  deleteComment
);

module.exports = router;
