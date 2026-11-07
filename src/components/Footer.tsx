'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Mail, 
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', undefined, 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Seasonal Harvests! 🌿', 'You will receive our monthly micro-batch release notices.', 'success');
  };

  return (
    <footer className="bg-[#111827] text-white border-t border-neutral-800 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[2.2] text-[#FF5B26]">
                  <path d="M12 12c-2-2.5-4-4-6.5-4a4.5 4.5 0 0 0 0 9c2.5 0 4.5-1.5 6.5-4 2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 0-9c-2.5 0-4.5 1.5-6.5 4z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-[#FF5B26] transition-colors">
                CrateCraft
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-normal">
              Connecting discerning households with direct-trade family estates, wild honey foragers, high-elevation tea growers, and zero-waste kitchen apothecaries. Delivered on your cadence in 100% recyclable craft crates.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-stone-400">
              <span className="inline-flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-emerald-400 font-medium">
                <Leaf className="w-3.5 h-3.5" />
                <span>Zero Single-Use Plastic</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-[#FF5B26] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Dual Gateway Verified</span>
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#FF5B26]">
              Crate Rituals
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <button onClick={() => setActiveTab('builder')} className="hover:text-white transition-colors">
                  Interactive Box Builder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>60-Second Taste Quiz</span>
                  <Sparkles className="w-3 h-3 text-[#FF5B26]" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalog')} className="hover:text-white transition-colors">
                  Shop Provisions (24)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('recipes')} className="hover:text-white transition-colors">
                  Recipes & Pairings Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('subscription')} className="hover:text-white transition-colors">
                  Subscriber Portal & Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tiers */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#FF5B26]">
              Membership Tiers
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <span className="font-bold text-white">Starter Ritual:</span> 4 items • 5% OFF
              </li>
              <li>
                <span className="font-bold text-white">Curated Box:</span> 6 items • 15% OFF
              </li>
              <li>
                <span className="font-bold text-white">Ultimate Sanctuary:</span> 8 items • 25% OFF
              </li>
              <li className="pt-1 text-[11px] text-stone-400">
                Delivery Drops: Monthly, Bi-Monthly, or Quarterly
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#FF5B26]">
              Seasonal Harvest Alerts
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              Receive early-access reserve notifications when rare seasonal flushes and single-estate honeycombs drop.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-700/60 p-3 rounded-2xl flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're on the seasonal micro-harvest list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#FF5B26]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-full bg-[#FF5B26] hover:bg-[#E04D1D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  Join Micro-Harvest List
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Payment Badges & Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} CrateCraft Atelier Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-2.5 text-[11px] font-mono">
            <span className="bg-white/5 px-3 py-1 rounded-full text-stone-300 border border-white/10 font-sans font-semibold">
              Credit & Debit Cards
            </span>
            <span className="bg-[#E2136E]/20 text-[#FF63A5] px-3 py-1 rounded-full border border-[#E2136E]/40 font-bold">
              bKash
            </span>
            <span className="bg-[#F7941D]/20 text-[#FFB660] px-3 py-1 rounded-full border border-[#F7941D]/40 font-bold">
              Nagad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
