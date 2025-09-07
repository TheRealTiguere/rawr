'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#services', label: 'Nos Services' },
    { href: '#portfolio', label: 'Réalisations' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-md border-b border-white/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-28">
          {/* Logo RAWR - Image */}
          <button 
            onClick={scrollToTop}
            className="flex items-center group cursor-pointer"
            aria-label="Retour en haut de la page"
          >
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/logo-rawr.png" 
                alt="RAWR Agency Logo" 
                width={220} 
                height={80}
                className="h-16 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
                onError={(e) => {
                  // Fallback en cas d'erreur de chargement de l'image
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'block';
                  }
                }}
              />
              {/* Fallback texte si l'image ne charge pas */}
              <div 
                className="hidden text-4xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors duration-300"
                style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }}
              >
                RAWR
              </div>
            </div>
          </button>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white font-medium transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            <Link
              href="#contact"
              className="btn-primary text-sm"
            >
              Demander un devis
            </Link>
          </div>

          {/* Bouton mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/20 transition-colors duration-300"
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-5 h-0.5 bg-white/80 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}></span>
              <span className={`w-5 h-0.5 bg-white/80 transition-all duration-300 mt-1 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`w-5 h-0.5 bg-white/80 transition-all duration-300 mt-1 ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Menu mobile */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 space-y-4 border-t border-white/20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white/80 hover:text-white font-medium py-2 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4">
              <Link
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
