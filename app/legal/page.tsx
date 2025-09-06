export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions légales</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>Éditeur du site</h2>
          <p>RAWRAGENCY<br />
          Adresse : [Votre adresse]<br />
          Téléphone : [Votre téléphone]<br />
          Email : contact@rawragency.com</p>
          
          <h2>Hébergement</h2>
          <p>Ce site est hébergé par Vercel Inc.<br />
          Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
          
          <h2>Propriété intellectuelle</h2>
          <p>L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          
          <h2>Protection des données personnelles</h2>
          <p>Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.</p>
        </div>
      </div>
    </div>
  )
}
