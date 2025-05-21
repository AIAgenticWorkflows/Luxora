
import React from 'react';
import { Bed, Bath, Tv, Wifi, Sun, Utensils } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">Villa Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury living with our premium amenities and carefully designed spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bedrooms */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Bed size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">3 Spacious Bedrooms</h3>
            <p className="text-gray-600">
              Comfortable bedrooms with air conditioning, luxurious linens, and ample storage space.
            </p>
          </div>
          
          {/* Bathrooms */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Bath size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">2 Modern Bathrooms</h3>
            <p className="text-gray-600">
              Elegant bathrooms featuring jacuzzi, premium fixtures, and complimentary toiletries.
            </p>
          </div>
          
          {/* Kitchen */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Utensils size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Fully Equipped Kitchen</h3>
            <p className="text-gray-600">
              Modern kitchen with stove, dishwasher, oven, and an additional grease kitchen for convenience.
            </p>
          </div>
          
          {/* Pool */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Private Pool</h3>
            <p className="text-gray-600">
              Enjoy our private pool with direct access from the bedroom or living room.
            </p>
          </div>
          
          {/* Rooftop */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Rooftop Access</h3>
            <p className="text-gray-600">
              Relax or entertain on our spacious rooftop with beautiful views.
            </p>
          </div>
          
          {/* Living Room */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Tv size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Smart Living Room</h3>
            <p className="text-gray-600">
              Comfortable living area featuring a smart TV and Google Home integration.
            </p>
          </div>
          
          {/* WiFi */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Wifi size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">High-Speed WiFi</h3>
            <p className="text-gray-600">
              Stay connected with complimentary high-speed wireless internet throughout the villa.
            </p>
          </div>
          
          {/* Outdoor Space */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Outdoor Lounge</h3>
            <p className="text-gray-600">
              Beautiful outdoor spaces for relaxation and entertainment.
            </p>
          </div>
          
          {/* Beach Proximity */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="amenity-icon">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Beach Proximity</h3>
            <p className="text-gray-600">
              Just a short walk to the beautiful beaches of Pereybere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
