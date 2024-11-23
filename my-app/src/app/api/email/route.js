import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests are allowed' });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // e.g., smtp.gmail.com
      port: 587, // Use 465 for secure, or 587 for TLS
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your SMTP username
        pass: process.env.SMTP_PASS, // Your SMTP password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: '"Your Name" <your_email@example.com>',
      to,
      subject,
      text,
    });

    return res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
}
