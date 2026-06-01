'use strict';

const Blog                        = require('../models/Blog');
const { safeGet, safeSet, safeDel } = require('../config/redis');
const logger                      = require('../utils/logger');

const PAGE_SIZE    = 20;
const CACHE_TTL    = 120; // 2 minutes

// ── GET /api/blogs ─────────────────────────────────────────────────────────────
const getBlogs = async (req, res, next) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page, 10)  || 1);
    const limit  = Math.min(PAGE_SIZE, parseInt(req.query.limit, 10) || PAGE_SIZE);
    const skip   = (page - 1) * limit;
    const cacheKey = `blogs:page:${page}:limit:${limit}`;

    // Try cache
    const cached = await safeGet(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const [blogs, total] = await Promise.all([
      Blog.find({ published: true })
        .select('title content author createdAt tags slug')
        .populate('author', 'username')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments({ published: true }),
    ]);

    const payload = {
      data:  blogs,
      meta:  { total, page, limit, pages: Math.ceil(total / limit) },
    };

    await safeSet(cacheKey, JSON.stringify(payload), { EX: CACHE_TTL });
    res.json(payload);
  } catch (err) {
    next(err);
  }
};

// ── GET /api/blogs/:id ─────────────────────────────────────────────────────────
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username')
      .lean();

    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// ── POST /api/blogs ────────────────────────────────────────────────────────────
const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user.id });

    // Invalidate all blog list cache entries
    await safeDel('blogs:*');
    logger.info(`Blog created: ${blog._id} by user ${req.user.id}`);

    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/blogs/:id ─────────────────────────────────────────────────────────
const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).select('author');
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });

    // Only the author or an admin may update
    if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorised to edit this blog.' });
    }

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    await safeDel('blogs:*');
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/blogs/:id ──────────────────────────────────────────────────────
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).select('author');
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });

    if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorised to delete this blog.' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    await safeDel('blogs:*');
    logger.info(`Blog deleted: ${req.params.id} by user ${req.user.id}`);

    res.json({ message: 'Blog deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
