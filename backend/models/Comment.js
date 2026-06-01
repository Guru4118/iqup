'use strict';

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Blog',
      required: [true, 'Blog reference is required.'],
      index:    true,
    },
    author: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: [true, 'Author is required.'],
    },
    text: {
      type:      String,
      required:  [true, 'Comment text is required.'],
      trim:      true,
      maxlength: [2000, 'Comment must be under 2000 characters.'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

commentSchema.index({ blog: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);
