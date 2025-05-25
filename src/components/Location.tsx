
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Navigation } from 'lucide-react';
import L from 'leaflet';
import { useLanguage } from '@/hooks/useLanguage';

// Fix for default Leaflet icons
const fixLeafletIcon = () => {
  // Fix leaflet's default icon paths
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

const Location = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { t } = useLanguage();
  
  // Updated precise coordinates for Luxora Villa
  const longitude = 57.607427;
  const latitude = -20.003798;

  useEffect(() => {
    fixLeafletIcon();
    setMapLoaded(true);
  }, []);

  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">{t('location.title')}</h2>
            <p className="text-gray-600 mb-6">
              {t('location.description')}
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
                  <h3 className="font-serif font-bold text-lg">{t('location.beach')}</h3>
                  <p className="text-gray-600">{t('location.beachDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-luxury-gold rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">{t('location.shopping.title')}</h3>
                  <p className="text-gray-600">{t('location.shopping.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-luxury-gold rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">{t('location.dining.title')}</h3>
                  <p className="text-gray-600">{t('location.dining.description')}</p>
                </div>
              </div>
            </div>
            
            <a href="https://www.google.com/maps/place/20%C2%B000'13.7%22S+57%C2%B036'26.7%22E/@-20.003798,57.6067819,252m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d-20.003798!4d57.607427" target="_blank" rel="noopener noreferrer">
              <Button className="bg-luxury-blue hover:bg-opacity-90 text-white font-semibold">
                {t('location.mapButton')}
              </Button>
            </a>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="overflow-hidden shadow-xl h-[450px]">
              {mapLoaded ? (
                <MapContainer 
                  center={[latitude, longitude]} 
                  zoom={15} 
                  scrollWheelZoom={false} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[latitude, longitude]}>
                    <Popup>
                      <div className="p-1">
                        <h3 className="font-serif font-bold">{t('location.mapPopup.title')}</h3>
                        <p>{t('location.mapPopup.location')}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="p-6 flex flex-col items-center justify-center h-full bg-gray-50">
                  <Navigation className="h-16 w-16 text-luxury-gold mb-4" />
                  <h3 className="text-2xl font-serif mb-2 text-center">{t('location.mapLoading.title')}</h3>
                  <p className="text-center text-gray-600">{t('location.mapLoading.description')}</p>
                </div>
              )}
            </Card>
            <div className="mt-4 text-center">
              <p className="text-luxury-dark font-serif">{t('location.mapCaption')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
