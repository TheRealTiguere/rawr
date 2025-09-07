interface ReCaptchaVerifyResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  score?: number
  action?: string
  'error-codes'?: string[]
}

export async function verifyReCaptcha(token: string, minScore: number = 0.5): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured')
    return { success: true } // En développement, on peut bypasser
  }

  if (!token) {
    return { success: false, error: 'Token reCAPTCHA manquant' }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data: ReCaptchaVerifyResponse = await response.json()

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes'])
      return { 
        success: false, 
        error: 'Vérification reCAPTCHA échouée' 
      }
    }

    // Vérifier le score (reCAPTCHA v3 retourne un score de 0.0 à 1.0)
    const score = data.score || 0
    if (score < minScore) {
      console.warn(`reCAPTCHA score trop bas: ${score} (minimum: ${minScore})`)
      return { 
        success: false, 
        score,
        error: 'Score de sécurité insuffisant' 
      }
    }

    console.log(`✅ reCAPTCHA verified successfully (score: ${score})`)
    return { success: true, score }

  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error)
    return { 
      success: false, 
      error: 'Erreur lors de la vérification reCAPTCHA' 
    }
  }
}
