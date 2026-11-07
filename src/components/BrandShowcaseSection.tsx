'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { Star, CheckCircle, ArrowRight, Eye, Plus } from 'lucide-react';

export const BrandShowcaseSection: React.FC = () => {
  const { setQuickViewProduct, addToBox, formatPrice, setActiveTab } = useApp();

  // Artisan Estate 1: Gedeo Highlands Collective (Coffee & Ethiopian agroforestry)
  const estate1Products = PRODUCTS.filter(p => p.category === 'Specialty Coffee & Tea').slice(0, 4);

  // Artisan Estate 2: Yamamoto Heritage Tea Estate & Mediterranean Groves
  const estate2Products = PRODUCTS.filter(p => p.category === 'Organic Pantry Essentials' || p.category === 'Superfoods & Nuts').slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Title & Subtitle (Matching Screenshot: "More of The Amazing Brand") */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight">
          More of The Amazing Brand
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 font-normal leading-relaxed">
          ...with high quality and famous estates around the world.
        </p>
      </div>

      {/* Two Large Brand Spotlight Bento Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Card 1: Gedeo Highlands Collective */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-150 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#111827] text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm">
                GH
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-base text-[#111827]">
                    Gedeo Highlands Collective
                  </h3>
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5 font-medium">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-[#111827]">4.9</span>
                    <span>(1289 Review)</span>
                  </div>
                  <span>•</span>
                  <span>1.1M Followers</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('catalog')}
              className="px-4 py-2 rounded-full bg-[#F4F5F7] hover:bg-[#EAEBED] text-[#111827] text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              Visit
            </button>
          </div>

          {/* 4-Item Thumbnail Grid (Matching Screenshot) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {estate1Products.map((p) => (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="group/item bg-[#F8F9FA] hover:bg-white rounded-2xl p-2.5 border border-stone-200/60 hover:border-stone-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-[4/5]"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-white mb-2">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#111827] truncate group-hover/item:text-[#FF5B26]">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-stone-500 font-mono font-semibold mt-0.5">
                    {formatPrice(p.priceUSD, p.priceBDT)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Card 2: Yamamoto Heritage & Messinian Estates */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-150 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#CCA282] text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm">
                YM
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-base text-[#111827]">
                    Yamamoto Heritage Estate
                  </h3>
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5 font-medium">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-[#111827]">5.0</span>
                    <span>(2989 Review)</span>
                  </div>
                  <span>•</span>
                  <span>305M Followers</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('catalog')}
              className="px-4 py-2 rounded-full bg-[#F4F5F7] hover:bg-[#EAEBED] text-[#111827] text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              Visit
            </button>
          </div>

          {/* 4-Item Thumbnail Grid (Matching Screenshot) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {estate2Products.map((p) => (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="group/item bg-[#F8F9FA] hover:bg-white rounded-2xl p-2.5 border border-stone-200/60 hover:border-stone-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-[4/5]"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-white mb-2">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#111827] truncate group-hover/item:text-[#FF5B26]">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-stone-500 font-mono font-semibold mt-0.5">
                    {formatPrice(p.priceUSD, p.priceBDT)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View More Button */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={() => setActiveTab('catalog')}
          className="px-8 py-3.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all active:scale-95"
        >
          View more
        </button>
      </div>
    </div>
  );
};
