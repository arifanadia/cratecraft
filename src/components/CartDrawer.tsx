'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { BOX_TIERS, FREQUENCY_OPTIONS } from '../data/mockData';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  Package, 
  Sparkles, 
  Check, 
  Save, 
  ShoppingBag,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    boxItems, 
    selectedTier, 
    selectedFrequency, 
    setSelectedFrequency,
    removeFromBox, 
    clearBox, 
    formatPrice, 
    setActiveTab, 
    setIsCheckoutOpen,
    isEditingSubscriptionBox,
    saveItemsToSubscription
  } = useApp();

  if (!isCartDrawerOpen) return null;

  const tier = BOX_TIERS[selectedTier];
  const maxSlots = tier.slots;
  const currentCount = boxItems.length;
  const isFull = currentCount === maxSlots;

  // Pricing
  const rawSubtotalUSD = boxItems.reduce((sum, item) => sum + item.priceUSD, 0);
  const rawSubtotalBDT = boxItems.reduce((sum, item) => sum + item.priceBDT, 0);

  const freqOption = FREQUENCY_OPTIONS.find(f => f.id === selectedFrequency);
  const freqDiscount = freqOption ? freqOption.extraDiscountPercent : 0;
  const totalDiscountPercent = tier.discountPercentage + freqDiscount;

  const discountedUSD = rawSubtotalUSD * (1 - totalDiscountPercent / 100);
  const discountedBDT = Math.round(rawSubtotalBDT * (1 - totalDiscountPercent / 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#111827] text-white flex items-center justify-center font-bold">
                <Package className="w-5 h-5 text-[#FF5B26]" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#111827]">
                  Your Monthly Crate
                </h3>
                <span className="text-[11px] font-bold text-[#FF5B26]">
                  {tier.name} ({tier.discountPercentage}% OFF)
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-[#111827] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Slot Capacity Progress */}
          <div className="px-6 py-3 bg-[#F8F9FA] border-b border-stone-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
              <span>Crate Capacity:</span>
              <span className="font-mono text-[#FF5B26]">
                {currentCount}/{maxSlots} Slots
              </span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF5B26] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (currentCount / maxSlots) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-500">
              {isFull ? '🎉 All slots filled with small-batch artisan provisions!' : `Pack ${maxSlots - currentCount} more item to fill your crate.`}
            </p>
          </div>

          {/* Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-3">
            {boxItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm text-[#111827]">Your Crate is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Browse provisions or use the 60s quiz to fill your monthly slots.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActiveTab('catalog');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#111827] text-white text-xs font-bold"
                >
                  Explore Provisions
                </button>
              </div>
            ) : (
              boxItems.map((item, idx) => (
                <div 
                  key={`${item.id}-${idx}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8F9FA] border border-stone-100 hover:border-stone-200 transition-all"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold text-[#FF5B26] uppercase">
                      Slot #{idx + 1}
                    </span>
                    <h5 className="font-bold text-xs text-[#111827] truncate">
                      {item.name}
                    </h5>
                    <p className="text-[10px] text-stone-500 truncate">
                      {item.artisan.origin}
                    </p>
                    <span className="font-bold font-mono text-xs text-[#111827]">
                      {formatPrice(item.priceUSD, item.priceBDT)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromBox(item.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cadence & Pricing Summary Footer */}
          {boxItems.length > 0 && (
            <div className="p-6 bg-[#F8F9FA] border-t border-stone-200 space-y-4">
              {/* Delivery Frequency */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-600 block">
                  Delivery Cadence:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {FREQUENCY_OPTIONS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFrequency(f.id)}
                      className={`py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                        selectedFrequency === f.id
                          ? 'bg-[#111827] text-white shadow-sm'
                          : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {f.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-stone-500">
                  <span>Provisions Subtotal ({boxItems.length} items)</span>
                  <span className="font-mono">{formatPrice(rawSubtotalUSD, rawSubtotalBDT)}</span>
                </div>
                <div className="flex justify-between text-[#FF5B26] font-bold">
                  <span>Tier + Cadence Discount ({totalDiscountPercent}%)</span>
                  <span className="font-mono">-{formatPrice(rawSubtotalUSD - discountedUSD, rawSubtotalBDT - discountedBDT)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#111827] pt-2 border-t border-stone-200">
                  <span>Total Drop Price</span>
                  <span className="font-mono text-[#FF5B26]">{formatPrice(discountedUSD, discountedBDT)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {isEditingSubscriptionBox ? (
                  <button
                    onClick={saveItemsToSubscription}
                    className="w-full py-3.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-[#FF5B26]" />
                    <span>Save Changes to Next Drop</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setIsCheckoutOpen(true);
                      setActiveTab('checkout');
                    }}
                    className="w-full py-3.5 rounded-full bg-[#FF5B26] hover:bg-[#E04D1D] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setActiveTab('builder');
                    }}
                    className="text-stone-500 hover:text-[#111827] font-semibold underline"
                  >
                    Open Full Box Builder
                  </button>
                  <button
                    onClick={clearBox}
                    className="text-stone-400 hover:text-red-600 font-semibold"
                  >
                    Clear Crate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
