import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RAWRAGENCY - Agence Web Créative',
  description: 'Agence web spécialisée dans la création de sites web modernes, e-commerce et applications web sur mesure.',
  keywords: 'agence web, développement web, e-commerce, applications web, design, marketing digital',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen gradient-bg grain`}>
        <Navigation />
        <main className="pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
