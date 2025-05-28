
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GalleryCategory } from '@/data/galleryData';

interface GalleryTabsProps {
  activeTab: GalleryCategory;
  onTabChange: (tab: GalleryCategory) => void;
}

const GalleryTabs = ({ activeTab, onTabChange }: GalleryTabsProps) => {
  const { t } = useLanguage();

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
        <TabsTrigger value="all" className="text-xs sm:text-sm font-medium">
          {t('gallery.filter.all')}
        </TabsTrigger>
        <TabsTrigger value="exterior" className="text-xs sm:text-sm font-medium">
          {t('gallery.filter.exterior')}
        </TabsTrigger>
        <TabsTrigger value="interior" className="text-xs sm:text-sm font-medium">
          {t('gallery.filter.interior')}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default GalleryTabs;
