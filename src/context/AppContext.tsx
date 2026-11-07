'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { 
  Product, 
  BoxTierId, 
  DeliveryFrequency, 
  Currency, 
  ActiveSubscription, 
  Order, 
  FulfillmentStage,
  User,
  LoginCredentials,
  RegisterData
} from '../types';
import { INITIAL_SUBSCRIPTION, BOX_TIERS, PRODUCTS } from '../data/mockData';

export type ActiveTab = 'home' | 'builder' | 'quiz' | 'catalog' | 'subscription' | 'checkout' | 'recipes';

export interface ToastNotification {
  message: string;
  subMessage?: string;
  type: 'info' | 'success' | 'upgrade' | 'warning';
  visible: boolean;
}

export interface AppContextType {
  // Navigation & Tabs
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usd: number, bdt?: number) => string;

  // Crate / Box Builder
  selectedTier: BoxTierId;
  setSelectedTier: (tier: BoxTierId) => void;
  selectedFrequency: DeliveryFrequency;
  setSelectedFrequency: (freq: DeliveryFrequency) => void;
  boxItems: Product[];
  addToBox: (product: Product) => { success: boolean; reason?: string };
  removeFromBox: (productId: string) => void;
  clearBox: () => void;
  loadBoxItems: (items: Product[], tier?: BoxTierId) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search & Catalog Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  selectedDietaryFilter: string;
  setSelectedDietaryFilter: (diet: string) => void;
  selectedTypeFilter: string;
  setSelectedTypeFilter: (t: string) => void;
  resetFilters: () => void;

  // Subscription Management
  subscription: ActiveSubscription;
  updateSubscriptionStatus: (status: 'active' | 'paused' | 'skipped', pauseMonths?: number) => void;
  updateSubscriptionFrequency: (freq: DeliveryFrequency) => void;
  setFulfillmentStage: (stage: FulfillmentStage) => void;
  saveItemsToSubscription: () => void;
  isEditingSubscriptionBox: boolean;
  setIsEditingSubscriptionBox: (editing: boolean) => void;

  // One-time Addons for next drop
  oneTimeAddons: Product[];
  addOneTimeAddon: (product: Product) => void;
  removeOneTimeAddon: (productId: string) => void;

  // Dietary & Pantry Preferences
  dietaryPreferences: string[];
  toggleDietaryPreference: (pref: string) => void;

  // Orders & Checkout
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  redeemedPoints: number;
  setRedeemedPoints: (points: number) => void;

  // Modals & Drawers
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isFlatLayOpen: boolean;
  setIsFlatLayOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isPromoModalOpen: boolean;
  setIsPromoModalOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isSubscriberPortalOpen: boolean;
  setIsSubscriberPortalOpen: (open: boolean) => void;
  isBuilderOpen: boolean;
  setIsBuilderOpen: (open: boolean) => void;

  // Authentication & User State
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;

  // Toast Notifications
  toast: ToastNotification;
  showToast: (message: string, subMessage?: string, type?: ToastNotification['type']) => void;
  dismissToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'cratecraft_user_v3';
const STORAGE_KEY_TOKEN = 'cratecraft_token_v3';
const STORAGE_KEY_BOX = 'cratecraft_box_items_v3';
const STORAGE_KEY_TIER = 'cratecraft_tier_v3';
const STORAGE_KEY_FREQ = 'cratecraft_freq_v3';
const STORAGE_KEY_CURRENCY = 'cratecraft_currency_v3';
const STORAGE_KEY_SUBSCRIPTION = 'cratecraft_subscription_v3';
const STORAGE_KEY_ORDERS = 'cratecraft_orders_v3';
const STORAGE_KEY_WISHLIST = 'cratecraft_wishlist_v3';
const STORAGE_KEY_PREFS = 'cratecraft_dietary_prefs_v3';

export const DEFAULT_DEMO_USER: User = {
  id: 'user-emir-001',
  name: 'Emir Abiyyu',
  email: 'emir@cratecraft.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  phone: '+880 1712-345678',
  address: {
    fullName: 'Emir Abiyyu',
    street: 'House 42, Road 11, Banani',
    city: 'Dhaka',
    country: 'Bangladesh',
  },
  dietaryPreference: 'Specialty Coffee & Organic',
  memberSince: 'March 2026',
  subscriptionTier: 'curated',
  rewardPoints: 450,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');
  const [currency, setCurrencyState] = useState<Currency>('BDT');
  const [selectedTier, setSelectedTierState] = useState<BoxTierId>('curated');
  const [selectedFrequency, setSelectedFrequencyState] = useState<DeliveryFrequency>('monthly');

  // Auth & User State
  const [user, setUser] = useState<User | null>(DEFAULT_DEMO_USER);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Box Items
  const [boxItems, setBoxItems] = useState<Product[]>(() => [PRODUCTS[0], PRODUCTS[1]]);
  const [oneTimeAddons, setOneTimeAddons] = useState<Product[]>([]);
  const [subscription, setSubscription] = useState<ActiveSubscription>(INITIAL_SUBSCRIPTION);
  const [isEditingSubscriptionBox, setIsEditingSubscriptionBox] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [redeemedPoints, setRedeemedPoints] = useState<number>(0);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(['Organic', 'Direct Trade']);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-2', 'prod-17']);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedDietaryFilter, setSelectedDietaryFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isFlatLayOpen, setIsFlatLayOpen] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isSubscriberPortalOpen, setIsSubscriberPortalOpen] = useState<boolean>(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);

  // Toast
  const [toast, setToast] = useState<ToastNotification>({
    message: '',
    subMessage: undefined,
    type: 'success',
    visible: false,
  });

  // Hydrate from localStorage once mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCurrency = localStorage.getItem(STORAGE_KEY_CURRENCY);
        if (savedCurrency === 'USD' || savedCurrency === 'BDT') {
          setCurrencyState(savedCurrency);
        }

        const savedTier = localStorage.getItem(STORAGE_KEY_TIER);
        if (savedTier && (savedTier === 'starter' || savedTier === 'curated' || savedTier === 'sanctuary')) {
          setSelectedTierState(savedTier as BoxTierId);
        }

        const savedFreq = localStorage.getItem(STORAGE_KEY_FREQ);
        if (savedFreq && (savedFreq === 'monthly' || savedFreq === 'bimonthly' || savedFreq === 'quarterly')) {
          setSelectedFrequencyState(savedFreq as DeliveryFrequency);
        }

        const savedBox = localStorage.getItem(STORAGE_KEY_BOX);
        if (savedBox) {
          const parsed = JSON.parse(savedBox);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBoxItems(parsed);
          }
        }

        const savedWishlist = localStorage.getItem(STORAGE_KEY_WISHLIST);
        if (savedWishlist) {
          const parsed = JSON.parse(savedWishlist);
          if (Array.isArray(parsed)) {
            setWishlist(parsed);
          }
        }

        const savedSub = localStorage.getItem(STORAGE_KEY_SUBSCRIPTION);
        if (savedSub) {
          const parsedSub = JSON.parse(savedSub);
          if (parsedSub && parsedSub.id) {
            setSubscription(parsedSub);
          }
        }

        const savedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          if (Array.isArray(parsedOrders)) {
            setOrders(parsedOrders);
          }
        }

        const savedPrefs = localStorage.getItem(STORAGE_KEY_PREFS);
        if (savedPrefs) {
          const parsedPrefs = JSON.parse(savedPrefs);
          if (Array.isArray(parsedPrefs)) {
            setDietaryPreferences(parsedPrefs);
          }
        }

        const savedUser = localStorage.getItem(STORAGE_KEY_USER);
        if (savedUser !== null) {
          if (savedUser === 'null' || savedUser === '') {
            setUser(null);
          } else {
            try {
              setUser(JSON.parse(savedUser));
            } catch {
              setUser(DEFAULT_DEMO_USER);
            }
          }
        }
      } catch {
        // Safe fallback
      }
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_CURRENCY, currency);
        localStorage.setItem(STORAGE_KEY_TIER, selectedTier);
        localStorage.setItem(STORAGE_KEY_FREQ, selectedFrequency);
        localStorage.setItem(STORAGE_KEY_BOX, JSON.stringify(boxItems));
        localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
        localStorage.setItem(STORAGE_KEY_SUBSCRIPTION, JSON.stringify(subscription));
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
        localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(dietaryPreferences));
        localStorage.setItem(STORAGE_KEY_USER, user ? JSON.stringify(user) : 'null');
      } catch {
        // ignore
      }
    }
  }, [currency, selectedTier, selectedFrequency, boxItems, wishlist, subscription, orders, dietaryPreferences, user]);

  // Auth Action Methods
  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoadingAuth(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setIsLoadingAuth(false);
        return { success: false, error: data.error || 'Login failed' };
      }
      setUser(data.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem(STORAGE_KEY_TOKEN, data.token);
        }
      }
      setIsAuthModalOpen(false);
      setIsLoadingAuth(false);
      showToast(
        `Welcome back, ${data.user.name}!`,
        'You are securely logged into your CrateCraft sanctuary.',
        'success'
      );
      return { success: true };
    } catch (err: any) {
      setIsLoadingAuth(false);
      return { success: false, error: err?.message || 'Network error during login' };
    }
  };

  const register = async (regData: RegisterData) => {
    setIsLoadingAuth(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setIsLoadingAuth(false);
        return { success: false, error: data.error || 'Registration failed' };
      }
      setUser(data.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem(STORAGE_KEY_TOKEN, data.token);
        }
      }
      setIsAuthModalOpen(false);
      setIsLoadingAuth(false);
      showToast(
        `Welcome to CrateCraft, ${data.user.name}!`,
        'Account created! 100 Welcome Ritual Points credited to your profile.',
        'success'
      );
      return { success: true };
    } catch (err: any) {
      setIsLoadingAuth(false);
      return { success: false, error: err?.message || 'Network error during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_USER, 'null');
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
    showToast('Signed Out', 'You have been safely signed out.', 'info');
  };

  const updateUserProfile = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      }
      return updated;
    });
    showToast('Profile Saved', 'Your subscriber details were updated.', 'success');
  };

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
  };

  const setSelectedTier = (tier: BoxTierId) => {
    setSelectedTierState(tier);
  };

  const setSelectedFrequency = (freq: DeliveryFrequency) => {
    setSelectedFrequencyState(freq);
  };

  const formatPrice = (usd: number, bdt?: number) => {
    if (currency === 'USD') {
      return `$${usd.toFixed(2)}`;
    }
    const bdtVal = bdt ?? Math.round(usd * 120);
    return `৳${bdtVal.toLocaleString('en-BD')}`;
  };

  const showToast = (
    message: string, 
    subMessage?: string, 
    type: ToastNotification['type'] = 'success'
  ) => {
    setToast({ message, subMessage, type, visible: true });
  };

  const dismissToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', undefined, 'info');
        return prev.filter(id => id !== productId);
      } else {
        const prod = PRODUCTS.find(p => p.id === productId);
        showToast('Saved to Wishlist! ❤️', prod ? `Added ${prod.name}` : undefined, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Add Item to Box with intelligent auto-upgrade
  const addToBox = (product: Product): { success: boolean; reason?: string } => {
    // Check duplicate
    if (boxItems.some(i => i.id === product.id)) {
      showToast(
        'Already Packed in Crate', 
        `"${product.name}" is already packed in your current drop.`, 
        'warning'
      );
      return { success: false, reason: 'Already in box' };
    }

    const currentTier = BOX_TIERS[selectedTier];
    const newCount = boxItems.length + 1;

    // Check if adding exceeds current tier slots -> Auto-upgrade
    if (newCount > currentTier.slots) {
      if (selectedTier === 'starter') {
        setSelectedTierState('curated');
        setBoxItems(prev => [...prev, product]);
        showToast(
          'Auto-Upgraded to Curated Box! 🎉',
          `You unlocked 6 slots and increased your discount to 15% OFF!`,
          'upgrade'
        );
        setIsCartDrawerOpen(true);
        return { success: true };
      } else if (selectedTier === 'curated') {
        setSelectedTierState('sanctuary');
        setBoxItems(prev => [...prev, product]);
        showToast(
          'Auto-Upgraded to Ultimate Sanctuary! 👑',
          `You unlocked 8 slots and maximized your discount to 25% OFF!`,
          'upgrade'
        );
        setIsCartDrawerOpen(true);
        return { success: true };
      } else {
        showToast(
          'Sanctuary Capacity Full (8/8)',
          'Your Ultimate Sanctuary crate has all 8 slots packed. Review your crate or swap an item.',
          'warning'
        );
        setIsCartDrawerOpen(true);
        return { success: false, reason: 'Box is full' };
      }
    }

    setBoxItems(prev => [...prev, product]);
    showToast(
      'Provision Packed in Crate! 🌿',
      `Packed into slot #${newCount} of ${currentTier.slots}.`,
      'success'
    );
    return { success: true };
  };

  const removeFromBox = (productId: string) => {
    const item = boxItems.find(p => p.id === productId);
    setBoxItems(prev => prev.filter(p => p.id !== productId));
    showToast(
      'Item Removed from Crate', 
      item ? `"${item.name}" slot cleared.` : undefined, 
      'info'
    );
  };

  const clearBox = () => {
    setBoxItems([]);
    showToast('Visual Tray Emptied', 'All slots are now open for new artisan curation.', 'info');
  };

  const loadBoxItems = (items: Product[], tier?: BoxTierId) => {
    setBoxItems(items);
    if (tier) {
      setSelectedTierState(tier);
    } else {
      if (items.length <= 4) setSelectedTierState('starter');
      else if (items.length <= 6) setSelectedTierState('curated');
      else setSelectedTierState('sanctuary');
    }
  };

  const addOneTimeAddon = (product: Product) => {
    if (oneTimeAddons.some(p => p.id === product.id)) {
      showToast('Add-on already included', undefined, 'info');
      return;
    }
    setOneTimeAddons(prev => [...prev, product]);
    showToast('Added as 1-Time Drop Addon! 📦', `Will ship together with your next monthly crate.`, 'success');
  };

  const removeOneTimeAddon = (productId: string) => {
    setOneTimeAddons(prev => prev.filter(p => p.id !== productId));
    showToast('Add-on removed', undefined, 'info');
  };

  const toggleDietaryPreference = (pref: string) => {
    setDietaryPreferences(prev => {
      const exists = prev.includes(pref);
      const next = exists ? prev.filter(p => p !== pref) : [...prev, pref];
      showToast(exists ? `Removed ${pref} preference` : `Added ${pref} filter`, undefined, 'info');
      return next;
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryFilter('All');
    setSelectedPriceRange('All');
    setSelectedDietaryFilter('All');
    setSelectedTypeFilter('All');
  };

  const updateSubscriptionStatus = (status: 'active' | 'paused' | 'skipped', pauseMonths: number = 1) => {
    setSubscription(prev => {
      let nextDate = 'November 15, 2026';
      let pauseInfo = undefined;
      let skipInfo = undefined;

      if (status === 'paused') {
        pauseInfo = `${pauseMonths} month(s)`;
        nextDate = `Paused for ${pauseMonths} mo. (Resumes Dec 15, 2026)`;
      } else if (status === 'skipped') {
        skipInfo = 'Next Scheduled Drop';
        nextDate = 'December 15, 2026';
      }

      return {
        ...prev,
        status,
        pauseUntilMonth: pauseInfo,
        skippedMonth: skipInfo,
        nextRenewalDate: nextDate,
      };
    });

    if (status === 'active') {
      showToast('Subscription Active!', 'Your regular monthly drops are running smoothly.', 'success');
    } else if (status === 'paused') {
      showToast('Subscription Paused', `Paused for ${pauseMonths} month(s). You will not be charged.`, 'info');
    } else if (status === 'skipped') {
      showToast('Upcoming Drop Skipped', 'Next delivery scheduled for December 15, 2026.', 'info');
    }
  };

  const updateSubscriptionFrequency = (freq: DeliveryFrequency) => {
    setSelectedFrequencyState(freq);
    setSubscription(prev => ({
      ...prev,
      frequency: freq,
    }));
    showToast('Delivery Cadence Updated', `Now delivering on a ${freq} schedule.`, 'success');
  };

  const setFulfillmentStage = (stage: FulfillmentStage) => {
    setSubscription(prev => ({
      ...prev,
      fulfillmentStage: stage,
    }));
    showToast(
      'Fulfillment Stage Updated', 
      stage === 1 ? 'Step 1: Curating Ritual' :
      stage === 2 ? 'Step 2: Packing & Sealing' :
      stage === 3 ? 'Step 3: Dispatched & En Route' : 'Step 4: Delivered',
      'info'
    );
  };

  const saveItemsToSubscription = () => {
    setSubscription(prev => ({
      ...prev,
      items: [...boxItems],
      tier: selectedTier,
      frequency: selectedFrequency,
      fulfillmentStage: 1, // Curating
    }));
    setIsEditingSubscriptionBox(false);
    showToast(
      'Changes Saved to Next Drop! 🌿',
      `Your upcoming ${selectedFrequency} delivery now includes these ${boxItems.length} selected provisions.`,
      'success'
    );
    setIsCartDrawerOpen(false);
    setActiveTab('subscription');
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `CRATE-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
    };

    setOrders(prev => [newOrder, ...prev]);

    // Activate subscription with new order details
    setSubscription(prev => ({
      ...prev,
      items: orderData.items,
      tier: orderData.tier,
      frequency: orderData.frequency,
      status: 'active',
      fulfillmentStage: 2, // Packing & Sealing
      plasticSavedKg: +(prev.plasticSavedKg + (orderData.items.length * 0.45)).toFixed(1),
      artisansSupported: prev.artisansSupported + orderData.items.length,
      rewardPoints: Math.max(0, prev.rewardPoints - redeemedPoints + 50),
    }));

    setRedeemedPoints(0);
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currency,
        setCurrency,
        formatPrice,
        selectedTier,
        setSelectedTier,
        selectedFrequency,
        setSelectedFrequency,
        boxItems,
        addToBox,
        removeFromBox,
        clearBox,
        loadBoxItems,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedPriceRange,
        setSelectedPriceRange,
        selectedDietaryFilter,
        setSelectedDietaryFilter,
        selectedTypeFilter,
        setSelectedTypeFilter,
        resetFilters,
        subscription,
        updateSubscriptionStatus,
        updateSubscriptionFrequency,
        setFulfillmentStage,
        saveItemsToSubscription,
        isEditingSubscriptionBox,
        setIsEditingSubscriptionBox,
        oneTimeAddons,
        addOneTimeAddon,
        removeOneTimeAddon,
        dietaryPreferences,
        toggleDietaryPreference,
        orders,
        placeOrder,
        redeemedPoints,
        setRedeemedPoints,
        quickViewProduct,
        setQuickViewProduct,
        isFlatLayOpen,
        setIsFlatLayOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isPromoModalOpen,
        setIsPromoModalOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isQuizOpen,
        setIsQuizOpen,
        isSubscriberPortalOpen,
        setIsSubscriberPortalOpen,
        isBuilderOpen,
        setIsBuilderOpen,
        user,
        isAuthenticated: !!user,
        isLoadingAuth,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openLoginModal,
        openRegisterModal,
        login,
        register,
        logout,
        updateUserProfile,
        toast,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
