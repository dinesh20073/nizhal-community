/**
 * middleware/error-handler.js
 * Global Express error handler — must be registered LAST in app.js.
 */

'use strict';

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  console.error(`[${new Date().toISOString()}] ${status} — ${message}`);
  if (err.stack && process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // Always return JSON for API routes, HTML for page routes
  if (req.path.startsWith('/api')) {
    return res.status(status).json({ success: false, message });
  }

  res.status(status).send(`<h1>${status} — ${message}</h1>`);
}

module.exports = errorHandler;

