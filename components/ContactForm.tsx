'use client'

import { useState } from 'react'
import { inquirySchema, type InquiryFormData } from '@/lib/validations'
import { useReCaptchaV3 } from './ReCaptcha'

export default function ContactForm() {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    budget: undefined,
    message: '',
    consent: false,
    honeypot: '',
    recaptchaToken: ''
  })
  
  const [errors, setErrors] = useState<Partial<InquiryFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof InquiryFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleReCaptchaVerify = (token: string) => {
    console.log('🔐 reCAPTCHA vérifié:', token ? 'Token reçu' : 'Pas de token')
    setFormData(prev => ({ ...prev, recaptchaToken: token }))
    // Clear captcha error if exists
    if (errors.recaptchaToken) {
      setErrors(prev => ({ ...prev, recaptchaToken: undefined }))
    }
  }

  const handleReCaptchaError = (error: string) => {
    console.error('❌ Erreur reCAPTCHA:', error)
    setFormData(prev => ({ ...prev, recaptchaToken: '' }))
    setErrors(prev => ({ ...prev, recaptchaToken: 'Erreur lors de la vérification de sécurité' }))
  }

  const { executeReCaptcha } = useReCaptchaV3({
    onVerify: handleReCaptchaVerify,
    onError: handleReCaptchaError
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🚀 Formulaire soumis:', formData)
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Exécuter reCAPTCHA v3 avant validation
      console.log('🔐 Exécution de reCAPTCHA v3...')
      const recaptchaToken = await executeReCaptcha('contact_form')
      
      if (!recaptchaToken) {
        throw new Error('Échec de la vérification de sécurité')
      }

      // Ajouter le token au formData
      const dataWithRecaptcha = { ...formData, recaptchaToken }
      
      // Validation avec Zod
      console.log('🔍 Validation des données...')
      const validatedData = inquirySchema.parse(dataWithRecaptcha)
      console.log('✅ Données validées:', validatedData)
      
      // Vérification honeypot
      if (validatedData.honeypot) {
        throw new Error('Spam détecté')
      }
      
      console.log('📡 Envoi de la requête vers /api/inquiries...')
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })
      
      console.log('📨 Réponse reçue:', response.status, response.statusText)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ Erreur API:', errorData)
        throw new Error(errorData.error || 'Erreur lors de l\'envoi')
      }
      
      const successData = await response.json()
      console.log('✅ Succès API:', successData)
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        budget: undefined,
        message: '',
        consent: false,
        honeypot: '',
        recaptchaToken: ''
      })
      
    } catch (error) {
      console.error('❌ Erreur dans handleSubmit:', error)
      if (error instanceof Error) {
        if (error.message.includes('Spam détecté')) {
          console.log('🚫 Spam détecté')
          setSubmitStatus('error')
        } else {
          // Validation errors
          console.log('🔍 Erreur de validation:', error)
          const zodError = error as any
          if (zodError.errors) {
            const fieldErrors: Partial<InquiryFormData> = {}
            zodError.errors.forEach((err: any) => {
              fieldErrors[err.path[0] as keyof InquiryFormData] = err.message
            })
            console.log('📝 Erreurs de champs:', fieldErrors)
            setErrors(fieldErrors)
          } else {
            console.log('📝 Erreur générale:', error.message)
            setErrors({ message: error.message })
          }
        }
      }
    } finally {
      console.log('🏁 Fin de soumission, isSubmitting = false')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      
      {/* Nom */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-gray-300 ${
            errors.name ? 'border-red-400' : 'border-white/30'
          }`}
          placeholder="Votre nom complet"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-gray-300 ${
            errors.email ? 'border-red-400' : 'border-white/30'
          }`}
          placeholder="votre@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-gray-300"
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      {/* Type de projet */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
          Type de projet
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-gray-300"
          style={{
            colorScheme: 'dark'
          }}
        >
          <option value="" style={{ backgroundColor: '#1f2937', color: '#e5e7eb' }}>Sélectionnez un type de projet</option>
          <option value="Site Vitrine" style={{ backgroundColor: '#1f2937', color: '#e5e7eb' }}>🌐 Site Vitrine</option>
          <option value="Site E-commerce" style={{ backgroundColor: '#1f2937', color: '#e5e7eb' }}>🛒 Site E-commerce</option>
          <option value="SaaS" style={{ backgroundColor: '#1f2937', color: '#e5e7eb' }}>☁️ SaaS</option>
          <option value="Application Mobile" style={{ backgroundColor: '#1f2937', color: '#e5e7eb' }}>📱 Application Mobile</option>
          <option value="Autre" style={{ backgroundColor: '#1f2937', color: '#e5e7eb' }}>🔧 Autre projet</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          Description de votre projet *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-gray-300 ${
            errors.message ? 'border-red-400' : 'border-white/30'
          }`}
          placeholder="Décrivez votre projet, vos objectifs, vos besoins..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {/* Consentement RGPD */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 text-amber-400 focus:ring-amber-400 border-white/30 rounded bg-white/10"
        />
        <label htmlFor="consent" className="text-sm text-gray-300">
          J&apos;accepte que mes données soient traitées dans le cadre de ma demande de devis. 
          <a href="/privacy" className="text-blue-600 hover:underline ml-1">
            En savoir plus
          </a>
        </label>
      </div>
      {errors.consent && (
        <p className="mt-1 text-sm text-red-600">{errors.consent}</p>
      )}

      {/* reCAPTCHA v3 est invisible - pas besoin d'interface utilisateur */}
      {errors.recaptchaToken && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.recaptchaToken}</p>
        </div>
      )}

      {/* Messages de statut */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            ✅ Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">
            ❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
          </p>
        </div>
      )}

      {/* Bouton de soumission */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </button>
    </form>
  )
}
