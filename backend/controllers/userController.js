'use strict';

const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
const logger = require('../utils/logger');

const COOKIE_OPTS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * Sign a JWT for the given user.
 */
const signToken = (user) =>
  jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '7d', algorithm: 'HS256' }
  );

// ── POST /api/auth/register ────────────────────────────────────────────────────
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check duplicate — but return the SAME message as login failure to
    // prevent user-enumeration via differing error messages.
    const existing = await User.findOne({ email }).select('_id').lean();
    if (existing) {
      // Introduce a constant-time delay to prevent timing attacks
      await new Promise(r => setTimeout(r, 200));
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    // Password is hashed inside the User pre-save hook — don't hash here.
    const user  = await User.create({ username, email, password });
    const token = signToken(user);

    res
      .cookie('token', token, COOKIE_OPTS)
      .status(201)
      .json({
        message: 'Account created successfully.',
        token,
        user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
      });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/auth/login ───────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Always fetch with password (select: false by default)
    const user = await User.findOne({ email })
      .select('+password +loginAttempts +lockUntil');

    // Constant-time failure: always compare even when user not found
    // (uses a dummy hash) to prevent timing-based user enumeration.
    const DUMMY_HASH = '$2a$12$dummyhashforenumerationprotection00000000000000000000000';
    const candidate  = user ? user.password : DUMMY_HASH;
    const match      = user
      ? await user.comparePassword(password)
      : (await require('bcryptjs').compare(password, candidate), false);

    if (!user || !match) {
      if (user) await user.incLoginAttempts();
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check account lock
    if (user.isLocked()) {
      const remaining = Math.ceil((user.lockUntil - Date.now()) / 60_000);
      return res.status(423).json({
        message: `Account locked due to too many failed attempts. Try again in ${remaining} minutes.`,
      });
    }

    // Reset failed attempts on success
    await user.resetLoginAttempts();

    const token = signToken(user);
    logger.info(`Login: user ${user._id} from ${req.ip}`);

    res
      .cookie('token', token, COOKIE_OPTS)
      .json({
        token,
        user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
      });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
const logout = (_req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully.' });
};

// ── GET /api/auth/me ───────────────────────────────────────────────────────────
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout, getMe };
