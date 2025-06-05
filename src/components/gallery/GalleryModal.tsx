
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
      <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 bg-black border-0 rounded-lg">
        <DialogTitle className="sr-only">Gallery Image Viewer</DialogTitle>
        <DialogDescription className="sr-only">
          View and navigate through gallery images
        </DialogDescription>
        
        <div className="relative h-full w-full">
          <DialogClose className="absolute top-4 right-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black/50 text-white p-2">
            <X className="h-6 w-6" />
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
                  <div className="relative w-full h-full bg-black flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-4 pb-20 min-h-0">
                      <img 
                        src={image.src} 
                        alt={t(image.altKey)} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent min-h-20">
                      <h3 className="text-white text-lg font-sans text-left leading-tight mb-2">
                        {t(image.altKey)}
                      </h3>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      {current} / {count}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg h-12 w-12 z-40" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg h-12 w-12 z-40" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
