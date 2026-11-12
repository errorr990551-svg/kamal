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
| `/` Home | **namkeen manufacturer in West Bengal** | Kamal Brand namkeen, namkeen manufacturer Raniganj, Paschim Bardhaman, chanachur bhujia sev |
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
| `/dealership` | **namkeen distributorship in West Bengal** | namkeen dealership West Bengal, namkeen distributor, chanachur distributorship |
| `/mixture-manufacturer-distributor` | mixture manufacturer in West Bengal | mixture distributor West Bengal, chanachur supplier West Bengal |
| `/contract` | namkeen contract manufacturing | private label namkeen, third party namkeen manufacturer |
| `/hampers` | namkeen gift hamper | Diwali namkeen gift box, Bijoya gift, corporate gift hamper |
| `/contact` | Kamal Brand contact | namkeen wholesale Raniganj |

Note: "Bikaneri Bhujia" was removed from the site. *Bikaneri Bhujia* is a GI-tagged product of Bikaner, and the Kamal Brand catalogue describes a besan bhujia, so using that name could be misleading.

## 2a. City pages: "mixture manufacturer / distributor / dealership in {city}"

There are 20 city pages plus one hub page that links to all of them. Each city page targets three searches:

- **mixture manufacturer in {city}**: used in the H1, the title and the opening paragraph.
- **mixture distributor in {city}**: used in the "Become a Mixture Distributor in {city}" section and the FAQs.
- **mixture dealership in {city}**: used in the subtitle, the dealership button, the "3 steps" block and the FAQs.

All 10 products are shown on every page. Each page also picks out the 3 to 4 products that suit that city's buyers.

| City | URL |
|---|---|
| Hub (all cities) | `/mixture-manufacturer-distributor` |
| Raniganj | `/mixture-manufacturer-distributor/raniganj` |
| Asansol | `/mixture-manufacturer-distributor/asansol` |
| Durgapur | `/mixture-manufacturer-distributor/durgapur` |
| Bardhaman (Burdwan) | `/mixture-manufacturer-distributor/bardhaman` |
| Bolpur (Santiniketan) | `/mixture-manufacturer-distributor/bolpur` |
| Suri | `/mixture-manufacturer-distributor/suri` |
| Bankura | `/mixture-manufacturer-distributor/bankura` |
| Purulia | `/mixture-manufacturer-distributor/purulia` |
| Kolkata | `/mixture-manufacturer-distributor/kolkata` |
| Howrah | `/mixture-manufacturer-distributor/howrah` |
| Barasat | `/mixture-manufacturer-distributor/barasat` |
| Krishnanagar | `/mixture-manufacturer-distributor/krishnanagar` |
| Kharagpur | `/mixture-manufacturer-distributor/kharagpur` |
| Medinipur (Midnapore) | `/mixture-manufacturer-distributor/medinipur` |
| Haldia | `/mixture-manufacturer-distributor/haldia` |
| Berhampore (Baharampur) | `/mixture-manufacturer-distributor/berhampore` |
| Malda (English Bazar) | `/mixture-manufacturer-distributor/malda` |
| Siliguri | `/mixture-manufacturer-distributor/siliguri` |
| Jalpaiguri | `/mixture-manufacturer-distributor/jalpaiguri` |
| Cooch Behar | `/mixture-manufacturer-distributor/cooch-behar` |

**Why these are not "doorway pages"** (the thing Google penalises in city pages). Every page has content written for that city:

- The local market: who buys mixture there and where.
- The buyer types in that city.
- The festival and season calendar for that city.
- The road route from Raniganj and an approximate distance.
- The 6 surrounding towns a local distributor could cover.
- The products that suit that city's buyers.
- 2 FAQs specific to that city.
- Links to the 4 nearest cities.

Each page has 940 to 1,080 words of main content. Text overlap between any two city pages averages 35%, with a maximum of 43%. The pages make no promises about delivery days, minimum orders or prices; buyers are asked to call.

**All city facts live in one file:** `frontend/src/data/cities.js`. Please check the following there:

- The **road distances**. They are approximate and shown on the pages as "about".
- The routes, the nearby towns and the local details.
- That you really do supply, or are willing to supply, every listed city.

Correct anything that is wrong; wrong local facts hurt trust.

**To add a city:** copy one entry in `cities.js` and rewrite *all* of its text for the new city. Do not just change the name, because near-duplicate pages can get all city pages demoted. The URL, sitemap, schema, hub link and nearby-city links are created automatically.

**After deploying:**

- In Search Console, resubmit `sitemap.xml` (it now lists the hub page and the 20 city URLs).
- Request indexing for the hub page and the 3 to 5 most important cities.
- On the Google Business Profile, set the service areas to these cities.
- Link IndiaMART and JustDial listings to the hub page.

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
