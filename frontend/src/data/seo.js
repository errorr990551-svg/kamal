import { SITE_URL, BUSINESS, IMG } from './site';
import { PRODUCTS, getProduct } from './products';
import { GENERAL_FAQS, DEALER_FAQS, CONTRACT_FAQS, productFaqs } from './faqs';

const PAGES = {
  '/': {
    title: 'Kamal Brand Namkeen | Chanachur, Bhujia & Sev – Raniganj, West Bengal',
    description:
      'Kamal Brand makes authentic Indian namkeen in Raniganj, West Bengal: Jhal & Mitha Chanachur, Bhujia, Sev, Gathiya, Chana Dal and more. Bulk orders, dealership & private label.',
    name: 'Home',
    changefreq: 'weekly',
    priority: '1.0',
    faqs: GENERAL_FAQS,
  },
  '/products': {
    title: 'Namkeen Products – Chanachur, Bhujia, Sev, Gathiya | Kamal Brand',
    description:
      'Explore all 10 Kamal Brand namkeen products: Jhal Chanachur, Mitha Chanachur, Bhujia, Sev, Papdi Gathiya, Phool Gathiya, Chana Dal, Fried Chura, Salted Badam and Masala Matar.',
    name: 'Our Products',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/dealership': {
    title: 'Namkeen Dealership & Distributorship in West Bengal | Kamal Brand',
    description:
      'Apply for a Kamal Brand namkeen dealership or distributorship. Fast-moving chanachur, bhujia and sev, reliable supply and direct support. Apply online in 2 minutes.',
    name: 'Apply For Dealership',
    changefreq: 'monthly',
    priority: '0.9',
    faqs: DEALER_FAQS,
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
      'Private label and third-party namkeen manufacturing in West Bengal: bhujia, sev, gathiya, chanachur, chana dal and more, made to your recipe, pack size and timeline.',
    name: 'Contract Manufacturing',
    changefreq: 'monthly',
    priority: '0.8',
    faqs: CONTRACT_FAQS,
  },
  '/about': {
    title: 'About Kamal Brand – Namkeen Manufacturer in Raniganj, West Bengal',
    description:
      'Learn about Kamal Brand, a namkeen manufacturer in Raniganj, Paschim Bardhaman. Traditional recipes, premium besan and spices, hygienic processing and sealed packing.',
    name: 'About Us',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/contact': {
    title: 'Contact Kamal Brand Namkeen – Raniganj | Call +91 99322 59719',
    description:
      'Contact Kamal Brand for bulk namkeen orders, dealership, gift hampers and contract manufacturing. Call +91 99322 59719 / +91 89007 43299 or email kamalsbrand@gmail.com.',
    name: 'Contact',
    changefreq: 'monthly',
    priority: '0.7',
  },
};

export const STATIC_PATHS = Object.keys(PAGES);
export const ALL_PATHS = [...STATIC_PATHS, ...PRODUCTS.map((p) => p.path)];

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
      description: `Kamal Brand ${p.name}: ${p.taste.toLowerCase()} namkeen made with ${p.ingredients
        .slice(0, 2)
        .map((i) => i.replace(/\s*\(.*\)/, '').toLowerCase())
        .join(' & ')}. ${p.sizesText} packs. "${p.slogan}". Bulk orders & dealership from Raniganj, West Bengal.`,
      image: abs(p.gallery[0].src),
    };
  } else {
    meta = { ...PAGES[route.key], image: abs(IMG.og) };
  }

  const crumbs = getBreadcrumbs(route);
  if (crumbs.length) graph.push(breadcrumbs(crumbs));

  const faqs = route.product ? productFaqs(route.product) : PAGES[route.key].faqs;
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
  return entries;
}
