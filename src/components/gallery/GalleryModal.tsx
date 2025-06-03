
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
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
import { GalleryImage } from '@/data/galleryData';

interface GalleryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: GalleryImage[];
  selectedImageIndex: number;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onOpenChange,
  images,
  selectedImageIndex,
}) => {
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    if (api && isOpen) {
      api.scrollTo(selectedImageIndex);
      setCurrent(selectedImageIndex + 1);
    }
  }, [api, selectedImageIndex, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] max-h-[100vh] w-full p-0 bg-black border-0 h-screen sm:h-[95vh] sm:max-w-7xl sm:rounded-lg">
        <DialogTitle className="sr-only">Gallery Image Viewer</DialogTitle>
        <DialogDescription className="sr-only">
          View and navigate through gallery images
        </DialogDescription>
        
        <div className="relative h-full w-full flex flex-col">
          <DialogClose className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black/50 text-white p-2">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <Carousel 
            setApi={setApi}
            className="w-full h-full flex-1"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="h-full">
              {images.map((image, index) => (
                <CarouselItem key={image.id} className="basis-full h-full">
                  <div className="relative w-full h-full bg-black flex flex-col">
                    {/* Image container that takes most of the space */}
                    <div className="flex-1 flex items-center justify-center p-2 sm:p-4 min-h-0">
                      <img 
                        src={image.src} 
                        alt={t(image.altKey)} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    
                    {/* Description container with fixed height */}
                    <div className="flex-shrink-0 p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
                      <h3 className="text-white text-sm sm:text-lg md:text-xl font-sans text-left leading-tight">
                        {t(image.altKey)}
                      </h3>
                    </div>

                    {/* Counter positioned absolutely */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
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
  );
};

export default GalleryModal;
