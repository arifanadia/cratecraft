'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  HeartHandshake,
  Check
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    boxItems, 
    addToBox, 
    removeFromBox, 
    formatPrice
  } = useApp();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isInBox = boxItems.some(i => i.id === product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#111827] shadow-md flex items-center justify-center transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 relative bg-[#F8F9FA] flex items-center justify-center min-h-[260px] md:min-h-full overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          {/* Origin & Specs Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-[#FF5B26]" />
              <span className="font-medium">{product.artisan.origin}</span>
            </span>
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full font-mono text-[11px] border border-white/20">
              {product.volumeOrWeight}
            </span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#FF5B26]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#111827]">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-stone-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h2 className="font-extrabold text-2xl text-[#111827] leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Price Tag */}
            <div className="flex items-baseline gap-2.5 pt-1">
              <span className="font-extrabold text-2xl text-[#111827]">
                {formatPrice(product.priceUSD, product.priceBDT)}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Included in your monthly crate slot
              </span>
            </div>

            {/* Sensory Tasting Notes */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5B26]" />
                Sensory & Flavor Profile
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.sensoryNotes.map((note, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#F4F5F7] text-stone-700 font-semibold border border-stone-200"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Artisan Story Card */}
            <div className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                <HeartHandshake className="w-4 h-4 text-[#FF5B26]" />
                <span>Crafted by {product.artisan.name}</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                {product.artisan.story}
              </p>
              <div className="text-[10px] text-stone-500 font-mono">
                Craft Tradition: {product.artisan.craft}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.badges.map((b, i) => (
                <span 
                  key={i}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#111827] bg-[#F4F5F7] px-2.5 py-1 rounded-full border border-stone-200"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-stone-100">
            {isInBox ? (
              <button
                onClick={() => removeFromBox(product.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs tracking-wide border border-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove from Crate</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  addToBox(product);
                  setQuickViewProduct(null);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#111827] hover:bg-[#FF5B26] text-white font-bold text-xs tracking-wider uppercase shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4 text-[#FF5B26] group-hover:text-white" />
                <span>Pack in Monthly Crate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
