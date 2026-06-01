'use strict';

const jwt    = require('jsonwebtoken');
const logger = require('../utils/logger');

/**
 * Verify JWT from Authorization header.
 * Sets req.user = { id, isAdmin } on success.
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],  // explicitly whitelist; prevents "alg:none" attack
    });

    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please sign in again.' });
    }
    logger.warn(`Invalid JWT from ${req.ip}: ${err.message}`);
    return res.status(401).json({ message: 'Invalid or malformed token.' });
  }
};

/**
 * Require admin role. Must be used after `protect`.
 */
const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
};

module.exports = { protect, adminOnly };
