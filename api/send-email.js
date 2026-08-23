import nodemailer from 'nodemailer';

function toTitleCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, topic, message } = req.body || {};

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const formattedTopic = toTitleCase(topic || 'General Inquiry');
    const formattedName = toTitleCase(name);
    const time = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
      return res.status(500).json({ error: 'Server email credentials are not configured.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Inquiry Received</title>
      </head>
      <body style="margin: 0; padding: 32px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f7f9; color: #334155;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 36px 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #eef2f6;">
          <h2 style="color: #3b6680; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">
            New message for Nizhal Community
          </h2>
          <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
            A new inquiry has been submitted by <strong style="color: #1e293b;">${formattedName}</strong> regarding <strong style="color: #1e293b;">${formattedTopic}</strong>.
          </p>

          <div style="margin: 24px 0;">
            <a 
              href="mailto:${email}?subject=Re: Nizhal Community - ${formattedTopic}" 
              style="background-color: #c94a5e; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;"
            >
              Reply to ${formattedName}
            </a>
          </div>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; text-align: left; margin: 20px 0;">
            <p style="margin: 6px 0; font-size: 14px;"><strong>Sender:</strong> ${formattedName}</p>
            <p style="margin: 6px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            <p style="margin: 6px 0; font-size: 14px;"><strong>WhatsApp:</strong> <a href="https://wa.me/91${phone}" style="color: #16a34a;">+91 ${phone} (Chat)</a></p>
            <p style="margin: 6px 0; font-size: 14px;"><strong>Topic:</strong> ${formattedTopic}</p>
            <p style="margin: 6px 0; font-size: 14px;"><strong>Time:</strong> ${time}</p>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 14px 0;" />
            <div style="font-size: 14px; color: #1e293b; white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>

          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px;">
            Sent via Nizhal Community Website • A quiet space beside you
          </p>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Nizhal Website" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || 'nizhalcommunity@gmail.com',
      replyTo: email,
      subject: `[Nizhal Community] ${formattedTopic} from ${formattedName}`,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Serverless email error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to send email.' });
  }
}
