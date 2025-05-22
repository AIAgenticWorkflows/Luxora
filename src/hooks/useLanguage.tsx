
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.features': 'Features',
    'nav.location': 'Location',
    'nav.contact': 'Contact',
    'nav.language': 'Language',
    'nav.logo.part1': 'Luxora',
    'nav.logo.part2': ' Villa',
    
    // Hero
    'hero.title': 'Experience Luxury in Paradise',
    'hero.subtitle': 'Exclusive villa in Pereybere, Mauritius',
    'hero.cta': 'Book Now',
    'hero.description': 'Experience luxury living in our stunning modern villa with world-class amenities, just minutes away from beautiful beaches.',
    'hero.mainBrand': 'Luxora Villa',
    'hero.locationTag': 'Pereybere, Mauritius',
    
    // Gallery
    'gallery.title': 'Explore Our Villa',
    'gallery.description': 'Experience the luxury and comfort of our stunning modern villa',
    'gallery.viewButton': 'View Gallery',
    'gallery.mainTitle': 'Property Gallery',
    'gallery.mainDescription': 'Explore our stunning spaces through our gallery. Each image showcases the luxurious details and amenities of Luxora Villa.',
    'gallery.filter.all': 'All',
    'gallery.filter.exterior': 'Exterior',
    'gallery.filter.pool': 'Pool',
    'gallery.filter.bedrooms': 'Bedrooms',
    'gallery.filter.bathrooms': 'Bathrooms',
    'gallery.filter.kitchen': 'Kitchen',
    'gallery.filter.interior': 'Interior',
    'gallery.filter.location': 'Location',
    'gallery.imageAlt.villaExteriorPool': 'Villa Exterior with Pool',
    'gallery.imageAlt.poolAreaSeating': 'Pool Area Seating',
    'gallery.imageAlt.pereybereSunset': 'Pereybere Beach Sunset',
    'gallery.imageAlt.bedroomPoolView': 'Bedroom with Pool View',
    'gallery.imageAlt.livingRoomPoolView': 'Living Room with Pool View',
    'gallery.imageAlt.modernKitchenDining': 'Modern Kitchen and Dining Area',
    'gallery.imageAlt.luxuryBathroomJacuzzi': 'Luxury Bathroom with Jacuzzi',
    'gallery.imageAlt.modernBedroom': 'Modern Bedroom',
    'gallery.imageAlt.bedroomPoolAccess': 'Bedroom with Pool Access',
    'gallery.imageAlt.secondBedroom': 'Second Bedroom',
    'gallery.imageAlt.poolView': 'Pool View',
    'gallery.imageAlt.gardenArea': 'Garden Area',
    
    // Features
    'features.title': 'Villa Features',
    'features.description': 'Experience luxury living with our premium amenities and carefully designed spaces.',
    'features.bedrooms.title': '3 Spacious Bedrooms',
    'features.bedrooms.description': 'Comfortable bedrooms with air conditioning, luxurious linens, and ample storage space.',
    'features.bathrooms.title': '2 Modern Bathrooms',
    'features.bathrooms.description': 'Elegant bathrooms featuring jacuzzi, premium fixtures, and complimentary toiletries.',
    'features.kitchen.title': 'Fully Equipped Kitchen',
    'features.kitchen.description': 'Modern kitchen with stove, dishwasher, oven, and an additional grease kitchen for convenience.',
    'features.pool.title': 'Private Pool',
    'features.pool.description': 'Enjoy our private pool with direct access from the bedroom or living room.',
    'features.rooftop.title': 'Rooftop Access',
    'features.rooftop.description': 'Relax or entertain on our spacious rooftop with beautiful views.',
    'features.livingRoom.title': 'Smart Living Room',
    'features.livingRoom.description': 'Comfortable living area featuring a smart TV and Google Home integration.',
    'features.wifi.title': 'High-Speed WiFi',
    'features.wifi.description': 'Stay connected with complimentary high-speed wireless internet throughout the villa.',
    'features.lounge.title': 'Outdoor Lounge',
    'features.lounge.description': 'Beautiful outdoor spaces for relaxation and entertainment.',
    'features.beachProximity.title': 'Beach Proximity',
    'features.beachProximity.description': 'Just 5 minutes by car to the beautiful beaches of Pereybere.',
    
    // Location
    'location.title': 'Paradise Location',
    'location.description': 'Located in the beautiful Grand Baie area, Luxora Villa offers an exquisite blend of privacy and convenience. Nestled in a serene neighborhood just minutes from the breathtaking beaches of northern Mauritius.',
    'location.beach': 'Beach Access',
    'location.beachDesc': 'Just a short 5-minute drive to Grand Baie Beach and other pristine beaches in northern Mauritius.',
    'location.shopping.title': 'Local Shopping',
    'location.shopping.description': 'Close proximity to Grand Baie La Croisette shopping mall and local markets offering fresh produce and souvenirs.',
    'location.dining.title': 'Restaurants & Dining',
    'location.dining.description': 'Numerous gourmet restaurants and local eateries within a short distance, offering authentic Mauritian cuisine.',
    'location.transport.title': 'Transport',
    'location.transport.description': 'Easy access to public transportation and approximately 1 hour drive from Sir Seewoosagur Ramgoolam International Airport.',
    'location.mapButton': 'Open in Google Maps',
    'location.mapPopup.title': 'Luxora Villa',
    'location.mapPopup.location': 'Grand Baie, Mauritius',
    'location.mapLoading.title': 'Loading Map...',
    'location.mapLoading.description': 'Please wait while we load the location map.',
    'location.mapCaption': 'Luxora Villa, Grand Baie, Mauritius',
    
    // Booking
    'booking.title': 'Book Your Stay',
    'booking.description': 'Ready to experience luxury living at Luxora Villa? Contact us today to book your stay or inquire about availability.',
    'booking.form.title': 'Booking Inquiry',
    'booking.form.name': 'Full Name',
    'booking.form.namePlaceholder': 'Your full name',
    'booking.form.email': 'Email Address',
    'booking.form.emailPlaceholder': 'Your email address',
    'booking.form.checkin': 'Check-in Date',
    'booking.form.checkout': 'Check-out Date',
    'booking.form.guests': 'Number of Guests',
    'booking.form.requests': 'Special Requests',
    'booking.form.requestsPlaceholder': 'Any special requests or questions?',
    'booking.form.submit': 'Send Inquiry',
    'booking.form.sending': 'Sending...',
    
    // Footer
    'footer.copyright': 'All rights reserved.',
    'footer.links.title': 'Quick Links',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.description': 'Subscribe to our newsletter for special deals and updates.',
    'footer.newsletter.placeholder': 'Your email',
    'footer.newsletter.button': 'Subscribe',
    'footer.policy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.faq': 'FAQ',
    'footer.brandName': 'Luxora Villa',
    'footer.brandDescription': 'Experience luxury living in our stunning beachside villa in Grand Baie, Mauritius.',
    'footer.copyrightBrand': 'Luxora Villa.',
    
    // Toasts
    'inquiry.success.title': 'Inquiry Sent',
    'inquiry.success.description': 'Your booking inquiry has been sent. We will contact you shortly.',
    'inquiry.error.title': 'Error',
    'inquiry.error.description': 'There was an error sending your inquiry. Please try again.',

    // NotFound Page
    'notFound.title': '404',
    'notFound.message': 'Oops! Page not found',
    'notFound.homeLink': 'Return to Home',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.gallery': 'Galerie',
    'nav.features': 'Caractéristiques',
    'nav.location': 'Emplacement',
    'nav.contact': 'Contact',
    'nav.language': 'Langue',
    'nav.logo.part1': '[FR] Luxora',
    'nav.logo.part2': '[FR]  Villa',
    
    // Hero
    'hero.title': 'Découvrez le Luxe au Paradis',
    'hero.subtitle': 'Villa exclusive à Pereybere, Maurice',
    'hero.cta': 'Réserver',
    'hero.description': 'Découvrez le luxe dans notre superbe villa moderne avec des équipements de classe mondiale, à quelques minutes des magnifiques plages.',
    'hero.mainBrand': '[FR] Luxora Villa',
    'hero.locationTag': '[FR] Pereybere, Mauritius',
    
    // Gallery
    'gallery.title': 'Explorez Notre Villa',
    'gallery.description': 'Découvrez le luxe et le confort de notre magnifique villa moderne',
    'gallery.viewButton': 'Voir la Galerie',
    'gallery.mainTitle': '[FR] Property Gallery',
    'gallery.mainDescription': '[FR] Explore our stunning spaces through our gallery. Each image showcases the luxurious details and amenities of Luxora Villa.',
    'gallery.filter.all': '[FR] All',
    'gallery.filter.exterior': '[FR] Exterior',
    'gallery.filter.pool': '[FR] Pool',
    'gallery.filter.bedrooms': '[FR] Bedrooms',
    'gallery.filter.bathrooms': '[FR] Bathrooms',
    'gallery.filter.kitchen': '[FR] Kitchen',
    'gallery.filter.interior': '[FR] Interior',
    'gallery.filter.location': '[FR] Location',
    'gallery.imageAlt.villaExteriorPool': '[FR] Villa Exterior with Pool',
    'gallery.imageAlt.poolAreaSeating': '[FR] Pool Area Seating',
    'gallery.imageAlt.pereybereSunset': '[FR] Pereybere Beach Sunset',
    'gallery.imageAlt.bedroomPoolView': '[FR] Bedroom with Pool View',
    'gallery.imageAlt.livingRoomPoolView': '[FR] Living Room with Pool View',
    'gallery.imageAlt.modernKitchenDining': '[FR] Modern Kitchen and Dining Area',
    'gallery.imageAlt.luxuryBathroomJacuzzi': '[FR] Luxury Bathroom with Jacuzzi',
    'gallery.imageAlt.modernBedroom': '[FR] Modern Bedroom',
    'gallery.imageAlt.bedroomPoolAccess': '[FR] Bedroom with Pool Access',
    'gallery.imageAlt.secondBedroom': '[FR] Second Bedroom',
    'gallery.imageAlt.poolView': '[FR] Pool View',
    'gallery.imageAlt.gardenArea': '[FR] Garden Area',
    
    // Features
    'features.title': 'Caractéristiques de la Villa',
    'features.description': '[FR] Experience luxury living with our premium amenities and carefully designed spaces.',
    'features.bedrooms.title': '[FR] 3 Spacious Bedrooms',
    'features.bedrooms.description': '[FR] Comfortable bedrooms with air conditioning, luxurious linens, and ample storage space.',
    'features.bathrooms.title': '[FR] 2 Modern Bathrooms',
    'features.bathrooms.description': '[FR] Elegant bathrooms featuring jacuzzi, premium fixtures, and complimentary toiletries.',
    'features.kitchen.title': '[FR] Fully Equipped Kitchen',
    'features.kitchen.description': '[FR] Modern kitchen with stove, dishwasher, oven, and an additional grease kitchen for convenience.',
    'features.pool.title': '[FR] Private Pool',
    'features.pool.description': '[FR] Enjoy our private pool with direct access from the bedroom or living room.',
    'features.rooftop.title': '[FR] Rooftop Access',
    'features.rooftop.description': '[FR] Relax or entertain on our spacious rooftop with beautiful views.',
    'features.livingRoom.title': '[FR] Smart Living Room',
    'features.livingRoom.description': '[FR] Comfortable living area featuring a smart TV and Google Home integration.',
    'features.wifi.title': '[FR] High-Speed WiFi',
    'features.wifi.description': '[FR] Stay connected with complimentary high-speed wireless internet throughout the villa.',
    'features.lounge.title': '[FR] Outdoor Lounge',
    'features.lounge.description': '[FR] Beautiful outdoor spaces for relaxation and entertainment.',
    'features.beachProximity.title': '[FR] Beach Proximity',
    'features.beachProximity.description': '[FR] Just 5 minutes by car to the beautiful beaches of Pereybere.',
    
    // Location
    'location.title': 'Emplacement Paradisiaque',
    'location.description': '[FR] Located in the beautiful Grand Baie area, Luxora Villa offers an exquisite blend of privacy and convenience. Nestled in a serene neighborhood just minutes from the breathtaking beaches of northern Mauritius.',
    'location.beach': 'Accès à la Plage',
    'location.beachDesc': '[FR] Just a short 5-minute drive to Grand Baie Beach and other pristine beaches in northern Mauritius.',
    'location.shopping.title': '[FR] Local Shopping',
    'location.shopping.description': '[FR] Close proximity to Grand Baie La Croisette shopping mall and local markets offering fresh produce and souvenirs.',
    'location.dining.title': '[FR] Restaurants & Dining',
    'location.dining.description': '[FR] Numerous gourmet restaurants and local eateries within a short distance, offering authentic Mauritian cuisine.',
    'location.transport.title': '[FR] Transport',
    'location.transport.description': '[FR] Easy access to public transportation and approximately 1 hour drive from Sir Seewoosagur Ramgoolam International Airport.',
    'location.mapButton': '[FR] Open in Google Maps',
    'location.mapPopup.title': '[FR] Luxora Villa',
    'location.mapPopup.location': '[FR] Grand Baie, Mauritius',
    'location.mapLoading.title': '[FR] Loading Map...',
    'location.mapLoading.description': '[FR] Please wait while we load the location map.',
    'location.mapCaption': '[FR] Luxora Villa, Grand Baie, Mauritius',
    
    // Booking
    'booking.title': 'Réservez Votre Séjour',
    'booking.description': 'Prêt à vivre l\'expérience de luxe à Luxora Villa? Contactez-nous aujourd\'hui pour réserver votre séjour.',
    'booking.form.title': 'Demande de Réservation',
    'booking.form.name': 'Nom Complet',
    'booking.form.namePlaceholder': 'Votre nom complet',
    'booking.form.email': 'Adresse Email',
    'booking.form.emailPlaceholder': 'Votre adresse email',
    'booking.form.checkin': 'Date d\'Arrivée',
    'booking.form.checkout': 'Date de Départ',
    'booking.form.guests': 'Nombre d\'Invités',
    'booking.form.requests': 'Demandes Spéciales',
    'booking.form.requestsPlaceholder': 'Avez-vous des demandes spéciales ou des questions?',
    'booking.form.submit': 'Envoyer la Demande',
    'booking.form.sending': 'Envoi en cours...',
    
    // Footer
    'footer.copyright': 'Tous droits réservés.',
    'footer.links.title': 'Liens Rapides',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.description': 'Abonnez-vous à notre newsletter pour recevoir des offres spéciales et des mises à jour.',
    'footer.newsletter.placeholder': 'Votre email',
    'footer.newsletter.button': 'S\'abonner',
    'footer.policy': 'Politique de Confidentialité',
    'footer.terms': 'Termes et Conditions',
    'footer.faq': 'FAQ',
    'footer.brandName': '[FR] Luxora Villa',
    'footer.brandDescription': '[FR] Experience luxury living in our stunning beachside villa in Grand Baie, Mauritius.',
    'footer.copyrightBrand': '[FR] Luxora Villa.',
    
    // Toasts
    'inquiry.success.title': 'Demande Envoyée',
    'inquiry.success.description': 'Votre demande de réservation a été envoyée. Nous vous contacterons bientôt.',
    'inquiry.error.title': 'Erreur',
    'inquiry.error.description': 'Une erreur s\'est produite lors de l\'envoi de votre demande. Veuillez réessayer.',

    // NotFound Page
    'notFound.title': '[FR] 404',
    'notFound.message': '[FR] Oops! Page not found',
    'notFound.homeLink': '[FR] Return to Home',
  }
};

// Language Context
type LanguageContextType = {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
