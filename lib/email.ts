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
  // Options supplémentaires pour débugger
  debug: true,
  logger: true,
})

export async function sendInquiryNotification(inquiry: InquiryFormData) {
  const toEmail = process.env.TO_EMAIL || 'contact@rawragency.fr'
  
  // Debug: Log des variables d'environnement
  console.log('🔧 Configuration SMTP:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER ? '***configuré***' : '❌ MANQUANT',
    pass: process.env.SMTP_PASS ? '***configuré***' : '❌ MANQUANT',
    to: toEmail
  })
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: toEmail,
    subject: '🚀 Nouvelle demande de devis - RAWRAGENCY',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle demande de devis</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              🚀 RAWRAGENCY
            </h1>
            <p style="color: #ffffff; margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">
              Nouvelle demande de devis reçue
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            
            <!-- Client Info Card -->
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #f59e0b;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                👤 Informations client
              </h2>
              
              <div style="display: grid; gap: 12px;">
                <div style="display: flex; align-items: center;">
                  <span style="color: #6b7280; font-weight: 500; min-width: 100px; display: inline-block;">Nom :</span>
                  <span style="color: #1f2937; font-weight: 600;">${inquiry.name}</span>
                </div>
                
                <div style="display: flex; align-items: center;">
                  <span style="color: #6b7280; font-weight: 500; min-width: 100px; display: inline-block;">Email :</span>
                  <a href="mailto:${inquiry.email}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">${inquiry.email}</a>
                </div>
                
                ${inquiry.phone ? `
                <div style="display: flex; align-items: center;">
                  <span style="color: #6b7280; font-weight: 500; min-width: 100px; display: inline-block;">Téléphone :</span>
                  <a href="tel:${inquiry.phone}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">${inquiry.phone}</a>
                </div>
                ` : ''}
                
                ${inquiry.budget ? `
                <div style="display: flex; align-items: center;">
                  <span style="color: #6b7280; font-weight: 500; min-width: 100px; display: inline-block;">Projet :</span>
                  <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">${inquiry.budget}</span>
                </div>
                ` : ''}
              </div>
            </div>

            <!-- Message Card -->
            <div style="background-color: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h3 style="color: #1f2937; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                💬 Message du client
              </h3>
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border-left: 4px solid #10b981;">
                <p style="color: #374151; margin: 0; font-size: 16px; line-height: 1.7;">
                  ${inquiry.message.replace(/\n/g, '<br>')}
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 32px 0;">
              <a href="mailto:${inquiry.email}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 8px; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3); transition: all 0.2s;">
                📧 Répondre par email
              </a>
              ${inquiry.phone ? `
              <a href="tel:${inquiry.phone}" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 8px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                📞 Appeler
              </a>
              ` : ''}
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              📅 Reçu le <strong>${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</strong>
            </p>
            <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 12px;">
              Cet email a été généré automatiquement par le site RAWRAGENCY
            </p>
          </div>

        </div>
      </body>
      </html>
    `,
  }

  try {
    console.log('📧 Tentative d\'envoi d\'email vers:', toEmail)
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Email envoyé avec succès:', result.messageId)
    return { success: true }
  } catch (error) {
    console.error('❌ Erreur envoi email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
  }
}
