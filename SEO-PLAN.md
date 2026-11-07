# Kamal Brand – SEO & Promotion Plan

## 1. What is already built into the website

| Area | What was done |
|---|---|
| Crawlability | Every page is **prerendered to static HTML** at build time (`frontend/scripts/prerender.mjs`), so Google, Bing and WhatsApp/Facebook previews see the full content without running JavaScript. All menus and cards are real `<a href>` links. |
| Pages | 17 indexable URLs: 7 main pages + **10 product pages** (`/products/jhal-chanachur`, `/products/bhujia`, …), each with unique content, ingredients, pack sizes, serving ideas and FAQs. |
| Meta | Unique `<title>`, meta description, canonical URL, Open Graph and Twitter tags on every page. |
| Structured data | Organization, WebSite, WebPage, BreadcrumbList, ItemList (products) and FAQPage JSON-LD. |
| Sitemap | `sitemap.xml` is regenerated on every build, with all 17 URLs and 27 product images. |
| robots.txt | Allows everything except the deploy script, the API and raw prerender files. |
| 404s | Unknown URLs return a real HTTP 404 with a helpful page (no "soft 404s"). |
| Speed | Product thumbnails cut from ~400 KB to ~45 KB each; home page went from **~11 MB to ~0.75 MB**. Lazy loading and correct image sizes. |
| Mobile | 16px form fields (no iOS zoom), large tap targets, sticky **Call Now / Get Quote** bar, scrollable enquiry popup, no horizontal scroll. Tested on iPhone SE, iPhone 13, Pixel 7, iPad Mini, 1024px laptop and 1366px desktop. |

## 2. Keyword map (which page targets which searches)

Keyword ideas come from what buyers and competitors in West Bengal actually list (IndiaMART, TradeIndia and distributor directories). There is no paid keyword tool connected, so **check monthly volumes in Google Search Console or Google Keyword Planner** after launch and adjust.

| Page | Primary keywords | Supporting keywords |
|---|---|---|
| `/` Home | Kamal Brand namkeen, namkeen manufacturer Raniganj | namkeen manufacturer West Bengal, Paschim Bardhaman, Asansol, Durgapur, chanachur bhujia sev |
| `/products` | namkeen products, chanachur bhujia sev | gathiya, chana dal namkeen, masala matar, fried chura |
| `/products/jhal-chanachur` | jhal chanachur | spicy chanachur, chanachur 400g, jhal muri chanachur |
| `/products/mitha-chanachur` | mitha chanachur | sweet chanachur, meetha chanachur |
| `/products/bhujia` | bhujia namkeen | bhujiya, besan bhujia 380g |
| `/products/sev` | sev namkeen | sew, besan sev, sev for bhel/chaat |
| `/products/papdi-gathiya` | papdi gathiya | papdigathia, ajwain gathiya |
| `/products/phool-gathiya` | phool gathiya | fulgathia |
| `/products/chana-dal` | chana dal namkeen | fried chana dal, masala chana dal |
| `/products/fried-chura` | fried chura | chire bhaja, poha chivda |
| `/products/salted-peanuts` | salted badam | salted peanuts, lal badam |
| `/products/masala-matar` | masala matar | masala green peas, fried green peas |
| `/dealership` | namkeen dealership West Bengal | namkeen distributorship, namkeen distributor, chanachur distributorship |
| `/contract` | namkeen contract manufacturing | private label namkeen, third party namkeen manufacturer |
| `/hampers` | namkeen gift hamper | Diwali namkeen gift box, Bijoya gift, corporate gift hamper |
| `/contact` | Kamal Brand contact | namkeen wholesale Raniganj |

Note: "Bikaneri Bhujia" was removed from the site. *Bikaneri Bhujia* is a GI-tagged product of Bikaner, and the Kamal Brand catalogue describes a besan bhujia, so using that name could be misleading.

## 3. Promotion steps that need your accounts (do these first)

1. **Google Search Console**: add `https://kamalsnamkeen.in`, verify it, then submit `https://kamalsnamkeen.in/sitemap.xml`. Use *URL Inspection → Request indexing* for the home page, `/products` and `/dealership`.
2. **Google Business Profile** (the biggest win for local searches like "namkeen manufacturer near me"): create or claim "Kamal Brand Namkeen" with category *Snack food manufacturer* / *Food manufacturer*, your exact Raniganj address, both phone numbers, the website, hours and product photos. Add each product with its photo and a link to its product page, and ask happy dealers and customers for reviews.
3. **Bing Webmaster Tools**: import the site from Search Console (one click).
4. **B2B listings** (where dealers search): IndiaMART, TradeIndia, JustDial, ExportersIndia and GetDistributors (for the dealership offer). Use the **same name, address and phone (NAP)** everywhere and link to the matching page on the site, for example the dealership listing → `/dealership`.
5. **Social profiles**: Facebook page, Instagram and a YouTube channel (short factory and product videos). Then add the profile URLs to `sameAs` in `frontend/src/data/seo.js` (the `organization` object).
6. **WhatsApp Business** on 9932259719 with a product catalogue. If you confirm the number is on WhatsApp, a WhatsApp chat button can be added to the site.

## 4. Information that would improve rankings further (send it and it can be added)

- **Full street address with PIN code**, plus a Google Maps link (enables LocalBusiness schema and a map on `/contact`).
- **FSSAI licence number** (builds trust; it can be shown in the footer).
- **Business hours**.
- **Real photos** of the factory, packing line and team for the About page.
- **Prices or MRP** per pack (enables Google *Product* rich results with price).
- The **catalogue PDF** (the old "Download Catalog" link pointed to a file that does not exist, so it was removed). Put the file at `frontend/public/kamal-brand-catalogue.pdf` and the link can be restored.

## 5. Ongoing

- Check Search Console every month for queries, clicks and pages with errors.
- Add seasonal content before Durga Puja/Bijoya and Diwali (for example, a hamper offer on `/hampers`).
- Keep product facts in **one place**: `frontend/src/data/products.js` (products) and `frontend/src/data/site.js` (phone, email, address). The pages, schema and sitemap all update from there.
