
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Gallery from '../components/Gallery';
import Features from '../components/Features';
import Location from '../components/Location';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Gallery />
      <Features />
      <Location />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
