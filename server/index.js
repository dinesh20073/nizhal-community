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

function formatCustomDateIST() {
  const now = new Date();
  const istString = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  const d = new Date(istString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, '0') : '12';
  
  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
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
    const time = formatCustomDateIST();

    console.log(`\n📬 [NEW MESSAGE RECEIVED] From: ${formattedName} (${email}) | Topic: ${formattedTopic}`);

    const encodedName = encodeURIComponent(formattedName);
    const encodedTopic = encodeURIComponent(formattedTopic);
    const whatsappUrl = `https://wa.me/91${phone}?text=Hi%20${encodedName},%20thank%20you%20for%20reaching%20out%20to%20Nizhal%20Community%20regarding%20${encodedTopic}!`;
    const mailtoUrl = `mailto:${email}?subject=Re:%20Nizhal%20Community%20-%20${encodedTopic}`;
    const telUrl = `tel:+91${phone}`;

    // OpenTable Style Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Inquiry Received</title>
      </head>
      <body style="margin: 0; padding: 36px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f7f9; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; padding: 40px 32px; box-shadow: 0 6px 24px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Top Header -->
          <div style="text-align: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 28px;">
            <div style="display: inline-block; background-color: #fdf2f4; color: #8c3a3a; padding: 6px 16px; border-radius: 50px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
              New Website Inquiry
            </div>
            <h1 style="color: #1e293b; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">
              ${formattedName}
            </h1>
            <p style="font-size: 15px; color: #64748b; margin: 0;">
              Topic: <strong style="color: #8c3a3a;">${formattedTopic}</strong> • ${time}
            </p>
          </div>

          <!-- 3 Prominent Quick Action Buttons -->
          <div style="margin: 0 0 32px 0;">
            <table role="presentation" style="width: 100%; border-collapse: separate; border-spacing: 8px;">
              <tr>
                <td style="width: 50%; text-align: center;">
                  <a 
                    href="${mailtoUrl}" 
                    style="display: block; background-color: #8c3a3a; color: #ffffff; text-decoration: none; padding: 14px 18px; border-radius: 10px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(140, 58, 58, 0.25);"
                  >
                    ✉️ Reply in Email
                  </a>
                </td>
                <td style="width: 50%; text-align: center;">
                  <a 
                    href="${whatsappUrl}" 
                    style="display: block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 18px; border-radius: 10px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);"
                  >
                    💬 Reply in WhatsApp
                  </a>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="text-align: center; padding-top: 4px;">
                  <a 
                    href="${telUrl}" 
                    style="display: block; background-color: #f1f5f9; color: #334155; text-decoration: none; padding: 11px 18px; border-radius: 8px; font-weight: 600; font-size: 13px; border: 1px solid #e2e8f0;"
                  >
                    📞 Call +91 ${phone}
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <!-- Big Details Card -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px 22px; margin-bottom: 28px;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 12px;">
              Contact Information
            </div>
            <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr>
                <td style="color: #64748b; padding: 6px 0; width: 100px; font-weight: 600;">Email:</td>
                <td style="padding: 6px 0;">
                  <a href="mailto:${email}" style="color: #2563eb; font-weight: 600; text-decoration: none; font-size: 16px;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 6px 0; font-weight: 600;">Phone:</td>
                <td style="padding: 6px 0; color: #1e293b; font-weight: 600; font-size: 16px;">
                  +91 ${phone}
                </td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 6px 0; font-weight: 600;">Topic:</td>
                <td style="padding: 6px 0; color: #8c3a3a; font-weight: 700;">
                  ${formattedTopic}
                </td>
              </tr>
            </table>

            <!-- Message Box -->
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 18px; margin-top: 16px;">
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 10px;">
                Message Content
              </div>
              <div style="font-size: 16px; line-height: 1.7; color: #1e293b; white-space: pre-wrap; word-break: break-word; background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
${message}
              </div>
            </div>
          </div>

          <!-- Bottom Footer -->
          <div style="text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
            Nizhal Community • A quiet space beside you ♡
          </div>

        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Nizhal Website" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || 'nizhalcommunity@gmail.com',
      replyTo: email,
      subject: `🔔 [Nizhal Community] ${formattedName} regarding ${formattedTopic} | ${time}`,
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
