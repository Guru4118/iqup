'use strict';

const Comment = require('../models/Comment');
const logger  = require('../utils/logger');

// ── GET /api/blogs/:blogId/comments ───────────────────────────────────────────
const getCommentsByBlog = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, parseInt(req.query.limit, 10) || 20);

    const comments = await Comment.find({ blog: req.params.blogId })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// ── POST /api/blogs/:blogId/comments ──────────────────────────────────────────
const addComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      blog:   req.params.blogId,
      author: req.user.id,
      text:   req.body.text,
    });

    const populated = await comment.populate('author', 'username');
    logger.debug(`Comment added to blog ${req.params.blogId} by ${req.user.id}`);
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/blogs/:blogId/comments/:commentId ─────────────────────────────
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).select('author');
    if (!comment) return res.status(404).json({ message: 'Comment not found.' });

    if (comment.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorised to delete this comment.' });
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comment deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCommentsByBlog, addComment, deleteComment };
