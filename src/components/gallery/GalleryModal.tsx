
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
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
import { GalleryImage } from '@/data/galleryData';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  selectedImageIndex: number;
}

const GalleryModal = ({ isOpen, onClose, images, selectedImageIndex }: GalleryModalProps) => {
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

  // Set carousel to selected image when modal opens
  useEffect(() => {
    if (api && isOpen) {
      api.scrollTo(selectedImageIndex);
      setCurrent(selectedImageIndex + 1);
    }
  }, [api, selectedImageIndex, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              {images.map((image, index) => (
                <CarouselItem key={image.id} className="basis-full h-full">
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <img 
                      src={image.src} 
                      alt={t(image.altKey)} 
                      className="max-w-full max-h-full object-contain"
                    />
                    
                    {/* Image title with improved styling */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="max-w-4xl mx-auto">
                        <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-medium leading-tight text-center drop-shadow-lg">
                          {t(image.altKey)}
                        </h3>
                      </div>
                    </div>

                    {/* Image counter with improved styling */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/70 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20">
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
