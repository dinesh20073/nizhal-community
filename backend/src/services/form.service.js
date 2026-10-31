/**
 * services/form.service.js
 * Sanitises and normalises raw contact form data before it
 * gets passed to the email service or stored anywhere.
 */

'use strict';

/**
 * Strips leading/trailing whitespace and limits field lengths.
 *
 * @param {object} raw - raw req.body from Express
 * @returns {{ name: string, email: string, message: string }}
 */
function sanitiseContactForm(raw) {
  return {
    name:    String(raw.name    || '').trim().slice(0, 120),
    email:   String(raw.email   || '').trim().toLowerCase().slice(0, 254),
    message: String(raw.message || '').trim().slice(0, 5000),
  };
}

module.exports = { sanitiseContactForm };

