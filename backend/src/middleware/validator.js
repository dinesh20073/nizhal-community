/**
 * middleware/validator.js
 * Simple request body validation helpers for the contact form.
 */

'use strict';

/**
 * Validates the contact form payload.
 * Returns { valid: true } or { valid: false, errors: string[] }
 *
 * @param {object} body - req.body from the POST /api/contact route
 */
function validateContactForm(body) {
  const errors = [];

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters.');
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!body.email || !emailRe.test(body.email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters.');
  }

  return errors.length === 0
    ? { valid: true }
    : { valid: false, errors };
}

module.exports = { validateContactForm };

