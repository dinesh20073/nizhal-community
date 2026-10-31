/**
 * services/email.service.js
 * Nodemailer transporter setup and sendContactEmail helper.
 * Configure credentials in .env — never hardcode them here.
 */

'use strict';

const nodemailer = require('nodemailer');
const config     = require('../config');

/**
 * Creates and caches a single transporter instance.
 * Lazily initialised on first use so the app boots without valid credentials.
 */
let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  _transporter = nodemailer.createTransport({
    host:   config.email.host,
    port:   config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  return _transporter;
}

/**
 * Sends a contact form submission as an email.
 *
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<void>}
 */
async function sendContactEmail(data) {
  const { name, email, message } = data;

  // If no email credentials are configured, just log and resolve
  if (!config.email.user || !config.email.pass) {
    console.log('[email.service] No credentials set — skipping actual send.');
    console.log('[email.service] Would send from:', email, '| message:', message);
    return;
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from:    `"Nizhal Contact" <${config.email.user}>`,
    to:      config.email.to || config.email.user,
    replyTo: `"${name}" <${email}>`,
    subject: `New message from ${name} via Nizhal`,
    text:    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html:    `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr/>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  });
}

module.exports = { sendContactEmail };

