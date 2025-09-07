export default function Portfolio() {
  const projects = [
    {
      title: "AMS Global Services - Boutique E-commerce",
      category: "E-commerce",
      description: "Boutique en ligne spécialisée dans les produits anti-nuisibles avec système de commande complet, gestion des stocks et paiements sécurisés.",
      image: "/api/placeholder/600/400",
      technologies: ["WordPress", "WooCommerce", "PHP", "MySQL"],
      link: "https://www.shop.ams-globalservices.com",
      featured: true
    },
    {
      title: "AMS Global Services - Site Vitrine",
      category: "Site Vitrine",
      description: "Site vitrine professionnel pour une entreprise de services anti-nuisibles avec présentation des services, témoignages clients et formulaire de contact.",
      image: "/api/placeholder/600/400",
      technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
      link: "https://ams-globalservices.com"
    }
  ];

  return (
    <section id="portfolio" className="py-8 relative overflow-hidden scroll-mt-40">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nos <span className="text-gradient">réalisations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez une sélection de nos projets les plus réussis. 
            Chaque réalisation témoigne de notre expertise et de notre créativité.
          </p>
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-500 group overflow-hidden ${
                project.featured ? '' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <div className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm ${
                  project.featured ? 'h-64' : 'h-48'
                } w-full group-hover:scale-105 transition-transform duration-500`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white/60 text-4xl">
                    🖼️
                  </div>
                </div>
                
                {/* Badge catégorie */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white shadow-sm">
                  {project.category}
                </div>
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium rounded-full shadow-lg">
                    ⭐ Projet vedette
                  </div>
                )}
              </div>
              
              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Lien */}
                <div className="flex items-center text-amber-400 hover:text-amber-300 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm font-medium">Voir le projet</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(245,158,11,0.4)]">
            <span className="mr-2">🚀</span>
            Démarrer votre projet
          </div>
        </div>
      </div>
    </section>
  );
}
