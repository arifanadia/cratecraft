'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS, PRODUCTS } from '../../data/mockData';
import type { Product } from '../../types';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Sun, 
  Moon, 
  Heart, 
  Trees, 
  Zap, 
  Coffee, 
  Flower2, 
  Home, 
  Compass, 
  Briefcase, 
  Leaf, 
  Users, 
  Award, 
  Feather, 
  ShieldCheck, 
  ShoppingBag, 
  Edit3, 
  RotateCcw,
  Check
} from 'lucide-react';

export const PersonalizationQuiz: React.FC = () => {
  const { loadBoxItems, setActiveTab, formatPrice, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [curationStage, setCurationStage] = useState<string>('Analyzing your ritual responses...');
  const [curatedResult, setCuratedResult] = useState<{
    items: Product[];
    matchScore: number;
    dominantRitual: string;
    sensoryNotesPreview: string[];
  } | null>(null);

  const question = QUIZ_QUESTIONS[currentStep];
  const totalSteps = QUIZ_QUESTIONS.length;
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#FF5B26]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'Trees': return <Trees className="w-5 h-5 text-emerald-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-700" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-pink-400" />;
      case 'Home': return <Home className="w-5 h-5 text-stone-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-blue-500" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-stone-500" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-emerald-500" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-600" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-500" />;
      case 'Feather': return <Feather className="w-5 h-5 text-purple-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default: return <Sparkles className="w-5 h-5 text-[#FF5B26]" />;
    }
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      runAutoCurationEngine();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const runAutoCurationEngine = () => {
    setIsCalculating(true);

    setTimeout(() => {
      setCurationStage('Scanning single-origin harvests and small-batch provisions...');
    }, 600);

    setTimeout(() => {
      setCurationStage('Harmonizing flavor notes and grounding aromas...');
    }, 1200);

    setTimeout(() => {
      setCurationStage('Finalizing your personalized 6-item Curated Box...');
    }, 1800);

    setTimeout(() => {
      const userTags: string[] = [];

      QUIZ_QUESTIONS.forEach(q => {
        const chosenId = answers[q.id];
        const opt = q.options.find(o => o.id === chosenId);
        if (opt) {
          userTags.push(...opt.matchTags);
        }
      });

      const scoredProducts = PRODUCTS.map(product => {
        let score = 0;
        product.ritualMatchTags.forEach(tag => {
          if (userTags.includes(tag)) {
            score += 2;
          }
        });
        score += product.rating;
        return { product, score };
      });

      scoredProducts.sort((a, b) => b.score - a.score);

      const selected: Product[] = [];
      const categoriesSeen = new Set<string>();

      for (const item of scoredProducts) {
        if (!categoriesSeen.has(item.product.category) && selected.length < 6) {
          selected.push(item.product);
          categoriesSeen.add(item.product.category);
        }
      }

      for (const item of scoredProducts) {
        if (selected.length < 6 && !selected.some(p => p.id === item.product.id)) {
          selected.push(item.product);
        }
      }

      const notes = Array.from(new Set(selected.flatMap(p => p.sensoryNotes))).slice(0, 5);

      setCuratedResult({
        items: selected,
        matchScore: 98,
        dominantRitual: 'Mindful Daily Sanctuary & Sensory Balance',
        sensoryNotesPreview: notes
      });

      setIsCalculating(false);
      showToast(
        'Auto-Curation Complete! ✨',
        'Your bespoke 6-item Curated Box is ready with 15% tiered savings unlocked.',
        'success'
      );
    }, 2200);
  };

  const handleAcceptAndTweak = () => {
    if (curatedResult) {
      loadBoxItems(curatedResult.items, 'curated');
      setActiveTab('builder');
    }
  };

  const handleDirectCheckout = () => {
    if (curatedResult) {
      loadBoxItems(curatedResult.items, 'curated');
      setActiveTab('checkout');
    }
  };

  const handleRetake = () => {
    setCuratedResult(null);
    setCurrentStep(0);
    setAnswers({});
  };

  // RENDER: Loading State
  if (isCalculating) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-6 bg-white rounded-3xl border border-stone-200 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#111827] text-white flex items-center justify-center animate-spin">
          <Sparkles className="w-8 h-8 text-[#FF5B26]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF5B26]">
            CrateCraft Taste Engine
          </span>
          <h2 className="font-extrabold text-2xl text-[#111827]">
            Curating Your Bespoke Monthly Ritual
          </h2>
          <p className="text-xs text-stone-500 font-medium max-w-md mx-auto animate-pulse">
            {curationStage}
          </p>
        </div>

        <div className="max-w-xs mx-auto bg-stone-100 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-[#FF5B26] animate-pulse w-3/4 rounded-full" />
        </div>
      </div>
    );
  }

  // RENDER: Curated Results
  if (curatedResult) {
    const rawValUSD = curatedResult.items.reduce((s, i) => s + i.priceUSD, 0);
    const rawValBDT = curatedResult.items.reduce((s, i) => s + i.priceBDT, 0);
    const discValUSD = rawValUSD * 0.85;
    const discValBDT = Math.round(rawValBDT * 0.85);

    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Results Banner */}
        <div className="bg-[#111827] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-neutral-800 shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#FF5B26]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-[#FF5B26]/20 text-[#FF5B26] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{curatedResult.matchScore}% Ritual Harmony Score</span>
              </div>
              <h2 className="font-extrabold text-3xl sm:text-4xl tracking-tight text-white uppercase">
                We've Hand-Curated Your 6-Item Crate
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
                Based on your daily rhythm, living environment, and sensory profile, our team paired these 6 harmonious artisan provisions into your signature <strong className="text-white">Curated Box</strong> (15% OFF unlocked).
              </p>
              
              <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-stone-400 font-bold text-[11px]">Dominant Aromatics:</span>
                {curatedResult.sensoryNotesPreview.map((note, idx) => (
                  <span key={idx} className="bg-white/10 text-stone-200 text-[10px] px-2.5 py-0.5 rounded-full border border-white/10 font-medium">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Primary CTA */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 flex flex-col justify-between space-y-4 min-w-[280px]">
              <div>
                <span className="text-[10px] text-stone-300 uppercase tracking-wider font-extrabold block">
                  Curated Box Tier (15% OFF)
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-extrabold text-2xl text-white">
                    {formatPrice(discValUSD, discValBDT)}
                  </span>
                  <span className="text-xs text-stone-400 line-through">
                    {formatPrice(rawValUSD, rawValBDT)}
                  </span>
                </div>
                <span className="text-[11px] text-[#FF5B26] font-bold block mt-1">
                  You save {formatPrice(rawValUSD - discValUSD, rawValBDT - discValBDT)}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleDirectCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#FF5B26] hover:bg-[#E04D1D] text-white font-bold text-xs tracking-wider uppercase shadow-md transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Lock In & Checkout</span>
                </button>
                <button
                  onClick={handleAcceptAndTweak}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs tracking-wide transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Review in Box Builder</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Curated Items Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xl text-[#111827]">
              Your 6 Tailored Provisions
            </h3>
            <button
              onClick={handleRetake}
              className="text-xs font-bold text-stone-500 hover:text-[#111827] flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {curatedResult.items.map((item, idx) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm flex items-center gap-3.5"
              >
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold text-[#FF5B26] uppercase">
                    Slot #{idx + 1}
                  </span>
                  <h4 className="font-bold text-xs text-[#111827] truncate">{item.name}</h4>
                  <p className="text-[10px] text-stone-500 truncate">{item.artisan.origin}</p>
                  <span className="font-mono font-bold text-xs text-[#111827] block mt-0.5">
                    {formatPrice(item.priceUSD, item.priceBDT)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Quiz Step by Step View
  const selectedOptionId = answers[question.id];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Quiz Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-500">
          <span className="text-[#FF5B26] font-extrabold uppercase tracking-wider">{question.stepTitle}</span>
          <span>{Math.round(progressPercent)}% Completed</span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FF5B26] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div>
          <h2 className="font-extrabold text-xl sm:text-2xl text-[#111827] leading-snug">
            {question.question}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {question.subtext}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map(option => {
            const isSelected = selectedOptionId === option.id;

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-orange-50/40 border-[#FF5B26] shadow-sm ring-2 ring-[#FF5B26]/10'
                    : 'bg-[#F8F9FA] border-stone-200 hover:border-stone-300 hover:bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white shadow-sm' : 'bg-white'
                }`}>
                  {getOptionIcon(option.icon)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs sm:text-sm text-[#111827]">
                      {option.label}
                    </h4>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#FF5B26] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentStep === 0 
                ? 'text-stone-300 cursor-not-allowed' 
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedOptionId}
            className={`px-7 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
              selectedOptionId
                ? 'bg-[#FF5B26] hover:bg-[#E04D1D] text-white shadow-md active:scale-95'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === totalSteps - 1 ? 'Calculate My Crate' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
