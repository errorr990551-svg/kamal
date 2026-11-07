// Kamal Brand product catalogue.
// Names, ingredients, pack sizes and slogans follow the official Kamal Brand catalogue.
// Only facts from the catalogue are stated as facts; serving ideas are general suggestions.

const img = (slug, n, size) => `/img/${slug}-${n}-${size}.webp`;

const raw = [
  {
    slug: 'jhal-chanachur',
    name: 'Jhal Chanachur',
    altNames: ['Spicy Chanachur', 'Jhal Mixture', 'Teekha Chanachur'],
    tag: 'Spicy Bengal Mix',
    taste: 'Spicy',
    headline: 'Jhal Chanachur – Spicy Mix, Ultimate Crunch',
    slogan: 'Teekha Swad, Zabardast Crunch',
    sizes: ['400 g', '200 g'],
    ingredients: ['Chana besan (gram flour)', 'Maize chips', 'Roasted peanuts', 'Spice blend', 'Edible vegetable oil'],
    summary:
      'A bold and flavourful blend crafted from premium chana besan, crunchy maize chips and roasted peanuts, seasoned with a rich mix of spices and prepared in high-quality edible oil.',
    about: [
      'In Bengal, "jhal" means spicy, and Jhal Chanachur is the mixture that most households reach for when the evening cha is poured. Kamal Brand Jhal Chanachur brings together crisp besan sev, crunchy maize chips and roasted peanuts, all tossed in a fiery house spice blend so that every handful has heat, salt and crunch in balance.',
      'Because the mix contains several textures, it works as much more than a packet snack. Sprinkle it over muri (puffed rice) with chopped onion, green chilli and a few drops of mustard oil for a quick jhal muri, or serve it in a bowl alongside tea when guests arrive.',
      'Jhal Chanachur is one of the strongest sellers for grocery stores, tea stalls and sweet shops. Retailers and distributors can order it in 400 g and 200 g packs for steady, everyday demand.',
    ],
    enjoy: ['With evening tea or coffee', 'Mixed into jhal muri with onion, chilli and mustard oil', 'As a party or travel snack', 'As a crunchy topping for chaat'],
    images: [1, 2, 3],
  },
  {
    slug: 'mitha-chanachur',
    name: 'Mitha Chanachur',
    altNames: ['Sweet Chanachur', 'Meetha Chanachur'],
    tag: 'Sweet & Tangy',
    taste: 'Sweet & savoury',
    headline: 'Mitha Chanachur – Sweet Twist, Perfect Crunch',
    slogan: 'Meetha Bhi, Crunchy Bhi',
    sizes: ['400 g', '200 g'],
    ingredients: ['Chana besan (gram flour)', 'Maize chips', 'Peanuts', 'Sugar', 'Spice blend', 'Edible vegetable oil'],
    summary:
      'A delightful blend of premium chana besan, crispy maize chips and crunchy peanuts, coated with a hint of sweetness and a balanced mix of spices, prepared in high-quality edible oil.',
    about: [
      'Mitha Chanachur is for anyone who loves a sweet-and-savoury snack. The same crunchy base of besan sev, maize chips and peanuts gets a light sweet coating, balanced with mild spices, so it is gentle enough for children and elders while still full of flavour.',
      'It is a favourite in gift boxes and festive platters because it pairs well with spicy namkeen. Many families keep a packet of Mitha Chanachur next to Jhal Chanachur so everyone can pick the taste they like.',
      'Available in 400 g and 200 g packs, Mitha Chanachur is a reliable add-on for retailers who want to offer a non-spicy option on the same shelf.',
    ],
    enjoy: ['With tea for a sweet-savoury break', 'For children and guests who prefer less spice', 'In festive and gift platters', 'Mixed half-and-half with Jhal Chanachur'],
    images: [1, 2, 3],
  },
  {
    slug: 'bhujia',
    name: 'Bhujia',
    altNames: ['Bhujiya', 'Besan Bhujia'],
    tag: 'Classic Namkeen',
    taste: 'Mildly spicy',
    headline: 'Bhujia – Classic Crunch with a Spicy Kick',
    slogan: 'Halka Teekha, Full Maza',
    sizes: ['380 g', '180 g'],
    ingredients: ['Besan (gram flour)', 'Spice blend', 'Salt', 'Edible vegetable oil'],
    summary:
      'Made from premium quality besan and seasoned with a perfect blend of spices, our bhujia has a crispy texture and a mildly spicy taste. Fried in high-quality edible oil, each strand offers freshness, rich flavour and a satisfying crunch.',
    about: [
      'Bhujia is the classic Indian namkeen: thin, crisp strands of seasoned besan that crumble pleasantly with every bite. Kamal Brand Bhujia is made from premium besan with a mild spice level ("halka teekha"), so it suits all ages and every time of day.',
      'Bhujia is also an ingredient. Sprinkle it over poha, upma, chaat, dahi vada or a simple bowl of curd rice to add instant crunch and seasoning.',
      'With 380 g family packs and 180 g packs, Bhujia moves fast in grocery stores, kirana shops and canteens, which makes it an essential line for every dealer.',
    ],
    enjoy: ['Straight from the pack with tea', 'Sprinkled over poha, upma or chaat', 'With curd or dahi vada', 'In lunch boxes and travel bags'],
    images: [1, 2, 3],
  },
  {
    slug: 'sev',
    name: 'Sev',
    altNames: ['Sew', 'Besan Sev', 'Plain Sev'],
    tag: 'Golden Crisp Sev',
    taste: 'Lightly seasoned',
    headline: 'Sev (Sew) – Light Crunch, Delightful Flavour',
    slogan: 'Simple Taste, Pure Delight',
    sizes: ['380 g', '180 g'],
    ingredients: ['Besan (gram flour)', 'Mild spice blend', 'Salt', 'Edible vegetable oil'],
    summary:
      'Crafted from premium quality besan and seasoned with a subtle blend of spices, our sev offers a light, crispy texture with a smooth, flavourful taste and a melt-in-the-mouth experience.',
    about: [
      'Kamal Brand Sev (also written "Sew" on our packs) is fine, golden and delicately seasoned. It is lighter and milder than bhujia, with a melt-in-the-mouth crunch that people of every age enjoy.',
      'Sev is a kitchen essential. It is the finishing touch on bhel puri, sev puri, papdi chaat, ragda, jhal muri and ghugni, and it adds crunch to salads and sandwiches.',
      'Packed in 380 g and 180 g sizes, Sev is popular with chaat and street-food vendors as well as households, so retailers and food businesses order it in bulk.',
    ],
    enjoy: ['On bhel puri, sev puri and papdi chaat', 'Over ghugni, ragda or jhal muri', 'As a light tea-time snack', 'Sprinkled on salads and sandwiches'],
    images: [1, 2, 3],
  },
  {
    slug: 'papdi-gathiya',
    name: 'Papdi Gathiya',
    altNames: ['Papdigathia', 'Papdi Gathia', 'Papdighatia'],
    tag: 'Crispy Tea Snack',
    taste: 'Savoury with ajwain',
    headline: 'Papdi Gathiya – A Crunch of Pure Perfection',
    slogan: 'Ek Baar Try Karo, Fan Ban Jao',
    sizes: ['180 g', '90 g'],
    ingredients: ['Chana besan (gram flour)', 'Carom seeds (ajwain)', 'Spice blend', 'Edible vegetable oil'],
    summary:
      'Crafted from finest chana besan and blended with aromatic carom seeds (ajwain), every bite of Papdi Gathiya is light, crispy and perfectly seasoned with premium spices, fried in high-quality edible oil for freshness and flavour.',
    about: [
      'Papdi Gathiya is a flat, crisp gathiya made from chana besan and fragrant ajwain (carom seeds). The ajwain gives it a warm, slightly peppery aroma that makes it a perfect match for a hot cup of tea.',
      'Its flat shape means it snaps cleanly and stays crunchy, which is why it is a favourite morning and evening snack in homes, offices and tea stalls.',
      'Sold in 180 g and 90 g packs (and other sizes on request), Papdi Gathiya is an easy, affordable impulse buy for retail counters.',
    ],
    enjoy: ['With masala chai', 'With green chutney or fried chillies', 'As an office or travel snack', 'In festive namkeen platters'],
    images: [1, 2, 3],
  },
  {
    slug: 'phool-gathiya',
    name: 'Phool Gathiya',
    altNames: ['Fulgathia', 'Fulghatia', 'Phool Gathia'],
    tag: 'Traditional Taste',
    taste: 'Light & airy',
    headline: 'Phool Gathiya – Light Crunch, Rich Taste',
    slogan: 'Light Bhi, Tasty Bhi',
    sizes: ['180 g', '90 g'],
    ingredients: ['Chana besan (gram flour)', 'Carom seeds (ajwain)', 'Spice blend', 'Edible vegetable oil'],
    summary:
      'Made from premium chana besan and infused with aromatic carom seeds, our phool gathiya has a light, fluffy texture and a perfectly balanced blend of spices: crispy yet airy, light to eat and rich in taste.',
    about: [
      '"Phool" means flower, and Phool Gathiya is named for its puffed, airy texture. Made from chana besan with ajwain and a balanced spice blend, it is crisp on the outside and almost melts in the mouth.',
      'Because it is so light, Phool Gathiya is easy to snack on at any hour, whether with tea, as a side with meals or on its own.',
      'Available in 180 g and 90 g packs (other sizes on request), it sits well next to Papdi Gathiya for customers who want a softer crunch.',
    ],
    enjoy: ['With tea or coffee', 'As a light side with meals', 'For children and elders who prefer a softer crunch', 'In mixed namkeen platters'],
    images: [1, 2, 3],
  },
  {
    slug: 'chana-dal',
    name: 'Chana Dal',
    altNames: ['Chana Dal Namkeen', 'Fried Chana Dal', 'Masala Chana Dal'],
    tag: 'Spicy & Crunchy',
    taste: 'Spicy',
    headline: 'Chana Dal – Crunchy Bites with a Spicy Punch',
    slogan: 'Crunch Karo, Spice Mehsoos Karo',
    sizes: ['500 g'],
    ingredients: ['Chana dal (split Bengal gram)', 'Peanuts', 'Spice blend', 'Edible vegetable oil'],
    summary:
      'Made from carefully selected chana dal and crunchy peanuts, perfectly seasoned with a bold blend of spices. Fried in high-quality edible oil for a crisp texture and fresh taste in every bite.',
    about: [
      'Chana Dal namkeen is one of India\'s most loved protein-rich snacks. Kamal Brand uses carefully selected split Bengal gram, fried until crisp and mixed with crunchy peanuts, then seasoned with a bold spice blend.',
      'Each bite is crunchy and filling, which makes it a good snack between meals and a popular choice in bars, canteens and tea stalls.',
      'The 500 g pack is ideal for households that snack every day and for retailers who want a high-value pack on the shelf.',
    ],
    enjoy: ['With tea or a cold drink', 'Mixed with chopped onion, tomato and lemon as a quick chaat', 'As a filling between-meal snack', 'In namkeen platters for guests'],
    images: [1, 2],
  },
  {
    slug: 'fried-chura',
    name: 'Fried Chura',
    altNames: ['Chire Bhaja', 'Chura Bhaja', 'Poha Chivda', 'Chura Mixture'],
    tag: 'Crispy Poha Mix',
    taste: 'Sweet, tangy & mildly spicy',
    headline: 'Fried Chura – Sweet, Tangy & Spicy Crunch',
    slogan: 'Har Bite Mein Chatpata Maza',
    sizes: ['200 g'],
    ingredients: ['Chura (flattened rice / poha)', 'Peanuts', 'Sev', 'Maize chips', 'Curry leaves', 'Spice blend', 'Edible vegetable oil'],
    summary:
      'A delightful mix of crispy chura blended with peanuts, sev, maize chips and aromatic curry leaves, seasoned with a flavourful spice blend for a balance of sweet, tangy and mildly spicy taste.',
    about: [
      'Fried Chura (chire bhaja, also known as poha chivda in other regions) is made from flattened rice fried until light and crisp. Kamal Brand mixes it with peanuts, sev, maize chips and fragrant curry leaves, then seasons it so every bite is a little sweet, a little tangy and mildly spicy.',
      'It is light, crunchy and not too heavy, which makes it a popular snack in Bengal for Bijoya, Diwali and other festivals, as well as everyday tea time.',
      'The 200 g pack is easy to carry and easy to gift, and it fits neatly into festive hampers.',
    ],
    enjoy: ['With tea during festivals and gatherings', 'As a light travel snack', 'In Bijoya and Diwali gift hampers', 'For children\'s tiffin'],
    images: [1, 2],
  },
  {
    slug: 'salted-peanuts',
    name: 'Salted Badam (Peanuts)',
    altNames: ['Salted Badam', 'Salted Peanuts', 'Lal Badam'],
    tag: 'Crunchy Roasted',
    taste: 'Salted & savoury',
    headline: 'Salted Badam – Simple Taste, Premium Crunch',
    slogan: 'Crunchy, Nutty, Perfectly Salted',
    sizes: ['500 g'],
    ingredients: ['Peanuts (lal badam)', 'Salt', 'Mild spice blend', 'Edible vegetable oil'],
    summary:
      'Carefully selected lal badam (red-skinned peanuts), roasted and lightly seasoned with salt and a subtle spice blend to bring out their natural flavour: rich, crunchy and clean-tasting.',
    about: [
      'In Bengal and eastern India, "badam" usually means peanuts, and lal badam are the red-skinned peanuts loved for their nutty flavour. Kamal Brand Salted Badam keeps things simple: good peanuts, roasted and lightly seasoned with salt and a subtle spice blend.',
      'Salted peanuts are a natural source of plant protein and a satisfying, crunchy snack. Enjoy them on their own, add them to jhal muri and chaat, or serve them with drinks.',
      'The 500 g pack offers good value for families and for shops, canteens and hotels that sell peanuts loose or by the plate.',
    ],
    enjoy: ['As an anytime protein-rich snack', 'Mixed into jhal muri or chaat', 'Served with drinks', 'With chopped onion, chilli and lemon as masala badam'],
    images: [1, 2],
  },
  {
    slug: 'masala-matar',
    name: 'Masala Matar',
    altNames: ['Masala Green Peas', 'Fried Green Peas', 'Chatpata Matar'],
    tag: 'Chatpata Green Peas',
    taste: 'Spicy',
    headline: 'Masala Matar – Crispy Bites with a Spicy Kick',
    slogan: 'Teekha Swad, Crispy Maza',
    sizes: ['500 g'],
    ingredients: ['Green peas (matar)', 'Spice blend', 'Salt', 'Edible vegetable oil'],
    summary:
      'Made from carefully selected green matar and seasoned with a bold blend of spices, this snack delivers a crunchy texture with a rich, spicy taste. Fried in high-quality edible oil for freshness and crispiness.',
    about: [
      'Masala Matar turns green peas into a crunchy, chatpata snack. Kamal Brand selects good-quality peas, fries them crisp and coats them in a bold masala, so they pop with flavour.',
      'They are easy to snack on by the handful and pair well with tea or cold drinks. Many people also mix them with chanachur or bhujia for a homemade mixture.',
      'The 500 g pack is a good-value option for families, and retailers can stock it alongside chana dal and peanuts.',
    ],
    enjoy: ['As a crunchy, spicy handful snack', 'With tea or cold drinks', 'Mixed with chanachur or bhujia', 'In namkeen platters for guests'],
    images: [1, 2],
  },
];

export const PRODUCTS = raw.map((p) => {
  // Packet photos (2, 3...) first on product pages; plain product shot (1) first on the home grid.
  const packetFirst = [...p.images.slice(1), p.images[0]];
  return {
    ...p,
    path: `/products/${p.slug}`,
    sizesText: p.sizes.join(' & '),
    thumbs: p.images.map((n) => img(p.slug, n, 360)),
    gallery: packetFirst.map((n) => ({ src: img(p.slug, n, 800), thumb: img(p.slug, n, 360) })),
  };
});

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const productMatches = (p, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [p.name, p.headline, p.summary, p.tag, ...p.altNames, ...p.ingredients]
    .join(' ')
    .toLowerCase()
    .includes(q);
};
