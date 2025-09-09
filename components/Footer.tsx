'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [logoError, setLogoError] = useState(false);

  const quickLinks = [
    { label: "Nos Services", href: "#services" },
    { label: "Réalisations", href: "#portfolio" },
    { label: "Contact", href: "#contact" }
  ];

  const legalLinks = [
    { label: "Mentions légales", href: "/legal" },
    { label: "Politique de confidentialité", href: "/privacy" }
  ];

  const socialLinks = [
    { icon: "💼", label: "LinkedIn", href: "#" },
    { icon: "📷", label: "Instagram", href: "#" }
  ];

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Fond glassmorphism */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border-t border-white/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo et description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              {!logoError ? (
                <img 
                  src="/logo-rawr.png" 
                  alt="RAWR Agency Logo" 
                  width={120} 
                  height={40}
                  className="h-8 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    R
                  </div>
                  <span className="text-2xl font-bold text-white">RAWRAGENCY</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
              Créons ensemble votre présence digitale exceptionnelle.
            </p>
            
            {/* Liens sociaux */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-sm transition-all duration-300 hover:scale-110 hover:border-amber-400/50"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h3>
            
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 relative group text-sm"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="text-gray-300">
                <span className="text-amber-400">📧</span>
                <span className="ml-2">contact@rawragency.fr</span>
              </div>
              <a 
                href="tel:+33185092075" 
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center"
              >
                <span className="text-amber-400">📞</span>
                <span className="ml-2">01 85 09 20 75</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright et liens légaux */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} RAWRAGENCY. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}