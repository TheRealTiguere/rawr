export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RAWRAGENCY",
    "alternateName": "RAWR AGENCY",
    "url": "https://rawragency.fr",
    "logo": "https://rawragency.fr/logo-rawr.png",
    "description": "Agence web créative spécialisée dans le développement de sites vitrine, e-commerce et applications web sur mesure. Design moderne, SEO optimisé, performance garantie.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "RAWRAGENCY"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressRegion": "France"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33185092075",
      "contactType": "customer service",
      "availableLanguage": "French"
    },
    "email": "contact@rawragency.fr",
    "sameAs": [
      "https://www.linkedin.com/company/rawragency",
      "https://www.instagram.com/rawragency"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Création de sites vitrine",
        "description": "Sites web élégants et modernes pour mettre en valeur votre entreprise. S'adapte à tous les écrans, visible sur Google grâce à un bon référencement, rapide et fluide.",
        "provider": {
          "@type": "Organization",
          "name": "RAWRAGENCY"
        }
      },
      {
        "@type": "Service",
        "name": "Développement e-commerce",
        "description": "Boutiques en ligne qui donnent envie d'acheter. Paiement en ligne simple et sécurisé, suivi automatique du stock, panier pratique et statistiques de ventes.",
        "provider": {
          "@type": "Organization",
          "name": "RAWRAGENCY"
        }
      },
      {
        "@type": "Service",
        "name": "Applications SaaS sur mesure",
        "description": "Applications web créées spécialement pour votre activité. Hébergement moderne et fiable, gestion des abonnements simplifiée, s'adapte facilement à votre croissance.",
        "provider": {
          "@type": "Organization",
          "name": "RAWRAGENCY"
        }
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "knowsAbout": [
      "Développement web",
      "Design web",
      "E-commerce",
      "Applications web",
      "SEO",
      "Référencement",
      "Next.js",
      "React",
      "WordPress",
      "TypeScript"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
