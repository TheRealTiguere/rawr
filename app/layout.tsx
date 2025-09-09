import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'RAWRAGENCY - Agence Web Créative & Développement Sites Internet',
    template: '%s | RAWRAGENCY - Agence Web Créative'
  },
  description: 'Agence web créative spécialisée dans le développement de sites vitrine, e-commerce et applications web sur mesure. Design moderne, SEO optimisé, performance garantie. Devis gratuit.',
  keywords: [
    'agence web',
    'développement web',
    'création site internet',
    'site vitrine',
    'e-commerce',
    'boutique en ligne',
    'application web',
    'design web',
    'SEO',
    'référencement',
    'marketing digital',
    'agence digitale',
    'développeur web',
    'programmeur',
    'web design',
    'site responsive',
    'Next.js',
    'React',
    'WordPress',
    'France'
  ],
  authors: [{ name: 'RAWRAGENCY' }],
  creator: 'RAWRAGENCY',
  publisher: 'RAWRAGENCY',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rawragency.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RAWRAGENCY - Agence Web Créative & Développement Sites Internet',
    description: 'Agence web créative spécialisée dans le développement de sites vitrine, e-commerce et applications web sur mesure. Design moderne, SEO optimisé, performance garantie.',
    url: 'https://rawragency.fr',
    siteName: 'RAWRAGENCY',
    images: [
      {
        url: '/logo-rawr.png',
        width: 1200,
        height: 630,
        alt: 'RAWRAGENCY - Agence Web Créative',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAWRAGENCY - Agence Web Créative & Développement Sites Internet',
    description: 'Agence web créative spécialisée dans le développement de sites vitrine, e-commerce et applications web sur mesure.',
    images: ['/logo-rawr.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre-code-verification-google',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <StructuredData />
      </head>
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
