'use strict';

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type:      String,
      required:  [true, 'Title is required.'],
      trim:      true,
      maxlength: [200, 'Title must be under 200 characters.'],
    },
    content: {
      type:      String,
      required:  [true, 'Content is required.'],
      trim:      true,
      maxlength: [50_000, 'Content is too long.'],
    },
    author: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: [true, 'Author is required.'],
    },
    slug: {
      type:   String,
      unique: true,
      index:  true,
    },
    tags: {
      type:    [String],
      default: [],
    },
    published: {
      type:    Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// ── Indexes ────────────────────────────────────────────────────────────────────
blogSchema.index({ author: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ title: 'text', content: 'text' }); // full-text search

// ── Auto-generate slug from title ─────────────────────────────────────────────
blogSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100) + '-' + Date.now();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
