
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('en')}
        className={`${language === 'en' ? 'text-luxury-gold' : 'text-gray-300'} hover:bg-transparent hover:text-luxury-gold p-1`}
      >
        EN
      </Button>
      <span className="text-gray-400">|</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('fr')}
        className={`${language === 'fr' ? 'text-luxury-gold' : 'text-gray-300'} hover:bg-transparent hover:text-luxury-gold p-1`}
      >
        FR
      </Button>
    </div>
  );
};

export default LanguageToggle;
