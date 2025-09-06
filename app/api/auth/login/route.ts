import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validations'
import { authenticateUser, createToken, setAuthCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)
    
    const user = await authenticateUser(validatedData.email, validatedData.password)
    
    if (!user) {
      return NextResponse.json({ 
        error: 'Email ou mot de passe incorrect' 
      }, { status: 401 })
    }
    
    const token = createToken({
      userId: user.id,
      email: user.email
    })
    
    setAuthCookie(token)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email
      }
    })
    
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
