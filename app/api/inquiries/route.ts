import { NextRequest, NextResponse } from 'next/server'
import { inquirySchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'
import { sendInquiryNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    // Vérifier la connexion à la base de données
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Base de données non configurée' }, { status: 500 })
    }

    const body = await request.json()
    
    // Validation avec Zod
    const validatedData = inquirySchema.parse(body)
    
    // Vérification honeypot
    if (validatedData.honeypot) {
      return NextResponse.json({ error: 'Spam détecté' }, { status: 400 })
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
    await sendInquiryNotification(validatedData)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Votre demande a été envoyée avec succès !',
      id: inquiry.id 
    })
    
  } catch (error) {
    console.error('Erreur API POST /api/inquiries:', error)
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
