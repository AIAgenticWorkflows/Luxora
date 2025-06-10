
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    const locationSection = document.getElementById('location');
    if (locationSection) {
      locationSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navbarClasses = `
    fixed w-full z-50 transition-all duration-300
    ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}
  `;
  
  const linkClasses = `
    transition-colors hover:text-luxury-gold
    ${isScrolled ? 'text-luxury-dark' : 'text-white'}
  `;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="font-serif text-2xl font-bold">
            <span className={isScrolled ? 'text-luxury-dark' : 'text-white'}>{t('nav.logo.part1')}</span>
            <span className="text-luxury-gold">{t('nav.logo.part2')}</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className={linkClasses}>{t('nav.home')}</a>
            <a href="#gallery" className={linkClasses}>{t('nav.gallery')}</a>
            <a href="#features" className={linkClasses}>{t('nav.features')}</a>
            <a href="#location" className={linkClasses}>{t('nav.location')}</a>
            <LanguageToggle />
            <Button 
              className="bg-luxury-gold text-white hover:bg-opacity-90"
              onClick={handleBookNow}
            >
              {t('hero.cta')}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-luxury-dark' : 'text-white'} focus:outline-none`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg mt-2 shadow-lg p-4 absolute left-4 right-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-luxury-dark hover:text-luxury-gold" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</a>
              <a href="#gallery" className="text-luxury-dark hover:text-luxury-gold" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.gallery')}</a>
              <a href="#features" className="text-luxury-dark hover:text-luxury-gold" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.features')}</a>
              <a href="#location" className="text-luxury-dark hover:text-luxury-gold" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.location')}</a>
              <div className="pt-2">
                <LanguageToggle />
              </div>
              <Button 
                className="bg-luxury-gold text-white hover:bg-opacity-90 mt-2" 
                onClick={handleBookNow}
              >
                {t('hero.cta')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
