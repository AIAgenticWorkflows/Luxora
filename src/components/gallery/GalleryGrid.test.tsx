import React from 'react';
import { render, screen } from '@testing-library/react';
import GalleryGrid from './GalleryGrid';
import { GalleryImage } from '@/data/galleryData';

// Mock useLanguage hook
jest.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => key, // Simple identity function for testing
  }),
}));

const mockImages: GalleryImage[] = [
  { id: '1', src: 'image1.jpg', altKey: 'alt_image1', tags: ['tag1'] },
  { id: '2', src: 'image2.jpg', altKey: 'alt_image2', tags: ['tag2'] },
];

describe('GalleryGrid', () => {
  it('renders images and applies responsive classes correctly', () => {
    render(<GalleryGrid images={mockImages} onImageClick={jest.fn()} />);

    const imageButtons = screen.getAllByRole('button');
    expect(imageButtons.length).toBe(mockImages.length);

    imageButtons.forEach((button, index) => {
      // Check button classes: no 'aspect-square' by default, but 'sm:aspect-square' should be present
      // Note: RTL and JSDOM won't compute styles based on breakpoints.
      // We check for the presence of the classes that *would* apply at different breakpoints.
      expect(button.className).not.toMatch(/\baspect-square\b(?![:-])/); // no plain 'aspect-square'
      expect(button.className).toContain('sm:aspect-square');
      expect(button.className).toContain('w-full');


      const imgElement = button.querySelector('img');
      expect(imgElement).toBeInTheDocument();
      if (imgElement) {
        // Check image classes: 'object-contain' by default, 'sm:object-cover' for larger screens
        expect(imgElement.className).toContain('object-contain');
        expect(imgElement.className).toContain('sm:object-cover');
        expect(imgElement.className).toContain('w-full');
        expect(imgElement.className).toContain('h-full');
        expect(imgElement.alt).toBe(mockImages[index].altKey);
        expect(imgElement.src).toContain(mockImages[index].src);
      }
    });
  });

  it('calls onImageClick when an image is clicked', () => {
    const mockOnImageClick = jest.fn();
    render(<GalleryGrid images={mockImages} onImageClick={mockOnImageClick} />);

    const imageButtons = screen.getAllByRole('button');
    imageButtons[0].click();
    expect(mockOnImageClick).toHaveBeenCalledWith(0);

    imageButtons[1].click();
    expect(mockOnImageClick).toHaveBeenCalledWith(1);
  });

  it('applies items-start to the grid container for mobile layout', () => {
    const { container } = render(<GalleryGrid images={mockImages} onImageClick={jest.fn()} />);

    // The GalleryGrid component renders a div that is the grid container.
    // This div is the first child of the testing library's render container.
    const gridContainer = container.firstChild;
    expect(gridContainer).toBeInTheDocument();

    if (gridContainer instanceof HTMLElement) {
      expect(gridContainer.className).toContain('items-start');
      // Check for other essential grid classes to ensure we have the correct element
      expect(gridContainer.className).toContain('grid');
      expect(gridContainer.className).toContain('grid-cols-2');
    } else {
      // Fail the test if container.firstChild is not an HTMLElement
      throw new Error('Grid container not found or not an HTMLElement');
    }
  });
});
