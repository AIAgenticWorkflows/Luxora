
import React from 'react';
import { Bed, Bath, Tv, Wifi, Sun, Utensils } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">{t('features.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('features.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bedrooms */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Bed size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.bedrooms.title')}</h3>
            <p className="text-gray-600">
              {t('features.bedrooms.description')}
            </p>
          </div>
          
          {/* Bathrooms */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Bath size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.bathrooms.title')}</h3>
            <p className="text-gray-600">
              {t('features.bathrooms.description')}
            </p>
          </div>
          
          {/* Kitchen */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Utensils size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.kitchen.title')}</h3>
            <p className="text-gray-600">
              {t('features.kitchen.description')}
            </p>
          </div>
          
          {/* Pool */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.pool.title')}</h3>
            <p className="text-gray-600">
              {t('features.pool.description')}
            </p>
          </div>
          
          {/* Rooftop */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.rooftop.title')}</h3>
            <p className="text-gray-600">
              {t('features.rooftop.description')}
            </p>
          </div>
          
          {/* Living Room */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Tv size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.livingRoom.title')}</h3>
            <p className="text-gray-600">
              {t('features.livingRoom.description')}
            </p>
          </div>
          
          {/* WiFi */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Wifi size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.wifi.title')}</h3>
            <p className="text-gray-600">
              {t('features.wifi.description')}
            </p>
          </div>
          
          {/* Outdoor Space */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.lounge.title')}</h3>
            <p className="text-gray-600">
              {t('features.lounge.description')}
            </p>
          </div>
          
          {/* Beach Proximity */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('features.beachProximity.title')}</h3>
            <p className="text-gray-600">
              {t('features.beachProximity.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
