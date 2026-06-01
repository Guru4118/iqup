'use strict';

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const SALT_ROUNDS = 12;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
      minlength: [2,  'Username must be at least 2 characters.'],
      maxlength: [30, 'Username must be at most 30 characters.'],
      match: [/^[a-zA-Z0-9_.-]+$/, 'Username contains invalid characters.'],
    },
    email: {
      type:     String,
      required: [true, 'Email is required.'],
      unique:   true,
      trim:     true,
      lowercase: true,
      match:   [/^\S+@\S+\.\S+$/, 'Please provide a valid email.'],
    },
    password: {
      type:     String,
      required: [true, 'Password is required.'],
      minlength: [8, 'Password must be at least 8 characters.'],
      select:   false,  // never return password by default
    },
    isAdmin: {
      type:    Boolean,
      default: false,
    },
    loginAttempts: {
      type:    Number,
      default: 0,
      select:  false,
    },
    lockUntil: {
      type:   Date,
      select: false,
    },
  },
  {
    timestamps: true,
    // Never serialise sensitive fields
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        delete ret.loginAttempts;
        delete ret.lockUntil;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// email already has unique:true which creates an index — no separate call needed

// ── Pre-save: hash password only when modified ─────────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(err);
  }
});

// ── Instance method: compare password ─────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// ── Account lock helpers ───────────────────────────────────────────────────────
const MAX_ATTEMPTS = 10;
const LOCK_TIME    = 30 * 60 * 1000; // 30 min

userSchema.methods.isLocked = function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

userSchema.methods.incLoginAttempts = async function () {
  // If lock has expired, reset
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({ $set: { loginAttempts: 1 }, $unset: { lockUntil: 1 } });
  }
  const updates = { $inc: { loginAttempts: 1 } };
  if (this.loginAttempts + 1 >= MAX_ATTEMPTS && !this.isLocked()) {
    updates.$set = { lockUntil: new Date(Date.now() + LOCK_TIME) };
  }
  return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({ $set: { loginAttempts: 0 }, $unset: { lockUntil: 1 } });
};

module.exports = mongoose.model('User', userSchema);
