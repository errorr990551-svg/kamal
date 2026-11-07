// Prerenders every route to static HTML after `vite build` so search engines (and users on slow phones)
// get complete content, titles, descriptions, canonical tags and structured data without running JavaScript.
//
// Output:
//   dist/index.html                  -> /
//   dist/pages/<route>.html          -> /products, /dealership, ... (served by .htaccess rewrites)
//   dist/pages/products/<slug>.html  -> /products/<slug>
//   dist/pages/404.html              -> 404 page
//   dist/sitemap.xml
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');
const serverEntry = ['entry-server.js', 'entry-server.mjs'].map((f) => path.join(serverDir, f)).find((f) => fs.existsSync(f));
if (!serverEntry) throw new Error('SSR bundle not found in dist-server/');

const { render, getSeo, ALL_PATHS, sitemapEntries } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> placeholders');
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headFor(seo) {
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${esc(seo.robots)}" />`,
    seo.canonical && `<link rel="canonical" href="${esc(seo.canonical)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    seo.canonical && `<meta property="og:url" content="${esc(seo.canonical)}" />`,
    `<meta property="og:image" content="${esc(seo.image)}" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(seo.image)}" />`,
    seo.jsonLd && `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

function page(urlPath) {
  const seo = getSeo(urlPath);
  const html = render(urlPath);
  return template.replace('<!--app-head-->', headFor(seo)).replace('<!--app-html-->', html);
}

function write(rel, content) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

let count = 0;
for (const p of ALL_PATHS) {
  write(p === '/' ? 'index.html' : `pages${p}.html`, page(p));
  count++;
}
write('pages/404.html', page('/404-not-found'));

const today = new Date().toISOString().slice(0, 10);
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const urls = sitemapEntries()
  .map(
    (e) => `  <url>
    <loc>${xmlEsc(e.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>${e.images.map((src) => `\n    <image:image><image:loc>${xmlEsc(src)}</image:loc></image:image>`).join('')}
  </url>`,
  )
  .join('\n');
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`,
);

fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`✓ Prerendered ${count} pages + 404, and wrote sitemap.xml`);
