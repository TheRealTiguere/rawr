'use client'

import { useState, useRef } from 'react'

interface Project {
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  link: string | null
  featured?: boolean
  inProgress?: boolean
}

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const completedProjects: Project[] = [
    {
      title: "AMS Global Services - Boutique E-commerce",
      category: "E-commerce",
      description: "Boutique en ligne spécialisée dans les produits anti-nuisibles avec système de commande complet, gestion des stocks et paiements sécurisés.",
      image: "/images/portfolio/ams-boutique-ecommerce.png",
      technologies: ["WordPress", "WooCommerce", "PHP", "MySQL"],
      link: "https://www.shop.ams-globalservices.com",
      featured: true
    },
    {
      title: "AMS Global Services - Site Vitrine",
      category: "Site Vitrine",
      description: "Site vitrine professionnel pour une entreprise de services anti-nuisibles avec présentation des services, témoignages clients et formulaire de contact.",
      image: "/images/portfolio/ams-site-vitrine.png",
      technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
      link: "https://ams-globalservices.com"
    },
    {
      title: "SafeLoc - Location de voiture",
      category: "Site Vitrine",
      description: "Site web moderne pour une entreprise de location de véhicules avec système de réservation en ligne et présentation de la flotte.",
      image: "/images/portfolio/safeloc-location.png",
      technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
      link: "#"
    },
    {
      title: "GM Auto Ecole - Site vitrine",
      category: "Site Vitrine",
      description: "Site vitrine professionnel pour une auto-école avec présentation des formations, tarifs et formulaire de contact.",
      image: "/images/portfolio/gm-auto-ecole.png",
      technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
      link: "#"
    }
  ];

  const inProgressProject: Project = {
    title: "Application SaaS - Projet en cours",
    category: "SaaS",
    description: "Application web innovante pour la gestion d'entreprise avec tableau de bord interactif, analytics avancés et intégrations API.",
    image: "/images/portfolio/saas-projet-encours.png",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    link: null,
    inProgress: true
  };

  const scrollToProject = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const projectWidth = container.children[0]?.clientWidth || 0
      const gap = 32 // gap-8 = 2rem = 32px
      const scrollLeft = index * (projectWidth + gap)
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : completedProjects.length - 1
    scrollToProject(newIndex)
  }

  const scrollRight = () => {
    const newIndex = currentIndex < completedProjects.length - 1 ? currentIndex + 1 : 0
    scrollToProject(newIndex)
  }

  // Composant d'animation de chargement
  const LoadingAnimation = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
    </div>
  )

  // Composant de barre de progression
  const ProgressBar = () => (
    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
      </div>
    </div>
  )

  return (
    <section id="portfolio" className="py-8 relative overflow-hidden scroll-mt-28">
      
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

        {/* Carrousel des projets */}
        <div className="relative">
          {/* Boutons de navigation */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300"
            aria-label="Projet précédent"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300"
            aria-label="Projet suivant"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Container scrollable */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {completedProjects.map((project, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-500 group overflow-hidden flex-shrink-0 w-80 snap-center ${
                project.featured ? '' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <div className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm ${
                  project.featured ? 'h-64' : 'h-48'
                } w-full group-hover:scale-105 transition-transform duration-500`}
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
                </div>
                
                {/* Badge catégorie */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium text-white shadow-sm">
                  {project.category}
                </div>
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-medium rounded-full">
                    ⭐ Projet vedette
                  </div>
                )}
                
                {/* In Progress badge */}
                {project.inProgress && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    En cours
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
                
                {/* Lien ou statut */}
                {project.inProgress ? (
                  <div className="flex items-center text-blue-400">
                    <div className="flex space-x-1 mr-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm font-medium">Développement en cours</span>
                  </div>
                ) : (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-amber-400 hover:text-amber-300 transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-sm font-medium">Voir le projet</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            ))}
          </div>
          
          {/* Indicateurs de position */}
          <div className="flex justify-center mt-6 space-x-2">
            {completedProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-amber-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Section Projet en cours - Séparée */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Projet <span className="text-gradient">en cours</span>
            </h3>
            <p className="text-gray-300">
              Découvrez notre projet actuel en développement
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-500 group overflow-hidden">
              {/* Image */}
              <div className="relative overflow-hidden">
                <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm h-64 w-full group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: `url(${inProgressProject.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
                </div>
                
                {/* Badge catégorie */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium text-white shadow-sm">
                  {inProgressProject.category}
                </div>
                
                {/* Badge En cours avec animation */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  En cours
                </div>
              </div>
              
              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors duration-300">
                  {inProgressProject.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {inProgressProject.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {inProgressProject.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Barre de progression */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Progression</span>
                    <span className="text-sm text-blue-400 font-medium">75%</span>
                  </div>
                  <ProgressBar />
                </div>
                
                {/* Animation de chargement */}
                <div className="flex items-center text-blue-400">
                  <LoadingAnimation />
                  <span className="ml-3 text-sm font-medium">Développement en cours</span>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
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
