import { BUSINESS, MARKET_AREAS } from './site';

const MAIN_CITIES = 'Raniganj, Asansol, Durgapur, Bardhaman, Bolpur, Bankura, Purulia, Kolkata, Howrah, Kharagpur, Malda and Siliguri';

export const GENERAL_FAQS = [
  {
    q: 'Where are Kamal Brand namkeen products made?',
    a: `Kamal Brand namkeen is made in ${BUSINESS.address.locality}, ${BUSINESS.address.district} district, ${BUSINESS.address.region}. Every product is prepared from besan, pulses, peanuts and spices and fried in high-quality edible oil.`,
  },
  {
    q: 'Which namkeen products does Kamal Brand make?',
    a: 'Our range includes Jhal Chanachur, Mitha Chanachur, Bhujia, Sev (Sew), Papdi Gathiya, Phool Gathiya, Chana Dal, Fried Chura, Salted Badam (peanuts) and Masala Matar, in pack sizes from 90 g to 500 g.',
  },
  {
    q: 'Can I buy Kamal Brand namkeen in bulk or wholesale?',
    a: `Yes. Retailers, wholesalers, sweet shops, canteens and caterers can order in bulk. Use the enquiry form on this website or call ${BUSINESS.phones[0].display} and our sales team will share a quote.`,
  },
  {
    q: 'How can I become a Kamal Brand dealer or distributor?',
    a: 'Fill in the dealership application on the Apply For Dealership page with your name, agency, address, state and phone number. Our team reviews every application and calls you to discuss your area, product mix and order quantity.',
  },
  {
    q: 'Which cities in West Bengal does Kamal Brand supply?',
    a: `As a namkeen manufacturer in West Bengal, we take bulk orders from ${MAIN_CITIES}, along with other towns in ${MARKET_AREAS.length} regions listed in the Market Areas section. Share your location and our team will confirm delivery for your area.`,
  },
  {
    q: 'Do you supply outside West Bengal?',
    a: 'Dealer, distributor and bulk enquiries from other states are welcome. Share your location in the form and our team will confirm supply and logistics for your area.',
  },
  {
    q: 'Do you offer contract manufacturing or private label namkeen?',
    a: 'Yes. Through our contract manufacturing service we can produce namkeen for your brand. Tell us the product, quantity, pack size and timeline on the Contract Manufacturing page and we will get back to you.',
  },
  {
    q: 'Do you make namkeen gift hampers?',
    a: 'Yes. We make festive and corporate namkeen hampers for Diwali, Bijoya, Holi, weddings and business gifting. You can choose the products and quantity on the Hampers page.',
  },
  {
    q: 'How should I store namkeen after opening the pack?',
    a: 'Close the pack tightly or move the namkeen to an airtight container, and keep it in a cool, dry place away from moisture and direct sunlight to keep it crunchy.',
  },
];

export const DEALER_FAQS = [
  {
    q: 'Who can apply for a Kamal Brand dealership?',
    a: 'Grocery and kirana shop owners, wholesalers, stockists, super-stockists and distribution agencies can apply. Tell us about your business and the area you cover.',
  },
  {
    q: 'Is a Kamal Brand namkeen distributorship available in my city?',
    a: `We are appointing dealers and distributors across West Bengal, including ${MAIN_CITIES}. Apply with your town and the area you cover, and we will tell you if your territory is open.`,
  },
  {
    q: 'What information do I need to apply?',
    a: 'Your name, agency or business name, full address, state and phone number. You can also mention your expected order quantity and the products you want to focus on.',
  },
  {
    q: 'Which products sell best for dealers?',
    a: 'Jhal Chanachur, Bhujia and Sev are everyday sellers, while Mitha Chanachur, Gathiya, Chana Dal, Masala Matar, Fried Chura and Salted Badam help you offer a complete namkeen shelf.',
  },
  {
    q: 'How quickly will I hear back?',
    a: `Our team aims to call every applicant quickly, usually on the same day. You can also call us directly on ${BUSINESS.phones[0].display} or ${BUSINESS.phones[1].display}.`,
  },
];

export const CONTRACT_FAQS = [
  {
    q: 'What can you manufacture for my brand?',
    a: 'We manufacture besan- and pulse-based namkeen such as bhujia, sev, gathiya, chanachur mixtures, chana dal, fried chura, masala peanuts and masala matar. Share your requirement and we will confirm feasibility.',
  },
  {
    q: 'Can the recipe or spice level be customised?',
    a: 'Yes. Spice level, sweetness, seasoning and pack size can be discussed to match your target market.',
  },
  {
    q: 'What details should I include in my enquiry?',
    a: 'The product, quantity, pack size, the date you need it by and the purpose (for example retail, export or white label). Any extra packaging or recipe notes help us quote accurately.',
  },
];

export const productFaqs = (product) => [
  {
    q: `What pack sizes is Kamal Brand ${product.name} available in?`,
    a: `${product.name} is available in ${product.sizesText} packs. For bulk or wholesale quantities, send an enquiry or call ${BUSINESS.phones[0].display}.`,
  },
  {
    q: `What is ${product.name} made of?`,
    a: `Kamal Brand ${product.name} is made with ${product.ingredients.join(', ').toLowerCase()}.`,
  },
  {
    q: `How does ${product.name} taste?`,
    a: `${product.taste}. ${product.summary}`,
  },
  {
    q: `Can I buy ${product.name} wholesale or become a dealer?`,
    a: `Yes. Retailers, wholesalers and distributors can order ${product.name} directly from the manufacturer in Raniganj, West Bengal. Apply on our dealership page or send an enquiry for bulk prices.`,
  },
];

// City pages: the city's own questions first, then three shared questions written around the city's details.
export const cityFaqs = (city) => [
  {
    q: `Is Kamal Brand a mixture manufacturer in ${city.name}?`,
    a:
      city.km === 0
        ? `Yes. Kamal Brand's factory is in ${city.name}, where we make chanachur mixture, bhujia, sev, gathiya and other namkeen. Local shops, wholesalers and distributors can buy directly from the manufacturer.`
        : `Kamal Brand manufactures in Raniganj, about ${city.km} km from ${city.name}, and supplies ${city.name} directly from the factory. Shops, wholesalers and distributors in ${city.name} buy from the manufacturer, not through a middle layer.`,
  },
  ...city.faqs,
  {
    q: `How do I get a mixture distributorship or dealership in ${city.name}?`,
    a: `Fill in the dealership application on our Apply For Dealership page, mention ${city.name} and the towns you cover (for example ${city.nearby.slice(0, 3).join(', ')}), or call ${BUSINESS.phones[0].display}. Our team will call you to discuss the territory, product mix and terms.`,
  },
];

export const HUB_FAQS = [
  {
    q: 'What does "mixture" mean in West Bengal?',
    a: 'In Bengal, "mixture" usually means chanachur: a crunchy blend of besan sev, maize chips, peanuts and spices. Kamal Brand makes spicy Jhal Chanachur, sweet-savoury Mitha Chanachur and a Fried Chura mixture, along with single-variety namkeen such as bhujia, sev and gathiya.',
  },
  {
    q: 'Where is the Kamal Brand mixture factory?',
    a: `Our factory is in ${BUSINESS.address.locality}, ${BUSINESS.address.district} district, West Bengal, on NH19. From here we supply cities across the state, from Asansol and Durgapur to Kolkata, Kharagpur, Malda and Siliguri.`,
  },
  {
    q: 'My city is not on the list. Can I still apply?',
    a: 'Yes. The cities listed are our main markets, but we welcome dealer and distributor applications from any town in West Bengal and from neighbouring states. Tell us your location and coverage when you apply.',
  },
  {
    q: 'What is the difference between a dealer and a distributor?',
    a: 'A distributor usually holds stock and supplies many retailers across an area, while a dealer or retailer sells to end customers from a shop. Kamal Brand works with both: apply with details of your business and we will suggest the right arrangement.',
  },
];
