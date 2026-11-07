'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Leaf, Package } from 'lucide-react';

export const FooterBanner: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="relative rounded-3xl bg-[#111827] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-neutral-800">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5B26]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#CCA282]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl space-y-5">
        <span className="text-[#FF5B26] font-extrabold text-xs tracking-widest uppercase inline-flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>100% Zero-Plastic Certified • Carbon-Neutral</span>
        </span>

        <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] uppercase font-sans">
          Helping You to Nourish Authentic Monthly Pantry
        </h2>

        <p className="text-xs sm:text-sm text-stone-400 font-normal leading-relaxed max-w-xl">
          From independent organic estates to zero single-use plastics, we deliver mindfulness directly to your doorstep. Customize, pause, or swap your slots anytime.
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('builder')}
            className="px-7 py-3.5 rounded-full bg-[#FF5B26] hover:bg-[#E04D1D] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Build Your Crate</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#FF5B26]" />
            <span>Take 60s Taste Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
