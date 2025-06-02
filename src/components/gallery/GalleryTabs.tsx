
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ImageCategory, GalleryImage } from '@/data/galleryData';
import GalleryGrid from './GalleryGrid';

interface GalleryTabsProps {
  activeTab: ImageCategory;
  onTabChange: (value: ImageCategory) => void;
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

const GalleryTabs: React.FC<GalleryTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  images, 
  onImageClick 
}) => {
  const { t } = useLanguage();

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full max-w-sm mx-auto grid-cols-3 mb-6 sm:mb-8">
        <TabsTrigger value="all" className="text-xs sm:text-sm font-medium px-2 sm:px-3">
          {t('gallery.filter.all')}
        </TabsTrigger>
        <TabsTrigger value="exterior" className="text-xs sm:text-sm font-medium px-2 sm:px-3">
          {t('gallery.filter.exterior')}
        </TabsTrigger>
        <TabsTrigger value="interior" className="text-xs sm:text-sm font-medium px-2 sm:px-3">
          {t('gallery.filter.interior')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab} className="mt-0">
        <GalleryGrid 
          images={images} 
          onImageClick={onImageClick} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default GalleryTabs;
