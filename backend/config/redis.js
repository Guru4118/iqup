'use strict';

const redis  = require('redis');
const logger = require('../utils/logger');

const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error('Redis: too many retries, stopping reconnects');
        return new Error('Redis max retries reached');
      }
      return Math.min(retries * 100, 3000);
    },
    connectTimeout: 5000,
    keepAlive: 5000,
  },
});

client.on('error',       err  => logger.warn(`Redis error: ${err.message}`));
client.on('connect',     ()   => logger.info('Redis: connecting...'));
client.on('ready',       ()   => logger.info('Redis ready'));
client.on('reconnecting',()   => logger.info('Redis: reconnecting...'));
client.on('end',         ()   => logger.info('Redis connection closed'));

// ── Thin safe wrappers ───────────────────────────────────────────────────────
// Returns null on errors instead of throwing — callers decide what to do.

const safeGet = async (key) => {
  if (!client.isOpen) return null;
  try   { return await client.get(key); }
  catch { return null; }
};

const safeSet = async (key, value, options = {}) => {
  if (!client.isOpen) return;
  try   { await client.set(key, value, options); }
  catch { /* non-fatal */ }
};

const safeDel = async (...keys) => {
  if (!client.isOpen) return;
  try   { await client.del(keys); }
  catch { /* non-fatal */ }
};

module.exports = { client, safeGet, safeSet, safeDel };
