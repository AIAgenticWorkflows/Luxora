
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Gallery from '../components/Gallery';
import Features from '../components/Features';
import Location from '../components/Location';
import Footer from '../components/Footer';
import LuxoraAgent from '../components/LuxoraAgent';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Gallery />
      <Features />
      <Location />
      <Footer />
      <LuxoraAgent />
    </div>
  );
};

export default Index;
