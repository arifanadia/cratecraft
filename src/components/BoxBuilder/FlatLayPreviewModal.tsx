'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BOX_TIERS } from '@/data/mockData';
import { 
  X, 
  Sparkles, 
  Package, 
  CheckCircle2, 
  Leaf, 
  ShieldCheck, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

interface FlatLayPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlatLayPreviewModal: React.FC<FlatLayPreviewModalProps> = ({ isOpen, onClose }) => {
  const { boxItems, selectedTier, selectedFrequency, formatPrice, setActiveTab } = useApp();

  if (!isOpen) return null;

  const tier = BOX_TIERS[selectedTier];
  const rawSubtotalUSD = boxItems.reduce((sum, item) => sum + item.priceUSD, 0);
  const rawSubtotalBDT = boxItems.reduce((sum, item) => sum + item.priceBDT, 0);
  const discountMultiplier = 1 - (tier.discountPercentage / 100);
  const discountedUSD = +(rawSubtotalUSD * discountMultiplier).toFixed(2);
  const discountedBDT = Math.round(rawSubtotalBDT * discountMultiplier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-4xl bg-[#F7F4EE] rounded-3xl shadow-2xl border border-[#DED3C0] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#E6DCcb] flex items-center justify-between bg-[#FBF9F5]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B6E4A] font-bold">
                Unboxing Visualization
              </span>
              <span className="bg-[#283E2E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {tier.name}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#16221A]">
              Your Hand-Packed Monthly Crate
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#EFE9DD] hover:bg-[#E5DAC8] text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Crate Interior Flat-Lay Stage */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Crate Visual Frame */}
          <div className="relative rounded-3xl bg-[#EBE2D3] border-4 border-[#C9B9A2] p-6 sm:p-8 shadow-inner overflow-hidden">
            {/* Wooden Texture Overlay Hints */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8B6E4A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Custom Curator Packing Seal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#D8CABE]/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#203225] text-[#E8DEC8] flex items-center justify-center border-2 border-[#3D5B46] shadow-sm font-serif font-bold text-sm">
                  CC
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-[#16221A] block">
                    CrateCraft Atelier • Batch No. 04
                  </span>
                  <span className="text-xs text-stone-600">
                    Hand-sealed with botanical parchment & compostable hemp twine
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#584838] bg-[#E2D6C5] px-3 py-1.5 rounded-xl">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Zero-Plastic Packing</span>
              </div>
            </div>

            {/* Flat-Lay Items Grid */}
            {boxItems.length === 0 ? (
              <div className="text-center py-12 text-stone-500 font-serif">
                Your crate is currently empty. Add artisanal provisions from the catalog to see them packed here!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {boxItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="group relative bg-[#FAF8F5] rounded-2xl border border-[#D5C7B3] p-3 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 mb-2.5">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-1.5 left-1.5 bg-[#1C2920]/80 backdrop-blur-md text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B6E4A] block truncate">
                        {item.artisan.origin}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-[#16221A] line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 line-clamp-1">
                        {item.volumeOrWeight}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#EDE4D5] flex items-center justify-between text-[11px] font-mono font-bold text-[#283E2E]">
                      <span>{formatPrice(item.priceUSD, item.priceBDT)}</span>
                      <span className="text-[9px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">
                        Packed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Handwritten Curator Card Note */}
            <div className="mt-6 bg-[#FAF7F2] p-4 rounded-2xl border border-[#D8CCBC] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A755D] font-bold block">
                Lead Curator's Dispatch Note
              </span>
              <p className="font-serif italic text-xs text-[#2B3B2F] leading-relaxed">
                "Each jar, pouch, and vessel in this {tier.name} has been vetted for ethical provenance, peak harvest freshness, and sensory balance. Enjoy this ritual as a pause in an otherwise busy month."
              </p>
              <span className="text-[10px] text-stone-500 font-mono block text-right">
                — Elena Vance, Head of Provenance
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-4 border-t border-[#E6DCcb] bg-[#FBF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                Crate Value ({boxItems.length} provisions)
              </span>
              <span className="text-sm font-mono text-stone-400 line-through">
                {formatPrice(rawSubtotalUSD, rawSubtotalBDT)}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6E4A] block">
                {tier.discountPercentage}% Tiered Savings
              </span>
              <span className="font-serif text-xl font-bold text-[#203225]">
                {formatPrice(discountedUSD, discountedBDT)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-[#EAE0D1] transition-colors"
            >
              Continue Curating
            </button>
            <button
              onClick={() => {
                onClose();
                setActiveTab('checkout');
              }}
              disabled={boxItems.length === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all ${
                boxItems.length > 0
                  ? 'bg-[#203225] hover:bg-[#152319] text-white active:scale-95'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
