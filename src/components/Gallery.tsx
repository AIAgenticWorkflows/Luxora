
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { X } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const filteredImages = activeTab === 'all' 
    ? galleryImagesData 
    : galleryImagesData.filter(img => img.category === activeTab);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Set carousel to selected image when modal opens
  useEffect(() => {
    if (api && isModalOpen) {
      api.scrollTo(selectedImageIndex);
      setCurrent(selectedImageIndex + 1);
    }
  }, [api, selectedImageIndex, isModalOpen]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section id="gallery" className="py-12 lg:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-dark mb-4">{t('gallery.mainTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 px-4">
            {t('gallery.mainDescription')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

          <TabsContent value={activeTab} className="mt-0">
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 px-2 sm:px-0">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => handleThumbnailClick(index)}
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
        </Tabs>

        {/* Modal with Carousel */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-6xl w-full p-0 bg-black border-0 h-[90vh] sm:h-auto">
            <div className="relative h-full">
              {/* Close button */}
              <DialogClose className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black/50 text-white p-2">
                <X className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="sr-only">Close</span>
              </DialogClose>

              <Carousel 
                setApi={setApi}
                className="w-full h-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="h-full">
                  {filteredImages.map((image, index) => (
                    <CarouselItem key={image.id} className="basis-full h-full">
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <img 
                          src={image.src} 
                          alt={t(image.altKey)} 
                          className="max-w-full max-h-full object-contain"
                        />
                        
                        {/* Image title */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
                          <h3 className="text-white text-sm sm:text-lg md:text-xl font-serif">
                            {t(image.altKey)}
                          </h3>
                        </div>

                        {/* Image counter */}
                        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                          {current} / {count}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <CarouselPrevious className="left-2 sm:left-4 bg-white/90 hover:bg-white border-0 shadow-lg h-8 w-8 sm:h-10 sm:w-10" />
                <CarouselNext className="right-2 sm:right-4 bg-white/90 hover:bg-white border-0 shadow-lg h-8 w-8 sm:h-10 sm:w-10" />
              </Carousel>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
