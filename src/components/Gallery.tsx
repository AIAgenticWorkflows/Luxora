
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

// Gallery images using the uploaded images
const galleryImagesData = [
  {
    id: 1,
    src: '/lovable-uploads/06ef031e-998e-41b5-a951-2c8ba14df591.png',
    altKey: 'gallery.imageAlt.villaExteriorPool',
    category: 'exterior'
  },
  {
    id: 2,
    src: '/lovable-uploads/9f7fb5e6-83cd-4297-bf36-c7c208a66403.png',
    altKey: 'gallery.imageAlt.poolAreaSeating',
    category: 'exterior'
  },
  {
    id: 3,
    src: '/lovable-uploads/17d507de-ba3a-4058-abe3-c10f9cde1650.png',
    altKey: 'gallery.imageAlt.pereybereSunset',
    category: 'exterior'
  },
  {
    id: 4,
    src: '/lovable-uploads/fe796886-fbef-4626-bb98-2831ba06f4e3.png',
    altKey: 'gallery.imageAlt.bedroomPoolView',
    category: 'interior'
  },
  {
    id: 5,
    src: '/lovable-uploads/b20acf9f-79d7-4a12-b87d-ab534f2d939a.png',
    altKey: 'gallery.imageAlt.livingRoomPoolView',
    category: 'interior'
  },
  {
    id: 6,
    src: '/lovable-uploads/77624a5a-f93f-4f78-bfb8-c6d88cf9d7d1.png',
    altKey: 'gallery.imageAlt.modernKitchenDining',
    category: 'interior'
  },
  {
    id: 7,
    src: '/lovable-uploads/0a540aea-f68a-4d87-b064-23c8a87b6549.png',
    altKey: 'gallery.imageAlt.luxuryBathroomJacuzzi',
    category: 'interior'
  },
  {
    id: 8,
    src: '/lovable-uploads/8d3df2d7-ed3d-4430-9084-a928a3ae4679.png',
    altKey: 'gallery.imageAlt.modernBedroom',
    category: 'interior'
  },
  {
    id: 9,
    src: '/lovable-uploads/6e9e28a8-4cd6-431c-9d15-c15ad821f630.png',
    altKey: 'gallery.imageAlt.bedroomPoolAccess',
    category: 'interior'
  },
  {
    id: 10,
    src: '/lovable-uploads/42ac3b94-9f10-49ef-8238-94f313a1bde6.png',
    altKey: 'gallery.imageAlt.secondBedroom',
    category: 'interior'
  },
  {
    id: 11,
    src: '/lovable-uploads/abb57903-7d11-459c-9ffe-7005a3f030b6.png',
    altKey: 'gallery.imageAlt.poolView',
    category: 'exterior'
  },
  {
    id: 12,
    src: '/lovable-uploads/e3a75e0b-1d08-435c-a198-a5bb92cd996e.png',
    altKey: 'gallery.imageAlt.gardenArea',
    category: 'exterior'
  }
];

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(galleryImagesData[0]);
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? galleryImagesData 
    : galleryImagesData.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">{t('gallery.mainTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t('gallery.mainDescription')}
          </p>
          
          {/* Simplified Gallery filters */}
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full transition-all font-medium ${
                filter === 'all' 
                  ? 'bg-luxury-blue text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('gallery.filter.all')}
            </button>
            <button 
              onClick={() => setFilter('exterior')}
              className={`px-6 py-3 rounded-full transition-all font-medium ${
                filter === 'exterior' 
                  ? 'bg-luxury-blue text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('gallery.filter.exterior')}
            </button>
            <button 
              onClick={() => setFilter('interior')}
              className={`px-6 py-3 rounded-full transition-all font-medium ${
                filter === 'interior' 
                  ? 'bg-luxury-blue text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('gallery.filter.interior')}
            </button>
          </div>
        </div>
        
        {/* Main selected image - larger and more prominent */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black">
            <img 
              src={selectedImage.src} 
              alt={t(selectedImage.altKey)} 
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white text-lg md:text-xl font-serif">{t(selectedImage.altKey)}</p>
            </div>
          </div>
        </div>
        
        {/* Modern responsive grid for thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedImage.id === image.id 
                  ? 'ring-4 ring-luxury-gold shadow-xl scale-105' 
                  : 'hover:ring-2 hover:ring-luxury-blue/50'
              }`}
            >
              <div className="aspect-square relative">
                <img 
                  src={image.src} 
                  alt={t(image.altKey)} 
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                {selectedImage.id === image.id && (
                  <div className="absolute inset-0 bg-luxury-gold/20" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Image counter */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length} images
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
