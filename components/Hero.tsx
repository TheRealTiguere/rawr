import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Éléments flottants décoratifs */}
      <div className="floating-element top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full animate-float-slow"></div>
      <div className="floating-element top-40 right-20 w-24 h-24 bg-gradient-to-br from-amber-300/15 to-orange-300/15 rounded-full animate-float-fast"></div>
      <div className="floating-element bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-300/18 to-purple-300/18 rounded-full animate-float"></div>
      <div className="floating-element bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-rose-300/12 to-pink-300/12 rounded-full animate-float-slow"></div>
      
      {/* Contenu principal */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-full text-sm text-gray-200 mb-8">
          <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
          Agence web créative et innovante
        </div>
        
        {/* Titre principal */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Créons ensemble votre
          <span className="block text-gradient">présence digitale</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
          Nous transformons vos idées en expériences web exceptionnelles. 
          Design moderne, développement sur mesure, résultats garantis.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <Link href="#contact" className="btn-primary">
            Demander un devis
          </Link>
          <Link href="#portfolio" className="btn-secondary">
            Voir nos réalisations
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">150+</div>
            <div className="text-gray-300">Projets réalisés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">98%</div>
            <div className="text-gray-300">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
            <div className="text-gray-300">Support client</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
