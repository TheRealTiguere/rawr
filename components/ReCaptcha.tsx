'use client'

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useCallback } from 'react'

interface ReCaptchaProviderProps {
  children: React.ReactNode
}

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    console.warn('reCAPTCHA site key not found. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.')
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}

interface UseReCaptchaProps {
  onVerify: (token: string) => void
  onError?: (error: string) => void
}

export function useReCaptchaV3({ onVerify, onError }: UseReCaptchaProps) {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const executeReCaptcha = useCallback(async (action: string = 'submit') => {
    if (!executeRecaptcha) {
      const error = 'reCAPTCHA not available'
      console.error('❌', error)
      onError?.(error)
      return null
    }

    try {
      console.log('🔐 Exécution de reCAPTCHA v3...')
      const token = await executeRecaptcha(action)
      console.log('✅ Token reCAPTCHA obtenu')
      onVerify(token)
      return token
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur reCAPTCHA'
      console.error('❌ Erreur reCAPTCHA:', errorMessage)
      onError?.(errorMessage)
      return null
    }
  }, [executeRecaptcha, onVerify, onError])

  return { executeReCaptcha }
}
