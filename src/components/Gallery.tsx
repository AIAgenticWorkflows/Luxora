
import React, { useState } from 'react';

// Gallery images - in a real project, these would come from a CMS or backend
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1500&q=80',
    alt: 'Luxora Villa Exterior',
    category: 'exterior'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1500&q=80',
    alt: 'Villa Pool Area',
    category: 'pool'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1500&q=80',
    alt: 'Master Bedroom',
    category: 'bedroom'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1500&q=80',
    alt: 'Modern Kitchen',
    category: 'kitchen'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1500&q=80',
    alt: 'Luxury Bathroom',
    category: 'bathroom'
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
          </div>
        </div>
        
        <div className="mb-8">
          {/* Main selected image */}
          <div className="gallery-main-image h-[500px] animate-fade-in">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`gallery-thumbnail h-[150px] ${
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
