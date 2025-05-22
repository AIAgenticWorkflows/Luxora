
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
    
    // Hero
    'hero.title': 'Experience Luxury in Paradise',
    'hero.subtitle': 'Exclusive beach villa in Pereybere, Mauritius',
    'hero.cta': 'Book Now',
    
    // Gallery
    'gallery.title': 'Explore Our Villa',
    'gallery.description': 'Experience the luxury and comfort of our stunning beachside villa',
    
    // Features
    'features.title': 'Villa Features',
    'features.description': 'Designed with luxury and comfort in mind, our villa offers everything you need for a perfect getaway',
    
    // Location
    'location.title': 'Paradise Location',
    'location.description': 'Located in the stunning Grand Baie area, Luxora Villa offers the perfect blend of privacy and accessibility.',
    'location.beach': 'Beachfront Access',
    'location.beachDesc': 'Easy access to some of the most beautiful beaches in Mauritius.',
    
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
    
    // Toasts
    'inquiry.success.title': 'Inquiry Sent',
    'inquiry.success.description': 'Your booking inquiry has been sent. We will contact you shortly.',
    'inquiry.error.title': 'Error',
    'inquiry.error.description': 'There was an error sending your inquiry. Please try again.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.gallery': 'Galerie',
    'nav.features': 'Caractéristiques',
    'nav.location': 'Emplacement',
    'nav.contact': 'Contact',
    'nav.language': 'Langue',
    
    // Hero
    'hero.title': 'Découvrez le Luxe au Paradis',
    'hero.subtitle': 'Villa exclusive en bord de plage à Pereybere, Maurice',
    'hero.cta': 'Réserver',
    
    // Gallery
    'gallery.title': 'Explorez Notre Villa',
    'gallery.description': 'Découvrez le luxe et le confort de notre magnifique villa au bord de la mer',
    
    // Features
    'features.title': 'Caractéristiques de la Villa',
    'features.description': 'Conçue pour le luxe et le confort, notre villa offre tout ce dont vous avez besoin pour un séjour parfait',
    
    // Location
    'location.title': 'Emplacement Paradisiaque',
    'location.description': 'Située dans la magnifique région de Grand Baie, Luxora Villa offre un mélange parfait d\'intimité et d\'accessibilité.',
    'location.beach': 'Accès à la Plage',
    'location.beachDesc': 'Accès facile à certaines des plus belles plages de l\'île Maurice.',
    
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
    
    // Toasts
    'inquiry.success.title': 'Demande Envoyée',
    'inquiry.success.description': 'Votre demande de réservation a été envoyée. Nous vous contacterons bientôt.',
    'inquiry.error.title': 'Erreur',
    'inquiry.error.description': 'Une erreur s\'est produite lors de l\'envoi de votre demande. Veuillez réessayer.',
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
