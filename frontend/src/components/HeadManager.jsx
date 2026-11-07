import { useEffect } from 'react';
import { getSeo } from '../data/seo';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (content == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Keeps <title>, description, canonical, Open Graph and JSON-LD in sync during client-side navigation.
// The prerendered HTML already contains the same tags for each page, so crawlers get them without JS.
export default function HeadManager({ path }) {
  useEffect(() => {
    const seo = getSeo(path);
    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', seo.robots);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', seo.canonical);
    setMeta('property', 'og:image', seo.image);
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.image);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (seo.canonical) {
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = seo.canonical;
    } else {
      link?.remove();
    }

    let ld = document.getElementById('seo-jsonld');
    if (seo.jsonLd) {
      if (!ld) {
        ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.id = 'seo-jsonld';
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(seo.jsonLd);
    } else {
      ld?.remove();
    }
  }, [path]);

  return null;
}
