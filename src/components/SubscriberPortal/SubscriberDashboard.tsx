'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BOX_TIERS, FREQUENCY_OPTIONS } from '../../data/mockData';
import type { FulfillmentStage } from '../../types';
import { 
  Package, 
  Truck, 
  Home, 
  Sparkles, 
  PauseCircle, 
  PlayCircle, 
  SkipForward, 
  Edit3, 
  ShieldCheck, 
  Leaf, 
  Users, 
  Award, 
  CheckCircle2, 
  Check, 
  ChevronRight
} from 'lucide-react';

export const SubscriberDashboard: React.FC = () => {
  const { 
    subscription, 
    updateSubscriptionStatus, 
    updateSubscriptionFrequency, 
    setFulfillmentStage,
    loadBoxItems,
    setIsEditingSubscriptionBox,
    setActiveTab,
    formatPrice,
    orders,
    showToast,
    dietaryPreferences,
    toggleDietaryPreference,
    oneTimeAddons,
    removeOneTimeAddon,
    user,
    isAuthenticated,
    openLoginModal,
    openRegisterModal
  } = useApp();

  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);
  const [pauseDuration, setPauseDuration] = useState<number>(1);

  const tier = BOX_TIERS[subscription.tier];

  const timelineStages: {
    stage: FulfillmentStage;
    title: string;
    sub: string;
    icon: typeof Package;
  }[] = [
    {
      stage: 1,
      title: 'Curating Ritual',
      sub: 'Selecting peak harvest provisions',
      icon: Sparkles
    },
    {
      stage: 2,
      title: 'Packing & Sealing',
      sub: 'Zero-plastic recyclable craft box',
      icon: Package
    },
    {
      stage: 3,
      title: 'Shipped & En Route',
      sub: `${subscription.carrier} • ${subscription.trackingNumber}`,
      icon: Truck
    },
    {
      stage: 4,
      title: 'Delivered',
      sub: 'Sanctuary doorstep arrival',
      icon: Home
    }
  ];

  const handleStartSwapWorkflow = () => {
    loadBoxItems(subscription.items, subscription.tier);
    setIsEditingSubscriptionBox(true);
    setActiveTab('builder');
    showToast(
      'Active Crate Loaded for Customization',
      'Swap, add, or remove items in the Box Builder. Click "Save Changes to Next Drop" when finished.',
      'info'
    );
  };

  const handleSkipMonth = () => {
    if (subscription.status === 'skipped') {
      updateSubscriptionStatus('active');
    } else {
      updateSubscriptionStatus('skipped');
    }
  };

  const handlePauseConfirm = () => {
    updateSubscriptionStatus('paused', pauseDuration);
    setShowPauseModal(false);
  };

  const handleResume = () => {
    updateSubscriptionStatus('active');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Guest Warning / Sign-In Notice if not logged in */}
      {!isAuthenticated && (
        <div className="bg-[#FFF4EE] border border-[#FF5B26]/30 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5B26]">
              Guest Mode Preview
            </span>
            <h3 className="font-extrabold text-base text-[#111827]">
              Sign in to manage your real recurring subscription & doorstep deliveries
            </h3>
            <p className="text-xs text-stone-600">
              You are currently viewing demo subscriber preferences. Log in or create an account to link your orders.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openLoginModal}
              className="px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold transition-all shadow-xs"
            >
              Sign In
            </button>
            <button
              onClick={openRegisterModal}
              className="px-4 py-2 rounded-full bg-[#FF5B26] hover:bg-[#e04815] text-white text-xs font-bold transition-all shadow-xs"
            >
              Register
            </button>
          </div>
        </div>
      )}

      {/* Header Banner with Member Identification */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              subscription.status === 'active'
                ? 'bg-emerald-100 text-emerald-800'
                : subscription.status === 'paused'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-purple-100 text-purple-800'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                subscription.status === 'active' ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'
              }`} />
              <span>Subscription {subscription.status.toUpperCase()}</span>
            </span>

            <span className="font-mono text-xs text-stone-500">
              ID: {subscription.id}
            </span>
          </div>

          <h2 className="font-extrabold text-2xl sm:text-3xl text-[#111827] mt-2 tracking-tight">
            {user ? `${user.name}'s ${tier.name} Membership` : `Your ${tier.name} Membership`}
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-xl">
            {tier.tagline} • Curated for {subscription.frequency} delivery drops with sustainable packaging.
            {user?.memberSince && ` • Member since ${user.memberSince}`}
          </p>
        </div>

        {/* Quick Actions (Swap Items, Pause, Skip) */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleStartSwapWorkflow}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-xs tracking-wide shadow-sm transition-all active:scale-95"
          >
            <Edit3 className="w-4 h-4 text-[#FF5B26]" />
            <span>Swap Upcoming Items</span>
          </button>

          {subscription.status === 'paused' ? (
            <button
              onClick={handleResume}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors"
            >
              <PlayCircle className="w-4 h-4 text-emerald-600" />
              <span>Resume Ritual</span>
            </button>
          ) : (
            <button
              onClick={() => setShowPauseModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F4F5F7] hover:bg-stone-200 text-stone-700 font-bold text-xs border border-stone-200 transition-colors"
            >
              <PauseCircle className="w-4 h-4 text-stone-500" />
              <span>Pause Subscription</span>
            </button>
          )}

          <button
            onClick={handleSkipMonth}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs border transition-colors ${
              subscription.status === 'skipped'
                ? 'bg-purple-50 text-purple-800 border-purple-200'
                : 'bg-[#F4F5F7] hover:bg-stone-200 text-stone-700 border-stone-200'
            }`}
          >
            <SkipForward className="w-4 h-4 text-stone-500" />
            <span>{subscription.status === 'skipped' ? 'Resume Skipped Drop' : 'Skip Next Month'}</span>
          </button>
        </div>
      </div>

      {/* Interactive 4-Stage Fulfillment Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5B26] flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#FF5B26]" />
              Live Order Fulfillment Timeline
            </span>
            <h3 className="font-extrabold text-xl text-[#111827] mt-0.5 tracking-tight">
              Upcoming Ritual Drop Status
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Next billing / dispatch:</span>
            <span className="font-bold text-stone-800 bg-[#F4F5F7] px-3 py-1 rounded-full font-mono border border-stone-200">
              {subscription.nextRenewalDate}
            </span>
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="relative pt-4 pb-2">
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-1 bg-stone-100 -z-0">
            <div 
              className="h-full bg-gradient-to-r from-[#111827] to-[#FF5B26] transition-all duration-500"
              style={{ width: `${((subscription.fulfillmentStage - 1) / 3) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {timelineStages.map((st) => {
              const Icon = st.icon;
              const isPast = st.stage < subscription.fulfillmentStage;
              const isCurrent = st.stage === subscription.fulfillmentStage;

              return (
                <div 
                  key={st.stage}
                  onClick={() => setFulfillmentStage(st.stage)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#111827] text-white border-[#111827] shadow-lg ring-2 ring-[#FF5B26]/30'
                      : isPast
                      ? 'bg-[#F4F5F7] text-stone-800 border-stone-200'
                      : 'bg-white text-stone-400 border-dashed border-stone-200'
                  }`}
                  title="Click to simulate / view this fulfillment stage"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      isCurrent
                        ? 'bg-[#FF5B26] text-white'
                        : isPast
                        ? 'bg-[#111827] text-white'
                        : 'bg-stone-100 text-stone-400'
                    }`}>
                      {isPast ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isCurrent
                        ? 'bg-white/20 text-white'
                        : isPast
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-stone-400'
                    }`}>
                      Stage 0{st.stage}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h4 className={`font-bold text-sm leading-tight ${
                      isCurrent ? 'text-white' : isPast ? 'text-[#111827]' : 'text-stone-500'
                    }`}>
                      {st.title}
                    </h4>
                    <p className={`text-[11px] mt-1 leading-snug ${
                      isCurrent ? 'text-stone-300' : 'text-stone-500'
                    }`}>
                      {st.sub}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-[10px]">
                    <span>{isCurrent ? '● Active' : isPast ? 'Completed' : 'Upcoming'}</span>
                    <span className="underline font-semibold">Simulate</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carrier Details Bar */}
        <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Insured Carbon-Neutral Delivery via <strong>{subscription.carrier}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-stone-500">Tracking:</span>
            <span className="font-bold text-stone-800 bg-white px-2.5 py-1 rounded border border-stone-200">
              {subscription.trackingNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Active Subscription Items & Cadence Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Box Items Preview (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-xl text-[#111827]">
                Items in Next Drop ({subscription.items.length}/{tier.slots})
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Lock-in deadline: 48 hours before next renewal date.
              </p>
            </div>
            <button
              onClick={handleStartSwapWorkflow}
              className="text-xs font-bold text-[#FF5B26] hover:underline flex items-center gap-1"
            >
              <span>Swap items</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {subscription.items.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                className="bg-[#F8F9FA] rounded-2xl border border-stone-100 p-3 flex items-center gap-3 hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-[#FF5B26] uppercase block">
                    Slot #{idx + 1}
                  </span>
                  <p className="font-bold text-xs text-[#111827] truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-stone-500 truncate">
                    {item.artisan.origin}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#111827] mt-0.5">
                    <span>{formatPrice(item.priceUSD, item.priceBDT)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eco-Impact & Loyalty Dashboard (1 Col) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-extrabold text-xl text-[#111827]">
              Ritual Impact & Loyalty
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Your mindful monthly choices make a verifiable difference.
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Plastic Saved */}
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-emerald-950">
                  {subscription.plasticSavedKg} kg
                </span>
                <p className="text-xs text-emerald-800 font-medium leading-tight">
                  Single-use plastic eliminated through recycled craft packaging
                </p>
              </div>
            </div>

            {/* Artisans Supported */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#CCA282] text-white flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-amber-950">
                  {subscription.artisansSupported} Independent Workshops
                </span>
                <p className="text-xs text-amber-800 font-medium leading-tight">
                  Direct trade earnings delivered to smallholder growers & crafters
                </p>
              </div>
            </div>

            {/* Reward Points */}
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#FF5B26] text-white flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-xl text-orange-950">
                    {subscription.rewardPoints} CratePoints
                  </span>
                  <span className="text-xs text-orange-800 font-medium">
                    (= {formatPrice(subscription.rewardPoints / 100, Math.round(subscription.rewardPoints * 1.2))})
                  </span>
                </div>
                <p className="text-xs text-orange-800 font-medium leading-tight">
                  Redeemable for instant discounts on your next custom box
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Frequency Switcher */}
          <div className="pt-4 border-t border-stone-100 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Change Delivery Cadence
            </span>
            <div className="grid grid-cols-3 gap-2">
              {FREQUENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateSubscriptionFrequency(opt.id)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                    subscription.frequency === opt.id
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-[#F8F9FA] text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {opt.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dietary & Customization Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5B26] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Pantry & Allergen Customization
            </span>
            <h3 className="font-extrabold text-xl text-[#111827] mt-0.5">
              Household Dietary Preferences
            </h3>
          </div>
          <span className="text-xs text-stone-500">
            Click to toggle preferences applied during monthly harvest selection
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {['100% Organic', 'Direct Trade', 'Gluten-Free', 'Vegan', 'Keto-Friendly', 'Nut-Free', 'Caffeine-Free', 'Zero Refined Sugar'].map(pref => {
            const isSelected = dietaryPreferences.includes(pref);
            return (
              <button
                key={pref}
                onClick={() => toggleDietaryPreference(pref)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-[#F4F5F7] text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{pref}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming 1-Time Add-ons if any */}
      {oneTimeAddons.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5B26]">
                Upcoming Scheduled Add-ons
              </span>
              <h3 className="font-extrabold text-xl text-[#111827] mt-0.5">
                Extra Provisions Shipping With Next Drop ({oneTimeAddons.length})
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="text-xs font-bold text-[#FF5B26] hover:underline"
            >
              Add more provisions
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {oneTimeAddons.map(item => (
              <div key={item.id} className="bg-[#F8F9FA] rounded-2xl border border-stone-100 p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#111827] truncate">{item.name}</p>
                    <span className="font-mono text-[11px] text-[#111827] font-bold">{formatPrice(item.priceUSD, item.priceBDT)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeOneTimeAddon(item.id)}
                  className="text-stone-400 hover:text-red-600 text-xs font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order History */}
      {orders.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-xl text-[#111827]">
            Recent Orders & Receipts
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F9FA] text-stone-500 uppercase tracking-wider font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total Paid</th>
                  <th className="p-3">Gateway</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-[#111827]">{ord.id}</td>
                    <td className="p-3 text-stone-600">{ord.date}</td>
                    <td className="p-3 text-stone-800 font-medium">{ord.items.length} provisions</td>
                    <td className="p-3 font-bold font-mono text-[#111827]">
                      {formatPrice(ord.totalUSD, ord.totalBDT)}
                    </td>
                    <td className="p-3 uppercase font-mono text-[11px]">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        ord.paymentMethod === 'bkash'
                          ? 'bg-[#E2136E]/10 text-[#E2136E]'
                          : ord.paymentMethod === 'nagad'
                          ? 'bg-[#F7941D]/10 text-[#F7941D]'
                          : 'bg-stone-200 text-stone-800'
                      }`}>
                        {ord.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pause Confirmation Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Self-Serve Pause Control
              </span>
              <h3 className="font-extrabold text-2xl text-[#111827] mt-1">
                Pause Your Monthly Drops?
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Need time to catch up on your provisions? Pause your subscription without losing your loyalty points or tier discount status.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                How long would you like to pause?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPauseDuration(m)}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                      pauseDuration === m
                        ? 'bg-[#111827] text-white border-[#111827]'
                        : 'bg-[#F8F9FA] text-stone-700 border-stone-200'
                    }`}
                  >
                    {m} Month{m > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPauseModal(false)}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-stone-600 hover:bg-stone-100"
              >
                Never Mind
              </button>
              <button
                onClick={handlePauseConfirm}
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#FF5B26] hover:bg-[#E04D1D] text-white shadow-sm"
              >
                Confirm Pause
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
