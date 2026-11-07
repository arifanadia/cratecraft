'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RECIPE_PAIRINGS, PRODUCTS } from '../data/mockData';
import { 
  BookOpen, 
  Clock, 
  ChefHat, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Plus, 
  Users, 
  Eye, 
  Utensils 
} from 'lucide-react';

export const RecipesPairingsSection: React.FC = () => {
  const { addToBox, setQuickViewProduct, setActiveTab, boxItems } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Morning Ritual', 'Sustained Energy', 'Aperitivo', 'Evening Wind-Down'];

  const filteredRecipes = selectedTag === 'All'
    ? RECIPE_PAIRINGS
    : RECIPE_PAIRINGS.filter(r => r.tags.includes(selectedTag));

  const handleAddIngredient = (productName: string) => {
    const prod = PRODUCTS.find(p => p.name.toLowerCase().includes(productName.toLowerCase()) || productName.toLowerCase().includes(p.name.toLowerCase()));
    if (prod) {
      addToBox(prod);
    }
  };

  const handleInspectIngredient = (productName: string) => {
    const prod = PRODUCTS.find(p => p.name.toLowerCase().includes(productName.toLowerCase()) || productName.toLowerCase().includes(p.name.toLowerCase()));
    if (prod) {
      setQuickViewProduct(prod);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E5DAC9] shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B6E4A] font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#C26733]" />
            Monthly Culinary Guide & Ritual Pairings
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#16221A] mt-1">
            Artisan Pairings & Kitchen Recipes
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
            Every provision in your crate is selected not just for purity, but for culinary harmony. Explore how tea masters, baristas, and chefs pair our monthly harvests.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#1C2920] text-white shadow-sm'
                  : 'bg-[#F2EAE0] text-stone-700 hover:bg-[#EAE0D2] border border-[#DECFC0]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id}
            className="bg-[#FAF7F2] rounded-3xl border border-[#E4D8C5] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Recipe Photography Header */}
              <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {recipe.tags.map(tag => (
                    <span key={tag} className="bg-[#1C2920]/80 backdrop-blur-md text-[#FAF7F2] text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>{recipe.time}</span>
                  </span>
                  <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md font-mono text-[11px]">
                    {recipe.servingSize}
                  </span>
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#16221A] leading-snug">
                  {recipe.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {recipe.description}
                </p>

                {/* Featured Products from Crate */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6E4A] block">
                    Featured Provisions From This Drop:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {recipe.featuredProductNames.map((name, i) => {
                      const prod = PRODUCTS.find(p => p.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(p.name.toLowerCase()));
                      const isAlreadyPacked = prod && boxItems.some(it => it.id === prod.id);

                      return (
                        <div 
                          key={i} 
                          className="flex items-center gap-1.5 bg-[#F2EAE0] border border-[#DECFC0] px-2.5 py-1 rounded-lg text-xs font-medium text-stone-800"
                        >
                          <span 
                            onClick={() => handleInspectIngredient(name)}
                            className="cursor-pointer hover:underline truncate max-w-[190px]"
                            title={name}
                          >
                            {name}
                          </span>
                          {prod && (
                            <button
                              onClick={() => handleAddIngredient(name)}
                              disabled={isAlreadyPacked}
                              className={`p-1 rounded-md text-[10px] transition-colors ${
                                isAlreadyPacked 
                                  ? 'text-emerald-700 bg-emerald-100 cursor-default' 
                                  : 'text-stone-600 hover:text-white hover:bg-[#283E2E]'
                              }`}
                              title={isAlreadyPacked ? 'Already in your box' : 'Add to your box'}
                            >
                              {isAlreadyPacked ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Preparation Steps */}
                <div className="space-y-2 pt-2 border-t border-[#EAE0D1]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    Ritual Preparation:
                  </span>
                  <ol className="space-y-1.5 text-xs text-stone-600 font-light list-decimal pl-4">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveTab('builder')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#283E2E] hover:bg-[#1C2C20] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
              >
                <span>Curate These Into Your Crate</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
