import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité de RAWRAGENCY. Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>Collecte des données</h2>
          <p>Nous collectons les informations que vous nous fournissez directement, notamment :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Message et informations sur votre projet</li>
          </ul>
          
          <h2>Utilisation des données</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>Répondre à vos demandes de devis</li>
            <li>Vous contacter concernant votre projet</li>
            <li>Améliorer nos services</li>
          </ul>
          
          <h2>Conservation des données</h2>
          <p>Vos données sont conservées pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, et au maximum pendant 3 ans à compter de notre dernier contact.</p>
          
          <h2>Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
          </ul>
          
          <h2>Contact</h2>
          <p>Pour toute question concernant cette politique ou pour exercer vos droits, contactez-nous à : privacy@rawragency.com</p>
        </div>
      </div>
    </div>
  )
}
