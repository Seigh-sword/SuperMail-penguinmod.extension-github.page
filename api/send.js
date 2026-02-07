import nodemailer from 'nodemailer';
import { verifyToken } from './auth.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only!' });

  const { user_email, app_pass, to, subject, message, auth_token } = req.body;

  if (!verifyToken(auth_token)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid SuperMail Key' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user_email,
      pass: app_pass
    }
  });

  try {
    await transporter.sendMail({
      from: `"SuperMail" <${user_email}>`,
      to,
      subject,
      text: message
    });
    return res.status(200).json({ success: true, status: 'Engine running smoothly!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}