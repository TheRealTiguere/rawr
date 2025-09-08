import nodemailer from 'nodemailer'
import { InquiryFormData } from './validations'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'arolle.o2switch.net',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_PORT === '465' || process.env.SMTP_PORT === '993', // true pour port 465 (SSL)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendInquiryNotification(inquiry: InquiryFormData) {
  const toEmail = process.env.TO_EMAIL || 'contact@rawragency.fr'
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: toEmail,
    subject: 'Nouvelle demande de devis - RAWRAGENCY',
    html: `
      <h2>Nouvelle demande de devis reçue</h2>
      <p><strong>Nom :</strong> ${inquiry.name}</p>
      <p><strong>Email :</strong> ${inquiry.email}</p>
      ${inquiry.phone ? `<p><strong>Téléphone :</strong> ${inquiry.phone}</p>` : ''}
      ${inquiry.budget ? `<p><strong>Type de projet :</strong> ${inquiry.budget}</p>` : ''}
      <p><strong>Message :</strong></p>
      <p>${inquiry.message}</p>
      <p><small>Envoyé le ${new Date().toLocaleString('fr-FR')}</small></p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
  }
}
