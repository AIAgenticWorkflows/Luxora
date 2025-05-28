
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { TabsContent } from '@/components/ui/tabs';
import { GalleryImage, GalleryCategory } from '@/data/galleryData';

interface GalleryGridProps {
  activeTab: GalleryCategory;
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

const GalleryGrid = ({ activeTab, images, onImageClick }: GalleryGridProps) => {
  const { t } = useLanguage();

  return (
    <TabsContent value={activeTab} className="mt-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 px-2 sm:px-0">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => onImageClick(index)}
            className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-blue group"
          >
            <img 
              src={image.src} 
              alt={t(image.altKey)} 
              className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          </button>
        ))}
      </div>
    </TabsContent>
  );
};

export default GalleryGrid;
