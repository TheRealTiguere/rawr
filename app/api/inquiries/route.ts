import { NextRequest, NextResponse } from 'next/server'
import { inquirySchema } from '@/lib/validations'
import { sendInquiryNotification } from '@/lib/email'

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY non configurée')
    return true // En mode développement, on accepte sans vérification
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    
    // Pour reCAPTCHA v3, vérifier le score (0.0 = bot, 1.0 = humain)
    if (data.success && data.score !== undefined) {
      const score = parseFloat(data.score)
      console.log(`reCAPTCHA v3 score: ${score}`)
      // Accepter si score >= 0.5 (ajustable selon vos besoins)
      return score >= 0.5
    }
    
    return data.success === true
  } catch (error) {
    console.error('Erreur vérification reCAPTCHA:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Vérification reCAPTCHA
    if (body.recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(body.recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json({ error: 'Vérification reCAPTCHA échouée' }, { status: 400 })
      }
    }
    
    // Validation avec Zod
    const validatedData = inquirySchema.parse(body)
    
    // Vérification honeypot
    if (validatedData.honeypot) {
      return NextResponse.json({ error: 'Spam détecté' }, { status: 400 })
    }
    
    // Envoi de l'email de notification
    const emailResult = await sendInquiryNotification(validatedData)
    
    if (!emailResult.success) {
      return NextResponse.json({ 
        error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.' 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Votre demande a été envoyée avec succès !' 
    })
    
  } catch (error) {
    console.error('Erreur API POST /api/inquiries:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}

