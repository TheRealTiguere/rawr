export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Politique de <span className="text-gradient">confidentialité</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none text-gray-300">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                RAWRAGENCY, société spécialisée dans le développement web et la création de sites internet, 
                s'engage à protéger votre vie privée et vos données personnelles. Cette politique de confidentialité 
                explique comment nous collectons, utilisons et protégeons vos informations personnelles conformément 
                au Règlement Général sur la Protection des Données (RGPD) et à la loi française.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Responsable du traitement</h2>
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <p><strong>Raison sociale :</strong> RAWRAGENCY</p>
                <p><strong>Email :</strong> contact@rawragency.fr</p>
                <p><strong>Téléphone :</strong> 01 85 09 20 75</p>
                <p><strong>Site web :</strong> https://rawragency.fr</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Données collectées</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Données collectées directement</h3>
              <p>Lorsque vous utilisez notre formulaire de contact, nous collectons :</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Nom complet</strong> (obligatoire)</li>
                <li><strong>Adresse email</strong> (obligatoire)</li>
                <li><strong>Numéro de téléphone</strong> (optionnel)</li>
                <li><strong>Type de projet</strong> (optionnel)</li>
                <li><strong>Description de votre projet</strong> (obligatoire)</li>
                <li><strong>Consentement RGPD</strong> (obligatoire)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Données collectées automatiquement</h3>
              <p>Nous collectons également des données techniques :</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Adresse IP</li>
                <li>Type de navigateur et version</li>
                <li>Système d'exploitation</li>
                <li>Pages visitées et durée de visite</li>
                <li>Date et heure de visite</li>
                <li>Site web de référence</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Finalités du traitement</h2>
              <p>Vos données personnelles sont traitées pour les finalités suivantes :</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Gestion des demandes de devis :</strong> Traitement et suivi de vos demandes</li>
                <li><strong>Communication commerciale :</strong> Réponse à vos questions et propositions commerciales</li>
                <li><strong>Amélioration des services :</strong> Analyse des besoins clients et optimisation de nos services</li>
                <li><strong>Obligations légales :</strong> Respect des obligations comptables et fiscales</li>
                <li><strong>Sécurité :</strong> Protection contre le spam et les tentatives de fraude</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Base légale du traitement</h2>
              <p>Le traitement de vos données personnelles est fondé sur :</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Votre consentement</strong> pour les communications marketing</li>
                <li><strong>L'exécution du contrat</strong> pour la fourniture de nos services</li>
                <li><strong>L'intérêt légitime</strong> pour l'amélioration de nos services</li>
                <li><strong>L'obligation légale</strong> pour la conservation des données comptables</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Conservation des données</h2>
              <div className="bg-white/5 rounded-lg p-4">
                <ul className="list-disc pl-6">
                  <li><strong>Données de contact :</strong> 3 ans à compter du dernier contact</li>
                  <li><strong>Données de prospection :</strong> 3 ans à compter de la collecte</li>
                  <li><strong>Données comptables :</strong> 10 ans conformément à la législation française</li>
                  <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Partage des données</h2>
              <p>Vos données personnelles ne sont pas vendues, louées ou partagées avec des tiers, sauf dans les cas suivants :</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Prestataires techniques :</strong> Hébergement, maintenance, analytics (sous contrat de confidentialité)</li>
                <li><strong>Obligations légales :</strong> Autorités compétentes en cas de demande légale</li>
                <li><strong>Protection des droits :</strong> Défense de nos droits légaux</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Sécurité des données</h2>
              <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Chiffrement des données en transit et au repos</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Formation du personnel à la protection des données</li>
                <li>Audits de sécurité réguliers</li>
                <li>Sauvegardes sécurisées</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Droit d'accès</h4>
                  <p className="text-sm">Obtenir une copie de vos données personnelles</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Droit de rectification</h4>
                  <p className="text-sm">Corriger des données inexactes ou incomplètes</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Droit à l'effacement</h4>
                  <p className="text-sm">Demander la suppression de vos données</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Droit à la limitation</h4>
                  <p className="text-sm">Restreindre le traitement de vos données</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Droit à la portabilité</h4>
                  <p className="text-sm">Récupérer vos données dans un format structuré</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Droit d'opposition</h4>
                  <p className="text-sm">Vous opposer au traitement de vos données</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Cookies et technologies similaires</h2>
              <p>Notre site utilise des cookies pour :</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Assurer le bon fonctionnement du site</li>
                <li>Analyser l'utilisation du site (Google Analytics)</li>
                <li>Améliorer l'expérience utilisateur</li>
              </ul>
              <p>Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Transferts internationaux</h2>
              <p>
                Vos données peuvent être transférées vers des pays situés en dehors de l'Union européenne. 
                Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place pour protéger vos données.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">12. Mineurs</h2>
              <p>
                Notre site n'est pas destiné aux mineurs de moins de 16 ans. Nous ne collectons pas sciemment 
                de données personnelles de mineurs sans le consentement de leurs parents ou tuteurs légaux.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">13. Modifications de la politique</h2>
              <p>
                Cette politique de confidentialité peut être modifiée à tout moment. Les modifications 
                importantes vous seront notifiées par email ou via un avis sur notre site. La date de 
                dernière mise à jour est indiquée en haut de cette page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">14. Contact et réclamations</h2>
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-400/30 rounded-lg p-6">
                <p className="mb-4">Pour exercer vos droits ou pour toute question concernant cette politique :</p>
                <div className="space-y-2">
                  <p><strong>Email :</strong> contact@rawragency.fr</p>
                  <p><strong>Téléphone :</strong> 01 85 09 20 75</p>
                  <p><strong>Adresse :</strong> RAWRAGENCY, France</p>
                </div>
                <p className="mt-4 text-sm">
                  Vous avez également le droit d'introduire une réclamation auprès de la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés) si vous estimez que 
                  vos droits ne sont pas respectés.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
