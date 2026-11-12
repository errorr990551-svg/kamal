// City landing pages: "mixture manufacturer / distributor / dealership in <city>".
//
// Every city has its own written content (local market, buyers, route from the factory,
// nearby towns and city-specific FAQs) so the pages are genuinely different, not copies
// with the city name swapped. Road distances are approximate figures from Raniganj and are
// labelled "about" on the page.
//
// Only general, well-known facts about each city are used. Business promises (delivery days,
// prices, minimum orders) are not stated: buyers are asked to call for current terms.

export const CITY_HUB_PATH = '/mixture-manufacturer-distributor';

const raw = [
  // ---------------------------------------------------------------- Paschim Bardhaman
  {
    slug: 'raniganj',
    name: 'Raniganj',
    alt: [],
    district: 'Paschim Bardhaman',
    region: 'Paschim Bardhaman',
    km: 0,
    route: 'Our factory is in Raniganj, on NH19 (the old Grand Trunk Road)',
    short: 'Our home town and factory location, on NH19 in the coal belt.',
    intro:
      'Raniganj is where Kamal Brand mixture is made. Our factory here prepares every batch of jhal chanachur, mitha chanachur, bhujia, sev, gathiya and the rest of our range, so buyers in Raniganj deal with the manufacturer at its own doorstep, with no middle layer between the frying pan and your shop.',
    market:
      'Raniganj is one of the oldest trading towns of the coal belt. Commercial coal mining in India began in the Raniganj Coalfield in the 18th century, and the town grew as a bazaar for the collieries, railway workers and traders around it. That history still shapes demand today: tea stalls at colliery gates, dhabas on NH19 that serve truck drivers around the clock, and dense kirana markets where a packet of chanachur is an everyday purchase.',
    buyers: [
      { t: 'Kirana and grocery shops', d: 'Fast-moving 200 g and 400 g chanachur packs for daily household buying.' },
      { t: 'NH19 dhabas and tea stalls', d: 'Truck drivers and travellers buy small packs of mixture, bhujia and salted badam with tea.' },
      { t: 'Colliery and industrial canteens', d: 'Regular bulk supply for shift workers in the coalfield and the Mangalpur industrial area.' },
      { t: 'Sweet shops and caterers', d: 'Sev and bhujia for chaat counters, and mixed namkeen for weddings and pujas.' },
    ],
    logistics:
      'Because the factory is in Raniganj, local buyers can call and arrange supply quickly, and repeat orders are easy to top up when a fast seller runs low. Raniganj is also our starting point for every other route: NH19 runs east to Durgapur, Bardhaman and Kolkata and west to Asansol, and the highway south through Bankura connects us to Medinipur and Kharagpur.',
    nearby: ['Searsol', 'Mangalpur', 'Ballavpur', 'Jamuria', 'Andal', 'Pandabeswar'],
    picks: ['jhal-chanachur', 'bhujia', 'salted-peanuts', 'chana-dal'],
    picksNote:
      'In the coal belt, spicy flavours lead: Jhal Chanachur and Chana Dal are the usual first order, while Bhujia and Salted Badam sell steadily to tea stalls and dhabas.',
    seasons:
      'Demand in Raniganj climbs through the festive run from Durga Puja to Kali Puja and Diwali, and again for Chhath, which is widely celebrated across the coal belt. The winter picnic season and the November to February wedding season bring bulk orders from caterers and families, so shops here usually stock deeper from October onwards.',
    faqs: [
      {
        q: 'Can I buy mixture directly from the factory in Raniganj?',
        a: 'Yes. Kamal Brand is manufactured in Raniganj, so local shops, wholesalers and caterers can buy directly from us. Call +91 99322 59719 with the products and quantity you need and our team will arrange the order.',
      },
      {
        q: 'Do you supply dhabas and tea stalls on NH19 near Raniganj?',
        a: 'Yes. Small packs of Jhal Chanachur, Bhujia, Chana Dal and Salted Badam suit highway dhabas and tea stalls. Tell us your location and how many outlets you run, and we will suggest a product mix.',
      },
    ],
    near: ['asansol', 'durgapur', 'bankura', 'suri'],
  },
  {
    slug: 'asansol',
    name: 'Asansol',
    alt: [],
    district: 'Paschim Bardhaman',
    region: 'Paschim Bardhaman',
    km: 18,
    route: 'West along NH19 from Raniganj',
    short: 'About 18 km west on NH19; railway hub and the largest city of the coal belt.',
    intro:
      'Asansol is the largest city in the coal and steel belt of western Bengal, and it is only about 18 km from our Raniganj factory. That makes Kamal Brand one of the closest mixture manufacturers to Asansol: shops, wholesalers and distributors here can order chanachur, bhujia, sev and gathiya fresh from the factory and restock quickly.',
    market:
      'Asansol is a major railway junction and the headquarters of the Asansol division of Eastern Railway, and the city is surrounded by colliery townships and the steel plant at Burnpur. Thousands of people pass through its stations and bus stands every day, and the city has a large population of working families who buy namkeen weekly. Demand is spread between dense bazaar areas, station and bus-stand vendors, and the industrial townships around the city.',
    buyers: [
      { t: 'Wholesalers and stockists', d: 'Supply chains into Kulti, Barakar, Burnpur and Jamuria from an Asansol base.' },
      { t: 'Station and bus-stand vendors', d: 'Quick-selling small packs of chanachur and bhujia for travellers.' },
      { t: 'Township and colliery shops', d: 'Steady weekly demand from steel and colliery townships.' },
      { t: 'Canteens and hostels', d: 'Bulk namkeen for industrial canteens, hostels and institutions.' },
    ],
    logistics:
      'Asansol is a short run west along NH19 from our factory, close enough for frequent top-up orders instead of large, slow-moving stock. A distributor based in Asansol can also serve the towns on the Jharkhand border at Kulti and Barakar, and the busy road towards Dhanbad.',
    nearby: ['Burnpur', 'Kulti', 'Barakar', 'Jamuria', 'Neamatpur', 'Chittaranjan'],
    picks: ['jhal-chanachur', 'bhujia', 'sev', 'masala-matar'],
    picksNote:
      'Asansol buyers lean towards bold, spicy snacks. Jhal Chanachur and Bhujia are the core order, with Sev for chaat and jhal muri vendors and Masala Matar as a spicy add-on.',
    seasons:
      "Asansol's busiest months start with Durga Puja and continue through Diwali and Chhath, when the city's mixed Bengali and Hindi-speaking population shops for festive snacks. Holi in spring is a second peak, and the winter wedding season keeps caterers and sweet shops ordering in bulk.",
    faqs: [
      {
        q: 'How far is the Kamal Brand factory from Asansol?',
        a: 'Our factory in Raniganj is about 18 km from Asansol along NH19. Being this close means fresher stock and quicker repeat orders for Asansol shops and distributors.',
      },
      {
        q: 'Can an Asansol distributor also cover Kulti and Barakar?',
        a: 'Yes, many distributors in Asansol serve Kulti, Barakar, Burnpur and nearby colliery towns. Tell us the area you cover when you apply and we will discuss the territory with you.',
      },
    ],
    near: ['raniganj', 'durgapur', 'purulia', 'bankura'],
  },
  {
    slug: 'durgapur',
    name: 'Durgapur',
    alt: [],
    district: 'Paschim Bardhaman',
    region: 'Paschim Bardhaman',
    km: 30,
    route: 'East along NH19 from Raniganj',
    short: 'About 30 km east on NH19; the steel city with large townships and institutions.',
    intro:
      'Durgapur, the steel city of West Bengal, is about 30 km east of our Raniganj factory on NH19. Kamal Brand supplies mixture and namkeen to Durgapur shops, markets, canteens and caterers directly from the manufacturer, and we are appointing distributors and dealers to cover the city and its surrounding towns.',
    market:
      'Durgapur is a planned industrial city built around the Durgapur Steel Plant, the Alloy Steels Plant and many other factories, with large residential townships, colleges and the NIT. The city has busy commercial areas such as City Centre and Benachity alongside sector markets in the townships. Salaried households, students and factory canteens give Durgapur steady, predictable demand for packaged namkeen through the whole year.',
    buyers: [
      { t: 'Township and sector markets', d: 'Grocery stores serving the steel and industrial townships.' },
      { t: 'Supermarkets and modern retail', d: 'Neatly packed 200 g to 500 g packs for organised shelves.' },
      { t: 'Industrial and college canteens', d: 'Bulk supply for factory canteens, hostels and institutes.' },
      { t: 'Distributors for the Durgapur subdivision', d: 'Coverage of Andal, Ukhra, Kanksa and Panagarh.' },
    ],
    logistics:
      'Durgapur is a short drive east of our factory on NH19, so stock can move quickly and orders can be repeated often. A Durgapur distributor can also reach Andal and Ukhra to the west and Kanksa and Panagarh towards Bardhaman.',
    nearby: ['Andal', 'Ukhra', 'Kanksa', 'Panagarh', 'Bidhannagar', 'Benachity'],
    picks: ['jhal-chanachur', 'mitha-chanachur', 'papdi-gathiya', 'fried-chura'],
    picksNote:
      'Durgapur families buy a mix of spicy and mild snacks. Jhal and Mitha Chanachur sell side by side, Papdi Gathiya is a tea-time favourite, and Fried Chura is popular around festivals.',
    seasons:
      'Durga Puja is the biggest season in Durgapur, with large pandals across the townships and heavy footfall in City Centre and Benachity. Vishwakarma Puja in the factories, Diwali and the winter picnic months follow, and college terms keep campus shops busy for most of the year.',
    faqs: [
      {
        q: 'Do you supply supermarkets and modern stores in Durgapur?',
        a: 'Yes. Our sealed 90 g to 500 g packs suit supermarkets and organised retail as well as kirana shops. Share your store details and we will send the product list and wholesale terms.',
      },
      {
        q: 'Can I get a mixture dealership for Durgapur township areas?',
        a: 'Yes. We are appointing dealers and distributors in Durgapur. When you apply, mention the sectors, markets or nearby towns you can cover so we can discuss a suitable territory.',
      },
    ],
    near: ['raniganj', 'asansol', 'bardhaman', 'bankura'],
  },

  // ---------------------------------------------------------------- Bardhaman, Birbhum, Bankura & Purulia
  {
    slug: 'bardhaman',
    name: 'Bardhaman',
    alt: ['Burdwan'],
    district: 'Purba Bardhaman',
    region: 'Bardhaman, Birbhum, Bankura & Purulia',
    km: 100,
    route: 'East along NH19 via Durgapur and Panagarh',
    short: 'About 100 km east on NH19; district town of the rice bowl of Bengal.',
    intro:
      'Bardhaman (Burdwan), the headquarters of Purba Bardhaman district, is about 100 km east of our factory on NH19. Kamal Brand supplies chanachur mixture, bhujia, sev and other namkeen to Bardhaman shops and wholesalers, and we are looking for distributors and dealers who can serve the town and the large rural market around it.',
    market:
      'Bardhaman is the market town of a district often called the rice bowl of Bengal, and it is famous for its sweets, especially sitabhog and mihidana. Farmers, traders, students of the university and daily commuters on the Howrah main line all pass through the town. Sweet shops here often keep namkeen next to mishti, and rural haats across the district buy packaged mixture in bulk from Bardhaman wholesalers.',
    buyers: [
      { t: 'Sweet shops (mishti dokan)', d: 'Namkeen alongside sweets for customers who want something salty too.' },
      { t: 'Wholesalers supplying rural haats', d: 'Bulk 200 g and 400 g packs for village markets and weekly haats.' },
      { t: 'Station and college area shops', d: 'Small packs for commuters and students.' },
      { t: 'Caterers for weddings and pujas', d: 'Mixed namkeen in quantity for events.' },
    ],
    logistics:
      'Our trucks reach Bardhaman along NH19 through Durgapur and Panagarh. A distributor based in Bardhaman can cover Memari and Shaktigarh on the way to Kolkata, Guskara to the north, and Kalna and Katwa along the Bhagirathi.',
    nearby: ['Memari', 'Shaktigarh', 'Galsi', 'Guskara', 'Kalna', 'Katwa'],
    picks: ['jhal-chanachur', 'mitha-chanachur', 'bhujia', 'fried-chura'],
    picksNote:
      'Sweet-shop customers in Bardhaman often take Mitha Chanachur and Fried Chura, while Jhal Chanachur and Bhujia are the everyday kirana sellers.',
    seasons:
      'In Bardhaman, buying follows both the festival calendar and the farm calendar. After the aman paddy harvest in late autumn, rural spending rises across the district just as the Nabanna, wedding and winter fair seasons begin, so wholesalers here plan bigger stock from November to February, on top of the Durga Puja rush.',
    faqs: [
      {
        q: 'Can sweet shops in Bardhaman stock Kamal Brand namkeen?',
        a: 'Yes. Many sweet shops sell namkeen alongside mishti. Mitha Chanachur, Jhal Chanachur, Bhujia and Fried Chura are good choices for a sweet-shop counter. Call us for wholesale prices.',
      },
      {
        q: 'Is a distributorship available for rural areas of Purba Bardhaman?',
        a: 'Yes. We welcome distributors who supply rural haats and village shops around Bardhaman, Memari, Kalna, Katwa and Guskara. Tell us the blocks or towns you cover in your application.',
      },
    ],
    near: ['durgapur', 'bolpur', 'kolkata', 'krishnanagar'],
  },
  {
    slug: 'bolpur',
    name: 'Bolpur',
    alt: ['Santiniketan'],
    district: 'Birbhum',
    region: 'Bardhaman, Birbhum, Bankura & Purulia',
    km: 90,
    route: 'Via Panagarh and Illambazar',
    short: 'About 90 km via Panagarh and Illambazar; the Santiniketan tourist town.',
    intro:
      'Bolpur, together with Santiniketan, is the best-known town in Birbhum and is about 90 km from our Raniganj factory. Kamal Brand supplies chanachur mixture and other namkeen to Bolpur and Santiniketan retailers, and we are appointing distributors who can serve the town and the busy tourist season.',
    market:
      'Santiniketan is home to Visva-Bharati, the university founded by Rabindranath Tagore, and was declared a UNESCO World Heritage Site in 2023. Visitors come all year, and crowds swell during Poush Mela in winter and Basanta Utsav in spring. That brings large seasonal demand at tea stalls, hotels, lodges and the weekend haat, on top of regular buying by students and local families.',
    buyers: [
      { t: 'Hotels, lodges and homestays', d: 'Snack packs for guests and tea-time service.' },
      { t: 'Tea stalls and food stalls', d: 'Jhal muri, chaat and tea counters around the town and the mela grounds.' },
      { t: 'Student-area shops', d: 'Small, affordable packs that sell quickly near the university.' },
      { t: 'Kirana shops in Bolpur town', d: 'Regular household demand through the year.' },
    ],
    logistics:
      'Supply to Bolpur goes east on NH19 to Panagarh and then north through Illambazar. A Bolpur distributor can cover Prantik, Illambazar, Labpur and Nanoor. It is worth planning extra stock ahead of Poush Mela and Basanta Utsav, when demand rises sharply.',
    nearby: ['Santiniketan', 'Prantik', 'Illambazar', 'Labpur', 'Nanoor', 'Sainthia'],
    picks: ['jhal-chanachur', 'sev', 'fried-chura', 'papdi-gathiya'],
    picksNote:
      'For tourist and mela counters, Jhal Chanachur and Sev go into jhal muri and chaat, while 200 g Fried Chura and Papdi Gathiya packs sell as take-away snacks.',
    seasons:
      "Bolpur's calendar is set by its fairs. Poush Mela in December brings the biggest crowds of the year, Basanta Utsav at Holi is the second peak, and the Joydev Kenduli mela at Makar Sankranti draws large numbers to nearby Illambazar. Shops and stalls that stock up before these dates sell the most.",
    faqs: [
      {
        q: 'Can I stock up for Poush Mela in Santiniketan?',
        a: 'Yes. Call us well before the mela with the quantity you expect to sell, so we can plan your order. Jhal Chanachur, Sev, Fried Chura and Papdi Gathiya are popular choices for fair stalls and tea counters.',
      },
      {
        q: 'Do you supply hotels and homestays in Bolpur?',
        a: 'Yes. Hotels, lodges and homestays can order namkeen in bulk for guest snacks and tea service. Tell us how many rooms or guests you serve and we will suggest pack sizes.',
      },
    ],
    near: ['suri', 'bardhaman', 'durgapur', 'berhampore'],
  },
  {
    slug: 'suri',
    name: 'Suri',
    alt: [],
    district: 'Birbhum',
    region: 'Bardhaman, Birbhum, Bankura & Purulia',
    km: 70,
    route: 'North via Pandabeswar and Dubrajpur',
    short: 'About 70 km north via Dubrajpur; Birbhum district headquarters.',
    intro:
      'Suri is the district headquarters of Birbhum and is about 70 km north of our Raniganj factory, across the Ajay river. Kamal Brand supplies mixture, bhujia, sev and other namkeen to Suri shops and wholesalers, and we are appointing distributors for Suri and the towns of central Birbhum.',
    market:
      'As the administrative centre of Birbhum, Suri draws people from across the district to its courts, offices, schools and markets. Nearby Bakreshwar, known for its hot springs and temples as well as its thermal power station, adds pilgrims and workers to the local customer base. Wholesalers in Suri also supply the many small towns and villages of the district, where packaged namkeen is a regular purchase at village shops.',
    buyers: [
      { t: 'Wholesalers for Birbhum villages', d: 'Bulk packs for village shops and weekly haats.' },
      { t: 'Shops near offices and courts', d: 'Tea and snack demand from daily visitors to the district town.' },
      { t: 'Pilgrim-town stalls', d: 'Snack packs for visitors to Bakreshwar and other temple towns.' },
      { t: 'Kirana stores in Suri', d: 'Everyday household demand.' },
    ],
    logistics:
      'Suri is reached by road north from Raniganj through Pandabeswar and Dubrajpur. A Suri distributor can supply Dubrajpur, Sainthia, Rajnagar, Mohammad Bazar and Bakreshwar, and onward to Rampurhat and the Tarapith area.',
    nearby: ['Dubrajpur', 'Sainthia', 'Bakreshwar', 'Rajnagar', 'Mohammad Bazar', 'Rampurhat'],
    picks: ['jhal-chanachur', 'bhujia', 'chana-dal', 'salted-peanuts'],
    picksNote:
      'In Birbhum, Jhal Chanachur and Bhujia are the staples, and Chana Dal and Salted Badam in 500 g packs give village shops a good-value option.',
    seasons:
      'Pilgrim traffic to Tarapith and Bakreshwar keeps snack demand steady around Suri all year, with peaks on major festival days. The Joydev Kenduli mela in January, Durga Puja and the winter wedding season add further spikes for district wholesalers.',
    faqs: [
      {
        q: 'Do you supply villages around Suri in Birbhum?',
        a: 'We supply distributors and wholesalers who serve village shops and haats across Birbhum. If you supply villages around Suri, Dubrajpur, Sainthia or Rampurhat, apply for a distributorship and tell us your coverage.',
      },
      {
        q: 'Which products sell best in Birbhum?',
        a: 'Jhal Chanachur and Bhujia are everyday sellers, while 500 g Chana Dal and Salted Badam packs offer value for families. Many shops also keep Sev and Papdi Gathiya for tea-time buyers.',
      },
    ],
    near: ['bolpur', 'raniganj', 'berhampore', 'durgapur'],
  },
  {
    slug: 'bankura',
    name: 'Bankura',
    alt: [],
    district: 'Bankura',
    region: 'Bardhaman, Birbhum, Bankura & Purulia',
    km: 60,
    route: 'South across the Damodar on the Raniganj–Bankura road',
    short: 'About 60 km south across the Damodar; terracotta country and Bishnupur.',
    intro:
      'Bankura town is about 60 km south of our Raniganj factory, just across the Damodar river. Kamal Brand supplies mixture and namkeen to Bankura retailers and wholesalers, and we are appointing distributors to cover the town, Bishnupur and the rest of the district.',
    market:
      'Bankura district is known across India for its terracotta, from the Bankura horse to the temples of Bishnupur, and for places like Mukutmanipur and Susunia hill that draw weekend visitors. Most of the district is rural, so Bankura town acts as the wholesale centre for a wide area. Village shops and haats prefer value packs that last, and tourist spots add seasonal demand for travel snacks.',
    buyers: [
      { t: 'Wholesalers in Bankura town', d: 'Bulk supply onwards to village shops and haats.' },
      { t: 'Bishnupur and tourist-spot shops', d: 'Travel-size packs for visitors to temples and dams.' },
      { t: 'Kirana stores', d: 'Everyday demand from local families.' },
      { t: 'Schools, hostels and canteens', d: 'Bulk namkeen for institutions.' },
    ],
    logistics:
      'Bankura lies on the highway that runs south from Raniganj across the Damodar, so it is one of our most direct routes. A distributor based in Bankura can cover Onda, Chhatna, Barjora, Sonamukhi, Bishnupur and Khatra.',
    nearby: ['Bishnupur', 'Onda', 'Chhatna', 'Barjora', 'Sonamukhi', 'Khatra'],
    picks: ['jhal-chanachur', 'bhujia', 'masala-matar', 'chana-dal'],
    picksNote:
      'Bankura village shops favour 400 g Jhal Chanachur and 380 g Bhujia family packs, and spicy Masala Matar and Chana Dal for customers who want a filling snack.',
    seasons:
      "Winter is Bankura's busiest season. The Bishnupur Mela in late December, Tusu and Makar Sankranti in January and weekend trips to Mukutmanipur and Susunia all fall in the cool months. Durga Puja and the post-harvest wedding season add more demand in village markets.",
    faqs: [
      {
        q: 'Do you supply Bishnupur as well as Bankura town?',
        a: 'Yes. We supply wholesalers and distributors who cover Bankura town, Bishnupur and the rest of the district. Apply with the area you serve and our team will call you.',
      },
      {
        q: 'Which pack sizes suit village shops in Bankura?',
        a: 'Family packs such as 400 g Jhal Chanachur and 380 g Bhujia, and 500 g Chana Dal, Salted Badam and Masala Matar, give village customers good value, while 90 g and 180 g gathiya packs work as low-cost impulse buys.',
      },
    ],
    near: ['raniganj', 'purulia', 'medinipur', 'durgapur'],
  },
  {
    slug: 'purulia',
    name: 'Purulia',
    alt: [],
    district: 'Purulia',
    region: 'Bardhaman, Birbhum, Bankura & Purulia',
    km: 100,
    route: 'Via Asansol and Raghunathpur',
    short: 'About 100 km via Raghunathpur; the westernmost district, bordering Jharkhand.',
    intro:
      'Purulia, the westernmost district town of West Bengal, is about 100 km from our Raniganj factory by road through Asansol and Raghunathpur. Kamal Brand supplies chanachur mixture and namkeen to Purulia shops and wholesalers, and we welcome distributors who can cover Purulia and its border towns.',
    market:
      'Purulia is famous for Chhau dance, recognised by UNESCO as intangible cultural heritage, and for the Ajodhya Hills, which bring visitors through the cooler months. The district borders Jharkhand, and its towns trade across the state line. Most demand comes from rural households and small-town shops supplied by Purulia wholesalers, with extra demand at railway towns such as Adra and at tourist spots in winter.',
    buyers: [
      { t: 'Wholesalers in Purulia town', d: 'Bulk supply to small towns and village shops.' },
      { t: 'Railway-town shops', d: 'Station and colony shops in Adra and other railway towns.' },
      { t: 'Tourist-spot stalls', d: 'Snack packs for visitors to the Ajodhya Hills and dams.' },
      { t: 'Kirana stores', d: 'Everyday family purchases.' },
    ],
    logistics:
      'Our route to Purulia runs through Asansol and Raghunathpur. A Purulia distributor can cover Raghunathpur, Adra, Jhalda, Manbazar and Balarampur, and border trade towards Jharkhand.',
    nearby: ['Raghunathpur', 'Adra', 'Jhalda', 'Manbazar', 'Balarampur', 'Hura'],
    picks: ['jhal-chanachur', 'bhujia', 'salted-peanuts', 'phool-gathiya'],
    picksNote:
      'Purulia buyers look for value: 400 g Jhal Chanachur, 380 g Bhujia and 500 g Salted Badam are reliable sellers, with Phool Gathiya as a light tea-time option.',
    seasons:
      "Purulia's peaks come with its own festivals: Bandna after Kali Puja, Tusu Parab at Makar Sankranti, and Chhau performances in spring. Winter is also tourist season in the Ajodhya Hills, so stalls and lodges there need extra snack stock from November to February.",
    faqs: [
      {
        q: 'Can a Purulia distributor also sell in Jharkhand?',
        a: 'Distributors near the border often serve customers on both sides. Tell us your full coverage, including any Jharkhand towns, when you apply and we will discuss the territory.',
      },
      {
        q: 'Do you supply Adra and Raghunathpur?',
        a: 'Yes. Adra and Raghunathpur fall on our Purulia route. Apply as a dealer or distributor for these towns, or call us for wholesale prices.',
      },
    ],
    near: ['asansol', 'bankura', 'raniganj', 'medinipur'],
  },

  // ---------------------------------------------------------------- Kolkata & South Bengal
  {
    slug: 'kolkata',
    name: 'Kolkata',
    alt: [],
    district: 'Kolkata',
    region: 'Kolkata & South Bengal',
    km: 190,
    route: 'East along NH19 and the Durgapur Expressway',
    short: 'About 190 km east on NH19; the state capital and its huge wholesale markets.',
    intro:
      'Kolkata is the biggest market for chanachur mixture in Bengal, and our Raniganj factory is about 190 km away along NH19. Kamal Brand supplies mixture, bhujia, sev, gathiya and other namkeen to Kolkata wholesalers, retailers and food businesses, and we are appointing distributors and dealers across the city.',
    market:
      'Mixture is part of daily life in Kolkata. Jhal muri vendors on every main road add chanachur and sev to each paper cone, offices order snacks for afternoon tea, and families keep a packet at home for guests. The city is also home to Burrabazar and Posta, among the largest wholesale markets in eastern India, which supply traders across the state. With millions of buyers, Kolkata rewards distributors who focus on specific neighbourhoods and keep shops well stocked.',
    buyers: [
      { t: 'Wholesale traders', d: 'Bulk buyers in the city\'s wholesale markets who supply other traders.' },
      { t: 'Jhal muri and chaat vendors', d: 'Jhal Chanachur and Sev in quantity for street food.' },
      { t: 'Neighbourhood distributors', d: 'Para-level supply to kirana shops and sweet shops.' },
      { t: 'Offices, canteens and caterers', d: 'Bulk namkeen for tea breaks, meetings and events.' },
    ],
    logistics:
      'Stock for Kolkata travels east along NH19 and the Durgapur Expressway. A Kolkata distributor typically covers a defined area, such as north, south or central Kolkata, Salt Lake and New Town, or the suburbs. Please call to discuss order sizes and dispatch for your area.',
    nearby: ['Salt Lake', 'New Town', 'Dum Dum', 'Behala', 'Garia', 'Jadavpur'],
    picks: ['jhal-chanachur', 'sev', 'mitha-chanachur', 'papdi-gathiya'],
    picksNote:
      'For Kolkata, Jhal Chanachur and Sev are essential for jhal muri and chaat vendors, Mitha Chanachur suits family buyers, and Papdi Gathiya sells well in offices and tea shops.',
    seasons:
      'Durga Puja is the single biggest snack season in Kolkata, when pandal-hopping crowds fill the streets for days. Kali Puja, Diwali and Christmas follow, then the winter festival season with fairs such as the Book Fair. Poila Baisakh, the Bengali New Year, is another big day for shops and sweet shops.',
    faqs: [
      {
        q: 'Can I become a Kamal Brand distributor for one part of Kolkata?',
        a: 'Yes. Kolkata is large, so we prefer distributors who focus on an area they can serve well, such as a set of neighbourhoods or a suburb. Mention the areas you cover in your application.',
      },
      {
        q: 'Do you supply jhal muri vendors in Kolkata?',
        a: 'Yes, through wholesalers and distributors. Jhal Chanachur and Sev are the products jhal muri vendors use most. Ask your local distributor, or call us and we will connect you.',
      },
    ],
    near: ['howrah', 'barasat', 'bardhaman', 'krishnanagar'],
  },
  {
    slug: 'howrah',
    name: 'Howrah',
    alt: [],
    district: 'Howrah',
    region: 'Kolkata & South Bengal',
    km: 185,
    route: 'East along NH19 to the west bank of the Hooghly',
    short: 'About 185 km east on NH19; twin city on the west bank of the Hooghly.',
    intro:
      'Howrah, Kolkata\'s twin city on the west bank of the Hooghly, is about 185 km from our Raniganj factory, and it is the first part of the metro area our trucks reach on NH19. Kamal Brand supplies mixture and namkeen to Howrah retailers and wholesalers, and we are appointing distributors for Howrah and the surrounding district.',
    market:
      'Howrah Station is one of the busiest railway stations in India, and lakhs of commuters pass through it every day. The city and district are full of small industries, workshops and markets, and the dense residential areas of Shibpur, Bally and Liluah have kirana shops on almost every lane. Station vendors, tea stalls near workshops and household buyers make Howrah a high-volume market for affordable namkeen packs.',
    buyers: [
      { t: 'Station and commuter vendors', d: 'Quick-selling small packs for daily travellers.' },
      { t: 'Workshop-area tea stalls', d: 'Mixture and bhujia with tea for workers.' },
      { t: 'Kirana shops', d: 'Household demand across dense neighbourhoods.' },
      { t: 'District distributors', d: 'Coverage of Domjur, Uluberia and rural Howrah.' },
    ],
    logistics:
      'Howrah is on our main route east along NH19. A distributor here can cover Bally, Liluah, Shibpur, Santragachi, Domjur and Uluberia, and connect to the Hooghly towns to the north.',
    nearby: ['Bally', 'Liluah', 'Shibpur', 'Santragachi', 'Domjur', 'Uluberia'],
    picks: ['jhal-chanachur', 'bhujia', 'chana-dal', 'masala-matar'],
    picksNote:
      'Howrah\'s commuters and workers buy quick, filling snacks: Jhal Chanachur and Bhujia lead, with Chana Dal and Masala Matar as spicy, protein-rich options.',
    seasons:
      "Howrah's workshops and factories celebrate Vishwakarma Puja in September with feasts and tea for workers, a peak that many other cities do not have. Durga Puja, Kali Puja and Chhath on the Hooghly ghats follow soon after, so autumn is the season to stock up.",
    faqs: [
      {
        q: 'Do you supply Howrah and Hooghly district?',
        a: 'Yes. We supply wholesalers and distributors in Howrah city and district, and towns in Hooghly such as Serampore, Chandannagar and Chinsurah. Apply with the area you cover.',
      },
      {
        q: 'What sells best for station vendors in Howrah?',
        a: 'Small packs of Jhal Chanachur, Bhujia and gathiya sell fastest to commuters. Our 90 g and 180 g gathiya packs work well as low-priced impulse buys.',
      },
    ],
    near: ['kolkata', 'barasat', 'bardhaman', 'kharagpur'],
  },
  {
    slug: 'barasat',
    name: 'Barasat',
    alt: [],
    district: 'North 24 Parganas',
    region: 'Kolkata & South Bengal',
    km: 210,
    route: 'Via NH19 and Kolkata\'s northern suburbs',
    short: 'About 210 km via Kolkata; headquarters of North 24 Parganas.',
    intro:
      'Barasat is the headquarters of North 24 Parganas, one of the most populous districts in India, and about 210 km from our Raniganj factory. Kamal Brand supplies chanachur mixture and namkeen to Barasat wholesalers and retailers, and we are looking for distributors who can cover Barasat and the busy towns of the district.',
    market:
      'Barasat sits at a crossroads of the Sealdah suburban railway and the roads to Bongaon, Basirhat and Kolkata, so its markets serve a huge commuter and rural population. Every day, traders here supply shops in Madhyamgram, Habra and towns further along the lines. Demand is high for affordable packs that sell quickly, and for sweet and mild options alongside spicy chanachur.',
    buyers: [
      { t: 'Wholesalers at the district hub', d: 'Supply onwards to Habra, Bongaon and Basirhat.' },
      { t: 'Station-area shops', d: 'Commuter demand on the Sealdah suburban lines.' },
      { t: 'Kirana and sweet shops', d: 'Spicy and sweet mixtures for families.' },
      { t: 'Caterers and event suppliers', d: 'Bulk namkeen for weddings and functions.' },
    ],
    logistics:
      'Supply to Barasat comes in along NH19 through Kolkata\'s northern suburbs. A Barasat distributor can serve Madhyamgram, Habra, Ashoknagar, Bongaon, Basirhat and the towns towards Barrackpore.',
    nearby: ['Madhyamgram', 'Habra', 'Ashoknagar', 'Bongaon', 'Basirhat', 'Barrackpore'],
    picks: ['jhal-chanachur', 'mitha-chanachur', 'sev', 'fried-chura'],
    picksNote:
      'In North 24 Parganas, Jhal and Mitha Chanachur sell side by side, Sev goes to chaat and jhal muri vendors, and Fried Chura is a festival favourite.',
    seasons:
      'Barasat is famous for its Kali Puja, one of the biggest in Bengal, with themed pandals that draw crowds from across the district. Together with Durga Puja just before it, this makes October and November the busiest months for snack sales, followed by the winter wedding season.',
    faqs: [
      {
        q: 'Do you supply Bongaon and Basirhat through Barasat?',
        a: 'Yes. A Barasat-based distributor can cover Habra, Bongaon, Basirhat and other towns of North 24 Parganas. Tell us your coverage when you apply.',
      },
      {
        q: 'Can I order mixed products for a shop in Barasat?',
        a: 'Yes. You can combine products such as Jhal Chanachur, Mitha Chanachur, Bhujia, Sev and gathiya in one order. Call us with your list for a quote.',
      },
    ],
    near: ['kolkata', 'howrah', 'krishnanagar', 'bardhaman'],
  },
  {
    slug: 'krishnanagar',
    name: 'Krishnanagar',
    alt: [],
    district: 'Nadia',
    region: 'Kolkata & South Bengal',
    km: 190,
    route: 'Via Bardhaman',
    short: 'About 190 km via Bardhaman; Nadia district town known for clay dolls and sweets.',
    intro:
      'Krishnanagar, the headquarters of Nadia district, is about 190 km from our Raniganj factory by road via Bardhaman. Kamal Brand supplies mixture and namkeen to Krishnanagar retailers and wholesalers, and we are appointing distributors for Krishnanagar and the towns of Nadia.',
    market:
      'Krishnanagar is famous for its clay dolls from Ghurni, for sweets such as sarpuria and sarbhaja, and for its grand Jagaddhatri Puja, which draws huge crowds every autumn. Nadia is also a major pilgrimage district, with Nabadwip and Mayapur nearby. Festivals and pilgrim traffic create seasonal peaks, and the district\'s towns along the railway provide steady everyday demand.',
    buyers: [
      { t: 'Sweet shops', d: 'Namkeen alongside the town\'s famous sweets.' },
      { t: 'Festival and pilgrim-town stalls', d: 'Extra stock for Jagaddhatri Puja and pilgrim crowds.' },
      { t: 'Kirana shops', d: 'Everyday household buying.' },
      { t: 'District distributors', d: 'Coverage of Nabadwip, Shantipur, Ranaghat and Kalyani.' },
    ],
    logistics:
      'Our route to Krishnanagar goes via Bardhaman. A Krishnanagar distributor can serve Nabadwip, Mayapur, Shantipur, Ranaghat, Chakdaha and Kalyani. Plan extra stock before Jagaddhatri Puja.',
    nearby: ['Nabadwip', 'Mayapur', 'Shantipur', 'Ranaghat', 'Chakdaha', 'Kalyani'],
    picks: ['mitha-chanachur', 'jhal-chanachur', 'fried-chura', 'phool-gathiya'],
    picksNote:
      'Nadia\'s sweet-loving buyers often choose Mitha Chanachur and Fried Chura, with Jhal Chanachur for spice lovers and light Phool Gathiya for tea time.',
    seasons:
      "Krishnanagar's Jagaddhatri Puja in November is its biggest event, with processions and crowds that keep stalls busy for days. Nearby Shantipur and Nabadwip celebrate Rash, and Gaura Purnima brings pilgrims to Mayapur in spring, so the district has several distinct peaks.",
    faqs: [
      {
        q: 'Can I order extra stock for Jagaddhatri Puja in Krishnanagar?',
        a: 'Yes. Call us well before the puja with the quantity you expect to sell, so we can plan your order. Fried Chura, Mitha and Jhal Chanachur and gathiya are popular festival choices.',
      },
      {
        q: 'Do you supply Nabadwip and Mayapur?',
        a: 'Yes, through distributors who cover Nadia district. If you supply shops in Nabadwip, Mayapur or Shantipur, apply for a distributorship and tell us your area.',
      },
    ],
    near: ['bardhaman', 'barasat', 'kolkata', 'berhampore'],
  },
  {
    slug: 'kharagpur',
    name: 'Kharagpur',
    alt: [],
    district: 'Paschim Medinipur',
    region: 'Kolkata & South Bengal',
    km: 170,
    route: 'South via Bankura and Medinipur',
    short: 'About 170 km south via Bankura; railway town and home of the first IIT.',
    intro:
      'Kharagpur is about 170 km south of our Raniganj factory by the highway through Bankura and Medinipur. Kamal Brand supplies chanachur mixture, bhujia, sev and other namkeen to Kharagpur shops and wholesalers, and we are appointing distributors to cover the city and its region.',
    market:
      'Kharagpur is a railway city: it has one of the longest railway platforms in the world, a large railway workshop and a division of South Eastern Railway, along with IIT Kharagpur, India\'s first IIT. The town also sits on NH16, the Kolkata–Chennai highway. Railway colonies, a big student population and highway traffic give Kharagpur a mix of household, campus and travel demand for packaged namkeen.',
    buyers: [
      { t: 'Railway colony and station shops', d: 'Regular demand from railway families and travellers.' },
      { t: 'Campus-area shops and canteens', d: 'Snack packs for students and staff.' },
      { t: 'Highway dhabas on NH16', d: 'Travel-size packs for drivers and passengers.' },
      { t: 'Wholesalers', d: 'Supply onwards to Belda, Debra and nearby towns.' },
    ],
    logistics:
      'Supply to Kharagpur runs south from Raniganj through Bankura and Medinipur. A Kharagpur distributor can serve Hijli, Salua, Debra, Belda and the NH16 corridor.',
    nearby: ['Hijli', 'Salua', 'Debra', 'Belda', 'Medinipur', 'Jhargram'],
    picks: ['jhal-chanachur', 'bhujia', 'papdi-gathiya', 'salted-peanuts'],
    picksNote:
      'Kharagpur\'s campus and railway buyers like Jhal Chanachur, Bhujia and Papdi Gathiya with tea, and Salted Badam for a protein-rich snack.',
    seasons:
      "Kharagpur's demand follows its campus and railway calendar as well as the festivals. IIT Kharagpur's student festivals in winter and spring bring visitors to the town, Durga Puja and Chhath are celebrated in the railway colonies, and term time keeps campus shops steady.",
    faqs: [
      {
        q: 'Do you supply shops near IIT Kharagpur and the railway colonies?',
        a: 'Yes, through retailers and distributors in Kharagpur. Small packs of Jhal Chanachur, Bhujia, Papdi Gathiya and Salted Badam suit campus and colony shops. Call us for wholesale terms.',
      },
      {
        q: 'Can a Kharagpur distributor also cover Medinipur?',
        a: 'Kharagpur and Medinipur are close twin towns. Mention both in your application if you can serve them, and we will discuss the territory with you.',
      },
    ],
    near: ['medinipur', 'haldia', 'bankura', 'howrah'],
  },
  {
    slug: 'medinipur',
    name: 'Medinipur',
    alt: ['Midnapore'],
    district: 'Paschim Medinipur',
    region: 'Kolkata & South Bengal',
    km: 155,
    route: 'South via Bankura',
    short: 'About 155 km south via Bankura; headquarters of Paschim Medinipur.',
    intro:
      'Medinipur (Midnapore), headquarters of Paschim Medinipur district, is about 155 km south of our Raniganj factory via Bankura. Kamal Brand supplies mixture and namkeen to Medinipur shops and wholesalers, and we are looking for distributors who can cover the town and the wide rural area around it.',
    market:
      'Medinipur stands on the Kangsabati river and is the administrative and educational centre of a large district, with offices, colleges and Vidyasagar University. Much of the surrounding area is rural, so wholesalers in Medinipur supply village shops over a wide radius. Demand favours value family packs, with extra buying around festivals and the town\'s student population adding steady demand for small packs.',
    buyers: [
      { t: 'Wholesalers', d: 'Supply onwards to village shops across the district.' },
      { t: 'Kirana stores', d: 'Everyday household demand in the town.' },
      { t: 'College and university area shops', d: 'Small packs for students.' },
      { t: 'Caterers', d: 'Namkeen for weddings and social functions.' },
    ],
    logistics:
      'Medinipur is on our southern route through Bankura. A distributor based here can cover Salboni, Keshpur, Garbeta and Kharagpur, and the rural blocks of the district.',
    nearby: ['Kharagpur', 'Salboni', 'Keshpur', 'Garbeta', 'Debra', 'Jhargram'],
    picks: ['jhal-chanachur', 'bhujia', 'chana-dal', 'mitha-chanachur'],
    picksNote:
      'Medinipur shops order Jhal Chanachur and Bhujia family packs for everyday sales, with Chana Dal and Mitha Chanachur to complete the shelf.',
    seasons:
      "Medinipur's busiest stretch runs from Durga Puja through Kali Puja to the winter wedding season, when caterers place bulk orders. College admission and exam months bring students into town, and winter picnics along the Kangsabati add weekend demand.",
    faqs: [
      {
        q: 'Do you supply rural areas of Paschim Medinipur?',
        a: 'Yes, through distributors and wholesalers who serve village shops. If you supply blocks such as Salboni, Keshpur or Garbeta, apply for a distributorship with your coverage.',
      },
      {
        q: 'What is the best product mix for a Medinipur kirana shop?',
        a: 'Start with Jhal Chanachur and Bhujia, which sell every day, then add Mitha Chanachur, Sev, a gathiya and a 500 g Chana Dal or Salted Badam pack so customers have a full choice.',
      },
    ],
    near: ['kharagpur', 'bankura', 'haldia', 'purulia'],
  },
  {
    slug: 'haldia',
    name: 'Haldia',
    alt: [],
    district: 'Purba Medinipur',
    region: 'Kolkata & South Bengal',
    km: 280,
    route: 'Via Kharagpur and NH16',
    short: 'About 280 km via Kharagpur; port and industrial town on the Hooghly estuary.',
    intro:
      'Haldia, the port and industrial town of Purba Medinipur, is about 280 km from our Raniganj factory by road via Kharagpur. Kamal Brand supplies chanachur mixture and namkeen to Haldia retailers, wholesalers and canteens, and we are appointing distributors for Haldia and the coastal district.',
    market:
      'Haldia has a dock complex of the Kolkata port, an oil refinery, petrochemical plants and many other industries, which bring a large working population, contractors and truck traffic to the town. Industrial canteens, worker colonies and highway stalls buy namkeen in bulk. The wider district includes Tamluk, Contai and the beach town of Digha, where tourists add seasonal demand.',
    buyers: [
      { t: 'Industrial and port canteens', d: 'Bulk namkeen for shift workers.' },
      { t: 'Township and colony shops', d: 'Household demand in the industrial townships.' },
      { t: 'Truck stops and tea stalls', d: 'Small packs for drivers serving the port.' },
      { t: 'Coastal-area distributors', d: 'Coverage of Tamluk, Contai and Digha.' },
    ],
    logistics:
      'Supply to Haldia runs south through Bankura and Kharagpur, then east on NH16. A Haldia distributor can cover Mahishadal, Tamluk, Nandigram, Contai and Digha. Please call to discuss order size and dispatch for this route.',
    nearby: ['Mahishadal', 'Tamluk', 'Nandigram', 'Contai', 'Digha', 'Mecheda'],
    picks: ['jhal-chanachur', 'chana-dal', 'masala-matar', 'salted-peanuts'],
    picksNote:
      'For canteens and worker colonies, spicy Jhal Chanachur, Chana Dal and Masala Matar are popular, and Salted Badam is a staple at tea stalls and truck stops.',
    seasons:
      "Haldia's factories mark Vishwakarma Puja in September with feasts for workers, a reliable peak for canteens. Durga Puja follows, and the winter and Puja holidays fill the beach town of Digha with tourists, which lifts demand for travel snacks across the coastal district.",
    faqs: [
      {
        q: 'Do you supply industrial canteens in Haldia?',
        a: 'Yes. Canteens and contractors can order Kamal Brand namkeen in bulk. Tell us the number of workers or the monthly quantity, and we will share a quote.',
      },
      {
        q: 'Can a Haldia distributor also cover Digha and Contai?',
        a: 'Yes. A Haldia-based distributor can serve Tamluk, Contai and Digha. Tell us your full coverage when you apply.',
      },
    ],
    near: ['kharagpur', 'medinipur', 'howrah', 'kolkata'],
  },

  // ---------------------------------------------------------------- Central & North Bengal
  {
    slug: 'berhampore',
    name: 'Berhampore',
    alt: ['Baharampur'],
    district: 'Murshidabad',
    region: 'Central & North Bengal',
    km: 175,
    route: 'North via Suri',
    short: 'About 175 km north via Suri; Murshidabad district headquarters on NH12.',
    intro:
      'Berhampore (Baharampur), headquarters of Murshidabad district, is about 175 km north of our Raniganj factory by road via Suri. Kamal Brand supplies mixture, bhujia, sev and other namkeen to Berhampore wholesalers and retailers, and we are appointing distributors for the town and the district.',
    market:
      'Murshidabad is one of the most populous districts in West Bengal and a historic one: the former Nawabi capital, with the Hazarduari Palace, is a short distance from Berhampore. The district is also known for silk and for sweets such as chhanabora. Berhampore sits on NH12, the main highway to North Bengal, so its markets supply a large district and serve highway travellers.',
    buyers: [
      { t: 'District wholesalers', d: 'Supply onwards across a large, populous district.' },
      { t: 'Tourist-area shops', d: 'Snack packs for visitors to Murshidabad\'s historic sites.' },
      { t: 'NH12 dhabas', d: 'Travel snacks for the North Bengal highway.' },
      { t: 'Kirana and sweet shops', d: 'Everyday household demand.' },
    ],
    logistics:
      'Our route to Berhampore goes north via Suri. A Berhampore distributor can cover Murshidabad, Lalbagh, Jiaganj, Kandi, Beldanga and Domkal.',
    nearby: ['Murshidabad', 'Lalbagh', 'Jiaganj', 'Kandi', 'Beldanga', 'Domkal'],
    picks: ['jhal-chanachur', 'mitha-chanachur', 'bhujia', 'chana-dal'],
    picksNote:
      'Murshidabad buyers take Jhal and Mitha Chanachur in large quantities, with Bhujia and Chana Dal as steady everyday sellers.',
    seasons:
      'In Murshidabad, Eid and Durga Puja are both major seasons for snacks and sweets, and the winter months bring tourists to the historic sites near Berhampore. The wedding season from November to February keeps caterers ordering in quantity.',
    faqs: [
      {
        q: 'Do you supply all of Murshidabad district?',
        a: 'We supply distributors and wholesalers who cover the district. If you can serve towns such as Kandi, Beldanga, Domkal or Jiaganj from Berhampore, apply and tell us your area.',
      },
      {
        q: 'Do you have products for tourist shops near Hazarduari?',
        a: 'Yes. Travel-size packs such as 200 g Fried Chura and Jhal Chanachur, and 90 g and 180 g gathiya, suit tourist shops and stalls. Call us for wholesale prices.',
      },
    ],
    near: ['suri', 'malda', 'krishnanagar', 'bolpur'],
  },
  {
    slug: 'malda',
    name: 'Malda',
    alt: ['English Bazar'],
    district: 'Malda',
    region: 'Central & North Bengal',
    km: 260,
    route: 'North via Rampurhat, Morgram and NH12',
    short: 'About 260 km north via NH12; the mango district and gateway to North Bengal.',
    intro:
      'Malda (English Bazar) is about 260 km north of our Raniganj factory, reached by road through Rampurhat and then NH12. Kamal Brand supplies chanachur mixture and namkeen to Malda wholesalers and retailers, and we are appointing distributors for Malda and the Dinajpur districts beyond it.',
    market:
      'Malda is famous for its mangoes and for the historic ruins of Gaur and Pandua. It is also the gateway between South and North Bengal: buses, trucks and trains heading to Siliguri and the Northeast pass through the town. Its wholesale markets supply a wide area, from Kaliachak to Gazole, and the districts of Uttar and Dakshin Dinajpur.',
    buyers: [
      { t: 'Wholesalers for North Bengal routes', d: 'Supply onwards to Dinajpur and beyond.' },
      { t: 'Bus-stand and station vendors', d: 'Small packs for long-distance travellers.' },
      { t: 'Kirana shops', d: 'Everyday household buying.' },
      { t: 'Sweet shops and caterers', d: 'Namkeen for weddings and festive seasons.' },
    ],
    logistics:
      'Supply to Malda runs north through Suri and Rampurhat to Morgram, then along NH12 via Farakka. A Malda distributor can cover Old Malda, Kaliachak, Gazole, Chanchal and Manikchak, and connect to Raiganj and Balurghat.',
    nearby: ['Old Malda', 'Kaliachak', 'Gazole', 'Chanchal', 'Manikchak', 'Raiganj'],
    picks: ['jhal-chanachur', 'bhujia', 'mitha-chanachur', 'masala-matar'],
    picksNote:
      'Malda\'s travel and household buyers choose Jhal Chanachur and Bhujia first, with Mitha Chanachur and Masala Matar to round out the shelf.',
    seasons:
      "Malda's mango season, from May to July, brings traders and trucks into the district and keeps highway and market stalls busy. The Ramkeli mela near Gaur, Eid and Durga Puja add further peaks, so Malda wholesalers see demand spread across the year.",
    faqs: [
      {
        q: 'Can a Malda distributor cover Raiganj and Balurghat?',
        a: 'Yes. Malda is a natural base for Uttar and Dakshin Dinajpur. Tell us which towns you can serve, such as Raiganj, Gazole or Balurghat, when you apply.',
      },
      {
        q: 'How is stock sent to Malda?',
        a: 'Stock travels by road from Raniganj through Rampurhat and along NH12. Call us to discuss order size and dispatch for your location.',
      },
    ],
    near: ['berhampore', 'siliguri', 'suri', 'jalpaiguri'],
  },
  {
    slug: 'siliguri',
    name: 'Siliguri',
    alt: [],
    district: 'Darjeeling',
    region: 'Central & North Bengal',
    km: 510,
    route: 'North via Malda and NH12',
    short: 'About 510 km north via Malda; the trade gateway to the hills and the Northeast.',
    intro:
      'Siliguri is the commercial capital of North Bengal and about 510 km from our Raniganj factory by road via Malda. Kamal Brand supplies chanachur mixture, bhujia, sev and other namkeen to Siliguri wholesalers and distributors, and we are appointing partners who can cover Siliguri and the wider North Bengal market.',
    market:
      'Siliguri sits in the narrow corridor that links the rest of India to Darjeeling, Sikkim and the Northeast, and it is close to the borders of Nepal, Bhutan and Bangladesh. New Jalpaiguri station and Bagdogra airport bring a constant flow of tourists and traders. The city\'s wholesale markets supply the hill towns, the tea gardens and the Dooars, so a Siliguri distributor can reach a very large area.',
    buyers: [
      { t: 'Wholesalers supplying the hills', d: 'Stock for Darjeeling, Kurseong, Kalimpong and Sikkim routes.' },
      { t: 'Tourist and travel shops', d: 'Travel packs for visitors heading to the hills.' },
      { t: 'Station and bus-terminus vendors', d: 'Quick-selling packs around NJP and the bus stands.' },
      { t: 'Supermarkets and kirana stores', d: 'Household demand in a fast-growing city.' },
    ],
    logistics:
      'Stock for Siliguri travels north along NH12 via Malda. Because of the distance, we work with distributors who can hold stock and serve the area. A Siliguri distributor can cover Matigara, Bagdogra, Naxalbari and Phansidewa, and supply the hill towns.',
    nearby: ['Matigara', 'Bagdogra', 'Naxalbari', 'Phansidewa', 'Kurseong', 'Darjeeling'],
    picks: ['jhal-chanachur', 'bhujia', 'fried-chura', 'salted-peanuts'],
    picksNote:
      'Travellers to the hills buy Jhal Chanachur, Bhujia and 200 g Fried Chura packs, and Salted Badam is a steady seller in Siliguri\'s busy markets.',
    seasons:
      "Siliguri's tourist seasons, roughly March to June and October to December, bring travellers heading to Darjeeling, Sikkim and the Dooars through the city. Durga Puja, Diwali and Chhath fall in the same autumn window, making it the most important period for stock.",
    faqs: [
      {
        q: 'Is a Kamal Brand distributorship available in Siliguri?',
        a: 'Yes. We are looking for distributors in Siliguri who can hold stock and serve North Bengal. Apply with details of your warehouse, area and expected monthly volume.',
      },
      {
        q: 'Can a Siliguri distributor supply Darjeeling and Sikkim?',
        a: 'Many Siliguri wholesalers already supply the hill towns. Tell us the areas you serve, including Darjeeling, Kurseong, Kalimpong or Sikkim, and we will discuss the territory.',
      },
    ],
    near: ['jalpaiguri', 'cooch-behar', 'malda', 'berhampore'],
  },
  {
    slug: 'jalpaiguri',
    name: 'Jalpaiguri',
    alt: [],
    district: 'Jalpaiguri',
    region: 'Central & North Bengal',
    km: 550,
    route: 'North via Malda and Siliguri',
    short: 'About 550 km via Siliguri; Teesta-side town at the edge of the Dooars tea country.',
    intro:
      'Jalpaiguri, on the banks of the Teesta, is about 550 km from our Raniganj factory by road via Malda and Siliguri. Kamal Brand supplies mixture and namkeen to Jalpaiguri wholesalers and retailers, and we are appointing distributors for Jalpaiguri and the Dooars.',
    market:
      'Jalpaiguri is the district town at the edge of the Dooars, a belt of tea gardens, forests and national parks such as Gorumara. Tea-garden workers, small towns along the highway and tourists heading to the forests all buy packaged snacks. Markets in Jalpaiguri, Mainaguri and Dhupguri supply a wide rural area where reliable, long-lasting packs matter.',
    buyers: [
      { t: 'Tea-garden area shops', d: 'Regular demand from garden colonies and markets.' },
      { t: 'Wholesalers in the Dooars', d: 'Supply to Mainaguri, Dhupguri and Malbazar.' },
      { t: 'Tourist lodges and resorts', d: 'Snacks for visitors to Gorumara and the Dooars.' },
      { t: 'Kirana stores', d: 'Everyday household demand in town.' },
    ],
    logistics:
      'Supply reaches Jalpaiguri via Malda and Siliguri. A Jalpaiguri distributor can cover Mainaguri, Dhupguri, Malbazar, Rajganj and Belakoba.',
    nearby: ['Mainaguri', 'Dhupguri', 'Malbazar', 'Rajganj', 'Belakoba', 'Lataguri'],
    picks: ['jhal-chanachur', 'bhujia', 'chana-dal', 'papdi-gathiya'],
    picksNote:
      'In tea country, Jhal Chanachur and Bhujia are the staples, with Chana Dal and Papdi Gathiya as favourite snacks with tea.',
    seasons:
      'The Dooars forests and national parks close for the monsoon and reopen in autumn, so tourist demand around Jalpaiguri runs from autumn to early summer. The Jalpesh mela at Shivratri near Mainaguri and Durga Puja are local peaks, while tea-garden markets buy steadily all year.',
    faqs: [
      {
        q: 'Do you supply the Dooars tea-garden areas?',
        a: 'Yes, through distributors who cover Jalpaiguri district and the Dooars. If you supply garden markets in areas like Malbazar or Mainaguri, apply for a distributorship.',
      },
      {
        q: 'Can tourist resorts near Gorumara order directly?',
        a: 'Resorts and lodges can send a bulk enquiry. Depending on the quantity, we will supply directly or through the nearest distributor.',
      },
    ],
    near: ['siliguri', 'cooch-behar', 'malda', 'berhampore'],
  },
  {
    slug: 'cooch-behar',
    name: 'Cooch Behar',
    alt: ['Koch Bihar'],
    district: 'Cooch Behar',
    region: 'Central & North Bengal',
    km: 650,
    route: 'North via Malda and Siliguri',
    short: 'About 650 km via Siliguri; the palace town of North Bengal, known for its Rash Mela.',
    intro:
      'Cooch Behar is the northeastern district town of West Bengal, about 650 km from our Raniganj factory by road via Malda and Siliguri. Kamal Brand supplies chanachur mixture and namkeen to Cooch Behar wholesalers and retailers, and we are appointing distributors who can cover the district and nearby Alipurduar.',
    market:
      'Cooch Behar is a former princely capital known for its palace, its Madan Mohan temple and its Rash Mela, one of the biggest fairs in North Bengal. The district has busy market towns such as Dinhata, Tufanganj and Mathabhanga and borders Assam and Bangladesh. Fair seasons bring sharp demand peaks, and market towns need dependable stock year-round.',
    buyers: [
      { t: 'District wholesalers', d: 'Supply onwards to Dinhata, Tufanganj and Mathabhanga.' },
      { t: 'Fair and festival stalls', d: 'Extra stock for the Rash Mela season.' },
      { t: 'Kirana shops', d: 'Everyday household demand.' },
      { t: 'Distributors for Alipurduar', d: 'Coverage of neighbouring Alipurduar towns.' },
    ],
    logistics:
      'Supply to Cooch Behar runs via Malda and Siliguri. Because of the distance, we work with distributors who can hold stock. A Cooch Behar distributor can cover Dinhata, Tufanganj, Mathabhanga, Mekhliganj and Alipurduar.',
    nearby: ['Dinhata', 'Tufanganj', 'Mathabhanga', 'Mekhliganj', 'Alipurduar', 'Haldibari'],
    picks: ['jhal-chanachur', 'mitha-chanachur', 'bhujia', 'fried-chura'],
    picksNote:
      'For Cooch Behar\'s markets and fairs, Jhal and Mitha Chanachur and Bhujia are the core order, with Fried Chura for festival season.',
    seasons:
      "Cooch Behar's Rash Mela in November is its biggest event, drawing visitors from across North Bengal and Assam for weeks. The town's historic Baradevi Durga Puja comes earlier in autumn, so October and November are the months when shops and stalls need the most stock.",
    faqs: [
      {
        q: 'Can I stock up for the Rash Mela in Cooch Behar?',
        a: 'Yes. Call us well ahead of the mela with your expected quantity so we can plan your order. Chanachur, Bhujia, Fried Chura and gathiya packs are popular fair choices.',
      },
      {
        q: 'Is a distributorship available for Cooch Behar and Alipurduar?',
        a: 'Yes. We are looking for distributors who can hold stock and serve Cooch Behar and Alipurduar districts. Apply with your warehouse location and coverage.',
      },
    ],
    near: ['jalpaiguri', 'siliguri', 'malda', 'berhampore'],
  },
];

export const CITY_REGIONS = ['Paschim Bardhaman', 'Bardhaman, Birbhum, Bankura & Purulia', 'Kolkata & South Bengal', 'Central & North Bengal'];

export const CITIES = raw.map((c) => ({
  ...c,
  path: `${CITY_HUB_PATH}/${c.slug}`,
  displayName: c.alt.length ? `${c.name} (${c.alt[0]})` : c.name,
  distanceText: c.km === 0 ? 'Factory location' : `About ${c.km} km by road`,
}));

export const getCity = (slug) => CITIES.find((c) => c.slug === slug);
export const cityByName = (name) => CITIES.find((c) => c.name === name);
