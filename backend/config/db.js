'use strict';

const mongoose = require('mongoose');
const logger   = require('../utils/logger');

const MAX_RETRIES   = 5;
const RETRY_DELAY   = 3000; // ms

/**
 * Connect to MongoDB with exponential back-off retries.
 * Mongoose is also configured for production-grade connection pooling.
 */
const db = async (attempt = 1) => {
  const uri = process.env.MONGO_URL;
  if (!uri) throw new Error('MONGO_URL environment variable is not set');

  // Mongoose 7+ no longer needs these options, but explicit > implicit
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS:          45000,
      maxPoolSize:              20,
      minPoolSize:              2,
    });

    logger.info(`MongoDB connected [attempt ${attempt}]`);

    // Emit warnings on slow queries (> 100 ms)
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
  } catch (err) {
    logger.error(`MongoDB connection failed (attempt ${attempt}/${MAX_RETRIES}): ${err.message}`);
    if (attempt < MAX_RETRIES) {
      const delay = RETRY_DELAY * attempt;
      logger.info(`Retrying in ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
      return db(attempt + 1);
    }
    throw err; // bubble up; boot() will exit the process
  }

  mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'));
  mongoose.connection.on('reconnected',  () => logger.info('MongoDB reconnected'));
  mongoose.connection.on('error',        err => logger.error(`MongoDB error: ${err.message}`));
};

module.exports = db;
