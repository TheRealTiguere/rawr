'use client'

import ContactForm from './ContactForm';

export default function Contact() {
  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      content: "contact@rawragency.fr",
      link: "mailto:contact@rawragency.fr"
    },
    {
      icon: "📞",
      title: "Téléphone",
      content: "09 72 17 45 95",
      link: "tel:+33972174595"
    },
    {
      icon: "⏰",
      title: "Disponibilité",
      content: "Réponse sous 24h"
    },
    {
      icon: "🌍",
      title: "Zone d'intervention",
      content: "Partout en France"
    }
  ];

  return (
    <section id="contact" className="py-8 relative overflow-hidden scroll-mt-28">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Parlons de votre <span className="text-gradient">projet</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Prêt à transformer votre vision en réalité ? Contactez-nous pour discuter 
            de votre projet et obtenir un devis personnalisé.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">
                Nos coordonnées
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-300">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte de visite */}
            <div className="p-8 bg-white/15 backdrop-blur-md border border-amber-400/30 rounded-2xl shadow-lg hover:bg-white/20 hover:border-amber-400/50 transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-4">
                Pourquoi nous choisir ?
              </h3>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                  Expertise technique reconnue
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                  Accompagnement personnalisé
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                  Livraison dans les délais
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                  Support post-livraison
                </li>
              </ul>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-500">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Envoyez-nous un message
              </h3>
              <p className="text-gray-300">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24h.
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>

        {/* CTA supplémentaire */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-amber-400/30 rounded-full text-white hover:bg-white/15 hover:border-amber-400/50 transition-all duration-300 shadow-lg">
            <span className="mr-2">💬</span>
            Besoin d&apos;une réponse rapide ? Appelez-nous directement !
          </div>
        </div>
      </div>
    </section>
  );
}
