
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
      <DialogContent className="max-w-5xl w-[95vw] h-[95vh] p-0 bg-black border-0">
        <DialogTitle className="sr-only">Gallery Image Viewer</DialogTitle>
        <DialogDescription className="sr-only">
          View and navigate through gallery images
        </DialogDescription>
        
        <div className="relative h-full w-full">
          <DialogClose className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black/50 text-white p-2">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
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
              {images.map((image) => (
                <CarouselItem key={image.id} className="basis-full h-full">
                  <div className="relative w-full h-full bg-black flex flex-col">
                    <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-8 sm:py-10">
                      <img 
                        src={image.src} 
                        alt={t(image.altKey)} 
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                      />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <h3 className="text-white text-sm sm:text-base font-sans">
                        {t(image.altKey)}
                      </h3>
                    </div>

                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {current} / {count}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg h-10 w-10 sm:h-12 sm:w-12" />
            <CarouselNext className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg h-10 w-10 sm:h-12 sm:w-12" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
