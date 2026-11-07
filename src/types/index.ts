export type Currency = 'USD' | 'BDT';

export type BoxTierId = 'starter' | 'curated' | 'sanctuary';

export interface BoxTier {
  id: BoxTierId;
  name: string;
  tagline: string;
  slots: number;
  discountPercentage: number;
  recommendedBadge?: string;
  iconName: string;
}

export type DeliveryFrequency = 'monthly' | 'bimonthly' | 'quarterly';

export interface FrequencyOption {
  id: DeliveryFrequency;
  label: string;
  cadenceDescription: string;
  extraDiscountPercent: number;
  badge?: string;
}

export type ProductCategory = 
  | 'All'
  | 'Specialty Coffee & Tea'
  | 'Artisanal Snacks'
  | 'Organic Pantry Essentials'
  | 'Superfoods & Nuts'
  | 'Self-Care & Apothecary'
  | 'Mindful Stationery';

export interface Artisan {
  name: string;
  origin: string;
  craft: string;
  story: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subtitle: string;
  priceUSD: number;
  priceBDT: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  badges: string[];
  sensoryNotes: string[];
  artisan: Artisan;
  volumeOrWeight: string;
  description: string;
  ritualMatchTags: string[];
  dietaryTags?: string[];
  itemsSold?: number;
  originalPriceUSD?: number;
  originalPriceBDT?: number;
  badgeLabel?: string;
}

export interface QuizQuestion {
  id: number;
  stepTitle: string;
  question: string;
  subtext: string;
  options: {
    id: string;
    label: string;
    description: string;
    icon: string;
    matchTags: string[];
  }[];
}

export interface QuizAnswers {
  ritualFocus?: string;
  sensoryProfile?: string;
  lifestyleEnvironment?: string;
  curationIntention?: string;
}

export type FulfillmentStage = 1 | 2 | 3 | 4;

export interface FulfillmentTimelineStep {
  stage: FulfillmentStage;
  title: string;
  statusText: string;
  detail: string;
  icon: string;
  dateEstimate: string;
}

export interface ActiveSubscription {
  id: string;
  tier: BoxTierId;
  frequency: DeliveryFrequency;
  items: Product[];
  status: 'active' | 'paused' | 'skipped';
  pauseUntilMonth?: string;
  skippedMonth?: string;
  nextRenewalDate: string;
  fulfillmentStage: FulfillmentStage;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  plasticSavedKg: number;
  artisansSupported: number;
  rewardPoints: number;
  createdAt: string;
}

export type PaymentMethod = 'card' | 'bkash' | 'nagad' | 'cod';

export interface Order {
  id: string;
  date: string;
  tier: BoxTierId;
  frequency: DeliveryFrequency;
  items: Product[];
  totalUSD: number;
  totalBDT: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  paymentRef: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    phone?: string;
  };
}

export interface RecipePairing {
  id: string;
  title: string;
  time: string;
  difficulty: 'Easy' | 'Moderate' | 'Artisan';
  description: string;
  tags: string[];
  featuredProductNames: string[];
  imageUrl: string;
  servingSize: string;
  steps: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: {
    fullName?: string;
    street?: string;
    city?: string;
    country?: string;
  };
  dietaryPreference?: string;
  memberSince?: string;
  subscriptionTier?: BoxTierId;
  rewardPoints?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dietaryPreference?: string;
}

