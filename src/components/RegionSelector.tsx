/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HazeReadingState, RegionKey } from '../types/haze';
import { classifyPm25 } from '../utils/hazeClassifier';
import { MapPin } from 'lucide-react';

interface RegionSelectorProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
  onSelectRegion: (reg: RegionKey) => void;
  className?: string;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  readingState,
  selectedRegion,
  onSelectRegion,
  className = '',
}) => {
  if (!readingState) return null;

  const regionKeys: RegionKey[] = ['overall', 'central', 'east', 'north', 'south', 'west'];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#102D50] tracking-wide uppercase">
          <MapPin className="w-3.5 h-3.5 text-[#D9272E]" />
          <span>Singapore 1-Hour PM2.5 By Region</span>
        </div>
        <span className="text-[11px] font-medium text-slate-500">
          Select your area
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {regionKeys.map((key) => {
          const region = readingState.regions[key];
          const isSelected = selectedRegion === key;
          const cat = classifyPm25(region?.pm25 ?? 0);

          let colorPill = 'bg-emerald-100 text-emerald-800 border-emerald-300';
          let dotColor = 'bg-emerald-500';

          if (cat.descriptor === 'Elevated') {
            colorPill = 'bg-amber-100 text-amber-900 border-amber-300';
            dotColor = 'bg-amber-500';
          } else if (cat.descriptor === 'High') {
            colorPill = 'bg-orange-100 text-orange-900 border-orange-400';
            dotColor = 'bg-orange-500';
          } else if (cat.descriptor === 'Very High') {
            colorPill = 'bg-red-100 text-red-900 border-red-500';
            dotColor = 'bg-red-600';
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectRegion(key)}
              aria-pressed={isSelected}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-between min-h-[72px] ${
                isSelected
                  ? 'bg-white border-[#102D50] shadow-md ring-2 ring-[#102D50]/20 scale-[1.02]'
                  : 'bg-white/80 hover:bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-1 w-full justify-center">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-xs font-bold text-[#102D50] truncate capitalize">
                  {key === 'overall' ? 'SG (Max)' : region.label}
                </span>
              </div>

              <div className="my-1 flex items-baseline justify-center gap-0.5">
                <span className="font-heading text-2xl font-black text-[#102D50] leading-none">
                  {region.pm25}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">µg</span>
              </div>

              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border leading-none ${colorPill}`}
              >
                {cat.descriptor}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
