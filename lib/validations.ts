import { z } from 'zod'

export const inquirySchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100, 'Le nom ne peut pas dépasser 100 caractères').trim(),
  email: z.string().email('Email invalide').max(100, 'L\'email ne peut pas dépasser 100 caractères').trim(),
  phone: z.string().max(20, 'Le téléphone ne peut pas dépasser 20 caractères').optional(),
  budget: z.enum(['Site Vitrine', 'Site E-commerce', 'SaaS', 'Application Mobile', 'Autre']).optional().or(z.literal('')),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(1000, 'Le message ne peut pas dépasser 1000 caractères').trim(),
  consent: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions'),
  honeypot: z.string().max(0, 'Spam détecté').optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})

export type InquiryFormData = z.infer<typeof inquirySchema>
export type LoginFormData = z.infer<typeof loginSchema>
