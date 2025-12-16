
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
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/8b20f933-58f6-481b-a4ee-3858f9644d8b.png')",
        }}
      />
      
      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl text-white font-serif font-bold mb-4">
              {t('hero.mainBrand')}
            </h1>
            <h2 className="text-2xl md:text-3xl text-white font-serif mb-2">
              {t('hero.locationTag')}
            </h2>
            <p className="text-xl text-white mb-8 max-w-md">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#gallery">
                <Button className="bg-luxury-gold text-white font-semibold px-8 py-6 text-lg w-full sm:w-auto transition-all duration-300 ease-out hover:bg-luxury-gold/90 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]">
                  {t('gallery.viewButton')}
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
