
import React, { useState } from 'react';

// Gallery images using the uploaded images
const galleryImages = [
  {
    id: 1,
    src: '/lovable-uploads/06ef031e-998e-41b5-a951-2c8ba14df591.png',
    alt: 'Villa Exterior with Pool',
    category: 'exterior'
  },
  {
    id: 2,
    src: '/lovable-uploads/9f7fb5e6-83cd-4297-bf36-c7c208a66403.png',
    alt: 'Pool Area Seating',
    category: 'exterior'
  },
  {
    id: 3,
    src: '/lovable-uploads/17d507de-ba3a-4058-abe3-c10f9cde1650.png',
    alt: 'Pereybere Beach Sunset',
    category: 'location'
  },
  {
    id: 4,
    src: '/lovable-uploads/fe796886-fbef-4626-bb98-2831ba06f4e3.png',
    alt: 'Bedroom with Pool View',
    category: 'bedroom'
  },
  {
    id: 5,
    src: '/lovable-uploads/b20acf9f-79d7-4a12-b87d-ab534f2d939a.png',
    alt: 'Living Room with Pool View',
    category: 'interior'
  },
  {
    id: 6,
    src: '/lovable-uploads/77624a5a-f93f-4f78-bfb8-c6d88cf9d7d1.png',
    alt: 'Modern Kitchen and Dining Area',
    category: 'kitchen'
  },
  {
    id: 7,
    src: '/lovable-uploads/0a540aea-f68a-4d87-b064-23c8a87b6549.png',
    alt: 'Luxury Bathroom with Jacuzzi',
    category: 'bathroom'
  },
  {
    id: 8,
    src: '/lovable-uploads/8d3df2d7-ed3d-4430-9084-a928a3ae4679.png',
    alt: 'Modern Bedroom',
    category: 'bedroom'
  },
  {
    id: 9,
    src: '/lovable-uploads/6e9e28a8-4cd6-431c-9d15-c15ad821f630.png',
    alt: 'Bedroom with Pool Access',
    category: 'bedroom'
  },
  {
    id: 10,
    src: '/lovable-uploads/42ac3b94-9f10-49ef-8238-94f313a1bde6.png',
    alt: 'Second Bedroom',
    category: 'bedroom'
  },
  {
    id: 11,
    src: '/lovable-uploads/abb57903-7d11-459c-9ffe-7005a3f030b6.png',
    alt: 'Pool View',
    category: 'pool'
  },
  {
    id: 12,
    src: '/lovable-uploads/e3a75e0b-1d08-435c-a198-a5bb92cd996e.png',
    alt: 'Garden Area',
    category: 'exterior'
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">Property Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our stunning spaces through our gallery. Each image showcases the luxurious details and amenities of Luxora Villa.
          </p>
          
          {/* Gallery filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'all' 
                  ? 'bg-luxury-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('exterior')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'exterior' 
                  ? 'bg-luxury-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Exterior
            </button>
            <button 
              onClick={() => setFilter('pool')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'pool' 
                  ? 'bg-luxury-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pool
            </button>
            <button 
              onClick={() => setFilter('bedroom')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'bedroom' 
                  ? 'bg-luxury-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bedrooms
            </button>
            <button 
              onClick={() => setFilter('bathroom')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'bathroom' 
                  ? 'bg-luxury-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bathrooms
            </button>
            <button 
              onClick={() => setFilter('kitchen')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'kitchen' 
                  ? 'bg-luxury-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Kitchen
            </button>
            <button 
              onClick={() => setFilter('interior')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'interior' 
                  ? 'bg-luxury-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Interior
            </button>
            <button 
              onClick={() => setFilter('location')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'location' 
                  ? 'bg-luxury-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Location
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          {/* Main selected image */}
          <div className="gallery-main-image h-[500px] animate-fade-in relative rounded-lg overflow-hidden">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <p className="text-white text-lg font-serif">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
        
        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`gallery-thumbnail h-[100px] cursor-pointer ${
                selectedImage.id === image.id ? 'ring-4 ring-luxury-gold' : ''
              }`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
