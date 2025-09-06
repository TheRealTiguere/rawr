export default function Services() {
  const services = [
    {
      icon: "🌐",
      title: "Sites Vitrine",
      description: "Sites web élégants pour présenter votre entreprise",
      features: ["Design responsive", "SEO optimisé", "Performance rapide", "Contenu dynamique"]
    },
    {
      icon: "🛒",
      title: "Site E-commerce",
      description: "Boutiques en ligne qui convertissent vos visiteurs",
      features: ["Paiement sécurisé", "Gestion des stocks", "Panier optimisé", "Analytics ventes"]
    },
    {
      icon: "☁️",
      title: "SaaS",
      description: "Applications web comme service sur mesure",
      features: ["Architecture cloud", "Abonnements", "API robuste", "Scalabilité"]
    },
    {
      icon: "📱",
      title: "Applications Mobiles",
      description: "Apps natives et cross-platform performantes",
      features: ["iOS & Android", "React Native", "Push notifications", "Synchronisation"]
    }
  ];

  return (
    <section id="services" className="py-8 relative overflow-hidden scroll-mt-28">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nos <span className="text-gradient">services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Une approche complète pour transformer votre vision en réalité digitale. 
            Chaque service est conçu pour maximiser votre ROI et votre satisfaction.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="card group p-8 text-center hover:bg-gray-700/90 transition-all duration-500"
            >
              {/* Icône */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              {/* Titre */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-colors duration-300">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-2 text-left">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-6 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-full text-gray-200 hover:bg-gray-700/90 transition-all duration-300">
            <span className="mr-2">💡</span>
            Besoin d&apos;un service personnalisé ? Parlons-en !
          </div>
        </div>
      </div>
    </section>
  );
}
