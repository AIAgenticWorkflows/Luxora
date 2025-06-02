
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { galleryImagesData, ImageCategory } from '@/data/galleryData';
import GalleryTabs from './gallery/GalleryTabs';
import GalleryModal from './gallery/GalleryModal';

const Gallery = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ImageCategory>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filteredImages = activeTab === 'all' 
    ? galleryImagesData 
    : galleryImagesData.filter(img => img.category === activeTab);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ImageCategory);
  };

  return (
    <section id="gallery" className="py-6 sm:py-8 lg:py-16 bg-white min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-luxury-dark mb-3 sm:mb-4">
            {t('gallery.mainTitle')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 text-sm sm:text-base">
            {t('gallery.mainDescription')}
          </p>
        </div>

        <GalleryTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          images={filteredImages}
          onImageClick={handleThumbnailClick}
        />

        <GalleryModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          images={filteredImages}
          selectedImageIndex={selectedImageIndex}
        />
      </div>
    </section>
  );
};

export default Gallery;
