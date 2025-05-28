
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { galleryImagesData, GalleryCategory } from '@/data/galleryData';
import GalleryTabs from './gallery/GalleryTabs';
import GalleryGrid from './gallery/GalleryGrid';
import GalleryModal from './gallery/GalleryModal';

const Gallery = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<GalleryCategory>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filteredImages = activeTab === 'all' 
    ? galleryImagesData 
    : galleryImagesData.filter(img => img.category === activeTab);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as GalleryCategory);
  };

  return (
    <section id="gallery" className="py-12 lg:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-dark mb-4">
            {t('gallery.mainTitle')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 px-4">
            {t('gallery.mainDescription')}
          </p>
        </div>

        <GalleryTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <GalleryGrid 
          activeTab={activeTab} 
          images={filteredImages} 
          onImageClick={handleThumbnailClick} 
        />

        <GalleryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          images={filteredImages}
          selectedImageIndex={selectedImageIndex}
        />
      </div>
    </section>
  );
};

export default Gallery;
