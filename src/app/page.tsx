'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TodayDealsSection } from '@/components/TodayDealsSection';
import { MainCatalogSection } from '@/components/MainCatalogSection';
import { BrandShowcaseSection } from '@/components/BrandShowcaseSection';
import { FooterBanner } from '@/components/FooterBanner';
import { CartDrawer } from '@/components/CartDrawer';
import { PromoEventModal } from '@/components/PromoEventModal';
import { QuickViewModal } from '@/components/QuickViewModal';
import { AuthModal } from '@/components/Auth/AuthModal';
import { Toast } from '@/components/Toast';
import { Footer } from '@/components/Footer';

// Full Builder & Specialized Views
import { TierSelector } from '@/components/BoxBuilder/TierSelector';
import { FrequencySelector } from '@/components/BoxBuilder/FrequencySelector';
import { SlotTray } from '@/components/BoxBuilder/SlotTray';
import { ProductCatalog } from '@/components/BoxBuilder/ProductCatalog';
import { PersonalizationQuiz } from '@/components/Quiz/PersonalizationQuiz';
import { ArtisanProvisionsView } from '@/components/ArtisanProvisionsView';
import { RecipesPairingsSection } from '@/components/RecipesPairingsSection';
import { SubscriberDashboard } from '@/components/SubscriberPortal/SubscriberDashboard';
import { CheckoutModal } from '@/components/Checkout/CheckoutModal';

export default function HomePage() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] flex flex-col font-sans selection:bg-[#FF5B26] selection:text-white">
      {/* Top Header matching the uploaded design */}
      <Header />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-14">
        {/* VIEW 1: HOME PAGE (Directly Matching Uploaded Template Layout) */}
        {activeTab === 'home' && (
          <div className="space-y-10 sm:space-y-14 animate-in fade-in duration-300">
            {/* Split Hero Bento Grid: Featured Provision Box & 25% Off Promo Card */}
            <HeroSection />

            {/* Today Best Deals! Carousel with Live Countdown Timer */}
            <TodayDealsSection />

            {/* Shop Now, Savor Later - Filter Chips & 4-Column Catalog */}
            <MainCatalogSection />

            {/* More of The Amazing Brand - Artisan Estates Spotlight */}
            <BrandShowcaseSection />

            {/* Dark Footer Promo Banner */}
            <FooterBanner />
          </div>
        )}

        {/* VIEW 2: INTERACTIVE BOX BUILDER */}
        {activeTab === 'builder' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-6">
              <TierSelector />
              <FrequencySelector />
              <SlotTray />
              <ProductCatalog />
            </div>
          </div>
        )}

        {/* VIEW 3: 60s TASTE & RITUAL QUIZ */}
        {activeTab === 'quiz' && (
          <div className="animate-in fade-in duration-300">
            <PersonalizationQuiz />
          </div>
        )}

        {/* VIEW 4: PROVISIONS EXPLORER */}
        {activeTab === 'catalog' && (
          <div className="animate-in fade-in duration-300">
            <ArtisanProvisionsView />
          </div>
        )}

        {/* VIEW 5: RECIPES & PAIRINGS GUIDE */}
        {activeTab === 'recipes' && (
          <div className="animate-in fade-in duration-300">
            <RecipesPairingsSection />
          </div>
        )}

        {/* VIEW 6: SUBSCRIBER PORTAL & TRACKING */}
        {activeTab === 'subscription' && (
          <div className="animate-in fade-in duration-300">
            <SubscriberDashboard />
          </div>
        )}

        {/* VIEW 7: CHECKOUT */}
        {activeTab === 'checkout' && (
          <div className="animate-in fade-in duration-300">
            <CheckoutModal />
          </div>
        )}
      </main>

      {/* Global Slide-Over Drawers & Modals */}
      <CartDrawer />
      <PromoEventModal />
      <QuickViewModal />
      <AuthModal />
      <Toast />

      {/* Sleek Minimal Footer */}
      <Footer />
    </div>
  );
}
