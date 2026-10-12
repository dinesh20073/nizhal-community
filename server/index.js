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
      subject: `🔔Nizhal Community | ${formattedName} regarding ${formattedTopic} | ${time}`,
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
    if (error.code === 'EAUTH') {
      return res.status(500).json({ 
        error: 'Gmail authentication failed (BadCredentials). Please verify GMAIL_USER and GMAIL_APP_PASSWORD in .env' 
      });
    }
    return res.status(500).json({ error: error.message || 'Failed to send email. Please check server logs.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Dynamic Media endpoint for Scrapbook memories
app.get('/api/media', (req, res) => {
  res.json({
    media: [
      {
        id: 'api-mem-1',
        title: 'Circle by the Sea',
        subtitle: 'real conversations with good souls ✨',
        description: 'A sunset gathering where we sat in an open circle by the shore, listening to the tide and sharing honest thoughts that usually stay unspoken.',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
        category: 'Circle Gatherings',
        media_type: 'image',
        sort_order: 1
      },
      {
        id: 'api-mem-2',
        title: 'Stones and Stories',
        subtitle: 'painting memories on ocean pebbles 🎨',
        description: 'Each pebble carried a tiny feeling, a painted word, or a quiet hope. We passed them around the circle before leaving them gently on the sand.',
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        category: 'Art & Expression',
        media_type: 'image',
        sort_order: 2
      },
      {
        id: 'api-mem-3',
        title: 'Strokes and Chords',
        subtitle: 'acoustic strings & colors in the dusk 🎸',
        description: 'Sunset Chords — guitar on the warm sand 🎶. Soft melodies drifting with the evening breeze while friends hummed along in gentle stillness.',
        url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
        category: 'Music & Acoustic',
        media_type: 'image',
        sort_order: 3
      },
      {
        id: 'api-mem-4',
        title: 'Breathe with the Wave',
        subtitle: 'early morning tide & deep breaths 🌊',
        description: 'Seaside Peace — barefoot along the morning shoreline. Grounding our feet in cool wet sand and breathing in sync with the ocean pulse.',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        category: 'Mindfulness',
        media_type: 'image',
        sort_order: 4
      },
      {
        id: 'api-mem-5',
        title: 'The Colour Chase',
        subtitle: 'unfiltered laughter & powder splashes 💛',
        description: 'Running in Colors — just pure childlike joy 🌈. No judgements, no expectations, just spontaneous smiles and vibrant clouds of warmth.',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        category: 'Celebrations',
        media_type: 'image',
        sort_order: 5
      },
      {
        id: 'api-mem-6',
        title: 'Shades of Us',
        subtitle: 'every shade of you belongs here 🤍',
        description: 'Warm Portraits — unapologetically ourselves. Safe spaces where every vulnerability is welcomed with unconditional presence.',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        category: 'Portraits',
        media_type: 'image',
        sort_order: 6
      },
      {
        id: 'api-mem-7',
        title: 'Bracelets & Besties',
        subtitle: 'woven threads of kindness & beads 🧶',
        description: 'Weaving handmade friendship threads while sharing our happiest childhood memories and quiet personal dreams.',
        url: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80',
        category: 'Craft & Keepsakes',
        media_type: 'image',
        sort_order: 7
      }
    ]
  });
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nizhal API Server</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #faf8f5;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: #1e293b;
        }
        .card {
          background: #ffffff;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          max-width: 480px;
          width: 90%;
          text-align: center;
          border: 1px solid #f1ece4;
        }
        .badge {
          display: inline-block;
          background: #dcfce7;
          color: #15803d;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        h1 {
          margin: 0 0 8px 0;
          color: #8c3a3a;
          font-size: 24px;
        }
        p {
          color: #64748b;
          font-size: 14px;
          margin: 0 0 20px 0;
        }
        .info-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 16px;
          text-align: left;
          font-size: 13px;
          margin-bottom: 20px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid #edf2f7;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-label {
          color: #64748b;
          font-weight: 600;
        }
        .info-val {
          font-family: monospace;
          color: #334155;
          font-weight: 600;
        }
        .link {
          color: #8c3a3a;
          font-weight: 600;
          text-decoration: none;
        }
        .link:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">● Server Active</span>
        <h1>Nizhal Backend API</h1>
        <p>API & Email Notification Service for Nizhal Community</p>
        <div class="info-box">
          <div class="info-row">
            <span class="info-label">Status</span>
            <span class="info-val" style="color: #15803d;">Running (Port ${PORT})</span>
          </div>
          <div class="info-row">
            <span class="info-label">Health Check</span>
            <span class="info-val"><a href="/api/health" class="link">/api/health</a></span>
          </div>
          <div class="info-row">
            <span class="info-label">Email API</span>
            <span class="info-val">POST /api/send-email</span>
          </div>
          <div class="info-row">
            <span class="info-label">Configured Sender</span>
            <span class="info-val">${process.env.GMAIL_USER || 'Not set'}</span>
          </div>
        </div>
        <p style="margin: 0; font-size: 13px;">
          Frontend Web App is running at <a href="http://localhost:5173" class="link">http://localhost:5173</a>
        </p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 Nizhal Custom Email Server running on http://localhost:${PORT}`);
  console.log(`📧 Sender: ${process.env.GMAIL_USER || 'otp.passcode@gmail.com'}`);
  console.log(`📬 Receiver: ${process.env.NOTIFY_EMAIL || 'nizhalcommunity@gmail.com'}`);
  console.log(`=================================================`);
  
  transporter.verify((error) => {
    if (error) {
      console.warn(`⚠️  Gmail SMTP Authentication failed: ${error.message}`);
      console.warn(`👉 Please ensure GMAIL_APP_PASSWORD in .env is an active 16-character Google App Password.`);
    } else {
      console.log(`✅ Gmail SMTP connection verified and ready to send emails.`);
    }
  });
});
