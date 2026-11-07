'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BOX_TIERS } from '../../data/mockData';
import type { BoxTierId } from '../../types';
import { Sparkles, Crown, Flame, Check, Zap } from 'lucide-react';

export const TierSelector: React.FC = () => {
  const { selectedTier, setSelectedTier, boxItems, showToast } = useApp();

  const handleSelectTier = (tierId: BoxTierId) => {
    const targetTier = BOX_TIERS[tierId];
    if (boxItems.length > targetTier.slots) {
      showToast(
        `Box contains ${boxItems.length} items`,
        `Switching to ${targetTier.name} (limit ${targetTier.slots} slots) keeps your first ${targetTier.slots} items.`,
        'warning'
      );
    }
    setSelectedTier(tierId);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5B26] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#FF5B26]" />
            Step 1: Choose Your Crate Capacity
          </span>
          <h2 className="font-extrabold text-2xl text-[#111827] tracking-tight mt-0.5">
            Select Your Monthly Box Tier
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm">
          <span className="font-bold text-[#FF5B26]">✨ Auto-Upgrade enabled:</span>
          <span>Adding more items upgrades your tier & discount automatically!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(BOX_TIERS) as BoxTierId[]).map((tierId) => {
          const tier = BOX_TIERS[tierId];
          const isSelected = selectedTier === tierId;

          return (
            <div
              key={tierId}
              onClick={() => handleSelectTier(tierId)}
              className={`relative cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#111827] shadow-xl ring-2 ring-[#111827]/10'
                  : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-md'
              }`}
            >
              {tier.recommendedBadge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF5B26] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 whitespace-nowrap">
                  <Crown className="w-3 h-3" />
                  <span>{tier.recommendedBadge}</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    isSelected
                      ? 'bg-[#111827] text-white'
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    Save {tier.discountPercentage}% OFF
                  </span>

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#FF5B26] text-white' : 'border border-stone-200 text-transparent'
                  }`}>
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-extrabold text-lg text-[#111827]">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono font-bold mt-0.5">
                    {tier.slots} Curated Slots
                  </p>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">
                  {tier.slots} Provision Slots
                </span>
                <span className="text-[#FF5B26] font-semibold text-[11px]">
                  {tier.discountPercentage}% Box Savings
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
