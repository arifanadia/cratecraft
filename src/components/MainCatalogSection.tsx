'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import type { ProductCategory } from '../types';
import { 
  Heart, 
  Star, 
  ChevronDown, 
  SlidersHorizontal, 
  Plus, 
  Check, 
  Eye, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

const CATEGORIES = [
  'All Provisions',
  'Organic Pantry Essentials',
  'Specialty Coffee & Tea',
  'Artisanal Snacks',
  'Superfoods & Nuts',
  'Self-Care & Apothecary',
  'Mindful Stationery'
];

export const MainCatalogSection: React.FC = () => {
  const { 
    formatPrice, 
    addToBox, 
    boxItems, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    searchQuery 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All Provisions');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Dropdown open states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All Provisions' && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (selectedPrice === 'under15' && product.priceUSD >= 15) return false;
      if (selectedPrice === '15to25' && (product.priceUSD < 15 || product.priceUSD > 25)) return false;
      if (selectedPrice === 'over25' && product.priceUSD <= 25) return false;

      // Type / Badge filter
      if (selectedType !== 'All') {
        const matchesType = product.badges.some(b => 
          b.toLowerCase().includes(selectedType.toLowerCase())
        );
        if (!matchesType) return false;
      }

      // Global Search input
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesOrigin = product.artisan.origin.toLowerCase().includes(q);
        const matchesNotes = product.sensoryNotes.some(n => n.toLowerCase().includes(q));
        return matchesName || matchesCat || matchesOrigin || matchesNotes;
      }

      return true;
    });
  }, [selectedCategory, selectedPrice, selectedType, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      {/* Title & Subtitle (Matching Screenshot: "Shop Now, Goodlook Later") */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight">
          Shop Now, Savor Later
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 font-normal leading-relaxed">
          We have a bunch collection for you!, let's go explore and find your dream pantry, make it happen.
        </p>
      </div>

      {/* Filter Chips Row (Matching Screenshot: [• Nike ▾] [Price ▾] [Size ▾] [Type ▾] [More Filter ⊞]) */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap relative z-20">
        {/* Category Pill Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsPriceOpen(false);
              setIsTypeOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200/80 text-xs font-bold text-[#111827] shadow-sm transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF5B26]" />
            <span className="truncate max-w-[140px]">{selectedCategory}</span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {isCategoryOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 space-y-1 z-30 animate-in fade-in">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    selectedCategory === cat ? 'bg-[#111827] text-white' : 'hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Pill Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsPriceOpen(!isPriceOpen);
              setIsCategoryOpen(false);
              setIsTypeOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200/80 text-xs font-bold text-[#111827] shadow-sm transition-all"
          >
            <span>
              {selectedPrice === 'All' ? 'Price' : selectedPrice === 'under15' ? '< $15 / ৳1800' : selectedPrice === '15to25' ? '$15–$25' : '> $25'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {isPriceOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 space-y-1 z-30 animate-in fade-in">
              <button
                onClick={() => { setSelectedPrice('All'); setIsPriceOpen(false); }}
                className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-stone-100"
              >
                All Prices
              </button>
              <button
                onClick={() => { setSelectedPrice('under15'); setIsPriceOpen(false); }}
                className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-stone-100"
              >
                Under $15 (৳1,800)
              </button>
              <button
                onClick={() => { setSelectedPrice('15to25'); setIsPriceOpen(false); }}
                className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-stone-100"
              >
                $15 – $25 (৳1,800–৳3,000)
              </button>
              <button
                onClick={() => { setSelectedPrice('over25'); setIsPriceOpen(false); }}
                className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-stone-100"
              >
                Over $25 (৳3,000+)
              </button>
            </div>
          )}
        </div>

        {/* Type / Provenance Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsTypeOpen(!isTypeOpen);
              setIsCategoryOpen(false);
              setIsPriceOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200/80 text-xs font-bold text-[#111827] shadow-sm transition-all"
          >
            <span>{selectedType === 'All' ? 'Type' : selectedType}</span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {isTypeOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 space-y-1 z-30 animate-in fade-in">
              {['All', 'Direct Trade', 'Organic', 'Single Garden', 'Heirloom', 'Cold Press'].map(t => (
                <button
                  key={t}
                  onClick={() => { setSelectedType(t); setIsTypeOpen(false); }}
                  className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-stone-100"
                >
                  {t === 'All' ? 'All Types' : t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* More Filter Pill Button */}
        <button
          onClick={() => {
            setSelectedCategory('All Provisions');
            setSelectedPrice('All');
            setSelectedType('All');
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200/80 text-xs font-bold text-stone-600 hover:text-[#111827] shadow-sm transition-all"
        >
          <span>More Filter</span>
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
        </button>
      </div>

      {/* 4-Column Product Grid (Matching Screenshot Layout) */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-200 p-8 space-y-2">
          <p className="font-bold text-base text-[#111827]">No provisions match this filter</p>
          <p className="text-xs text-stone-500">Reset your filters to explore all 24 curated provisions.</p>
          <button
            onClick={() => {
              setSelectedCategory('All Provisions');
              setSelectedPrice('All');
              setSelectedType('All');
            }}
            className="mt-2 text-xs font-bold text-[#FF5B26] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const isFavorite = isInWishlist(product.id);
            const isPacked = boxItems.some(i => i.id === product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-4 sm:p-5 border border-neutral-150 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between relative"
              >
                <div>
                  {/* Top Badges & Wishlist */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider ${
                      product.badgeLabel === 'Sold out'
                        ? 'bg-stone-100 text-stone-500'
                        : 'bg-orange-50 text-[#FF5B26]'
                    }`}>
                      {product.badgeLabel || 'Just in'}
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

                  {/* Product Image */}
                  <div 
                    onClick={() => setQuickViewProduct(product)}
                    className="aspect-square rounded-2xl bg-[#F8F9FA] overflow-hidden cursor-pointer relative mb-3 flex items-center justify-center"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Quick View Hover Pill */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-white text-xs font-bold text-[#111827] shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#FF5B26]" />
                        <span>Quick View</span>
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div 
                    onClick={() => setQuickViewProduct(product)}
                    className="cursor-pointer"
                  >
                    <h3 className="font-bold text-sm text-[#111827] line-clamp-1 group-hover:text-[#FF5B26] transition-colors leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating & Sold count */}
                  <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-1 font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-[#111827]">{product.rating.toFixed(1)}</span>
                    <span className="text-stone-300">•</span>
                    <span>{product.itemsSold ?? 652} items Sold</span>
                  </div>
                </div>

                {/* Price & Add Button */}
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-extrabold text-base text-[#111827]">
                    {formatPrice(product.priceUSD, product.priceBDT)}
                  </span>

                  {isPacked ? (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>In Crate</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToBox(product)}
                      className="px-3 py-1.5 rounded-full bg-[#111827] hover:bg-[#FF5B26] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* "View More" Pill Button (Matching Screenshot) */}
      {visibleCount < filteredProducts.length && (
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 8)}
            className="px-8 py-3.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all active:scale-95"
          >
            View more
          </button>
        </div>
      )}
    </div>
  );
};
