import type { Product, BoxTier, FrequencyOption, QuizQuestion, ActiveSubscription } from '../types';

export const BOX_TIERS: Record<string, BoxTier> = {
  starter: {
    id: 'starter',
    name: 'Starter Ritual',
    tagline: 'Mindful beginning for personal everyday reflection',
    slots: 4,
    discountPercentage: 5,
    iconName: 'Sparkles',
  },
  curated: {
    id: 'curated',
    name: 'Curated Box',
    tagline: 'Our signature monthly showcase of balanced rituals',
    slots: 6,
    discountPercentage: 15,
    recommendedBadge: 'Most Popular Ritual',
    iconName: 'Crown',
  },
  sanctuary: {
    id: 'sanctuary',
    name: 'Ultimate Sanctuary',
    tagline: 'Complete sensory sanctuary crafted for connoisseurs',
    slots: 8,
    discountPercentage: 25,
    iconName: 'Flame',
  },
};

export const FREQUENCY_OPTIONS: FrequencyOption[] = [
  {
    id: 'monthly',
    label: 'Monthly Drop',
    cadenceDescription: 'Every 30 days — continuous fresh rituals',
    extraDiscountPercent: 0,
    badge: 'Standard Cycle',
  },
  {
    id: 'bimonthly',
    label: 'Bi-Monthly Drop',
    cadenceDescription: 'Every 60 days — paced seasonal discovery',
    extraDiscountPercent: 3,
    badge: 'Extra 3% Off',
  },
  {
    id: 'quarterly',
    label: 'Quarterly Drop',
    cadenceDescription: 'Every 90 days — deep seasonal transformation',
    extraDiscountPercent: 5,
    badge: 'Extra 5% Off',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Yirgacheffe Single-Origin Heirloom',
    category: 'Specialty Coffee & Tea',
    subtitle: 'Washed Ethiopian heirloom beans with jasmine & peach notes',
    priceUSD: 19.5,
    priceBDT: 2340,
    rating: 4.9,
    reviewCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=700&q=80',
    badges: ['Direct Trade', 'Washed Process', 'Altitude 2,100m'],
    sensoryNotes: ['Bergamot Blossom', 'White Peach', 'Wild Honey'],
    artisan: {
      name: 'Gedeo Highlands Collective',
      origin: 'Yirgacheffe, Ethiopia',
      craft: 'Heritage Agro-Forestry Washing',
      story: 'Smallholder farmers cultivating wild coffee varietals under dense indigenous canopy trees.'
    },
    volumeOrWeight: '250g Whole Bean',
    description: 'Brimming with delicate floral aromatics and bright stone-fruit acidity. Hand-roasted in micro-batches to highlight ethereal notes of jasmine blossom and sweet citrus nectar.',
    ritualMatchTags: ['focus', 'morning', 'citrus', 'roast', 'nomad', 'artisans']
  },
  {
    id: 'prod-2',
    name: 'Uji Ceremonial First-Harvest Matcha',
    category: 'Specialty Coffee & Tea',
    subtitle: 'Stone-milled shade-grown green tea from Kyoto prefecture',
    priceUSD: 24.0,
    priceBDT: 2880,
    rating: 5.0,
    reviewCount: 98,
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80',
    badges: ['First Harvest', 'Stone Ground', 'Organic JAS'],
    sensoryNotes: ['Vibrant Umami', 'Creamy Sweet Grass', 'Velvety Finish'],
    artisan: {
      name: 'Yamamoto Heritage Tea Estate',
      origin: 'Kyoto, Japan',
      craft: 'Traditional Tana Shade Milling',
      story: 'Five generations of tea masters shading leaves for 28 days to concentrate L-theanine and luminous chlorophyll.'
    },
    volumeOrWeight: '40g Tin (25 servings)',
    description: 'Electric emerald froth with deep vegetal sweetness and tranquil sustained calm. Whisks cleanly into a meditative morning elixir without bitterness.',
    ritualMatchTags: ['focus', 'morning', 'creative', 'floral', 'sanctuary', 'relief']
  },
  {
    id: 'prod-3',
    name: 'Sreemangal High-Elevation Silver Needle',
    category: 'Specialty Coffee & Tea',
    subtitle: 'Sun-withered tender white tea buds hand-plucked in Sylhet mist',
    priceUSD: 18.0,
    priceBDT: 2160,
    rating: 4.8,
    reviewCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=700&q=80',
    badges: ['Rare Harvest', 'Single Garden', 'Sun Cured'],
    sensoryNotes: ['Melon Rind', 'Wild Jasmine', 'Soft Bamboo'],
    artisan: {
      name: 'Monipuri Tea Keepers',
      origin: 'Sylhet, Bangladesh',
      craft: 'Hand-Twisted Bud Withering',
      story: 'Gathered before dawn in the monsoon hills of Sreemangal when the first dewdrops condense on silver buds.'
    },
    volumeOrWeight: '50g Loose Leaf',
    description: 'Gentle, soothing, and rich in natural antioxidants. Steeps into a luminous pale champagne liquor with natural undertones of honeydew and mountain rain.',
    ritualMatchTags: ['unwind', 'evening', 'floral', 'cottage', 'artisans', 'eco']
  },
  {
    id: 'prod-4',
    name: 'Smoky Lapsang & Cacao Botanical Chai',
    category: 'Specialty Coffee & Tea',
    subtitle: 'Pine-smoked black tea with raw cacao nibs and crushed cardamom',
    priceUSD: 16.5,
    priceBDT: 1980,
    rating: 4.9,
    reviewCount: 84,
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80',
    badges: ['Fair Trade Spices', 'Zero Sugar', 'Small-Batch'],
    sensoryNotes: ['Smoky Pine Smoke', 'Dark Baker Cacao', 'Warm Cardamom'],
    artisan: {
      name: 'Atlas Botanical Labs',
      origin: 'Edinburgh, Scotland',
      craft: 'Apothecary Spice Blending',
      story: 'Blends historical apothecary remedies with highland pine-smoked tea leaves and heirloom Indian spices.'
    },
    volumeOrWeight: '120g Kraft Pouch',
    description: 'A comforting hearthside brew that balances ancient woodsmoke notes with creamy raw cacao and warming whole pods of green cardamom.',
    ritualMatchTags: ['unwind', 'evening', 'roast', 'woodsy', 'cottage', 'relief']
  },
  {
    id: 'prod-5',
    name: 'Wildflower Honeycomb & Sea Salt Crisps',
    category: 'Artisanal Snacks',
    subtitle: 'Slow-baked crisps drizzled with raw mountain honey and Maldon salt',
    priceUSD: 12.0,
    priceBDT: 1440,
    rating: 4.8,
    reviewCount: 119,
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=700&q=80',
    badges: ['Non-GMO', 'Raw Honey', 'No Palm Oil'],
    sensoryNotes: ['Golden Caramel', 'Crisp Flake Salt', 'Wild Thyme'],
    artisan: {
      name: 'Apiary & Hearth Bakeries',
      origin: 'Hudson Valley, NY',
      craft: 'Wood-Fired Stone Oven Crisping',
      story: 'Baking with unfiltered honey collected from protected forest apiaries bordering wildflower preserves.'
    },
    volumeOrWeight: '160g Biodegradable Bag',
    description: 'Delicately layered, delightfully brittle crisps glazed with raw clover honey and punctuated with crunchy pyramids of Maldon sea salt flakes.',
    ritualMatchTags: ['gourmet', 'creative', 'floral', 'sanctuary', 'relief']
  },
  {
    id: 'prod-6',
    name: 'Single-Origin 74% Chuncho Dark Chocolate',
    category: 'Artisanal Snacks',
    subtitle: 'Rare ancient Urubamba cacao with nuances of ripe figs and molasses',
    priceUSD: 11.5,
    priceBDT: 1380,
    rating: 5.0,
    reviewCount: 203,
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=700&q=80',
    badges: ['Heirloom Cacao', 'Bean-to-Bar', 'Direct Trade'],
    sensoryNotes: ['Dark Plum', 'Molasses', 'Toasted Hazelnut'],
    artisan: {
      name: 'Qoya Cacao Workshop',
      origin: 'Cusco, Peru',
      craft: 'Low-Temperature Stone Conching',
      story: 'Sourcing wild heirloom Chuncho pods that have grown undisturbed along the Vilcanota River for centuries.'
    },
    volumeOrWeight: '75g Bar',
    description: 'Silky smooth melt with zero bitterness, unfolding in layers of deep dried fig, toasted nuts, and lingering forest honey sweetness.',
    ritualMatchTags: ['unwind', 'evening', 'roast', 'nomad', 'gourmet']
  },
  {
    id: 'prod-7',
    name: 'Rosemary & Black Truffle Marcona Almonds',
    category: 'Artisanal Snacks',
    subtitle: 'Castilian Spanish Marconas slow-roasted in cold-pressed olive oil',
    priceUSD: 14.0,
    priceBDT: 1680,
    rating: 4.9,
    reviewCount: 76,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
    badges: ['Imported Marcona', 'Black Truffle', 'Keto Friendly'],
    sensoryNotes: ['Earthy Truffle', 'Fresh Rosemary', 'Buttery Crunch'],
    artisan: {
      name: 'Bodegas de Almendras',
      origin: 'Valencia, Spain',
      craft: 'Small-Skillet Oil Roasting',
      story: 'Third-generation nut masters roasting rounded sweet Marconas with wild rosemary leaves picked from Mediterranean ridges.'
    },
    volumeOrWeight: '140g Reusable Jar',
    description: 'Tender, plump Marcona almonds tossed in Italian black summer truffle oil, cracked fleur de sel, and sun-dried rosemary.',
    ritualMatchTags: ['focus', 'creative', 'woodsy', 'sanctuary', 'gourmet']
  },
  {
    id: 'prod-8',
    name: 'Sundarban Wild Honey & Sundried Fig Gems',
    category: 'Artisanal Snacks',
    subtitle: 'Chewy Mediterranean figs cured in raw mangrove blossom honey',
    priceUSD: 13.5,
    priceBDT: 1620,
    rating: 4.7,
    reviewCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=700&q=80',
    badges: ['Ethical Foraged', 'Sundried', 'Preservative Free'],
    sensoryNotes: ['Deep Molasses', 'Smoky Blossom', 'Caramelized Fig'],
    artisan: {
      name: 'Mowali Honey Harvesters',
      origin: 'Khulna Mangrove Basin, Bangladesh',
      craft: 'Sustainable Deep-Canopy Gathering',
      story: 'Traditional community foragers safeguarding wild mangrove bees while harvesting sustainable seasonal honey combs.'
    },
    volumeOrWeight: '180g Glass Vessel',
    description: 'Tender sun-ripened whole figs steeped in amber mangrove blossom honey. A succulent, nutrient-rich confection for mid-afternoon pause.',
    ritualMatchTags: ['unwind', 'cottage', 'artisans', 'eco', 'gourmet']
  },
  {
    id: 'prod-9',
    name: 'Hinoki Cypress & Smoked Cedarwood Candle',
    category: 'Self-Care & Apothecary',
    subtitle: 'Hand-poured coconut apricot wax with pure Japanese cedar essential oil',
    priceUSD: 28.0,
    priceBDT: 3360,
    rating: 4.9,
    reviewCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
    badges: ['Clean Coconut Wax', 'Cotton Wick', '55hr Burn'],
    sensoryNotes: ['Temple Hinoki', 'Smoky Birch', 'Amber Resin'],
    artisan: {
      name: 'Shinrin Botanica',
      origin: 'Nagano Forest Studio, Japan',
      craft: 'Forest-Bathing Scent Distillation',
      story: 'Distilling fallen cypress timber into restorative aromatherapy blends inspired by the ancient practice of Shinrin-Yoku.'
    },
    volumeOrWeight: '8.5 oz / 240g Ceramic Vessel',
    description: 'Evokes the misty silence of ancient temple groves. Grounding woody cypress mingles with frankincense tears and soft smoked cedar embers.',
    ritualMatchTags: ['unwind', 'evening', 'woodsy', 'sanctuary', 'relief']
  },
  {
    id: 'prod-10',
    name: 'Wild Rosehip & Neroli Radiance Elixir',
    category: 'Self-Care & Apothecary',
    subtitle: 'Cold-pressed Patagonian seed oil with steam-distilled orange blossoms',
    priceUSD: 32.0,
    priceBDT: 3840,
    rating: 5.0,
    reviewCount: 164,
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-009f4859a224?auto=format&fit=crop&w=700&q=80',
    badges: ['100% Organic', 'Cold Pressed', 'Cruelty Free'],
    sensoryNotes: ['Bright Neroli', 'Dewy Rose Petals', 'Golden Seed Oil'],
    artisan: {
      name: 'Atelier Botanique',
      origin: 'Grasse, France',
      craft: 'Steam Alembic Distillation',
      story: 'Bespoke herbalists distilling precious Mediterranean floral waters and supercritical plant extracts in copper stills.'
    },
    volumeOrWeight: '30ml Dropper Bottle',
    description: 'Velvety, fast-absorbing botanical nectar that replenishes deep skin moisture while calming the senses with uplifting citrus blossom notes.',
    ritualMatchTags: ['morning', 'creative', 'citrus', 'floral', 'sanctuary', 'gourmet']
  },
  {
    id: 'prod-11',
    name: 'Dead Sea Minerals & Lavender Calm Soak',
    category: 'Self-Care & Apothecary',
    subtitle: 'Coarse magnesium-rich sea crystals with French alpine lavender buds',
    priceUSD: 21.0,
    priceBDT: 2520,
    rating: 4.8,
    reviewCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=700&q=80',
    badges: ['High Magnesium', 'Pure Essential Oil', 'Plastic-Free'],
    sensoryNotes: ['French Lavender', 'Eucalyptus Leaf', 'Clean Salt Breeze'],
    artisan: {
      name: 'Sal Terra Apothecary',
      origin: 'Carmel-by-the-Sea, CA',
      craft: 'Hand-Milled Mineral Curation',
      story: 'Sourcing therapeutic-grade unrefined salts blended with wild organic herbs for deeply restorative evening soak rituals.'
    },
    volumeOrWeight: '350g Amber Glass Flask',
    description: 'Dissolves into warm water to soothe tense muscles, quiet mental chatter, and prepare the mind for profound, restorative slumber.',
    ritualMatchTags: ['unwind', 'evening', 'floral', 'cottage', 'relief']
  },
  {
    id: 'prod-12',
    name: 'Sandalwood & Vetiver Root Pulse Oil',
    category: 'Self-Care & Apothecary',
    subtitle: 'Concentrated grounding rollerball with Mysore sandalwood and wild roots',
    priceUSD: 22.0,
    priceBDT: 2640,
    rating: 4.9,
    reviewCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=700&q=80',
    badges: ['Pure Plant Extracts', 'Travel Ready', 'Stainless Roller'],
    sensoryNotes: ['Mysore Sandalwood', 'Earthy Vetiver', 'Warm Vanilla Bean'],
    artisan: {
      name: 'Aromatics of Bengal',
      origin: 'Chittagong Hill Tracts',
      craft: 'Ancestral Resin Extraction',
      story: 'Preserving ancient Ayurvedic perfume recipes utilizing native tree resins and deep-root botanical infusions.'
    },
    volumeOrWeight: '10ml Rollerball',
    description: 'Designed for quick mindful resets during high-stress hours. Roll over wrists and temples to inhale deeply and anchor the nervous system.',
    ritualMatchTags: ['focus', 'unwind', 'woodsy', 'nomad', 'relief', 'artisans']
  },
  {
    id: 'prod-13',
    name: 'Linen-Bound Gratitude & Ritual Journal',
    category: 'Mindful Stationery',
    subtitle: 'Hardcover Belgian woven linen with 120gsm bamboo fountain-pen paper',
    priceUSD: 26.0,
    priceBDT: 3120,
    rating: 5.0,
    reviewCount: 185,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    badges: ['FSC Bamboo Paper', 'Lay-Flat Binding', 'Ribbon Bookmark'],
    sensoryNotes: ['Textured Linen', 'Crisp Cotton Page', 'Earthy Binding'],
    artisan: {
      name: 'Paperie & Craft Guild',
      origin: 'Antwerp, Belgium',
      craft: 'Smyth-Sewn Hand Binding',
      story: 'Centuries-old bookbinding techniques producing durable journals engineered to lie completely flat on any work surface.'
    },
    volumeOrWeight: '192 Ruled Pages (A5 size)',
    description: 'A tactile sanctuary for morning intentions, daily gratitudes, and evening reflections. Zero ink feathering or bleed-through even with wet fountain pens.',
    ritualMatchTags: ['focus', 'morning', 'creative', 'cottage', 'eco']
  },
  {
    id: 'prod-14',
    name: 'Solid Brass Weight Rollerball & Refills',
    category: 'Mindful Stationery',
    subtitle: 'Machined from raw brass block; develops rich custom patina over years',
    priceUSD: 36.0,
    priceBDT: 4320,
    rating: 4.9,
    reviewCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    badges: ['Heirloom Solid Brass', 'German Schmidt Mechanism', 'Zero Plastic'],
    sensoryNotes: ['Cool Polished Brass', 'Substantial Weight', 'Gliding Ink'],
    artisan: {
      name: 'Foundry & Form Labs',
      origin: 'Kyoto, Japan',
      craft: 'Precision Lathe Turning',
      story: 'Artisans shaping brass hardware with meticulous micrometer precision to create lifetime writing instruments that age with grace.'
    },
    volumeOrWeight: '48g Balanced Weight Pen',
    description: 'Satisfyingly weighted to glide effortlessly across the page without hand fatigue. Arrives with two quick-drying archival black gel cartridges.',
    ritualMatchTags: ['focus', 'creative', 'nomad', 'sanctuary', 'gourmet']
  },
  {
    id: 'prod-15',
    name: 'Wildflower Botanical Seed Letter Sheets',
    category: 'Mindful Stationery',
    subtitle: 'Handmade cotton-rag paper embedded with non-invasive bee meadow seeds',
    priceUSD: 15.0,
    priceBDT: 1800,
    rating: 4.8,
    reviewCount: 74,
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80',
    badges: ['Plantable Seed Paper', '100% Recycled Cotton', 'Pollinator Friendly'],
    sensoryNotes: ['Raw Deckle Edge', 'Petal Inclusions', 'Natural Fiber'],
    artisan: {
      name: 'Paper Pulp Reclaim Co.',
      origin: 'Dhaka Eco-Hub, Bangladesh',
      craft: 'Hand-Screen Deckle Molding',
      story: 'Transforming textile industry waste cotton shreds into luxurious seed-embedded paper sheets that bloom into flowers when planted.'
    },
    volumeOrWeight: '10 Sheets + 10 Seed Envelopes',
    description: 'Write heartfelt letters to loved ones, then plant the biodegradable paper under moist soil to grow forget-me-nots, poppies, and thyme.',
    ritualMatchTags: ['creative', 'floral', 'cottage', 'artisans', 'eco']
  },
  {
    id: 'prod-16',
    name: 'Carved American Walnut Desk Cradle',
    category: 'Mindful Stationery',
    subtitle: 'Sculpted solid timber station for pens, daily cards, and phone rest',
    priceUSD: 29.0,
    priceBDT: 3480,
    rating: 4.9,
    reviewCount: 63,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80',
    badges: ['Sustainably Harvested', 'Danish Oil Finish', 'Cork Footings'],
    sensoryNotes: ['Deep Walnut Grain', 'Silky Hand Wax', 'Warm Wood'],
    artisan: {
      name: 'Timber & Grain Studio',
      origin: 'Portland, OR',
      craft: 'Organic Curve Wood Shaving',
      story: 'Woodworkers carving reclaimed timber cuts into minimalist desk accessories finished with organic beeswax and food-grade mineral oil.'
    },
    volumeOrWeight: 'Solid Hardwood (20cm x 8cm)',
    description: 'Declutters your ritual space with warmth and organic harmony. Houses your brass pen, favorite crystal, or mindfulness intention card.',
    ritualMatchTags: ['focus', 'woodsy', 'sanctuary', 'cottage', 'eco']
  },
  {
    id: 'prod-17',
    name: 'Cold-Pressed Early Harvest Kalamata Extra Virgin Olive Oil',
    category: 'Organic Pantry Essentials',
    subtitle: 'Single-estate unfiltered green EVOO with artichoke & pepper finish',
    priceUSD: 23.5,
    priceBDT: 2820,
    rating: 4.9,
    reviewCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80',
    badges: ['First Cold Press', 'Single Estate Messinia', 'Acidity < 0.2%'],
    sensoryNotes: ['Fresh Artichoke', 'Crushed Olive Leaf', 'Spicy White Pepper'],
    artisan: {
      name: 'Messinian Olive Groves & Co.',
      origin: 'Kalamata, Greece',
      craft: 'Centrifugal Ambient Cold Extraction',
      story: 'Harvested from century-old Koroneiki olive trees using traditional canvas nets and cold-pressed within four hours of dawn picking.'
    },
    volumeOrWeight: '500ml UV Dark Glass Bottle',
    description: 'Remarkably vibrant, liquid emerald olive oil brimming with polyphenol antioxidants. Delivers an herbaceous green aroma with a velvety body and peppery throat finish.',
    ritualMatchTags: ['morning', 'creative', 'citrus', 'sanctuary', 'gourmet', 'artisans']
  },
  {
    id: 'prod-18',
    name: 'Raw Sundarban Mangrove Honey with Fresh Royal Jelly',
    category: 'Organic Pantry Essentials',
    subtitle: 'Unheated wild mangrove comb nectar fortified with live royal jelly',
    priceUSD: 19.0,
    priceBDT: 2280,
    rating: 5.0,
    reviewCount: 154,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80',
    badges: ['Unheated & Raw', 'Wild Comb Gathered', 'Enzyme Rich'],
    sensoryNotes: ['Mangrove Blossom', 'Amber Caramel', 'Warm Earth'],
    artisan: {
      name: 'Sundarban Forest Honey Collective',
      origin: 'Bagerhat Mangrove Basin, BD',
      craft: 'Sustainable Deep-Forest Beekeeping',
      story: 'Gathered by licensed community traditional apiarists using smoke-free techniques that protect the indigenous Apis dorsata wild bee hives.'
    },
    volumeOrWeight: '320g Stoneware Hex Pot',
    description: 'Thick, golden, aromatic raw nectar with delicate floral aromatics and natural propolis. Stir a spoonful into morning herbal tea or drizzle over Greek yogurt.',
    ritualMatchTags: ['morning', 'unwind', 'floral', 'cottage', 'artisans', 'eco']
  },
  {
    id: 'prod-19',
    name: 'Hand-Flaked Pink Himalayan Mineral Salt & Smoked Pepper',
    category: 'Organic Pantry Essentials',
    subtitle: 'Ancient seabed crystals blended with oak-smoked tellicherry peppercorns',
    priceUSD: 14.5,
    priceBDT: 1740,
    rating: 4.8,
    reviewCount: 92,
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80',
    badges: ['84 Trace Minerals', 'Oak Wood Smoked', 'Zero Fillers'],
    sensoryNotes: ['Mild Mineral Salt', 'Smoky Oak Wood', 'Pungent Pepper'],
    artisan: {
      name: 'Salt & Mineral Guild',
      origin: 'Salt Range Foothills, Punjab',
      craft: 'Hand-Hewn Crystal Flaking',
      story: 'Artisans hand-chisel ancient rose salt strata and pair them with whole peppercorns smoked over reclaimed wine barrel shavings.'
    },
    volumeOrWeight: '220g Ceramic Mill Jar',
    description: 'Subtle mineral richness and mellow oak-wood aroma elevate roasted heirloom root vegetables, poached organic eggs, and artisan crusty bread.',
    ritualMatchTags: ['focus', 'creative', 'woodsy', 'sanctuary', 'gourmet']
  },
  {
    id: 'prod-20',
    name: 'Stoneground Heritage Khorasan Ancient Wheat Flour',
    category: 'Organic Pantry Essentials',
    subtitle: 'Granite-stone milled heirloom grain for sourdough, pastas & rustic galettes',
    priceUSD: 13.0,
    priceBDT: 1560,
    rating: 4.9,
    reviewCount: 68,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
    badges: ['100% Heirloom Grain', 'Granite Stoneground', 'Non-Hybridized'],
    sensoryNotes: ['Sweet Hazelnut', 'Warm Golden Wheat', 'Buttery Crust'],
    artisan: {
      name: 'Windmill Millers Guild',
      origin: 'Anatolia & Aegean Basin',
      craft: 'Slow-Speed Watermill Grinding',
      story: 'Milling whole unhybridized ancient Khorasan kernels at cool ambient temperatures to preserve the nutrient-dense germ, oils, and enzymes.'
    },
    volumeOrWeight: '1.2 kg Cotton Calico Sack',
    description: 'Imparts a warm amber hue and naturally buttery, nutty flavor to artisan sourdough loaves, focaccias, and weekend morning skillet pancakes.',
    ritualMatchTags: ['morning', 'creative', 'cottage', 'eco', 'gourmet']
  },
  {
    id: 'prod-21',
    name: 'Jordan Valley Medjool Dates with Toasted Walnuts & Cardamom',
    category: 'Superfoods & Nuts',
    subtitle: 'King-sized organic Medjool dates stuffed with crisp roasted Persian walnuts',
    priceUSD: 17.0,
    priceBDT: 2040,
    rating: 4.9,
    reviewCount: 118,
    imageUrl: 'https://images.unsplash.com/photo-1594918074984-b04323e593fc?auto=format&fit=crop&w=700&q=80',
    badges: ['Organic Certified', 'Raw & Unsulfured', 'Superfood Snack'],
    sensoryNotes: ['Caramel Fudge', 'Toasted Walnut', 'Green Cardamom'],
    artisan: {
      name: 'Oasis Date Growers Cooperative',
      origin: 'Jericho Basin, Jordan Valley',
      craft: 'Hand-Sorted Sun Curing',
      story: 'Hand-picked at peak ripeness under dry desert heat, pitted by hand, and stuffed with freshly roasted local walnuts and whole ground cardamom.'
    },
    volumeOrWeight: '300g Kraft Keepsake Box',
    description: 'Chewy, rich, and naturally fudge-like. A wholesome, high-fiber natural energy bite that pairs harmoniously with dark espresso and hot mint tea.',
    ritualMatchTags: ['unwind', 'morning', 'roast', 'nomad', 'gourmet']
  },
  {
    id: 'prod-22',
    name: 'Wild Blue Forest Maple & Chia Crunchy Granola Clusters',
    category: 'Superfoods & Nuts',
    subtitle: 'Slow-baked rolled oats, pumpkin seeds, black chia & pure Quebec maple syrup',
    priceUSD: 15.5,
    priceBDT: 1860,
    rating: 4.8,
    reviewCount: 95,
    imageUrl: 'https://images.unsplash.com/photo-1517093709141-866416f8819d?auto=format&fit=crop&w=700&q=80',
    badges: ['Gluten-Free Oats', 'Pure Grade-A Maple', 'Omega-3 Rich'],
    sensoryNotes: ['Maple Caramel', 'Toasted Pepitas', 'Vanilla Pod'],
    artisan: {
      name: 'Laurentian Hearth Roasters',
      origin: 'Quebec Maple Reserve, Canada',
      craft: 'Small-Tray Olive Oil Baking',
      story: 'Baking crunchy whole-grain oat clusters bound with deep amber wood-fired maple syrup and coconut blossom nectar in convection stone ovens.'
    },
    volumeOrWeight: '350g Resealable Kraft Pouch',
    description: 'Lightly sweet, exceptionally crisp clusters loaded with toasted seeds and superfood black chia. Perfect for morning bowls or afternoon pantry snacking.',
    ritualMatchTags: ['focus', 'morning', 'creative', 'cottage', 'eco']
  },
  {
    id: 'prod-23',
    name: 'Single-Estate Lakadong High-Curcumin Golden Turmeric Elixir',
    category: 'Superfoods & Nuts',
    subtitle: 'Meghalaya heirloom golden root with 7.5% curcumin, ginger & Tellicherry pepper',
    priceUSD: 16.0,
    priceBDT: 1920,
    rating: 5.0,
    reviewCount: 83,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80',
    badges: ['7.5% Natural Curcumin', 'Jaintia Hills Harvest', 'Soil Association Organic'],
    sensoryNotes: ['Deep Golden Earth', 'Spicy Ginger', 'Subtle Citrus'],
    artisan: {
      name: 'Khasi Hills Indigenous Growers',
      origin: 'Meghalaya, India',
      craft: 'Sun-Drying & Low-RPM Stone Milling',
      story: 'Cultivated in high-altitude mineral soils by indigenous Khasi women farmers using traditional regenerative agroforestry techniques.'
    },
    volumeOrWeight: '100g Amber Glass Apothecary Flask',
    description: 'World-renowned for its exceptionally high curcumin concentration. Whisk half a teaspoon into warmed oat milk with raw honey for an anti-inflammatory golden milk ritual.',
    ritualMatchTags: ['unwind', 'evening', 'citrus', 'relief', 'artisans', 'eco']
  },
  {
    id: 'prod-24',
    name: 'Artisan Sourdough & Guérande Grey Salt Crispbreads',
    category: 'Artisanal Snacks',
    subtitle: '48-hour slow fermented wild sourdough crackers baked with French grey sea salt',
    priceUSD: 11.0,
    priceBDT: 1320,
    rating: 4.9,
    reviewCount: 140,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
    badges: ['48hr Wild Ferment', 'Guérande Sea Salt', 'No Preservatives'],
    sensoryNotes: ['Tangy Sourdough', 'Flaky Grey Salt', 'Toasted Wheat'],
    artisan: {
      name: 'Levain & Crust Bakery',
      origin: 'Brittany, France',
      craft: 'Wood-Fired Hearth Baking',
      story: 'Baking thin crackers from a 30-year-old sourdough mother culture and sprinkling them with hand-harvested grey sea salt from Celtic salt marshes.'
    },
    volumeOrWeight: '180g Eco Box',
    description: 'Irresistibly crisp with a delightfully tangy sourdough finish. The ultimate accompaniment for soft cheeses, avocado spreads, and cold-pressed olive oils.',
    ritualMatchTags: ['creative', 'gourmet', 'sanctuary', 'cottage']
  }
].map((p: any, idx: number): Product => ({
  ...p,
  category: p.category as import('../types').ProductCategory,
  itemsSold: p.itemsSold ?? (350 + ((idx * 149) % 550)),
  originalPriceUSD: p.originalPriceUSD ?? +(p.priceUSD * 1.25).toFixed(2),
  originalPriceBDT: p.originalPriceBDT ?? Math.round(p.priceBDT * 1.25),
  badgeLabel: p.badgeLabel ?? (idx === 0 ? 'Just in' : idx === 1 ? 'Best Deal' : idx === 2 ? 'Rare Harvest' : idx % 4 === 0 ? 'Sold out' : idx % 3 === 0 ? 'Just in' : 'Organic')
}));

export const RECIPE_PAIRINGS: import('../types').RecipePairing[] = [
  {
    id: 'rec-1',
    title: 'Monsoon Mist Cold-Brewed White Tea & Wild Honeycomb Toast',
    time: '5 mins (+ 4h cold steep)',
    difficulty: 'Easy',
    description: 'Chilled Sylhet Silver Needle tea served over ice cubes with warm sourdough toasts glazed in Sundarban wild honey and Maldon sea salt flakes.',
    tags: ['Morning Ritual', 'Refreshing', 'High Antioxidant'],
    featuredProductNames: [
      'Sreemangal High-Elevation Silver Needle',
      'Wildflower Honeycomb & Sea Salt Crisps',
      'Raw Sundarban Mangrove Honey with Fresh Royal Jelly'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=700&q=80',
    servingSize: '2 Servings',
    steps: [
      'Steep 5g of Sreemangal Silver Needle in 500ml cold spring water inside a glass carafe for 4 hours in the refrigerator.',
      'Slice rustic sourdough or toast whole grain slices until golden and crisp.',
      'Drizzle lavishly with Raw Sundarban Honey and crumble Wildflower Honeycomb crisps on top.',
      'Strain the chilled pale champagne tea into stemless glassware with clear ice and fresh mint leaves.'
    ]
  },
  {
    id: 'rec-2',
    title: 'Ceremonial First-Harvest Matcha Latte & Chuncho Dark Cacao',
    time: '4 mins',
    difficulty: 'Easy',
    description: 'Whisked emerald Uji ceremonial matcha layered over creamy frothed oat milk, finished with microplaned shavings of 74% Chuncho Peruvian dark chocolate.',
    tags: ['Sustained Energy', 'Cognitive Focus', 'Zero Crash'],
    featuredProductNames: [
      'Uji Ceremonial First-Harvest Matcha',
      'Single-Origin 74% Chuncho Dark Chocolate'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80',
    servingSize: '1 Bowl',
    steps: [
      'Sift 2g (one bamboo chashaku scoop) of Uji Matcha into a warm ceramic chawan bowl.',
      'Add 60ml of 80°C hot spring water. Whisk briskly in a zig-zag "W" motion until micro-foam appears.',
      'Pour 150ml of warm frothed barista oat milk into your cup and gently pour the emerald froth over top.',
      'Using a microplane, grate velvety curls of Chuncho single-origin chocolate across the surface.'
    ]
  },
  {
    id: 'rec-3',
    title: 'Mediterranean Tapas: Kalamata EVOO, Truffle Marconas & Dates',
    time: '8 mins',
    difficulty: 'Easy',
    description: 'An elegant late-afternoon grazing platter featuring early-harvest Greek olive oil for bread dipping, rosemary truffle Marconas, and cardamom Medjool dates.',
    tags: ['Aperitivo', 'Pantry Grazing', 'Heart Healthy'],
    featuredProductNames: [
      'Cold-Pressed Early Harvest Kalamata Extra Virgin Olive Oil',
      'Rosemary & Black Truffle Marcona Almonds',
      'Jordan Valley Medjool Dates with Toasted Walnuts & Cardamom',
      'Artisan Sourdough & Guérande Grey Salt Crispbreads'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80',
    servingSize: '3-4 Guests',
    steps: [
      'Pour generous pools of Kalamata EVOO into shallow stoneware dipping dishes with a pinch of pink Himalayan flake salt.',
      'Arrange Rosemary & Black Truffle Marconas alongside Artisan Sourdough crispbreads.',
      'Serve Jordan Valley Medjool dates as sweet counterpoints to the savory, herbaceous olive oil and truffle crunch.'
    ]
  },
  {
    id: 'rec-4',
    title: 'Lakadong Golden Milk Elixir with Cinnamon & Raw Forest Honey',
    time: '6 mins',
    difficulty: 'Easy',
    description: 'A deeply restorative evening tonic made with high-curcumin Meghalaya turmeric, freshly grated ginger, Madagascar vanilla, and wildflower forest honey.',
    tags: ['Evening Wind-Down', 'Anti-Inflammatory', 'Deep Rest'],
    featuredProductNames: [
      'Single-Estate Lakadong High-Curcumin Golden Turmeric Elixir',
      'Raw Sundarban Mangrove Honey with Fresh Royal Jelly'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80',
    servingSize: '2 Cups',
    steps: [
      'In a small heavy saucepan, warm 400ml of whole milk or creamy almond milk over gentle heat.',
      'Whisk in 1 teaspoon of Lakadong Golden Turmeric, a pinch of ground cinnamon, and freshly ground black pepper.',
      'Simmer gently on low for 3 minutes without boiling to release the aromatic essential oils.',
      'Remove from heat, allow to cool slightly for 1 minute, then stir in Raw Mangrove Honey and pour into ceramic mugs.'
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    stepTitle: 'Step 1 of 4: Your Daily Cadence',
    question: 'Which moment of the day do you wish to transform into a sacred ritual?',
    subtext: 'We shape your box around the moments that need mindfulness the most.',
    options: [
      {
        id: 'morning',
        label: 'Dawn Awakening & Focused Energy',
        description: 'Vibrant sunrise teas, ceremonial matcha, morning reflection journals',
        icon: 'Sun',
        matchTags: ['morning', 'focus']
      },
      {
        id: 'evening',
        label: 'Dusk Wind-Down & Deep Sleep',
        description: 'Smoky herbal tisanes, calming bath salts, temple hinoki candles',
        icon: 'Moon',
        matchTags: ['evening', 'unwind']
      },
      {
        id: 'creative',
        label: 'Midday Creative Flow & Focus',
        description: 'Single-origin espresso roasts, weighted brass pens, brain-fuel crunch',
        icon: 'Sparkles',
        matchTags: ['creative', 'focus']
      },
      {
        id: 'relief',
        label: 'Stress Reset & Emotional Sanctuary',
        description: 'Pulse point aromatherapy oils, soothing botanical balms, grounding elixirs',
        icon: 'Heart',
        matchTags: ['relief', 'unwind']
      }
    ]
  },
  {
    id: 2,
    stepTitle: 'Step 2 of 4: Sensory Profile',
    question: 'Which sensory aroma and flavor profile speaks to your soul?',
    subtext: 'Every artisan product in CrateCraft is chosen for olfactory and palate harmony.',
    options: [
      {
        id: 'woodsy',
        label: 'Ancient Forest & Cedarwood Resins',
        description: 'Hinoki cypress, smoked birch embers, vetiver roots, raw sandalwood',
        icon: 'Trees',
        matchTags: ['woodsy']
      },
      {
        id: 'citrus',
        label: 'Bright Citrus, Wild Stone Fruits & Neroli',
        description: 'Bergamot blossoms, yuzu zest, wild orange nectar, dewy rosehips',
        icon: 'Zap',
        matchTags: ['citrus']
      },
      {
        id: 'roast',
        label: 'Dark Heirloom Cacao & Smoky Roast',
        description: 'Rich Urubamba chocolate, pine-smoked lapsang, toasted hazelnuts',
        icon: 'Coffee',
        matchTags: ['roast']
      },
      {
        id: 'floral',
        label: 'Soft Alpine Lavender & Spring Jasmine',
        description: 'French lavender buds, raw honeycomb, dewy silver needle mist',
        icon: 'Flower2',
        matchTags: ['floral']
      }
    ]
  },
  {
    id: 3,
    stepTitle: 'Step 3 of 4: Living Environment',
    question: 'Describe your current living space and daily environment.',
    subtext: 'Helps us tailor packaging size, vessel formats, and ritual accessories.',
    options: [
      {
        id: 'sanctuary',
        label: 'Curated Urban Sanctuary',
        description: 'Clean minimalist lines, intentional desk spaces, serene living corners',
        icon: 'Home',
        matchTags: ['sanctuary']
      },
      {
        id: 'cottage',
        label: 'Cozy Heritage Cottage',
        description: 'Warm timber tones, vintage books, slow afternoon tea nooks',
        icon: 'Compass',
        matchTags: ['cottage']
      },
      {
        id: 'nomad',
        label: 'Mobile Urban Nomad',
        description: 'Frequent travel, compact routines, desk-to-hotel carry essentials',
        icon: 'Briefcase',
        matchTags: ['nomad']
      },
      {
        id: 'eco',
        label: 'Zero-Waste & Eco-Conscious Haven',
        description: 'Plastic-free materials, seed paper, biodynamic botanicals only',
        icon: 'Leaf',
        matchTags: ['eco']
      }
    ]
  },
  {
    id: 4,
    stepTitle: 'Step 4 of 4: Curation Goal',
    question: 'What is your primary goal for joining the CrateCraft community?',
    subtext: 'We prioritize product allocations and surprise monthly artisan gifts accordingly.',
    options: [
      {
        id: 'artisans',
        label: 'Directly Support Emerging Global Artisans',
        description: 'Champion small independent craft workshops and sustainable growers',
        icon: 'Users',
        matchTags: ['artisans']
      },
      {
        id: 'gourmet',
        label: 'Discover Rare, Award-Winning Provisions',
        description: 'Sample limited seasonal harvests unavailable in traditional retail',
        icon: 'Award',
        matchTags: ['gourmet']
      },
      {
        id: 'relief',
        label: 'Build a Consistent Daily Mindfulness Habit',
        description: 'Ground everyday routines with tactile rituals that relieve stress',
        icon: 'Feather',
        matchTags: ['relief']
      },
      {
        id: 'eco',
        label: 'Replace Everyday Essentials with 100% Eco-Crafts',
        description: 'Zero plastic waste, compostable packaging, carbon-neutral shipping',
        icon: 'ShieldCheck',
        matchTags: ['eco']
      }
    ]
  }
];

export const INITIAL_SUBSCRIPTION: ActiveSubscription = {
  id: 'SUB-CRATE-94812',
  tier: 'curated',
  frequency: 'monthly',
  items: [
    PRODUCTS[0], // Yirgacheffe
    PRODUCTS[1], // Uji Matcha
    PRODUCTS[4], // Honeycomb crisps
    PRODUCTS[8], // Hinoki candle
    PRODUCTS[12], // Linen journal
    PRODUCTS[13], // Brass pen
  ],
  status: 'active',
  nextRenewalDate: 'November 15, 2026',
  fulfillmentStage: 2, // Packing & Sealing
  trackingNumber: 'CRATE-7749-US-EXP',
  carrier: 'FedEx EcoGreen / Sundarban Express Express',
  estimatedDelivery: 'November 22, 2026',
  plasticSavedKg: 5.4,
  artisansSupported: 16,
  rewardPoints: 850,
  createdAt: 'October 15, 2026'
};
