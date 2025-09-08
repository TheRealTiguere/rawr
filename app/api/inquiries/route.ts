import { NextRequest, NextResponse } from 'next/server'
import { inquirySchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'
import { sendInquiryNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  console.log('🔍 [DEBUG] Début de la requête POST /api/inquiries')
  
  try {
    // Vérifier la connexion à la base de données
    console.log('🔍 [DEBUG] Vérification de la configuration de la base de données')
    if (!process.env.DATABASE_URL) {
      console.error('❌ [DEBUG] DATABASE_URL non configurée')
      return NextResponse.json({ error: 'Base de données non configurée' }, { status: 500 })
    }
    console.log('✅ [DEBUG] DATABASE_URL configurée')

    console.log('🔍 [DEBUG] Récupération du body de la requête')
    const body = await request.json()
    console.log('📝 [DEBUG] Body reçu:', JSON.stringify(body, null, 2))
    
    // Validation avec Zod
    console.log('🔍 [DEBUG] Validation avec Zod')
    const validatedData = inquirySchema.parse(body)
    console.log('✅ [DEBUG] Données validées:', JSON.stringify(validatedData, null, 2))
    
    // Vérification honeypot
    console.log('🔍 [DEBUG] Vérification honeypot')
    if (validatedData.honeypot) {
      console.log('🚫 [DEBUG] Spam détecté - honeypot rempli')
      return NextResponse.json({ error: 'Spam détecté' }, { status: 400 })
    }
    console.log('✅ [DEBUG] Honeypot vide - pas de spam')
    
    // Création de la demande
    console.log('🔍 [DEBUG] Création de la demande en base de données')
    const inquiry = await prisma.inquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        budget: validatedData.budget || null,
        message: validatedData.message,
      },
    })
    console.log('✅ [DEBUG] Demande créée avec l\'ID:', inquiry.id)
    
    // Envoi de l'email de notification
    console.log('🔍 [DEBUG] Envoi de l\'email de notification')
    const emailResult = await sendInquiryNotification(validatedData)
    console.log('📧 [DEBUG] Résultat envoi email:', emailResult)
    
    console.log('✅ [DEBUG] Requête terminée avec succès')
    return NextResponse.json({ 
      success: true, 
      message: 'Votre demande a été envoyée avec succès !',
      id: inquiry.id 
    })
    
  } catch (error) {
    console.error('❌ [DEBUG] Erreur API POST /api/inquiries:', error)
    console.error('❌ [DEBUG] Stack trace:', error instanceof Error ? error.stack : 'Pas de stack trace')
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Vérifier la connexion à la base de données
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Base de données non configurée' }, { status: 500 })
    }

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
    console.error('Erreur API GET /api/inquiries:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
