
export const galleryImagesData = [
  {
    id: 1,
    src: '/lovable-uploads/06ef031e-998e-41b5-a951-2c8ba14df591.png',
    altKey: 'gallery.imageAlt.villaExteriorPool',
    category: 'exterior'
  },
  {
    id: 2,
    src: '/lovable-uploads/9f7fb5e6-83cd-4297-bf36-c7c208a66403.png',
    altKey: 'gallery.imageAlt.poolAreaSeating',
    category: 'exterior'
  },
  {
    id: 3,
    src: '/lovable-uploads/17d507de-ba3a-4058-abe3-c10f9cde1650.png',
    altKey: 'gallery.imageAlt.pereybereSunset',
    category: 'exterior'
  },
  {
    id: 4,
    src: '/lovable-uploads/fe796886-fbef-4626-bb98-2831ba06f4e3.png',
    altKey: 'gallery.imageAlt.bedroomPoolView',
    category: 'interior'
  },
  {
    id: 5,
    src: '/lovable-uploads/b20acf9f-79d7-4a12-b87d-ab534f2d939a.png',
    altKey: 'gallery.imageAlt.livingRoomPoolView',
    category: 'interior'
  },
  {
    id: 6,
    src: '/lovable-uploads/77624a5a-f93f-4f78-bfb8-c6d88cf9d7d1.png',
    altKey: 'gallery.imageAlt.modernKitchenDining',
    category: 'interior'
  },
  {
    id: 7,
    src: '/lovable-uploads/0a540aea-f68a-4d87-b064-23c8a87b6549.png',
    altKey: 'gallery.imageAlt.luxuryBathroomJacuzzi',
    category: 'interior'
  },
  {
    id: 8,
    src: '/lovable-uploads/8d3df2d7-ed3d-4430-9084-a928a3ae4679.png',
    altKey: 'gallery.imageAlt.modernBedroom',
    category: 'interior'
  },
  {
    id: 9,
    src: '/lovable-uploads/6e9e28a8-4cd6-431c-9d15-c15ad821f630.png',
    altKey: 'gallery.imageAlt.bedroomPoolAccess',
    category: 'interior'
  },
  {
    id: 10,
    src: '/lovable-uploads/42ac3b94-9f10-49ef-8238-94f313a1bde6.png',
    altKey: 'gallery.imageAlt.secondBedroom',
    category: 'interior'
  },
  {
    id: 11,
    src: '/lovable-uploads/abb57903-7d11-459c-9ffe-7005a3f030b6.png',
    altKey: 'gallery.imageAlt.poolView',
    category: 'exterior'
  },
  {
    id: 12,
    src: '/lovable-uploads/e3a75e0b-1d08-435c-a198-a5bb92cd996e.png',
    altKey: 'gallery.imageAlt.gardenArea',
    category: 'exterior'
  },
  {
    id: 13,
    src: '/lovable-uploads/outdoor-dining-pool.jpeg',
    altKey: 'gallery.imageAlt.outdoorDiningPool',
    category: 'exterior'
  }
];

export type GalleryImage = typeof galleryImagesData[0];
export type ImageCategory = 'all' | 'exterior' | 'interior';
