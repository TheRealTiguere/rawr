import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ReCaptchaProvider } from '@/components/ReCaptcha'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'RAWRAGENCY - Agence Web Créative | Développement Sites Web & E-commerce',
    template: '%s | RAWRAGENCY'
  },
  description: 'Agence web spécialisée dans la création de sites web modernes, e-commerce et applications web sur mesure. Développement React, Next.js, design UX/UI professionnel.',
  keywords: [
    'agence web',
    'développement web',
    'création site internet',
    'e-commerce',
    'applications web',
    'React',
    'Next.js',
    'design UX/UI',
    'marketing digital',
    'site vitrine',
    'développeur web',
    'agence digitale'
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
    languages: {
      'fr-FR': '/fr',
    },
  },
  openGraph: {
    title: 'RAWRAGENCY - Agence Web Créative',
    description: 'Agence web spécialisée dans la création de sites web modernes, e-commerce et applications web sur mesure.',
    url: 'https://rawragency.fr',
    siteName: 'RAWRAGENCY',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/logo-rawr.png',
        width: 1200,
        height: 630,
        alt: 'RAWRAGENCY - Agence Web Créative',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAWRAGENCY - Agence Web Créative',
    description: 'Agence web spécialisée dans la création de sites web modernes, e-commerce et applications web sur mesure.',
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
    google: 'your-google-verification-code',
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RAWRAGENCY" />
        <link rel="apple-touch-icon" href="/logo-rawr.png" />
      </head>
      <body className={`${inter.className} min-h-screen gradient-bg grain`}>
        <ReCaptchaProvider>
          <Navigation />
          <main className="pt-28">
            {children}
          </main>
          <Footer />
        </ReCaptchaProvider>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
