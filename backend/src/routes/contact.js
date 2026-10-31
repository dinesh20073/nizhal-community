/**
 * routes/contact.js
 * POST /api/contact — validates → sanitises → sends email
 */

'use strict';

const express                        = require('express');
const { validateContactForm }        = require('../middleware/validator');
const { sanitiseContactForm }        = require('../services/form.service');
const { sendContactEmail }           = require('../services/email.service');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    // 1. Validate raw input
    const { valid, errors } = validateContactForm(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, errors });
    }

    // 2. Sanitise
    const data = sanitiseContactForm(req.body);

    // 3. Send email (or log if no credentials)
    await sendContactEmail(data);

    return res.status(200).json({
      success: true,
      message: 'Thanks! Your message has been received.',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

