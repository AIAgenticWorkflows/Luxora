import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const reviews = [
  {
    name: 'Hurley',
    country: 'United States',
    quote: "The location is somewhat remote, where you get a calm, clear night's rest, but also close enough to the center of Grand Baie to where getting food and hanging out is really easy to do.",
  },
  {
    name: 'Akshay',
    country: 'Mauritius',
    quote: 'Brand new villa with modern amenities and fully equipped. Ideal for both short and long term stays. Neighborhood is very quiet and very nice. Two parking spaces available within the property. The villa is well maintained and was clean.',
  },
  {
    name: 'Shweta',
    country: 'Mauritius',
    quote: 'The host Nisha was very kind and gave us a welcoming like in hotel check-in.',
  },
  {
    name: 'Chutkai',
    country: 'Mauritius',
    quote: 'Very comfortable and clean. Kids like the pool very much.',
  },
  {
    name: 'Lamlac',
    country: 'Reunion',
    quote: 'Very quiet, restful residence and the villa is beautiful and very comfortable. High-end appliances and materials. Comfortable bedding. A little gem. We were warmly welcomed by the host.',
  },
];

const BOOKING_URL = 'https://www.booking.com/hotel/mu/3-bedrooms-villa-in-pereybere.en-gb.html';

const Reviews = () => {
  const { t, language } = useLanguage();

  return (
    <section id="reviews" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-3">
            {t('reviews.title')}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-luxury-gold text-luxury-gold" />
              ))}
            </div>
            <span className="text-2xl font-serif font-bold text-luxury-dark">9.3/10</span>
          </div>
          <p className="text-gray-600">
            {t('reviews.subtitle')}{' '}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxury-gold underline hover:no-underline"
            >
              Booking.com
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <Card key={r.name} className="shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-3" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-luxury-gold text-luxury-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-4">"{r.quote}"</blockquote>
                <footer className="text-sm">
                  <span className="font-semibold text-luxury-dark">{r.name}</span>
                  <span className="text-gray-500"> · {r.country}</span>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-luxury-gold font-semibold hover:underline"
          >
            {language === 'fr' ? 'Lire tous les avis sur Booking.com →' : 'Read all reviews on Booking.com →'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
