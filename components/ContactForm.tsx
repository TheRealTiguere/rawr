'use client'

import { useState } from 'react'
import { inquirySchema, type InquiryFormData } from '@/lib/validations'

export default function ContactForm() {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
    consent: false,
    honeypot: ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔍 [DEBUG CLIENT] Début de la soumission du formulaire')
    console.log('🔍 [DEBUG CLIENT] Données du formulaire:', JSON.stringify(formData, null, 2))
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Validation avec Zod
      console.log('🔍 [DEBUG CLIENT] Validation avec Zod...')
      const validatedData = inquirySchema.parse(formData)
      console.log('✅ [DEBUG CLIENT] Données validées:', JSON.stringify(validatedData, null, 2))
      
      // Vérification honeypot
      console.log('🔍 [DEBUG CLIENT] Vérification honeypot...')
      if (validatedData.honeypot) {
        console.log('🚫 [DEBUG CLIENT] Spam détecté - honeypot rempli')
        throw new Error('Spam détecté')
      }
      console.log('✅ [DEBUG CLIENT] Honeypot vide - pas de spam')
      
      console.log('🔍 [DEBUG CLIENT] Envoi de la requête à /api/inquiries...')
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })
      
      console.log('📡 [DEBUG CLIENT] Réponse reçue:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ [DEBUG CLIENT] Erreur de réponse:', errorData)
        throw new Error(errorData.error || 'Erreur lors de l\'envoi')
      }
      
      const responseData = await response.json()
      console.log('✅ [DEBUG CLIENT] Réponse de succès:', responseData)
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        budget: '',
        message: '',
        consent: false,
        honeypot: ''
      })
      
    } catch (error) {
      console.error('❌ [DEBUG CLIENT] Erreur lors de la soumission:', error)
      
      if (error instanceof Error) {
        if (error.message.includes('Spam détecté')) {
          console.log('🚫 [DEBUG CLIENT] Spam détecté - statut error')
          setSubmitStatus('error')
        } else {
          // Validation errors
          const zodError = error as any
          if (zodError.errors) {
            console.log('❌ [DEBUG CLIENT] Erreurs de validation Zod:', zodError.errors)
            const fieldErrors: Partial<InquiryFormData> = {}
            zodError.errors.forEach((err: any) => {
              fieldErrors[err.path[0] as keyof InquiryFormData] = err.message
            })
            setErrors(fieldErrors)
          } else {
            console.log('❌ [DEBUG CLIENT] Erreur générale:', error.message)
            setErrors({ message: error.message })
          }
        }
      }
    } finally {
      console.log('🔍 [DEBUG CLIENT] Fin de la soumission - isSubmitting = false')
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
