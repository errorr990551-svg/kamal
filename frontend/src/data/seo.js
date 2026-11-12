import { SITE_URL, BUSINESS, IMG, MARKET_CITIES } from './site';
import { PRODUCTS, getProduct } from './products';
import { GENERAL_FAQS, DEALER_FAQS, CONTRACT_FAQS, HUB_FAQS, productFaqs, cityFaqs } from './faqs';
import { CITIES, CITY_HUB_PATH, getCity } from './cities';

const PAGES = {
  '/': {
    title: 'Namkeen Manufacturer in West Bengal | Kamal Brand, Raniganj',
    description:
      'Kamal Brand is a namkeen manufacturer in West Bengal, making chanachur, bhujia, sev and gathiya in Raniganj and supplying wholesale buyers across Bengal.',
    name: 'Home',
    changefreq: 'weekly',
    priority: '1.0',
    faqs: GENERAL_FAQS,
  },
  '/products': {
    title: 'Namkeen Products – Chanachur, Bhujia, Sev, Gathiya | Kamal Brand',
    description:
      'All 10 Kamal Brand namkeen: Jhal & Mitha Chanachur, Bhujia, Sev, Papdi & Phool Gathiya, Chana Dal, Fried Chura, Salted Badam and Masala Matar, with pack sizes.',
    name: 'Our Products',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/dealership': {
    title: 'Namkeen Distributorship in West Bengal | Kamal Brand Dealership',
    description:
      'Apply for a Kamal Brand namkeen distributorship in West Bengal, from Asansol and Durgapur to Kolkata and Siliguri. Fast-moving chanachur, bhujia and sev.',
    name: 'Apply For Dealership',
    changefreq: 'monthly',
    priority: '0.9',
    faqs: DEALER_FAQS,
  },
  [CITY_HUB_PATH]: {
    title: 'Mixture Manufacturer & Distributor in West Bengal | Kamal Brand',
    description: `Kamal Brand chanachur mixture, made in Raniganj and supplied to ${CITIES.length} West Bengal cities. Find your city for products, routes and distributorship details.`,
    name: 'Mixture Supply in West Bengal',
    changefreq: 'monthly',
    priority: '0.9',
    faqs: HUB_FAQS,
  },
  '/hampers': {
    title: 'Namkeen Gift Hampers for Diwali, Bijoya & Corporate Gifting | Kamal Brand',
    description:
      'Order namkeen gift hampers from Kamal Brand for Diwali, Bijoya, weddings and corporate gifting. Choose chanachur, bhujia, gathiya and more, in any quantity.',
    name: 'Hampers',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/contract': {
    title: 'Namkeen Contract Manufacturing & Private Label | Kamal Brand',
    description:
      'Private label and third-party namkeen manufacturing in West Bengal: bhujia, sev, gathiya, chanachur and more, made to your recipe, pack size and timeline.',
    name: 'Contract Manufacturing',
    changefreq: 'monthly',
    priority: '0.8',
    faqs: CONTRACT_FAQS,
  },
  '/about': {
    title: 'About Kamal Brand – Namkeen Manufacturer in Raniganj, West Bengal',
    description:
      'Kamal Brand is a namkeen manufacturer in Raniganj, Paschim Bardhaman: traditional recipes, premium besan and spices, hygienic processing and sealed packs.',
    name: 'About Us',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/contact': {
    title: 'Contact Kamal Brand Namkeen – Raniganj | Call +91 99322 59719',
    description:
      'Contact Kamal Brand for bulk namkeen orders, dealership, gift hampers and contract manufacturing. Call +91 99322 59719 or email kamalsbrand@gmail.com.',
    name: 'Contact',
    changefreq: 'monthly',
    priority: '0.7',
  },
};

export const STATIC_PATHS = Object.keys(PAGES);
export const ALL_PATHS = [...STATIC_PATHS, ...PRODUCTS.map((p) => p.path), ...CITIES.map((c) => c.path)];

export function normalizePath(pathname = '/') {
  let p = pathname.split('?')[0].split('#')[0].toLowerCase();
  p = '/' + p.replace(/^\/+|\/+$/g, '');
  return p;
}

// Returns { key, product } describing what a path should render.
export function resolveRoute(pathname) {
  const path = normalizePath(pathname);
  if (PAGES[path]) return { key: path, path };
  const m = path.match(/^\/products\/([a-z0-9-]+)$/);
  if (m && getProduct(m[1])) return { key: '/products/:slug', path, product: getProduct(m[1]) };
  const c = path.startsWith(CITY_HUB_PATH + '/') && getCity(path.slice(CITY_HUB_PATH.length + 1));
  if (c) return { key: '/city/:slug', path, city: c };
  return { key: '404', path };
}

const abs = (p) => (p.startsWith('http') ? p : SITE_URL + encodeURI(p));

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  alternateName: BUSINESS.legalAlt,
  url: `${SITE_URL}/`,
  logo: abs(IMG.logo),
  email: BUSINESS.email,
  telephone: BUSINESS.phones[0].tel,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  areaServed: [
    { '@type': 'State', name: 'West Bengal' },
    ...MARKET_CITIES.map((name) => ({ '@type': 'City', name, containedInPlace: { '@type': 'State', name: 'West Bengal' } })),
  ],
  contactPoint: BUSINESS.phones.map((ph) => ({
    '@type': 'ContactPoint',
    telephone: ph.tel,
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: BUSINESS.languages,
  })),
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BUSINESS.name,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
};

const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: SITE_URL + (it.path === '/' ? '/' : it.path),
  })),
});

const faqPage = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export function getBreadcrumbs(route) {
  if (route.key === '/' || route.key === '404') return [];
  if (route.product) {
    return [
      { name: 'Home', path: '/' },
      { name: 'Our Products', path: '/products' },
      { name: route.product.name, path: route.product.path },
    ];
  }
  if (route.city) {
    return [
      { name: 'Home', path: '/' },
      { name: PAGES[CITY_HUB_PATH].name, path: CITY_HUB_PATH },
      { name: route.city.name, path: route.city.path },
    ];
  }
  return [
    { name: 'Home', path: '/' },
    { name: PAGES[route.key].name, path: route.key },
  ];
}

export function getSeo(pathname) {
  const route = resolveRoute(pathname);
  const graph = [organization, website];
  let meta;

  if (route.key === '404') {
    return {
      route,
      title: 'Page Not Found | Kamal Brand Namkeen',
      description: 'The page you are looking for does not exist. Browse Kamal Brand namkeen products or contact us.',
      canonical: null,
      robots: 'noindex, follow',
      image: abs(IMG.og),
      jsonLd: null,
    };
  }

  if (route.product) {
    const p = route.product;
    meta = {
      title: `${p.name} Namkeen – ${p.sizesText} Packs | Kamal Brand`,
      description: `${p.name} by Kamal Brand, made with ${p.ingredients
        .slice(0, 2)
        .map((i) => i.replace(/\s*\(.*\)/, '').toLowerCase())
        .join(' & ')} (${p.taste.toLowerCase()}). ${p.sizesText} packs. Wholesale & dealership from Raniganj, West Bengal.`,
      image: abs(p.gallery[0].src),
    };
  } else if (route.city) {
    const c = route.city;
    const where = c.km === 0 ? 'made right here in Raniganj' : `from Raniganj (${c.km} km)`;
    meta = {
      title: `Mixture Manufacturer in ${c.name} | Distributor & Dealership`,
      description: `Mixture manufacturer for ${c.name}: Kamal Brand chanachur, bhujia, sev & gathiya ${where}. Distributorship & dealership open in ${c.name}.`,
      image: abs(IMG.og),
    };
  } else {
    meta = { ...PAGES[route.key], image: abs(IMG.og) };
  }

  const crumbs = getBreadcrumbs(route);
  if (crumbs.length) graph.push(breadcrumbs(crumbs));

  const faqs = route.product ? productFaqs(route.product) : route.city ? cityFaqs(route.city) : PAGES[route.key].faqs;
  if (faqs) graph.push(faqPage(faqs));

  if (route.key === '/products') {
    graph.push({
      '@type': 'ItemList',
      name: 'Kamal Brand Namkeen Products',
      itemListElement: PRODUCTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: SITE_URL + p.path,
        name: p.name,
      })),
    });
  }

  if (route.city) {
    const c = route.city;
    graph.push({
      '@type': 'Service',
      name: `Mixture manufacturing and wholesale supply in ${c.name}`,
      serviceType: 'Namkeen mixture manufacturer, distributorship and dealership',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: {
        '@type': 'City',
        name: c.name,
        ...(c.alt.length ? { alternateName: c.alt } : {}),
        containedInPlace: { '@type': 'AdministrativeArea', name: `${c.district} district, West Bengal` },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Kamal Brand mixture and namkeen',
        itemListElement: PRODUCTS.map((p) => ({ '@type': 'Product', name: `Kamal Brand ${p.name}`, url: SITE_URL + p.path, image: abs(p.gallery[0].src) })),
      },
    });
  }

  if (route.key === CITY_HUB_PATH) {
    graph.push({
      '@type': 'ItemList',
      name: 'Kamal Brand mixture supply by city',
      itemListElement: CITIES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE_URL + c.path, name: `Mixture Manufacturer in ${c.name}` })),
    });
  }

  const canonical = SITE_URL + (route.path === '/' ? '/' : route.path);
  graph.push({
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: meta.image,
    inLanguage: 'en-IN',
  });

  return {
    route,
    title: meta.title,
    description: meta.description,
    canonical,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    image: meta.image,
    jsonLd: { '@context': 'https://schema.org', '@graph': graph },
  };
}

export function sitemapEntries() {
  const entries = STATIC_PATHS.map((p) => ({
    loc: SITE_URL + (p === '/' ? '/' : p),
    changefreq: PAGES[p].changefreq,
    priority: PAGES[p].priority,
    images: p === '/' ? [abs(IMG.banner(1983))] : [],
  }));
  PRODUCTS.forEach((p) =>
    entries.push({
      loc: SITE_URL + p.path,
      changefreq: 'monthly',
      priority: '0.8',
      images: p.gallery.map((g) => abs(g.src)),
    }),
  );
  CITIES.forEach((c) =>
    entries.push({
      loc: SITE_URL + c.path,
      changefreq: 'monthly',
      priority: '0.8',
      images: [],
    }),
  );
  return entries;
}
