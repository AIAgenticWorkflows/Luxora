
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const filteredImages = activeTab === 'all' 
    ? galleryImagesData 
    : galleryImagesData.filter(img => img.category === activeTab);

  useEffect(() => {
    if (!api) {
      console.log('API not available yet');
      return;
    }

    console.log('Setting up carousel API');
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      const newCurrent = api.selectedScrollSnap();
      console.log('Carousel select event - new current:', newCurrent);
      setCurrent(newCurrent);
    });
  }, [api]);

  // Reset carousel when tab changes
  useEffect(() => {
    if (api) {
      console.log('Resetting carousel for tab change');
      api.scrollTo(0);
      setCurrent(0);
    }
  }, [activeTab, api]);

  const handleThumbnailClick = (index: number) => {
    console.log('Thumbnail clicked - index:', index, 'current api:', !!api);
    if (api) {
      console.log('Scrolling to index:', index);
      api.scrollTo(index);
      // Force update the current state immediately
      setCurrent(index);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
            {/* Desktop layout: side by side */}
            <div className="hidden lg:flex gap-6 max-w-7xl mx-auto">
              {/* Main carousel - left side */}
              <div className="flex-1">
                <Carousel 
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {filteredImages.map((image, index) => (
                      <CarouselItem key={image.id} className="basis-full">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black shadow-2xl">
                          <img 
                            src={image.src} 
                            alt={t(image.altKey)} 
                            className="w-full h-full object-cover"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-white text-lg md:text-xl font-serif">
                              {t(image.altKey)}
                            </h3>
                          </div>

                          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {current + 1} / {count}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
                  <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
                </Carousel>
              </div>

              {/* Thumbnails - right side */}
              <div className="w-48">
                <ScrollArea className="h-[500px]">
                  <div className="grid grid-cols-2 gap-2 pr-2">
                    {filteredImages.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-blue ${
                          current === index
                            ? 'ring-2 ring-luxury-gold shadow-lg scale-105' 
                            : 'hover:ring-2 hover:ring-luxury-blue/50'
                        }`}
                      >
                        <img 
                          src={image.src} 
                          alt={t(image.altKey)} 
                          className="w-full h-full object-cover transition-all duration-300 hover:brightness-110"
                        />
                        {current === index && (
                          <div className="absolute inset-0 bg-luxury-gold/20" />
                        )}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300" />
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Mobile/Tablet layout: stacked */}
            <div className="lg:hidden">
              <Carousel 
                setApi={setApi}
                className="w-full max-w-5xl mx-auto"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {filteredImages.map((image, index) => (
                    <CarouselItem key={image.id} className="basis-full">
                      <div className="relative aspect-[16/10] md:aspect-[20/10] rounded-xl overflow-hidden bg-black shadow-2xl">
                        <img 
                          src={image.src} 
                          alt={t(image.altKey)} 
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-white text-lg md:text-xl font-serif">
                            {t(image.altKey)}
                          </h3>
                        </div>

                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {current + 1} / {count}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
                <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
              </Carousel>

              {/* Mobile thumbnails below */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4 mt-8 px-2">
                {filteredImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-blue min-h-[80px] md:min-h-[100px] ${
                      current === index
                        ? 'ring-3 ring-luxury-gold shadow-lg scale-105' 
                        : 'hover:ring-2 hover:ring-luxury-blue/50'
                    }`}
                  >
                    <img 
                      src={image.src} 
                      alt={t(image.altKey)} 
                      className="w-full h-full object-cover transition-all duration-300 hover:brightness-110"
                    />
                    {current === index && (
                      <div className="absolute inset-0 bg-luxury-gold/20" />
                    )}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Gallery;
