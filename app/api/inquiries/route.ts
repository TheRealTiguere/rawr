import { NextRequest, NextResponse } from 'next/server'
import { inquirySchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'
import { sendInquiryNotification } from '@/lib/email'
import { verifyReCaptcha } from '@/lib/recaptcha'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation avec Zod
    const validatedData = inquirySchema.parse(body)
    
    // Vérification honeypot
    if (validatedData.honeypot) {
      return NextResponse.json({ error: 'Spam détecté' }, { status: 400 })
    }
    
    // Vérification reCAPTCHA v3
    if (validatedData.recaptchaToken) {
      console.log('🔐 Vérification reCAPTCHA v3...')
      const captchaResult = await verifyReCaptcha(validatedData.recaptchaToken, 0.5)
      if (!captchaResult.success) {
        console.error('❌ Échec vérification reCAPTCHA:', captchaResult.error)
        return NextResponse.json({ 
          error: captchaResult.error || 'Vérification de sécurité échouée' 
        }, { status: 400 })
      }
      console.log(`✅ reCAPTCHA vérifié avec succès (score: ${captchaResult.score})`)
    } else {
      console.log('⚠️ Pas de token reCAPTCHA fourni')
    }
    
    // Création de la demande
    const inquiry = await prisma.inquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        budget: validatedData.budget,
        message: validatedData.message,
      },
    })
    
    // Envoi de l'email de notification
    console.log('📧 Tentative d\'envoi d\'email de notification...')
    const emailResult = await sendInquiryNotification(validatedData)
    
    if (!emailResult.success) {
      console.error('❌ Échec envoi email:', emailResult.error)
      // La demande est sauvée mais l'email a échoué
      return NextResponse.json({ 
        success: true, 
        message: 'Votre demande a été sauvegardée, mais l\'email de notification a échoué.',
        id: inquiry.id,
        emailError: emailResult.error
      })
    }
    
    console.log('✅ Email envoyé avec succès')
    return NextResponse.json({ 
      success: true, 
      message: 'Votre demande a été envoyée avec succès !',
      id: inquiry.id 
    })
    
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')
    
    if (format === 'csv') {
      const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' }
      })
      
      const csvContent = [
        'ID,Nom,Email,Téléphone,Budget,Message,Statut,Date de création',
        ...inquiries.map(inquiry => 
          `"${inquiry.id}","${inquiry.name}","${inquiry.email}","${inquiry.phone || ''}","${inquiry.budget || ''}","${inquiry.message.replace(/"/g, '""')}","${inquiry.status}","${inquiry.createdAt.toISOString()}"`
        )
      ].join('\n')
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="demandes-devis.csv"'
        }
      })
    }
    
    // Récupération JSON avec pagination et filtres
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    const where: any = {}
    if (status && status !== 'ALL') {
      where.status = status
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.inquiry.count({ where })
    ])
    
    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Erreur récupération demandes:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
