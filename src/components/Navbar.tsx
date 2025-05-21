
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`font-serif font-bold text-2xl ${scrolled ? 'text-luxury-blue' : 'text-white'}`}>
            Luxora Villa
          </h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#gallery" className={`transition-colors ${scrolled ? 'text-gray-700' : 'text-white'} hover:text-luxury-gold`}>
            Gallery
          </a>
          <a href="#features" className={`transition-colors ${scrolled ? 'text-gray-700' : 'text-white'} hover:text-luxury-gold`}>
            Features
          </a>
          <a href="#location" className={`transition-colors ${scrolled ? 'text-gray-700' : 'text-white'} hover:text-luxury-gold`}>
            Location
          </a>
          <a href="#contact" className={`transition-colors ${scrolled ? 'text-gray-700' : 'text-white'} hover:text-luxury-gold`}>
            Contact
          </a>
        </div>
        <Button className="bg-luxury-gold hover:bg-opacity-90 text-white font-semibold">
          Book Now
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
