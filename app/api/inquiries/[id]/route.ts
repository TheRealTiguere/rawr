import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Validation du statut
    if (!body.status || !['NOUVEAU', 'EN_COURS', 'CLOS'].includes(body.status)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }
    
    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { status: body.status }
    })
    
    return NextResponse.json({ 
      success: true, 
      inquiry: updatedInquiry 
    })
    
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    await prisma.inquiry.delete({
      where: { id }
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Demande supprimée avec succès' 
    })
    
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
