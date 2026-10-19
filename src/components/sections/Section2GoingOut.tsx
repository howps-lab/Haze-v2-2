/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RefreshCw, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { HazeReadingState, RegionKey } from '../../types/haze';
import { classifyPm25 } from '../../utils/hazeClassifier';
import { formatObservationTime, getRelativeTimeString } from '../../services/hazeApi';
import { ActivityGuidance } from '../ActivityGuidance';
import { RegionSelector } from '../RegionSelector';

interface Section2GoingOutProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
  onSelectRegion: (reg: RegionKey) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Section2GoingOut: React.FC<Section2GoingOutProps> = ({
  readingState,
  selectedRegion,
  onSelectRegion,
  onRefresh,
  isRefreshing,
}) => {
  const currentVal = readingState ? readingState.regions[selectedRegion].pm25 : null;
  const category = classifyPm25(currentVal);
  const regionLabel = readingState?.regions[selectedRegion].label || 'Singapore (Max)';
  const obsTime = readingState ? formatObservationTime(readingState.timestamp) : 'Loading...';
  const relativeUpdate = readingState ? getRelativeTimeString(readingState.retrievedAt) : '';

  return (
    <section
      id="section-2"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-navy-100 relative"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-[#102D50] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Chapter 2 of 7</span>
            <span className="text-slate-300">•</span>
            <span>Outdoor Activity Guide</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#102D50] uppercase tracking-tight leading-none mb-3">
            GOING OUT? <span className="text-[#D9272E]">CHECK THIS FIRST</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Singapore authorities advise using the 1-hour PM2.5 reading to guide your immediate outdoor activities.
          </p>
        </div>

        {/* Region selector bar */}
        <div className="mb-8">
          <RegionSelector
            readingState={readingState}
            selectedRegion={selectedRegion}
            onSelectRegion={onSelectRegion}
          />
        </div>

        {/* Dual Layout: Illustration 2 & Interactive Activity Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left: Illustration 2 */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 bg-[#FFF5E7] max-w-sm sm:max-w-md w-full sticky top-24">
              <img
                src="/images/story02.png"
                alt="Singapore Haze Awareness Illustration - Going Out? Check this first. 1-Hour PM2.5 guidance for walking, jogging, cycling, and playground."
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: Live Interactive Activity Guidance */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Live Reading Summary Banner */}
            <div className="bg-[#FFF8F0] rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Current Reading for {regionLabel}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-heading text-4xl sm:text-5xl font-black text-[#102D50] leading-none">
                    {currentVal !== null ? currentVal : '--'}
                  </span>
                  <span className="text-sm font-bold text-slate-500">µg/m³</span>
                  <span
                    className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${category.badgeBg} ${category.badgeText}`}
                  >
                    {category.descriptor}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1.5">
                <button
                  type="button"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-[#102D50] shadow-xs cursor-pointer transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#D9272E] ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh Reading</span>
                </button>
                <span className="text-[11px] text-slate-500 font-medium">
                  {relativeUpdate ? `Synced ${relativeUpdate}` : 'NEA Live Feed'}
                </span>
              </div>
            </div>

            {/* Interactive Activity Guidance (Walking, Jogging, Cycling, Playground) */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#102D50] uppercase tracking-wider">
                  Select an Activity to see immediate advice:
                </span>
                <span className="text-[11px] text-slate-500">Official NEA Guidelines</span>
              </div>
              <ActivityGuidance
                category={category}
                currentPm25={currentVal ?? 0}
              />
            </div>

            {/* Timely reminder card matching the alarm clock in illustration 2 */}
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9272E] text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-black text-[#D9272E] uppercase tracking-wide">
                  Air quality can change throughout the day
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mt-0.5">
                  PM2.5 levels fluctuate with changing wind patterns and rain. Always check the latest reading again immediately before leaving home or school.
                </p>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                  <span>Observation timestamp: {obsTime}</span>
                </div>
              </div>
            </div>

            {/* Navigation to next chapter */}
            <div className="pt-2">
              <a
                href="#section-3"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#102D50] hover:text-[#D9272E] transition-colors group cursor-pointer"
              >
                <span>Next: Learn what each PM2.5 range means</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
