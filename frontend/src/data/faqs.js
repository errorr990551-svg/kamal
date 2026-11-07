import { BUSINESS } from './site';

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
