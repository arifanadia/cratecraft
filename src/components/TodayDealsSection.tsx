'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { Heart, Star, ChevronRight, ChevronLeft, Plus, Eye, Check } from 'lucide-react';

export const TodayDealsSection: React.FC = () => {
  const { 
    formatPrice, 
    addToBox, 
    boxItems, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useApp();

  // Scroll carousel reference
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Live Countdown Timer (Ends in : HH : MM : SS)
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 10, seconds: 9 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2Digits = (n: number) => n.toString().padStart(2, '0');

  // Today's Deal products (e.g., first 6 top artisanal provisions)
  const dealProducts = PRODUCTS.slice(0, 8);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight">
          Today Best Deals!
        </h2>

        {/* Live Countdown Pill Badge (Matching Screenshot) */}
        <div className="flex items-center gap-1.5 bg-[#FF5B26] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm font-mono tracking-wide">
          <span>Ends in :</span>
          <span>{format2Digits(timeLeft.hours)}</span>
          <span>:</span>
          <span>{format2Digits(timeLeft.minutes)}</span>
          <span>:</span>
          <span>{format2Digits(timeLeft.seconds)}</span>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none scroll-smooth"
        >
          {dealProducts.map((product) => {
            const isFavorite = isInWishlist(product.id);
            const isPacked = boxItems.some(i => i.id === product.id);

            return (
              <div
                key={product.id}
                className="w-[230px] sm:w-[250px] shrink-0 bg-white rounded-3xl p-4 border border-neutral-150 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-4px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between relative group/card"
              >
                <div>
                  {/* Top Row: Badge & Wishlist Button */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF5B26] tracking-wider">
                      {product.badgeLabel || 'Best Deal'}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 border border-stone-200/60 flex items-center justify-center transition-all shadow-sm active:scale-90"
                      title={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${
                          isFavorite 
                            ? 'text-[#FF5B26] fill-[#FF5B26]' 
                            : 'text-stone-400 hover:text-stone-700'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Product Photography */}
                  <div 
                    onClick={() => setQuickViewProduct(product)}
                    className="aspect-[4/3] rounded-2xl bg-[#F8F9FA] overflow-hidden cursor-pointer relative mb-3 flex items-center justify-center"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Hover Quick View Pill */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-white text-[10px] font-bold text-[#111827] shadow-md flex items-center gap-1">
                        <Eye className="w-3 h-3 text-[#FF5B26]" />
                        <span>Quick View</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div 
                    onClick={() => setQuickViewProduct(product)}
                    className="cursor-pointer"
                  >
                    <h3 className="font-bold text-xs sm:text-sm text-[#111827] line-clamp-1 group-hover/card:text-[#FF5B26] transition-colors leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating & Items Sold (Matching Screenshot: ★ 4.9 • 412 items Sold) */}
                  <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-1.5 font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-[#111827]">{product.rating.toFixed(1)}</span>
                    <span className="text-stone-300">•</span>
                    <span>{product.itemsSold ?? 412} items Sold</span>
                  </div>
                </div>

                {/* Pricing & Add to Crate */}
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    {product.originalPriceUSD && (
                      <span className="text-[10px] text-stone-400 line-through block font-medium">
                        {formatPrice(product.originalPriceUSD, product.originalPriceBDT)}
                      </span>
                    )}
                    <span className="font-extrabold text-sm sm:text-base text-[#111827]">
                      {formatPrice(product.priceUSD, product.priceBDT)}
                    </span>
                  </div>

                  {isPacked ? (
                    <button
                      disabled
                      className="px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>In Crate</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToBox(product)}
                      className="w-8 h-8 rounded-full bg-[#111827] hover:bg-[#FF5B26] text-white flex items-center justify-center transition-colors shadow-sm active:scale-95"
                      title="Add slot to monthly crate"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Scroll Buttons (Matching screenshot circular chevron button) */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white border border-stone-200/80 shadow-md flex items-center justify-center text-[#111827] hover:bg-[#FF5B26] hover:text-white hover:border-[#FF5B26] transition-all z-10"
          title="Scroll next deals"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white border border-stone-200/80 shadow-md flex items-center justify-center text-[#111827] hover:bg-[#FF5B26] hover:text-white hover:border-[#FF5B26] transition-all z-10"
          title="Scroll previous deals"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
