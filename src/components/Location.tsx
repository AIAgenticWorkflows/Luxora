
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

const Location = () => {
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  
  // Pereybere, Mauritius coordinates
  const longitude = 57.5871;
  const latitude = -19.9895;
  
  useEffect(() => {
    const loadMapbox = async () => {
      if (mapboxToken && mapContainer.current && !map.current) {
        const mapboxgl = await import('mapbox-gl');
        import('mapbox-gl/dist/mapbox-gl.css');
        
        mapboxgl.default.accessToken = mapboxToken;
        
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitude, latitude],
          zoom: 14
        });
        
        // Add navigation controls
        map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
        
        // Add marker for the villa
        new mapboxgl.default.Marker({ color: "#D4AF37" })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.default.Popup().setHTML("<h3 class='font-serif'>Luxora Villa</h3><p>Pereybere, Mauritius</p>"))
          .addTo(map.current);
      }
    };
    
    loadMapbox();
    
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken]);

  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">Paradise Location</h2>
            <p className="text-gray-600 mb-6">
              Located in the stunning Pereybere area, Luxora Villa offers the perfect blend of privacy and accessibility. Just a 2-minute walk from the famous Pereybere Beach, known for its clear blue waters and white sand.
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
                  <p className="text-gray-600">Just a 2-minute walk to Pereybere Beach, one of the most beautiful beaches in Mauritius.</p>
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
                  <p className="text-gray-600">5 minutes from Super U shopping mall and local markets for fresh produce and souvenirs.</p>
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
                  <p className="text-gray-600">Numerous gourmet restaurants and local eateries within a short distance, offering authentic Mauritian cuisine.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-luxury-gold rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 8a3 3 0 110-6 3 3 0 010 6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Transport</h3>
                  <p className="text-gray-600">Easy access to public transportation and 1 hour drive from Sir Seewoosagur Ramgoolam International Airport.</p>
                </div>
              </div>
            </div>
            
            <a href="https://www.google.com/maps/search/Pereybere+Mauritius/@-19.9895,57.5871,15z" target="_blank" rel="noopener noreferrer">
              <Button className="bg-luxury-blue hover:bg-opacity-90 text-white font-semibold">
                Open in Google Maps
              </Button>
            </a>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="overflow-hidden shadow-xl h-[450px]">
              {mapboxToken ? (
                <div ref={mapContainer} className="w-full h-[450px]" />
              ) : (
                <div className="p-6 flex flex-col items-center justify-center h-full bg-gray-50">
                  <h3 className="text-2xl font-serif mb-4 text-center">Interactive Map</h3>
                  <p className="mb-4 text-center text-gray-600">Enter your Mapbox API key to view the interactive map of Luxora Villa's location.</p>
                  <div className="w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Enter your Mapbox public token"
                      className="w-full p-3 border border-gray-300 rounded mb-3"
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-xs text-center text-gray-500">
                            Where can I find my Mapbox token?
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[250px] text-xs">
                            Create an account at mapbox.com and get your public token from the Account dashboard.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              )}
            </Card>
            <div className="mt-4 text-center">
              <p className="text-luxury-dark font-serif">Luxora Villa, Pereybere, Mauritius</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
