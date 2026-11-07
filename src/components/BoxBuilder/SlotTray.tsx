'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BOX_TIERS, FREQUENCY_OPTIONS } from '../../data/mockData';
import { FlatLayPreviewModal } from './FlatLayPreviewModal';
import { 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  Save, 
  X,
  Eye,
  Layers,
  Box
} from 'lucide-react';

export const SlotTray: React.FC = () => {
  const { 
    boxItems, 
    selectedTier, 
    selectedFrequency, 
    removeFromBox, 
    clearBox, 
    formatPrice, 
    setActiveTab, 
    isEditingSubscriptionBox,
    saveItemsToSubscription,
    setQuickViewProduct
  } = useApp();

  const [isFlatLayOpen, setIsFlatLayOpen] = useState<boolean>(false);

  const tier = BOX_TIERS[selectedTier];
  const maxSlots = tier.slots;
  const currentCount = boxItems.length;
  const isFull = currentCount === maxSlots;
  const remaining = Math.max(0, maxSlots - currentCount);

  // Math Calculations
  const rawSubtotalUSD = boxItems.reduce((sum, item) => sum + item.priceUSD, 0);
  const rawSubtotalBDT = boxItems.reduce((sum, item) => sum + item.priceBDT, 0);

  const tierDiscountPercent = tier.discountPercentage;
  const frequencyOption = FREQUENCY_OPTIONS.find(f => f.id === selectedFrequency);
  const frequencyDiscountPercent = frequencyOption ? frequencyOption.extraDiscountPercent : 0;
  const totalDiscountPercent = tierDiscountPercent + frequencyDiscountPercent;

  const discountedUSD = rawSubtotalUSD * (1 - totalDiscountPercent / 100);
  const discountedBDT = Math.round(rawSubtotalBDT * (1 - totalDiscountPercent / 100));

  // Progress logic toward next tier or completion
  let progressMessage = '';
  const progressPercent = (currentCount / maxSlots) * 100;

  if (selectedTier === 'starter') {
    if (currentCount < 4) {
      progressMessage = `Add ${4 - currentCount} more item${4 - currentCount > 1 ? 's' : ''} to complete Starter Ritual (5% OFF)`;
    } else {
      progressMessage = `🎉 Starter Ritual complete! Add 1 more to auto-unlock Curated Box (15% OFF)!`;
    }
  } else if (selectedTier === 'curated') {
    if (currentCount < 6) {
      progressMessage = `Add ${6 - currentCount} more item${6 - currentCount > 1 ? 's' : ''} to complete Curated Box (15% OFF)`;
    } else {
      progressMessage = `✨ Curated Box complete! Add 1 more to auto-unlock Sanctuary (25% OFF)!`;
    }
  } else {
    if (currentCount < 8) {
      progressMessage = `Add ${8 - currentCount} more item${8 - currentCount > 1 ? 's' : ''} to fill your Ultimate Sanctuary (25% OFF)`;
    } else {
      progressMessage = `🏆 Maximum Sanctuary Capacity Reached! You have unlocked the full 25% OFF!`;
    }
  }

  const slotsArray = Array.from({ length: maxSlots });

  return (
    <>
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-5 transition-all">
        {/* Tray Header & Capacity Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#111827] text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm">
              {currentCount}/{maxSlots}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-[#111827]">
                  {tier.name} Visual Tray
                </h3>
                <span className="bg-[#FF5B26] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {tier.discountPercentage}% Box Discount
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {isFull 
                  ? 'All slots filled with small-batch ritual provisions.' 
                  : `${remaining} open slot${remaining > 1 ? 's' : ''} remaining in this tier.`}
              </p>
            </div>
          </div>

          {/* Action Cluster: Flat-Lay Unboxing Inspection & Empty Tray */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsFlatLayOpen(true)}
              className="text-xs font-bold text-[#111827] hover:text-[#FF5B26] bg-[#F4F5F7] hover:bg-[#ECEEEF] px-4 py-2 rounded-full border border-stone-200/60 flex items-center gap-1.5 transition-all shadow-sm"
              title="View physical flat-lay unboxing layout"
            >
              <Box className="w-3.5 h-3.5 text-[#FF5B26]" />
              <span>Inspect Flat-Lay Unboxing</span>
            </button>

            {currentCount > 0 && (
              <button
                onClick={clearBox}
                className="text-xs text-stone-400 hover:text-red-600 flex items-center gap-1 transition-colors px-2 py-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Empty Tray</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Tier Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#FF5B26] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{progressMessage}</span>
            </span>
            <span className="font-mono font-bold text-stone-800">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
            <div 
              className="h-full bg-gradient-to-r from-[#111827] to-[#FF5B26] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Visual Slot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {slotsArray.map((_, index) => {
            const item = boxItems[index];

            if (item) {
              return (
                <div 
                  key={item.id}
                  className="group relative bg-[#F8F9FA] rounded-2xl border-2 border-[#111827] p-2.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between aspect-[4/5] overflow-hidden"
                >
                  {/* Remove item button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromBox(item.id);
                    }}
                    className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all shadow-sm"
                    title="Remove item from box"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Slot index badge */}
                  <span className="absolute top-1.5 left-1.5 z-10 w-5 h-5 rounded-full bg-[#111827] text-white text-[10px] font-mono flex items-center justify-center font-bold">
                    {index + 1}
                  </span>

                  <div 
                    onClick={() => setQuickViewProduct(item)}
                    className="w-full h-3/5 rounded-xl overflow-hidden bg-white relative cursor-pointer"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="pt-2 flex flex-col justify-between flex-1">
                    <div 
                      onClick={() => setQuickViewProduct(item)}
                      className="cursor-pointer"
                    >
                      <p className="text-[11px] font-bold text-[#111827] line-clamp-1 leading-tight group-hover:text-[#FF5B26]">
                        {item.name}
                      </p>
                      <p className="text-[9px] text-stone-500 line-clamp-1">
                        {item.category.split('&')[0]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#111827] pt-1">
                      <span>{formatPrice(item.priceUSD, item.priceBDT)}</span>
                      <span className="text-[9px] text-[#FF5B26] font-sans font-extrabold">Slot #{index + 1}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // Empty Slot
            return (
              <div 
                key={`empty-${index}`}
                className={`rounded-2xl border-2 border-dashed border-stone-200 bg-[#F8F9FA]/80 p-3 flex flex-col items-center justify-center text-center aspect-[4/5] transition-all hover:bg-white hover:border-[#FF5B26] ${
                  index === currentCount ? 'ring-2 ring-[#FF5B26]/30 border-[#FF5B26]' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 font-mono text-xs font-bold mb-2">
                  {index + 1}
                </div>
                <span className="text-[11px] font-bold text-stone-600 leading-tight">
                  Slot {index + 1}
                </span>
                <span className="text-[9px] text-stone-400 mt-0.5">
                  {index === currentCount ? 'Next to fill' : 'Empty'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pricing Subtotal HUD and Primary Action */}
        <div className="pt-4 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                Provisions Subtotal
              </span>
              <span className="font-mono text-sm text-stone-400 line-through">
                {formatPrice(rawSubtotalUSD, rawSubtotalBDT)}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5B26] block">
                Tier + Frequency Savings
              </span>
              <span className="text-sm font-bold text-[#FF5B26] flex items-center gap-1 font-mono">
                <span>{totalDiscountPercent}% OFF</span>
                <span className="text-xs font-normal">
                  (-{formatPrice(rawSubtotalUSD - discountedUSD, rawSubtotalBDT - discountedBDT)})
                </span>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#111827] block">
                Your Monthly Crate Total
              </span>
              <span className="font-extrabold text-2xl text-[#111827]">
                {formatPrice(discountedUSD, discountedBDT)}
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="w-full md:w-auto flex items-center gap-2.5">
            {isEditingSubscriptionBox ? (
              <button
                onClick={saveItemsToSubscription}
                disabled={boxItems.length === 0}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-xs tracking-wider shadow-md transition-all active:scale-95 uppercase"
              >
                <Save className="w-4 h-4 text-[#FF5B26]" />
                <span>Save Changes to Next Drop</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('checkout')}
                disabled={boxItems.length === 0}
                className={`w-full md:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-md transition-all ${
                  boxItems.length > 0
                    ? 'bg-[#FF5B26] hover:bg-[#E04D1D] text-white active:scale-95 shadow-orange-500/20 shadow-lg'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <span>{isFull ? 'Proceed to Checkout' : `Review Crate (${boxItems.length}/${maxSlots})`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Flat-Lay Unboxing Modal */}
      <FlatLayPreviewModal 
        isOpen={isFlatLayOpen} 
        onClose={() => setIsFlatLayOpen(false)} 
      />
    </>
  );
};
