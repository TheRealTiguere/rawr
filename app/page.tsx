import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accueil - Agence Web Créative',
  description: 'RAWRAGENCY, votre agence web créative spécialisée dans le développement de sites web modernes, e-commerce et applications sur mesure. Devis gratuit.',
  openGraph: {
    title: 'RAWRAGENCY - Agence Web Créative | Développement Sites Web',
    description: 'Créez votre site web professionnel avec RAWRAGENCY. Sites vitrines, e-commerce, applications web. Devis gratuit et accompagnement personnalisé.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      {/* Données structurées JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RAWRAGENCY",
            "description": "Agence web spécialisée dans la création de sites web modernes, e-commerce et applications web sur mesure",
            "url": "https://rawragency.fr",
            "logo": "https://rawragency.fr/logo-rawr.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33-6-28-62-48-88",
              "contactType": "customer service",
              "areaServed": "FR",
              "availableLanguage": "French"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
            },
            "sameAs": [
              "https://www.linkedin.com/company/rawragency",
              "https://twitter.com/rawragency"
            ],
            "offers": {
              "@type": "Offer",
              "description": "Services de développement web",
              "category": "Web Development"
            }
          })
        }}
      />
      
      {/* Données structurées pour les services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Développement Web",
            "description": "Création de sites web modernes, e-commerce et applications web sur mesure",
            "provider": {
              "@type": "Organization",
              "name": "RAWRAGENCY"
            },
            "areaServed": "France",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services Web",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site Vitrine",
                    "description": "Création de sites web vitrines professionnels"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce",
                    "description": "Développement de boutiques en ligne"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Application Web",
                    "description": "Développement d'applications web sur mesure"
                  }
                }
              ]
            }
          })
        }}
      />

      <div className="min-h-screen">
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
      </div>
    </>
  )
}
