'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { FREQUENCY_OPTIONS } from '../../data/mockData';
import { Repeat } from 'lucide-react';

export const FrequencySelector: React.FC = () => {
  const { selectedFrequency, setSelectedFrequency } = useApp();

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Repeat className="w-4 h-4 text-[#FF5B26]" />
          <h4 className="font-extrabold text-sm text-[#111827]">
            Choose Delivery Cadence
          </h4>
        </div>
        <span className="text-[11px] text-stone-500 font-medium">
          Swap, pause, or skip deliveries anytime with zero penalty
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {FREQUENCY_OPTIONS.map((option) => {
          const isSelected = selectedFrequency === option.id;

          return (
            <div
              key={option.id}
              onClick={() => setSelectedFrequency(option.id)}
              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#111827] shadow-md ring-2 ring-[#111827]/10'
                  : 'bg-[#F8F9FA] border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-extrabold text-xs text-[#111827]">
                    {option.label}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                    {option.cadenceDescription}
                  </p>
                </div>

                {option.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#FF5B26] text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {option.badge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
