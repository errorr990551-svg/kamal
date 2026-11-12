// Single source of truth for business facts used across pages, structured data and the sitemap.
// Update details here and every page, footer and schema block picks them up.

export const SITE_URL = 'https://kamalsnamkeen.in';

export const BUSINESS = {
  name: 'Kamal Brand',
  legalAlt: 'Kamal Brand Namkeen',
  tagline: 'savour the authentic flavors in every bite',
  email: 'kamalsbrand@gmail.com',
  phones: [
    { display: '+91 99322 59719', tel: '+919932259719' },
    { display: '+91 89007 43299', tel: '+918900743299' },
  ],
  address: {
    locality: 'Raniganj',
    district: 'Paschim Bardhaman',
    region: 'West Bengal',
    country: 'IN',
    display: 'Raniganj, Paschim Bardhaman, West Bengal, India',
  },
  languages: ['Hindi', 'English', 'Bengali'],
};

export const IMG = {
  logo: '/img/kamal-logo-300.webp',
  og: '/img/og-kamal-brand.jpg',
  banner: (w) => `/img/kamal-brand-namkeen-banner-${w}.webp`,
};

export const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Our Products' },
  { path: '/dealership', label: 'Apply For Dealership' },
  { path: '/hampers', label: 'Hampers' },
  { path: '/contract', label: 'Contract Manufacturing' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];

// The two keywords the site targets for now (see SEO-PLAN.md). Each is used with
// "West Bengal" and with the city names below ("namkeen manufacturer in Asansol").
export const TARGET_KEYWORDS = {
  manufacturer: 'namkeen manufacturer in West Bengal',
  distributor: 'namkeen distributorship in West Bengal',
};

// Market areas: West Bengal cities we take bulk orders and dealer enquiries from,
// grouped by region, nearest first. Edit this list and the home page, dealership
// page and structured data (areaServed) all update.
export const MARKET_AREAS = [
  {
    region: 'Paschim Bardhaman (home district)',
    note: 'Closest to our Raniganj factory',
    cities: ['Raniganj', 'Asansol', 'Durgapur', 'Jamuria', 'Andal', 'Kulti', 'Barakar', 'Burnpur', 'Pandabeswar', 'Panagarh'],
  },
  {
    region: 'Purba Bardhaman, Birbhum, Bankura & Purulia',
    note: 'Neighbouring districts',
    cities: ['Bardhaman', 'Memari', 'Katwa', 'Kalna', 'Bolpur', 'Suri', 'Rampurhat', 'Bankura', 'Bishnupur', 'Purulia', 'Raghunathpur'],
  },
  {
    region: 'Kolkata & South Bengal',
    note: 'Kolkata, Howrah, Hooghly, North 24 Parganas, Nadia & Medinipur',
    cities: ['Kolkata', 'Howrah', 'Barasat', 'Barrackpore', 'Serampore', 'Chinsurah', 'Chandannagar', 'Krishnanagar', 'Kalyani', 'Medinipur', 'Kharagpur', 'Haldia', 'Tamluk'],
  },
  {
    region: 'Central & North Bengal',
    note: 'Murshidabad, Malda, Dinajpur, Darjeeling, Jalpaiguri & Cooch Behar',
    cities: ['Berhampore', 'Malda', 'Raiganj', 'Balurghat', 'Siliguri', 'Jalpaiguri', 'Cooch Behar'],
  },
];

export const MARKET_CITIES = MARKET_AREAS.flatMap((a) => a.cities);
