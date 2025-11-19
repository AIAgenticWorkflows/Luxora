
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { GalleryImage } from '@/data/galleryData';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full auto-rows-[280px]">
      {images.map((image, index) => (
        <button
          key={image.id}
          onClick={() => onImageClick(index)}
          className="relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-luxury-blue group w-full h-full"
        >
          <img 
            src={image.src} 
            alt={t(image.altKey)} 
            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        </button>
      ))}
    </div>
  );
};

export default GalleryGrid;
