'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, BOX_TIERS } from '../data/mockData';
import type { ProductCategory } from '../types';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  MapPin, 
  Star, 
  Trash2, 
  Layers, 
  Sparkles, 
  Check, 
  PackagePlus, 
  ArrowRight,
  SlidersHorizontal,
  Leaf
} from 'lucide-react';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Organic Pantry Essentials',
  'Superfoods & Nuts',
  'Specialty Coffee & Tea',
  'Artisanal Snacks',
  'Self-Care & Apothecary',
  'Mindful Stationery'
];

export const ArtisanProvisionsView: React.FC = () => {
  const { 
    boxItems, 
    addToBox, 
    removeFromBox, 
    formatPrice, 
    setQuickViewProduct,
    selectedTier,
    setActiveTab,
    oneTimeAddons,
    addOneTimeAddon,
    removeOneTimeAddon
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-asc' | 'price-desc'>('featured');

  const tier = BOX_TIERS[selectedTier];
  const allTags = ['All', 'Organic', 'Direct Trade', 'Small-Batch', 'Plastic-Free', 'Heirloom', 'Raw'];

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }
      if (selectedTag !== 'All') {
        const matchesTag = product.badges.some(b => 
          b.toLowerCase().includes(selectedTag.toLowerCase())
        );
        if (!matchesTag) return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesOrigin = product.artisan.origin.toLowerCase().includes(q);
        const matchesSensory = product.sensoryNotes.some(n => n.toLowerCase().includes(q));
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        return matchesName || matchesCategory || matchesOrigin || matchesSensory || matchesSubtitle;
      }
      return true;
    });

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceUSD - a.priceUSD);
    }

    return result;
  }, [activeCategory, searchQuery, selectedTag, sortBy]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Header Banner */}
      <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E5DAC9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B6E4A] font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#283E2E]" />
            Direct Trade • Smallholder Farm Estates
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#16221A] mt-1">
            Artisan Provisions Catalog
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
            Browse our full repertoire of direct-trade provisions. Add items to your active monthly crate slots, or tack them on as one-time add-ons to your next scheduled drop.
          </p>
        </div>

        {/* Crate Capacity HUD & Quick Link */}
        <div className="flex items-center gap-3 bg-[#F2EAE0] p-3 rounded-2xl border border-[#DECFC0] self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-[#1C2920] text-[#E8DEC8] flex items-center justify-center font-mono font-bold text-xs shadow-sm">
            {boxItems.length}/{tier.slots}
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#16221A] block">
              {tier.name}
            </span>
            <span className="text-[10px] text-stone-500">
              {boxItems.length === tier.slots ? 'Crate is fully packed' : `${tier.slots - boxItems.length} slots remaining`}
            </span>
          </div>
          <button
            onClick={() => setActiveTab('builder')}
            className="ml-2 px-3 py-1.5 rounded-lg bg-[#283E2E] hover:bg-[#1E3023] text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
          >
            <span>Review Crate</span>
            <ArrowRight className="w-3 h-3 text-[#E5A93C]" />
          </button>
        </div>
      </div>

      {/* Controls: Search, Category Tabs, Sort, Provenance Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search olive oil, matcha, honey, flour..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#F4EFE6] border border-[#DECFC0] rounded-xl text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#283E2E]/30 focus:border-[#283E2E] transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-stone-600 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#F4EFE6] border border-[#DECFC0] rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Curator Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' 
              ? PRODUCTS.length 
              : PRODUCTS.filter(p => p.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1C2920] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#F4EFE6] text-[#635546] hover:bg-[#EAE1D5] border border-[#DECFC0]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-[#3A5342] text-white' : 'bg-[#E5DACB] text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Provenance Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Provenance:
          </span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-[#8B6E4A] text-white'
                  : 'bg-[#F2EAE0] text-stone-600 hover:bg-[#EAE0D2] border border-[#E2D5C3]'
              }`}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-stone-500">
            Showing {filteredProducts.length} curated provisions
          </span>
        </div>
      </div>

      {/* Grid of Provisions */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#F4EFE6] rounded-3xl border border-dashed border-[#D5C6B3] p-8 space-y-2">
          <p className="font-serif text-xl font-bold text-stone-700">No provisions match your search</p>
          <p className="text-xs text-stone-500">Try adjusting your filters or resetting the category.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
              setSelectedTag('All');
            }}
            className="mt-3 text-xs font-semibold text-[#8B6E4A] underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isInBox = boxItems.some(i => i.id === product.id);
            const isAddon = oneTimeAddons.some(i => i.id === product.id);

            return (
              <div
                key={product.id}
                className="group bg-[#FAF7F2] rounded-3xl border border-[#E3D6C4] hover:border-[#283E2E]/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photography & Badges */}
                  <div 
                    className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" 
                    onClick={() => setQuickViewProduct(product)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Quick View Hover */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-stone-900 shadow-lg">
                        <Eye className="w-3.5 h-3.5 text-[#283E2E]" />
                        <span>Artisan Provenance</span>
                      </span>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="bg-[#1C2920]/85 backdrop-blur-md text-[#FAF7F2] text-[10px] font-semibold px-2.5 py-0.5 rounded-md shadow-sm">
                        {product.badges[0]}
                      </span>
                    </div>

                    {/* Origin Pin */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px]">
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/10">
                        <MapPin className="w-3 h-3 text-[#E5A93C]" />
                        <span className="truncate max-w-[130px]">{product.artisan.origin}</span>
                      </span>
                      <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md font-mono border border-white/10">
                        {product.volumeOrWeight}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#8B6E4A] font-bold uppercase tracking-wider text-[10px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-stone-700 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-stone-400 font-normal">({product.reviewCount})</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => setQuickViewProduct(product)}
                      className="cursor-pointer group/title"
                    >
                      <h3 className="font-serif text-base font-bold text-[#16221A] group-hover/title:text-[#283E2E] line-clamp-1 transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-snug font-light">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Sensory Notes */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {product.sensoryNotes.slice(0, 3).map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#554737] font-medium border border-[#E6DBCE]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 sm:p-5 pt-0 space-y-2">
                  <div className="pt-3 border-t border-[#EAE0D1] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                        Slot Value
                      </span>
                      <span className="font-serif text-base font-bold text-[#203324]">
                        {formatPrice(product.priceUSD, product.priceBDT)}
                      </span>
                    </div>

                    {isInBox ? (
                      <button
                        onClick={() => removeFromBox(product.id)}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>In Box</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToBox(product)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#283E2E] hover:bg-[#1A2A1F] text-[#FAF7F2] text-xs font-semibold shadow-sm transition-all active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>Pack in Slot</span>
                      </button>
                    )}
                  </div>

                  {/* Secondary 1-Time Addon Button */}
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-stone-500">Need extra for next drop?</span>
                    {isAddon ? (
                      <button
                        onClick={() => removeOneTimeAddon(product.id)}
                        className="text-red-600 hover:underline font-semibold"
                      >
                        Remove 1-time add-on
                      </button>
                    ) : (
                      <button
                        onClick={() => addOneTimeAddon(product)}
                        className="text-[#8B6E4A] hover:text-[#5B472F] font-semibold flex items-center gap-1"
                      >
                        <PackagePlus className="w-3 h-3" />
                        <span>Add as 1-Time Add-on</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
