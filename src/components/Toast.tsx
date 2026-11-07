'use client';

import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, toast.message, dismissToast]);

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 rounded-2xl shadow-2xl border border-[#2F4435] bg-[#16221A] text-[#FAF7F2] flex items-start gap-3.5 transition-all backdrop-blur-md">
        <div className="mt-0.5 shrink-0">
          {toast.type === 'upgrade' ? (
            <div className="w-8 h-8 rounded-full bg-[#E5A93C]/20 flex items-center justify-center text-[#E5A93C]">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
          ) : toast.type === 'success' ? (
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : toast.type === 'warning' ? (
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-stone-700/50 flex items-center justify-center text-stone-300">
              <Info className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <p className="font-bold text-xs sm:text-sm tracking-tight text-white">
            {toast.message}
          </p>
          {toast.subMessage && (
            <p className="text-[11px] text-stone-300 mt-0.5 leading-relaxed font-light">
              {toast.subMessage}
            </p>
          )}
        </div>

        <button
          onClick={dismissToast}
          className="text-stone-400 hover:text-white transition-colors p-1 rounded-md"
          title="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
