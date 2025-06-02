
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageCategory } from '@/data/galleryData';

interface GalleryTabsProps {
  activeTab: ImageCategory;
  onTabChange: (value: ImageCategory) => void;
}

const GalleryTabs: React.FC<GalleryTabsProps> = ({ activeTab, onTabChange }) => {
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
    </Tabs>
  );
};

export default GalleryTabs;
