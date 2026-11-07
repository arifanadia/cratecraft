'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { ArrowRight, Sparkles, Package, ShieldCheck, Check } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setQuickViewProduct, addToBox, setIsPromoModalOpen, setActiveTab } = useApp();

  // Featured Hero Provision
  const featuredProduct = PRODUCTS[0]; // Yirgacheffe Heirloom Coffee & Pantry

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Bento Card (approx 65% width: lg:col-span-8) */}
      <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-150 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
        {/* Left Text Content */}
        <div className="space-y-4 max-w-md z-10">
          <span className="text-[#FF5B26] font-extrabold text-xs tracking-wider uppercase inline-block">
            NEW ARRIVAL!
          </span>

          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight leading-[1.15] uppercase font-sans">
            Yirgacheffe Heirloom Single-Origin Box
          </h1>

          <p className="text-xs sm:text-sm text-stone-500 font-normal leading-relaxed">
            Feel revitalized from the dawn pause to the final reflection in a curation that's pure: single-origin, direct trade, uncompromised.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setQuickViewProduct(featuredProduct)}
              className="px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all active:scale-95"
            >
              View product
            </button>

            <button
              onClick={() => addToBox(featuredProduct)}
              className="px-5 py-3 rounded-full bg-[#F4F5F7] hover:bg-[#EAEBED] text-[#111827] text-xs font-bold tracking-wide transition-all border border-stone-200/80 active:scale-95"
            >
              Pack in Crate +
            </button>
          </div>
        </div>

        {/* Right Product Image - Designed like the open shoebox popping out in the screenshot */}
        <div className="relative w-full md:w-1/2 aspect-square max-w-[320px] shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5B26]/10 to-amber-100/30 rounded-full blur-2xl transform scale-90" />
          
          {/* Simulated open crate packaging visual */}
          <div 
            onClick={() => setQuickViewProduct(featuredProduct)}
            className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105"
          >
            <img
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=700&q=80"
              alt="Yirgacheffe Heirloom Single-Origin Box"
              className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-3xl shadow-2xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            {/* Direct Trade Badge */}
            <span className="absolute -bottom-2 -left-2 bg-[#111827] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              Fresh Micro-Roast
            </span>
            <span className="absolute -top-2 -right-2 bg-[#FF5B26] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
              ★ 4.9 Direct Trade
            </span>
          </div>
        </div>
      </div>

      {/* Right Bento Card (approx 35% width: lg:col-span-4) - Warm Tan/Camel Theme matching screenshot */}
      <div className="lg:col-span-4 bg-[#CCA282] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_25px_-5px_rgba(204,162,130,0.3)] relative overflow-hidden group">
        {/* Subtle background pouch image in lower right corner */}
        <div className="absolute -bottom-6 -right-6 w-48 h-48 opacity-25 pointer-events-none transform rotate-12 transition-transform duration-500 group-hover:scale-110">
          <img
            src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80"
            alt="Artisan provisions"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="space-y-4 relative z-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight uppercase font-sans">
            DISC UP TO 25% FOR MONTHLY HARVEST 2026
          </h2>

          <p className="text-xs text-stone-100 font-normal leading-relaxed max-w-xs">
            Join the monthly harvest fest on 23rd October. We have fresh small-batch provisions supported by CrateCraft.
          </p>
        </div>

        <div className="pt-6 relative z-10">
          <button
            onClick={() => setIsPromoModalOpen(true)}
            className="px-6 py-3 rounded-full bg-white text-[#111827] hover:bg-stone-100 text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 inline-flex items-center gap-1.5"
          >
            <span>Event details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#CCA282]" />
          </button>
        </div>
      </div>
    </div>
  );
};
