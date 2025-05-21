
import React from 'react';
import { Button } from "@/components/ui/button";

const Location = () => {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">Paradise Location</h2>
            <p className="text-gray-600 mb-6">
              Located in the stunning Pereybere area, Luxora Villa offers the perfect blend of privacy and accessibility. Enjoy proximity to beautiful beaches, local attractions, and essential conveniences.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-luxury-gold rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Beachfront Access</h3>
                  <p className="text-gray-600">Just a 5-minute walk to Pereybere Beach, one of the most beautiful beaches in Mauritius.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-luxury-gold rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Local Shopping</h3>
                  <p className="text-gray-600">Convenient access to local markets, supermarkets, and shopping centers.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-luxury-gold rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Restaurants & Dining</h3>
                  <p className="text-gray-600">Numerous gourmet restaurants and local eateries within a short distance.</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-luxury-blue hover:bg-opacity-90 text-white font-semibold">
              View on Map
            </Button>
          </div>
          
          <div className="lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              {/* This would be replaced with an actual map in a real implementation */}
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1500&q=80" 
                  alt="Luxora Villa Location" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-luxury-gold rounded-full h-8 w-8 animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full h-4 w-4"></div>
                </div>
              </div>
              <div className="bg-white p-4">
                <p className="font-serif">Luxora Villa, Pereybere, Mauritius</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
