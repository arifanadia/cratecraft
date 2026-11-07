'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { BOX_TIERS } from '../data/mockData';
import { X, Sparkles, Crown, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import type { BoxTierId } from '../types';

export const PromoEventModal: React.FC = () => {
  const { isPromoModalOpen, setIsPromoModalOpen, selectedTier, setSelectedTier, setActiveTab } = useApp();

  if (!isPromoModalOpen) return null;

  const handleSelectTier = (tierId: BoxTierId) => {
    setSelectedTier(tierId);
    setIsPromoModalOpen(false);
    setActiveTab('builder');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsPromoModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-[#111827] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <span className="text-[#FF5B26] font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Monthly Harvest Fest 2026</span>
          </span>
          <h2 className="font-extrabold text-2xl sm:text-3xl text-[#111827] uppercase tracking-tight">
            Discount Up to 25% For Monthly Crate
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed font-normal">
            Select your monthly ritual capacity. As you pack more small-batch artisan provisions, your tier discount increases automatically with zero penalties.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(Object.keys(BOX_TIERS) as BoxTierId[]).map((tierId) => {
            const tier = BOX_TIERS[tierId];
            const isSelected = selectedTier === tierId;

            return (
              <div
                key={tierId}
                onClick={() => handleSelectTier(tierId)}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FF5B26] bg-orange-50/50 shadow-md ring-2 ring-[#FF5B26]/20'
                    : 'border-stone-200 bg-[#F8F9FA] hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      tierId === 'sanctuary' ? 'bg-[#FF5B26] text-white' : 'bg-[#111827] text-white'
                    }`}>
                      {tier.discountPercentage}% OFF
                    </span>
                    {tier.slots === 6 && (
                      <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-[#111827]">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 font-mono font-bold">
                    {tier.slots} Provision Slots
                  </p>
                  <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>

                <button
                  onClick={() => handleSelectTier(tierId)}
                  className={`mt-4 w-full py-2 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#FF5B26] text-white shadow-sm'
                      : 'bg-white text-stone-800 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select Tier'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Benefits Checklist */}
        <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Zero Single-Use Plastics</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Swap or Pause Anytime Without Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dual Gateway: Cards, bKash & Nagad</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Direct Trade Farm Family Royalties</span>
          </div>
        </div>
      </div>
    </div>
  );
};
