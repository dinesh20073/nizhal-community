/**
 * config/index.js
 * Reads environment variables (from .env in development) and
 * exports a typed config object used throughout the app.
 */

'use strict';

require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3000,

  email: {
    host:   process.env.EMAIL_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    user:   process.env.EMAIL_USER   || '',
    pass:   process.env.EMAIL_PASS   || '',
    to:     process.env.EMAIL_TO     || '',
  },

  isDev: process.env.NODE_ENV !== 'production',
};

module.exports = config;

