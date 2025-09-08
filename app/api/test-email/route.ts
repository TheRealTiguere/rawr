import { NextRequest, NextResponse } from 'next/server'
import { sendInquiryNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  console.log('🧪 [DEBUG] Test de l\'envoi d\'email')
  
  try {
    // Données de test
    const testInquiry = {
      name: 'Test Debug',
      email: 'test@example.com',
      phone: '+33 6 12 34 56 78',
      budget: 'Site Vitrine',
      message: 'Ceci est un test de debug pour vérifier l\'envoi d\'email.',
      consent: true,
      honeypot: ''
    }
    
    console.log('🧪 [DEBUG] Envoi d\'un email de test...')
    const result = await sendInquiryNotification(testInquiry)
    
    if (result.success) {
      console.log('✅ [DEBUG] Test email réussi:', result.messageId)
      return NextResponse.json({ 
        success: true, 
        message: 'Email de test envoyé avec succès',
        messageId: result.messageId
      })
    } else {
      console.error('❌ [DEBUG] Test email échoué:', result.error)
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error('❌ [DEBUG] Erreur lors du test email:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  console.log('🧪 [DEBUG] Vérification de la configuration email')
  
  const config = {
    smtpHost: process.env.SMTP_HOST || 'arolle.o2switch.net',
    smtpPort: process.env.SMTP_PORT || '465',
    smtpUser: process.env.SMTP_USER ? 'Configuré' : 'Non configuré',
    smtpPass: process.env.SMTP_PASS ? 'Configuré' : 'Non configuré',
    toEmail: process.env.TO_EMAIL || 'contact@rawragency.fr',
    nodeEnv: process.env.NODE_ENV
  }
  
  console.log('🧪 [DEBUG] Configuration actuelle:', config)
  
  return NextResponse.json({
    success: true,
    config,
    message: 'Configuration email récupérée'
  })
}
