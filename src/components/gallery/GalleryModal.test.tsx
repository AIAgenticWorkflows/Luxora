import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GalleryModal from './GalleryModal';
import { GalleryImage } from '@/data/galleryData';
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // Added
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'; // Added

// Mock useLanguage hook
jest.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => key, // Simple identity function for testing
  }),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  X: (props: any) => <svg data-testid="x-icon" {...props} />,
}));

// Mock ShadCN UI Dialog components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: { children: React.ReactNode, open: boolean }) => open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children, className }: { children: React.ReactNode, className?: string }) => <div data-testid="dialog-content" className={className}>{children}</div>,
  DialogClose: ({ children, className }: { children: React.ReactNode, className?:string }) => <button data-testid="dialog-close" className={className}>{children}</button>,
  DialogTitle: ({ children, className }: { children: React.ReactNode, className?:string }) => <h2 data-testid="dialog-title" className={className}>{children}</h2>,
  DialogDescription: ({ children, className }: { children: React.ReactNode, className?:string }) => <p data-testid="dialog-description" className={className}>{children}</p>,
}));

// Mock ShadCN UI Carousel components
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children, setApi }: { children: React.ReactNode, setApi: any }) => {
    // Mock the setApi call to provide a minimal API
    if (setApi) {
      setApi({
        scrollSnapList: () => [0, 1], // Mock enough snaps for images
        selectedScrollSnap: () => 0,
        on: jest.fn(),
        scrollTo: jest.fn(),
      });
    }
    return <div data-testid="carousel">{children}</div>;
  },
  CarouselContent: ({ children, className }: { children: React.ReactNode, className?: string }) => <div data-testid="carousel-content" className={className}>{children}</div>,
  CarouselItem: ({ children, className }: { children: React.ReactNode, className?: string }) => <div data-testid="carousel-item" className={className}>{children}</div>,
  CarouselNext: ({className}: {className?:string}) => <button data-testid="carousel-next" className={className}>Next</button>,
  CarouselPrevious: ({className}: {className?:string}) => <button data-testid="carousel-previous" className={className}>Previous</button>,
}));


const mockImages: GalleryImage[] = [
  { id: '1', src: 'image1.jpg', altKey: 'alt_image1_description', tags: ['tag1'] },
  { id: '2', src: 'image2.jpg', altKey: 'alt_image2_description', tags: ['tag2'] },
];

describe('GalleryModal', () => {
  beforeEach(() => {
    // Reset window.matchMedia mock for each test if necessary for Dialog/Carousel
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders correctly when open and applies modernized description styles', () => {
    render(
      <GalleryModal
        isOpen={true}
        onOpenChange={jest.fn()}
        images={mockImages}
        selectedImageIndex={0}
      />
    );

    // Check if dialog content is present
    const dialogContent = screen.getByTestId('dialog-content');
    expect(dialogContent).toBeInTheDocument();

    // Since images are mapped into CarouselItems, we expect at least one.
    const carouselItems = screen.getAllByTestId('carousel-item');
    expect(carouselItems.length).toBeGreaterThan(0);

    // Find the description within the first carousel item (or any, assuming structure is consistent)
    // This requires knowing the structure. The description div is a direct child of the carousel item's content div.
    // Let's assume the description is tied to the first image for this test.
    const firstImageDescription = mockImages[0].altKey;

    // The description text is rendered inside an h3, within a div that has the background styles.
    // Let's find all h3s and then check their parent.
    const descriptionTextElement = screen.getByText(firstImageDescription);
    expect(descriptionTextElement).toBeInTheDocument();

    // Check text styling (font-sans, text-left)
    expect(descriptionTextElement.className).toContain('font-sans');
    expect(descriptionTextElement.className).toContain('text-left');
    expect(descriptionTextElement.className).toContain('drop-shadow-md'); // Added: check for new subtle drop shadow
    expect(descriptionTextElement.className).not.toContain('font-serif');
    expect(descriptionTextElement.className).not.toContain('text-center');
    expect(descriptionTextElement.className).not.toContain('drop-shadow-lg'); // Ensure the old heavier drop shadow is not there

    // Check container styling (bg-black/75, backdrop-blur-sm)
    const descriptionContainer = descriptionTextElement.parentElement;
    expect(descriptionContainer).toBeInTheDocument();
    if (descriptionContainer) {
      expect(descriptionContainer.className).toContain('bg-black/75'); // Updated: check for new background opacity
      expect(descriptionContainer.className).toContain('backdrop-blur-sm');
      expect(descriptionContainer.className).not.toContain('bg-gradient-to-t'); // Ensure old gradient is not there
    }

    // Check the image centering container (parent of descriptionContainer and the img tag)
    const imageCenteringContainer = descriptionContainer?.parentElement;
    expect(imageCenteringContainer).toBeInTheDocument();
    if (imageCenteringContainer) {
      expect(imageCenteringContainer.className).toContain('grid');
      expect(imageCenteringContainer.className).toContain('place-items-center');
      expect(imageCenteringContainer.className).not.toContain('flex');
      expect(imageCenteringContainer.className).not.toContain('items-center'); // from flex
      expect(imageCenteringContainer.className).not.toContain('justify-center'); // from flex
      // Also check it has other expected classes to be more specific
      expect(imageCenteringContainer.className).toContain('relative');
      expect(imageCenteringContainer.className).toContain('w-full');
      expect(imageCenteringContainer.className).toContain('h-full');
      expect(imageCenteringContainer.className).toContain('bg-black');
    }

    // Check image count is present (it's sibling to description container)
    // The count is dynamic, so we check for its presence by its structure/styling.
    // Example: "1 / 2"
    // The mock for carousel.api.scrollSnapList() returns [0,1] so count is 2
    // The mock for carousel.api.selectedScrollSnap() returns 0 so current is 1
    const imageCountElement = screen.getByText(`1 / 2`);
    expect(imageCountElement).toBeInTheDocument();
    expect(imageCountElement.className).toContain('bg-black/70'); // Verify its original styling is preserved
  });

  it('is not rendered when isOpen is false', () => {
    render(
      <GalleryModal
        isOpen={false}
        onOpenChange={jest.fn()}
        images={mockImages}
        selectedImageIndex={0}
      />
    );
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
  });
});
