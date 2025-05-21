
import React from 'react';
import { Bed, BathIcon, Kitchen, Pool, Roof, ArrowRight } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">Villa Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Luxora Villa offers premium amenities and features to ensure your stay is as comfortable and luxurious as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: Bedrooms */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform hover:transform hover:scale-105">
            <div className="amenity-icon">
              <Bed size={30} className="text-luxury-blue" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">3 Spacious Bedrooms</h3>
            <p className="text-gray-600 mb-4">
              Each bedroom features a comfortable king-sized bed, air conditioning, and stunning views of the surroundings.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Master bedroom with en-suite bathroom</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>All rooms with Air conditioning</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Premium bedding and linens</span>
              </li>
            </ul>
          </div>

          {/* Feature 2: Bathrooms */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform hover:transform hover:scale-105">
            <div className="amenity-icon">
              <BathIcon size={30} className="text-luxury-blue" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">2 Modern Bathrooms</h3>
            <p className="text-gray-600 mb-4">
              Luxurious bathrooms with premium fixtures, jacuzzi tub, and walk-in rain showers.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Master bathroom with jacuzzi</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Premium toiletries provided</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Towels and bathrobes included</span>
              </li>
            </ul>
          </div>

          {/* Feature 3: Kitchen */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform hover:transform hover:scale-105">
            <div className="amenity-icon">
              <Kitchen size={30} className="text-luxury-blue" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">Fully Equipped Kitchen</h3>
            <p className="text-gray-600 mb-4">
              Modern kitchen with high-end appliances and everything you need to prepare gourmet meals.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Stove, dishwasher, and oven</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Additional grease kitchen</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Coffee maker and toaster</span>
              </li>
            </ul>
          </div>

          {/* Feature 4: Pool */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform hover:transform hover:scale-105">
            <div className="amenity-icon">
              <Pool size={30} className="text-luxury-blue" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">Private Pool</h3>
            <p className="text-gray-600 mb-4">
              Enjoy our private pool with convenient access from both the bedroom and living room areas.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Direct access from bedroom</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Direct access from living room</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Poolside loungers and umbrella</span>
              </li>
            </ul>
          </div>

          {/* Feature 5: Rooftop */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform hover:transform hover:scale-105">
            <div className="amenity-icon">
              <Roof size={30} className="text-luxury-blue" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">Rooftop Access</h3>
            <p className="text-gray-600 mb-4">
              Relax or entertain guests on our spacious rooftop with panoramic views of the surroundings.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Outdoor seating area</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Perfect for sunset views</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Ideal for entertaining guests</span>
              </li>
            </ul>
          </div>

          {/* Feature 6: Living Room */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform hover:transform hover:scale-105">
            <div className="amenity-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-luxury-blue">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">Smart Living Room</h3>
            <p className="text-gray-600 mb-4">
              Modern and comfortable living space with smart entertainment options for your leisure time.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Smart TV with streaming services</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Google Home assistant</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-luxury-gold mr-2" />
                <span>Comfortable seating arrangement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
