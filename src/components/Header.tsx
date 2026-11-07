'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BOX_TIERS } from '../data/mockData';
import { 
  Search, 
  Bell, 
  ShoppingBag, 
  Heart, 
  Globe2, 
  Sparkles, 
  Layers, 
  UserCheck, 
  BookOpen, 
  Check, 
  ArrowRight,
  Flame,
  Crown,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  User as UserIcon,
  Package
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currency, 
    setCurrency, 
    boxItems, 
    selectedTier,
    wishlist,
    searchQuery,
    setSearchQuery,
    setIsCartDrawerOpen,
    setIsSubscriberPortalOpen,
    isEditingSubscriptionBox,
    showToast,
    user,
    isAuthenticated,
    openLoginModal,
    openRegisterModal,
    logout
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tier = BOX_TIERS[selectedTier];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      {/* Top Utility Bar (Matching Screenshot) */}
      <div className="bg-[#111827] text-stone-300 text-[11px] py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('builder')} 
            className="hover:text-white transition-colors"
          >
            Start Monthly Drop
          </button>
          <span className="text-stone-600">|</span>
          <button 
            onClick={() => showToast('Help Center', 'Our 24/7 harvest concierges are ready to assist you.', 'info')} 
            className="hover:text-white transition-colors"
          >
            Help Center
          </button>
          <span className="text-stone-600">|</span>
          <span className="hidden sm:inline text-stone-400">
            Download CrateCraft App
          </span>
        </div>

        {/* Currency & Language Switcher with Flags */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-neutral-800/80 px-2.5 py-0.5 rounded-full border border-neutral-700">
            <span className="text-[12px]">🌐</span>
            <span className="font-medium text-stone-200">English</span>
          </div>

          <div className="flex items-center bg-neutral-800/90 rounded-full p-0.5 border border-neutral-700 text-[10px]">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                currency === 'USD'
                  ? 'bg-[#FF5B26] text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                currency === 'BDT'
                  ? 'bg-[#FF5B26] text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              BDT (৳)
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-6">
          {/* Logo (Infinity / Loop glyph matching screenshot) */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0 select-none"
          >
            {/* Custom Infinity Loop Icon */}
            <div className="w-10 h-10 rounded-2xl bg-[#111827] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 stroke-current fill-none stroke-[2.2] text-[#FF5B26]"
              >
                <path d="M12 12c-2-2.5-4-4-6.5-4a4.5 4.5 0 0 0 0 9c2.5 0 4.5-1.5 6.5-4 2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 0-9c-2.5 0-4.5 1.5-6.5 4z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#111827]">
                CrateCraft
              </span>
              <span className="text-[10px] text-stone-500 font-medium -mt-1 tracking-wider uppercase">
                Monthly Grocery Rituals
              </span>
            </div>
          </div>

          {/* Search Pill Input (Matching Screenshot Pill Input) */}
          <div className="flex-1 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='try "Yirgacheffe Coffee", "Ceremonial Matcha", "Kalamata EVOO"...'
                className="w-full pl-5 pr-11 py-2.5 bg-[#F4F5F7] hover:bg-[#ECEEEF] focus:bg-white border border-transparent focus:border-stone-300 rounded-full text-xs text-[#111827] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/20 transition-all shadow-inner"
              />
              <button 
                onClick={() => setActiveTab('catalog')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#111827] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Action Cluster: Notifications, Cart Pill & User Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Notification Bell */}
            <button 
              onClick={() => showToast('Next Delivery Drop Scheduled', 'Your upcoming crate locks in 3 days. Customize anytime.', 'info')}
              className="relative p-2.5 rounded-full hover:bg-[#F4F5F7] text-stone-600 hover:text-[#111827] transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5B26] ring-2 ring-white" />
            </button>

            {/* Wishlist Pill */}
            <button
              onClick={() => {
                setActiveTab('catalog');
                showToast('Wishlist Collection', `You have ${wishlist.length} saved artisan items.`, 'info');
              }}
              className="relative p-2.5 rounded-full hover:bg-[#F4F5F7] text-stone-600 hover:text-[#111827] transition-colors hidden sm:flex"
              title="Saved Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#FF5B26] fill-[#FF5B26]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF5B26] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Box Capacity Pill (Matching Screenshot "2 Items") */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#F4F5F7] hover:bg-[#EAEBED] px-3.5 py-2 rounded-full text-xs font-bold text-[#111827] transition-all shadow-sm border border-stone-200/60 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#FF5B26]" />
              <span>{boxItems.length} Items</span>
              <span className="bg-[#111827] text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                {boxItems.length}/{tier.slots}
              </span>
            </button>

            {/* User Profile or Authentication Buttons */}
            {isAuthenticated && user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-[#F4F5F7] transition-all border border-stone-200/60 active:scale-95"
                  title="Account Menu"
                  aria-expanded={isUserMenuOpen}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FF5B26]/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#111827] text-white font-bold text-xs flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="hidden md:inline text-xs font-bold text-[#111827] tracking-tight max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-stone-100">
                      <div className="flex items-center gap-2.5">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#FF5B26]/30 shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#111827] text-white font-bold text-sm flex items-center justify-center shrink-0">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-extrabold text-[#111827] truncate">{user.name}</p>
                          <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                        </div>
                      </div>

                      {/* Reward Points Badge */}
                      <div className="mt-2.5 flex items-center justify-between bg-[#F8F9FA] px-2.5 py-1 rounded-xl text-[11px]">
                        <span className="text-stone-500 font-medium">Ritual Points:</span>
                        <span className="font-extrabold text-[#FF5B26] font-mono">{user.rewardPoints || 0} pts</span>
                      </div>
                    </div>

                    {/* Menu Links */}
                    <div className="py-1 text-xs">
                      <button
                        onClick={() => {
                          setActiveTab('subscription');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-stone-700 hover:bg-[#F8F9FA] hover:text-[#111827] font-semibold flex items-center gap-2.5"
                      >
                        <Crown className="w-4 h-4 text-[#FF5B26]" />
                        <span>Subscriber Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('subscription');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-stone-700 hover:bg-[#F8F9FA] hover:text-[#111827] font-semibold flex items-center gap-2.5"
                      >
                        <Package className="w-4 h-4 text-stone-500" />
                        <span>Recent Orders & Drops</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('catalog');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-stone-700 hover:bg-[#F8F9FA] hover:text-[#111827] font-semibold flex items-center gap-2.5"
                      >
                        <Heart className="w-4 h-4 text-[#FF5B26]" />
                        <span>Saved Wishlist ({wishlist.length})</span>
                      </button>
                    </div>

                    {/* Divider & Sign Out */}
                    <div className="border-t border-stone-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={openLoginModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#111827] hover:bg-[#F4F5F7] border border-stone-200 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-stone-600" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={openRegisterModal}
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#FF5B26] hover:bg-[#e04815] shadow-xs transition-all active:scale-95"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Register</span>
                  <span className="sm:hidden">Join</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Bar / Quick Links (Matching modern clean look) */}
        <div className="flex items-center justify-between pb-3 overflow-x-auto scrollbar-none text-xs font-semibold text-stone-600 gap-1 border-t border-neutral-100 pt-2.5">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === 'home'
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'hover:text-[#111827] hover:bg-[#F4F5F7]'
              }`}
            >
              Home & Featured
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === 'catalog'
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'hover:text-[#111827] hover:bg-[#F4F5F7]'
              }`}
            >
              Shop Provisions (24)
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'builder'
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'hover:text-[#111827] hover:bg-[#F4F5F7]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#FF5B26]" />
              <span>Interactive Box Builder</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'hover:text-[#111827] hover:bg-[#F4F5F7]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF5B26]" />
              <span>60s Taste Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'recipes'
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'hover:text-[#111827] hover:bg-[#F4F5F7]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#CCA282]" />
              <span>Recipes & Pairings</span>
            </button>

            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 relative ${
                activeTab === 'subscription'
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'hover:text-[#111827] hover:bg-[#F4F5F7]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>My Subscription</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          </div>

          {/* Quick Active Box Status Pill on right */}
          {isEditingSubscriptionBox && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-[11px] font-semibold animate-pulse">
              <span>● Swapping Next Drop</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
