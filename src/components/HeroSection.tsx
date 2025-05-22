
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative h-screen w-full">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/06ef031e-998e-41b5-a951-2c8ba14df591.png')",
        }}
      />
      
      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl text-white font-serif font-bold mb-4">
              Luxora Villa
            </h1>
            <h2 className="text-2xl md:text-3xl text-white font-serif mb-2">
              Pereybere, Mauritius
            </h2>
            <p className="text-xl text-white mb-8 max-w-md">
              Experience luxury living in our stunning modern villa with world-class amenities, just minutes away from beautiful beaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#gallery">
                <Button className="bg-luxury-gold hover:bg-opacity-90 text-white font-semibold px-8 py-6 text-lg w-full sm:w-auto">
                  {t('gallery.viewButton')}
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-luxury-dark px-8 py-6 text-lg w-full sm:w-auto">
                  {t('hero.cta')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#gallery" className="text-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
