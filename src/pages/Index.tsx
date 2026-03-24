
import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Gallery from '../components/Gallery';

const Features = lazy(() => import('../components/Features'));
const Location = lazy(() => import('../components/Location'));
const Footer = lazy(() => import('../components/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <Gallery />
        <Suspense fallback={<div className="py-20" />}>
          <Features />
        </Suspense>
        <Suspense fallback={<div className="py-20" />}>
          <Location />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
