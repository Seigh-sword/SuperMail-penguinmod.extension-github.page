import nodemailer from 'nodemailer';
import { validateProvider, checkFields } from './auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  if (!checkFields(req.body)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { user_email, auth_data, to, subject, message } = req.body;
  const service = validateProvider(user_email);

  if (!service) {
    return res.status(400).json({ error: 'Unsupported email provider' });
  }

  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: user_email,
      pass: auth_data
    }
  });

  try {
    await transporter.sendMail({
      from: `"SuperMailer:" <${user_email}>`,
      to,
      subject,
      text: message
    });
    return res.status(200).json({ success: true, provider: service });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}