
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

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
  const [modalCarouselApi, setModalCarouselApi] = useState<CarouselApi>();
  const [currentModal, setCurrentModal] = useState(0);
  const [countModal, setCountModal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages = activeTab === 'all' 
    ? galleryImagesData 
    : galleryImagesData.filter(img => img.category === activeTab);

  useEffect(() => {
    if (!modalCarouselApi) {
      return;
    }

    setCountModal(modalCarouselApi.scrollSnapList().length);
    setCurrentModal(modalCarouselApi.selectedScrollSnap() + 1);

    modalCarouselApi.on('select', () => {
      setCurrentModal(modalCarouselApi.selectedScrollSnap() + 1);
    });
  }, [modalCarouselApi]);

  // Reset carousel when tab changes for the main view (if it were still active)
  // For modal, scrolling is handled when it opens
  // useEffect(() => {
  //   if (modalCarouselApi) { // This would apply if a main carousel was still present
  //     modalCarouselApi.scrollTo(0);
  //     setCurrentModal(1);
  //   }
  // }, [activeTab, modalCarouselApi]);

  // Scroll to selected image when modal opens
  useEffect(() => {
    if (isModalOpen && modalCarouselApi && selectedImageIndex !== null) {
      modalCarouselApi.scrollTo(selectedImageIndex, true); // true for instant scroll
      setCurrentModal(selectedImageIndex + 1); // Update current count immediately
    }
  }, [isModalOpen, modalCarouselApi, selectedImageIndex]);
  
  return (
    <section id="gallery" className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">{t('gallery.mainTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t('gallery.mainDescription')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="all" className="text-sm font-medium">
              {t('gallery.filter.all')}
            </TabsTrigger>
            <TabsTrigger value="exterior" className="text-sm font-medium">
              {t('gallery.filter.exterior')}
            </TabsTrigger>
            <TabsTrigger value="interior" className="text-sm font-medium">
              {t('gallery.filter.interior')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 mt-4 lg:mt-6 px-2">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsModalOpen(true);
                  }}
                  className="relative aspect-square rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-blue min-h-[80px] md:min-h-[100px] hover:ring-2 hover:ring-luxury-blue/50"
                >
                  <img 
                    src={image.src} 
                    alt={t(image.altKey)} 
                    className="w-full h-full object-cover transition-all duration-300 hover:brightness-110"
                  />
                  {/* Removed conditional styling based on 'current' state */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Modal for Image Viewing */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="sm:max-w-3xl lg:max-w-5xl p-0 border-0 bg-transparent shadow-2xl">
                <Carousel 
                  setApi={setModalCarouselApi}
                  className="w-full" // Carousel takes full width of DialogContent
                  opts={{
                    align: "start",
                    loop: true,
                    startIndex: selectedImageIndex ?? 0, // Start at selected image
                  }}
                >
                  <CarouselContent>
                    {filteredImages.map((image) => (
                      <CarouselItem key={image.id} className="basis-full">
                        <div className="relative aspect-[16/10] md:aspect-[18/10] lg:aspect-[20/9] rounded-lg overflow-hidden bg-black">
                          <img 
                            src={image.src} 
                            alt={t(image.altKey)} 
                            className="w-full h-full object-contain" // Use object-contain to see full image
                          />
                          
                          {/* Gradient overlay for better text readability on title (optional) */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                          
                          {/* Image title */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <h3 className="text-white text-base md:text-lg font-serif drop-shadow-md">
                              {t(image.altKey)}
                            </h3>
                          </div>

                          {/* Image counter */}
                          {countModal > 0 && (
                            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                              {currentModal} / {countModal}
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {filteredImages.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-luxury-dark border-0 shadow-lg h-8 w-8 md:h-10 md:w-10" />
                      <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-luxury-dark border-0 shadow-lg h-8 w-8 md:h-10 md:w-10" />
                    </>
                  )}
                </Carousel>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Gallery;
