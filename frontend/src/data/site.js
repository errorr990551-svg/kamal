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
