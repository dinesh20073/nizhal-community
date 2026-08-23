import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const LOGO_PATH = path.join(__dirname, '..', 'public', 'logo.png');

app.use(cors());
app.use(express.json());

// Gmail SMTP Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Helper for title casing
function toTitleCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// API Endpoint to send emails directly to Nizhal email
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, topic, message } = req.body;

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

    console.log(`\n📬 [NEW MESSAGE RECEIVED] From: ${formattedName} (${email}) | Topic: ${formattedTopic}`);

    // OpenTable Style Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Message Received</title>
      </head>
      <body style="margin: 0; padding: 32px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f7f9; color: #334155;">
        
        <!-- Outer Container -->
        <div style="max-width: 560px; margin: 0 auto;">
          
          <!-- Top Centered Logo -->
          <div style="text-align: center; margin-bottom: 24px;">
            <img 
              src="cid:nizhallogo" 
              alt="Nizhal Community" 
              width="76" 
              height="76" 
              style="width: 76px; height: 76px; border-radius: 50%; display: inline-block; object-fit: cover; border: 2px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.06);" 
            />
          </div>

          <!-- Main White Card -->
          <div style="background-color: #ffffff; border-radius: 12px; padding: 40px 36px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center; border: 1px solid #eef2f6;">
            
            <!-- Headline -->
            <h1 style="color: #3b6680; font-size: 26px; font-weight: 500; margin: 0 0 14px 0; letter-spacing: -0.3px;">
              New message received
            </h1>

            <!-- Intro Text -->
            <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 26px 0;">
              Hello Nizhal team,<br>
              A new message by <strong style="color: #1e293b;">${formattedName}</strong> regarding <strong style="color: #1e293b;">${formattedTopic}</strong> has been received on the website.
            </p>

            <!-- Primary Action Button (OpenTable Red / Nizhal Rose) -->
            <div style="margin: 28px 0;">
              <a 
                href="mailto:${email}?subject=Re: Nizhal Community - ${formattedTopic}" 
                style="background-color: #c94a5e; color: #ffffff; text-decoration: none; padding: 14px 34px; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 3px 8px rgba(201, 74, 94, 0.28);"
              >
                Reply to ${formattedName}
              </a>
            </div>

            <!-- Divider / Details Intro -->
            <div style="font-size: 14px; color: #64748b; margin: 26px 0 16px 0;">
              Or, you can connect directly via WhatsApp or review the details below:
            </div>

            <!-- Message Card Box -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 22px 20px; text-align: left; margin-bottom: 24px;">
              
              <!-- Sender Info Row -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 14px;">
                <tr>
                  <td style="font-size: 13px; color: #64748b; padding-bottom: 6px; width: 90px; font-weight: 600;">Sender:</td>
                  <td style="font-size: 14px; color: #1e293b; font-weight: 600; padding-bottom: 6px;">${formattedName}</td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #64748b; padding-bottom: 6px; font-weight: 600;">Email:</td>
                  <td style="font-size: 14px; color: #2563eb; padding-bottom: 6px;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #64748b; padding-bottom: 6px; font-weight: 600;">WhatsApp:</td>
                  <td style="font-size: 14px; color: #16a34a; font-weight: 600; padding-bottom: 6px;">
                    <a href="https://wa.me/91${phone}" style="color: #16a34a; text-decoration: none;">+91 ${phone} (Chat on WhatsApp)</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #64748b; padding-bottom: 6px; font-weight: 600;">Topic:</td>
                  <td style="font-size: 14px; color: #991b1b; font-weight: 600; padding-bottom: 6px;">${formattedTopic}</td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #64748b; font-weight: 600;">Received:</td>
                  <td style="font-size: 13px; color: #64748b;">${time}</td>
                </tr>
              </table>

              <!-- Full Message Body -->
              <div style="border-top: 1px dashed #cbd5e1; padding-top: 14px; margin-top: 6px;">
                <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; color: #64748b; margin-bottom: 8px;">
                  Message:
                </div>
                <div style="font-size: 15px; line-height: 1.7; color: #1e293b; white-space: pre-wrap; word-break: break-word;">
${message}
                </div>
              </div>

            </div>

            <!-- Footer note inside card -->
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin: 0;">
              Contacted via Nizhal Community website
            </p>

          </div>

          <!-- Bottom Subtext -->
          <div style="text-align: center; margin-top: 24px; color: #94a3b8; font-size: 12px;">
            Nizhal Community • A quiet space beside you
          </div>

        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Nizhal Website" <${process.env.GMAIL_USER || 'otp.passcode@gmail.com'}>`,
      to: process.env.NOTIFY_EMAIL || 'nizhalcommunity@gmail.com',
      replyTo: email,
      subject: `[Nizhal Community] New Inquiry: ${formattedTopic} from ${formattedName}`,
      html: htmlContent,
      attachments: fs.existsSync(LOGO_PATH) ? [
        {
          filename: 'logo.png',
          path: LOGO_PATH,
          cid: 'nizhallogo'
        }
      ] : []
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email forwarded successfully to ${mailOptions.to} (Message ID: ${info.messageId})`);

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please check server logs.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 Nizhal Custom Email Server running on http://localhost:${PORT}`);
  console.log(`📧 Sender: ${process.env.GMAIL_USER || 'otp.passcode@gmail.com'}`);
  console.log(`📬 Receiver: ${process.env.NOTIFY_EMAIL || 'nizhalcommunity@gmail.com'}`);
  console.log(`=================================================\n`);
});
