'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json, colorize, simple } = format;

const isProd = process.env.NODE_ENV === 'production';

const logger = createLogger({
  level: process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
  format: isProd
    ? combine(timestamp(), errors({ stack: true }), json())
    : combine(colorize(), timestamp({ format: 'HH:mm:ss' }), errors({ stack: true }), simple()),
  transports: [
    new transports.Console(),
    // In production you'd also wire up a transport to your log aggregator
    // (e.g. Datadog, Logtail, CloudWatch) here.
  ],
  exitOnError: false,
});

module.exports = logger;
