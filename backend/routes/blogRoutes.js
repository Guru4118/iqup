'use strict';

const express = require('express');
const router  = express.Router();

const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } =
  require('../controllers/blogController');
const { protect, adminOnly }       = require('../middleware/authMiddleware');
const { blogReadLimiter, blogWriteLimiter } = require('../middleware/rateLimiter');
const { blogRules, validate }      = require('../validators');

// GET /api/blogs
router.get('/',    blogReadLimiter, getBlogs);

// GET /api/blogs/:id
router.get('/:id', blogReadLimiter, getBlogById);

// POST /api/blogs  (admin only)
router.post('/',
  protect,
  adminOnly,
  blogWriteLimiter,
  blogRules,
  validate,
  createBlog
);

// PUT /api/blogs/:id  (author or admin)
router.put('/:id',
  protect,
  blogWriteLimiter,
  blogRules,
  validate,
  updateBlog
);

// DELETE /api/blogs/:id  (author or admin)
router.delete('/:id',
  protect,
  blogWriteLimiter,
  deleteBlog
);

module.exports = router;
