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
  console.log('📧 [DEBUG] Début de l\'envoi d\'email de notification')
  console.log('📧 [DEBUG] Données de l\'inquiry:', JSON.stringify(inquiry, null, 2))
  
  const toEmail = process.env.TO_EMAIL || 'contact@rawragency.fr'
  console.log('📧 [DEBUG] Email de destination:', toEmail)
  
  // Vérifier la configuration SMTP
  console.log('📧 [DEBUG] Configuration SMTP:')
  console.log('📧 [DEBUG] - SMTP_HOST:', process.env.SMTP_HOST || 'arolle.o2switch.net')
  console.log('📧 [DEBUG] - SMTP_PORT:', process.env.SMTP_PORT || '465')
  console.log('📧 [DEBUG] - SMTP_USER:', process.env.SMTP_USER ? 'Configuré' : 'Non configuré')
  console.log('📧 [DEBUG] - SMTP_PASS:', process.env.SMTP_PASS ? 'Configuré' : 'Non configuré')
  
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
  
  console.log('📧 [DEBUG] Options d\'email:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject
  })

  try {
    console.log('📧 [DEBUG] Tentative d\'envoi de l\'email...')
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ [DEBUG] Email envoyé avec succès:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('❌ [DEBUG] Erreur envoi email:', error)
    console.error('❌ [DEBUG] Détails de l\'erreur:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      responseCode: (error as any)?.responseCode,
      command: (error as any)?.command
    })
    return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
  }
}
