
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
    'hero.title': 'Luxury Villa in North Mauritius',
    'hero.subtitle': 'Premium holiday villa rental in Pereybere, North Mauritius',
    'hero.cta': 'Book Now',
    'hero.description': 'Book your dream holiday at our stunning 3-bedroom villa with private pool in Pereybere, near Grand Baie. The perfect luxury villa rental in North Mauritius.',
    'hero.mainBrand': 'Luxora Villa',
    'hero.locationTag': 'Pereybere, Grand Baie — North Mauritius',
    
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
    'features.title': 'Luxury Villa Amenities',
    'features.description': 'Our North Mauritius villa offers premium amenities for an unforgettable holiday experience in Pereybere.',
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
    'location.title': 'Prime Location in North Mauritius',
    'location.description': 'Luxora Villa is ideally located in Pereybere, the heart of North Mauritius. Just minutes from Grand Baie\'s beaches, restaurants, and attractions — the perfect base for your Mauritius villa holiday.',
    'location.beach': 'Beach Access',
    'location.beachDesc': 'Just a short 5-minute drive to Grand Baie Beach and other pristine beaches in northern Mauritius.',
    'location.shopping.title': 'Local Shopping',
    'location.shopping.description': 'Close proximity to Grand Baie La Croisette shopping mall and local markets offering fresh produce and souvenirs.',
    'location.dining.title': 'Restaurants & Dining',
    'location.dining.description': 'Numerous gourmet restaurants and local eateries within a short distance, offering authentic Mauritian cuisine.',
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
    'footer.brandDescription': 'Premium luxury villa rental in Pereybere, North Mauritius. 3 bedrooms, private pool, near Grand Baie beaches.',
    'footer.copyrightBrand': 'Luxora Villa.',
    
    // Toasts
    'inquiry.success.title': 'Inquiry Sent',
    'inquiry.success.description': 'Your booking inquiry has been sent. We will contact you shortly.',
    'inquiry.error.title': 'Error',
    'inquiry.error.description': 'There was an error sending your inquiry. Please try again.',

    // Chatbot
    'chatbot.title': 'Luxora Agent',
    'chatbot.welcome': 'Hello! How can I assist you?',
    'chatbot.checkin': 'Check-in time is from 3:00 PM onwards. Early check-in may be available upon request.',
    'chatbot.checkout': 'Check-out time is until 11:00 AM. Late check-out may be available upon request for an additional fee.',
    'chatbot.times': 'Check-in: 3:00 PM onwards\nCheck-out: Until 11:00 AM\n\nFor early check-in or late check-out requests, please contact us in advance.',
    'chatbot.availability': 'To check current availability and make a reservation, please visit our booking page. I can direct you there!',
    'chatbot.availabilityWithDates': 'Perfect! I can check availability for your selected dates. Click the link below to see real-time availability and pricing.',
    'chatbot.pricing': 'For current rates and pricing information, please check our booking page where you can see real-time prices for your desired dates.',
    'chatbot.location': 'Luxora Villa is located in beautiful Pereybere, Grand-Baie, Mauritius. We\'re just steps away from the pristine Pereybere Beach!',
    'chatbot.amenities': 'Our villa features: Private pool, 3 bedrooms, modern kitchen, WiFi, air conditioning, beach access, and much more!',
    'chatbot.default': 'I can help you with:\n• Check-in/check-out times\n• Availability and booking\n• Villa amenities\n• Location information\n\nWhat would you like to know?',
    'chatbot.placeholder': 'Ask about check-in times, availability...',
    'chatbot.checkAvailability': 'Check Availability & Book',
    'chatbot.selectDates': 'Select Your Dates',
    'chatbot.checkinDate': 'Check-in Date',
    'chatbot.checkoutDate': 'Check-out Date',
    'chatbot.confirmDates': 'Confirm Dates',
    'chatbot.reset': 'Reset',
    'chatbot.selectedDates': 'Selected dates',
    'chatbot.datesSelected': 'I\'d like to check availability for the selected dates.',

    // Chat
    'chat.title': 'Luxora Villa Assistant',
    'chat.subtitle': 'Ask me anything about your luxury villa stay!',
    'chat.welcome': '👋 Welcome! I\'m here to help with questions about our beautiful 3-bedroom villa in Pereybere, Mauritius. What would you like to know?',
    'chat.placeholder': 'Ask about amenities, location, booking...',
    'chat.typing': 'AI is thinking',
    'chat.quickQuestions.amenities': '🏊 Amenities',
    'chat.quickQuestions.beach': '🏖️ Beach Distance',
    'chat.quickQuestions.availability': '📅 Availability',
    'chat.quickQuestions.booking': '💰 How to Book',
    'chat.errors.generic': 'Sorry, I\'m having trouble connecting right now. Please try again in a moment, or contact our host directly for immediate assistance.',
    'chat.errors.network': 'Sorry, there was a problem communicating with the AI service (network error). Please check your n8n workflow status and logs.',
    'chat.errors.invalidJson': 'Sorry, the AI sent a response I could not understand (not valid JSON). Please check the n8n workflow output and the browser console.',
    'chat.errors.unexpectedFormat': 'Received an unexpected response format from the AI. Please check the console for details and verify the n8n workflow output.',

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
    'nav.logo.part1': 'Luxora',
    'nav.logo.part2': ' Villa',
    
    // Hero
    'hero.title': 'Villa de Luxe au Nord de l\'Île Maurice',
    'hero.subtitle': 'Location de villa de vacances à Pereybere, Nord de Maurice',
    'hero.cta': 'Réserver',
    'hero.description': 'Réservez votre séjour de rêve dans notre villa 3 chambres avec piscine privée à Pereybere, près de Grand Baie. La villa de luxe idéale au Nord de l\'île Maurice.',
    'hero.mainBrand': 'Luxora Villa',
    'hero.locationTag': 'Pereybere, Grand Baie — Nord de l\'île Maurice',
    
    // Gallery
    'gallery.title': 'Explorez Notre Villa',
    'gallery.description': 'Découvrez le luxe et le confort de notre magnifique villa moderne',
    'gallery.viewButton': 'Voir la Galerie',
    'gallery.mainTitle': 'Galerie Immobilière',
    'gallery.mainDescription': 'Explorez nos superbes espaces à travers notre galerie. Chaque image met en valeur les détails luxueux et les commodités de la Villa Luxora.',
    'gallery.filter.all': 'Tout',
    'gallery.filter.exterior': 'Extérieur',
    'gallery.filter.pool': 'Piscine',
    'gallery.filter.bedrooms': 'Chambres',
    'gallery.filter.bathrooms': 'Salles de Bain',
    'gallery.filter.kitchen': 'Cuisine',
    'gallery.filter.interior': 'Intérieur',
    'gallery.filter.location': 'Emplacement',
    'gallery.imageAlt.villaExteriorPool': 'Villa Extérieur avec Piscine',
    'gallery.imageAlt.poolAreaSeating': 'Coin Salon Piscine',
    'gallery.imageAlt.pereybereSunset': 'Coucher de Soleil sur la Plage de Pereybere',
    'gallery.imageAlt.bedroomPoolView': 'Chambre avec Vue sur Piscine',
    'gallery.imageAlt.livingRoomPoolView': 'Salon avec Vue sur Piscine',
    'gallery.imageAlt.modernKitchenDining': 'Cuisine Moderne et Salle à Manger',
    'gallery.imageAlt.luxuryBathroomJacuzzi': 'Salle de Bain de Luxe avec Jacuzzi',
    'gallery.imageAlt.modernBedroom': 'Chambre Moderne',
    'gallery.imageAlt.bedroomPoolAccess': 'Chambre avec Accès Piscine',
    'gallery.imageAlt.secondBedroom': 'Deuxième Chambre',
    'gallery.imageAlt.poolView': 'Vue sur Piscine',
    'gallery.imageAlt.gardenArea': 'Espace Jardin',
    
    // Features
    'features.title': 'Caractéristiques de la Villa',
    'features.description': 'Découvrez la vie de luxe avec nos équipements haut de gamme et nos espaces soigneusement conçus.',
    'features.bedrooms.title': '3 Chambres Spacieuses',
    'features.bedrooms.description': 'Chambres confortables avec climatisation, linge de luxe et nombreux espaces de rangement.',
    'features.bathrooms.title': '2 Salles de Bain Modernes',
    'features.bathrooms.description': 'Salles de bain élégantes avec jacuzzi, équipements haut de gamme et articles de toilette gratuits.',
    'features.kitchen.title': 'Cuisine Entièrement Équipée',
    'features.kitchen.description': 'Cuisine moderne avec cuisinière, lave-vaisselle, four et une cuisine de service supplémentaire pour plus de commodité.',
    'features.pool.title': 'Piscine Privée',
    'features.pool.description': 'Profitez de notre piscine privée avec accès direct depuis la chambre ou le salon.',
    'features.rooftop.title': 'Accès au Toit',
    'features.rooftop.description': 'Détendez-vous ou recevez sur notre toit spacieux avec une vue magnifique.',
    'features.livingRoom.title': 'Salon Intelligent',
    'features.livingRoom.description': 'Espace de vie confortable avec une Smart TV et intégration Google Home.',
    'features.wifi.title': 'WiFi Haut Débit',
    'features.wifi.description': 'Restez connecté grâce à l\'internet sans fil haut débit gratuit dans toute la villa.',
    'features.lounge.title': 'Salon Extérieur',
    'features.lounge.description': 'Beaux espaces extérieurs pour la détente et le divertissement.',
    'features.beachProximity.title': 'Proximité de la Plage',
    'features.beachProximity.description': 'À seulement 5 minutes en voiture des belles plages de Pereybere.',
    
    // Location
    'location.title': 'Emplacement Paradisiaque',
    'location.description': 'Située dans la magnifique région de Grand Baie, la Villa Luxora offre un mélange exquis d\'intimité et de commodité. Nichée dans un quartier serein à quelques minutes des plages magnifiques du nord de l\'île Maurice.',
    'location.beach': 'Accès à la Plage',
    'location.beachDesc': 'À seulement 5 minutes en voiture de la plage de Grand Baie et d\'autres plages immaculées du nord de l\'île Maurice.',
    'location.shopping.title': 'Commerces Locaux',
    'location.shopping.description': 'À proximité du centre commercial Grand Baie La Croisette et des marchés locaux proposant des produits frais et des souvenirs.',
    'location.dining.title': 'Restaurants et Restauration',
    'location.dining.description': 'De nombreux restaurants gastronomiques et établissements locaux à courte distance, proposant une cuisine mauricienne authentique.',
    'location.mapButton': 'Ouvrir dans Google Maps',
    'location.mapPopup.title': 'Luxora Villa',
    'location.mapPopup.location': 'Grand Baie, Ile Maurice',
    'location.mapLoading.title': 'Chargement de la Carte...',
    'location.mapLoading.description': 'Veuillez patienter pendant que nous chargeons le plan de localisation.',
    'location.mapCaption': 'Luxora Villa, Grand Baie, Ile Maurice',
    
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
    'footer.brandName': 'Luxora Villa',
    'footer.brandDescription': 'Découvrez la vie de luxe dans notre superbe villa en bord de mer à Grand Baie, Ile Maurice.',
    'footer.copyrightBrand': 'Luxora Villa.',
    
    // Toasts
    'inquiry.success.title': 'Demande Envoyée',
    'inquiry.success.description': 'Votre demande de réservation a été envoyée. Nous vous contacterons bientôt.',
    'inquiry.error.title': 'Erreur',
    'inquiry.error.description': 'Une erreur s\'est produite lors de l\'envoi de votre demande. Veuillez réessayer.',

    // Chatbot
    'chatbot.title': 'Agent Luxora',
    'chatbot.welcome': 'Bonjour ! Comment puis-je vous aider ?',
    'chatbot.checkin': 'L\'heure d\'arrivée est à partir de 15h00. Une arrivée anticipée peut être disponible sur demande.',
    'chatbot.checkout': 'L\'heure de départ est jusqu\'à 11h00. Un départ tardif peut être disponible sur demande moyennant un supplément.',
    'chatbot.times': 'Arrivée : À partir de 15h00\nDépart : Jusqu\'à 11h00\n\nPour les demandes d\'arrivée anticipée ou de départ tardif, veuillez nous contacter à l\'avance.',
    'chatbot.availability': 'Pour vérifier la disponibilité actuelle et faire une réservation, veuillez visiter notre page de réservation. Je peux vous y diriger !',
    'chatbot.availabilityWithDates': 'Parfait ! Je peux vérifier la disponibilité pour vos dates sélectionnées. Cliquez sur le lien ci-dessous pour voir la disponibilité et les prix en temps réel.',
    'chatbot.pricing': 'Pour les tarifs actuels et les informations de prix, veuillez consulter notre page de réservation où vous pouvez voir les prix en temps réel pour vos dates souhaitées.',
    'chatbot.location': 'Luxora Villa est située dans la magnifique Pereybère, Grand-Baie, Maurice. Nous sommes à quelques pas de la plage immaculée de Pereybère !',
    'chatbot.amenities': 'Notre villa dispose de : Piscine privée, 3 chambres, cuisine moderne, WiFi, climatisation, accès à la plage, et bien plus encore !',
    'chatbot.default': 'Je peux vous aider avec :\n• Horaires d\'arrivée/départ\n• Disponibilité et réservation\n• Équipements de la villa\n• Informations de localisation\n\nQue souhaitez-vous savoir ?',
    'chatbot.placeholder': 'Demandez les horaires d\'arrivée, la disponibilité...',
    'chatbot.checkAvailability': 'Vérifier la Disponibilité et Réserver',
    'chatbot.selectDates': 'Sélectionner Vos Dates',
    'chatbot.checkinDate': 'Date d\'Arrivée',
    'chatbot.checkoutDate': 'Date de Départ',
    'chatbot.confirmDates': 'Confirmer les Dates',
    'chatbot.reset': 'Réinitialiser',
    'chatbot.selectedDates': 'Dates sélectionnées',
    'chatbot.datesSelected': 'J\'aimerais vérifier la disponibilité pour les dates sélectionnées.',

    // Chat
    'chat.title': 'Assistant Villa Luxora',
    'chat.subtitle': 'Demandez-moi tout sur votre séjour de luxe dans notre villa!',
    'chat.welcome': '👋 Bienvenue! Je suis là pour vous aider avec des questions sur notre magnifique villa de 3 chambres à Pereybere, Maurice. Que souhaitez-vous savoir?',
    'chat.placeholder': 'Posez des questions sur les équipements, l\'emplacement, la réservation...',
    'chat.typing': 'L\'IA réfléchit',
    'chat.quickQuestions.amenities': '🏊 Équipements',
    'chat.quickQuestions.beach': '🏖️ Distance de la Plage',
    'chat.quickQuestions.availability': '📅 Disponibilité',
    'chat.quickQuestions.booking': '💰 Comment Réserver',
    'chat.errors.generic': 'Désolé, j\'ai des difficultés de connexion en ce moment. Veuillez réessayer dans un moment, ou contactez notre hôte directement pour une assistance immédiate.',
    'chat.errors.network': 'Désolé, il y a eu un problème de communication avec le service IA (erreur réseau). Veuillez vérifier le statut et les logs de votre workflow n8n.',
    'chat.errors.invalidJson': 'Désolé, l\'IA a envoyé une réponse que je ne peux pas comprendre (JSON invalide). Veuillez vérifier la sortie du workflow n8n et la console du navigateur.',
    'chat.errors.unexpectedFormat': 'Format de réponse inattendu de l\'IA. Veuillez vérifier la console pour plus de détails et vérifier la sortie du workflow n8n.',

    // NotFound Page
    'notFound.title': '404',
    'notFound.message': 'Oups! Page non trouvée',
    'notFound.homeLink': 'Retour à l\'accueil',
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

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Update Title
    const title = language === 'en'
      ? 'Luxora Villa - Luxury Villa in North Mauritius, Pereybere'
      : 'Luxora Villa - Villa de Luxe à Pereybere, Nord de Maurice';
    document.title = title;

    // Update Meta Description
    const description = language === 'en'
      ? 'Experience premium luxury at Luxora Villa, a stunning 3-bedroom private villa with a pool in Pereybere, North Mauritius. Perfect for a tropical getaway in paradise.'
      : 'Vivez le luxe à la Villa Luxora, une superbe villa privée de 3 chambres avec piscine à Pereybere, dans le nord de l\'île Maurice. Idéal pour une escapade tropicale.';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update OG Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    // Update OG Locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', language === 'en' ? 'en_US' : 'fr_FR');

    const ogLocaleAlt = document.querySelector('meta[property="og:locale:alternate"]');
    if (ogLocaleAlt) ogLocaleAlt.setAttribute('content', language === 'en' ? 'fr_FR' : 'en_US');

  }, [language]);

  const t = (key: string): string => {
    const langTranslations = translations[language];

    // First try direct key access (for flat keys like 'nav.home')
    if (key in langTranslations) {
      return langTranslations[key as keyof typeof langTranslations];
    }
    
    // Then try nested object access (for keys like 'chat.quickQuestions.amenities')
    const keys = key.split('.');
    let value: unknown = langTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return the key if path doesn't exist
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
