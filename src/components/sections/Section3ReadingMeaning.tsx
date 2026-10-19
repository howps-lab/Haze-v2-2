/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, AlertTriangle, AlertOctagon, Users } from 'lucide-react';
import { HazeReadingState, RegionKey } from '../../types/haze';
import { CATEGORIES, classifyPm25 } from '../../utils/hazeClassifier';

interface Section3ReadingMeaningProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
}

export const Section3ReadingMeaning: React.FC<Section3ReadingMeaningProps> = ({
  readingState,
  selectedRegion,
}) => {
  const currentVal = readingState ? readingState.regions[selectedRegion].pm25 : null;
  const currentCategory = classifyPm25(currentVal);
  const regionLabel = readingState?.regions[selectedRegion].label || 'Singapore (Max)';

  const categoryList = [
    {
      key: 'Normal' as const,
      range: '0 – 55 µg/m³',
      band: 'Band 1',
      action: 'Normal activities',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      colorClass: 'border-emerald-500 bg-emerald-50/50',
      badgeClass: 'bg-emerald-600 text-white',
      desc: 'Air quality is satisfactory. No outdoor restrictions for healthy adults.',
    },
    {
      key: 'Elevated' as const,
      range: '56 – 150 µg/m³',
      band: 'Band 2',
      action: 'Reduce strenuous outdoor activity',
      icon: <AlertCircle className="w-6 h-6 text-amber-600" />,
      colorClass: 'border-amber-400 bg-amber-50/50',
      badgeClass: 'bg-amber-500 text-navy-950',
      desc: 'Slightly higher particle concentration. Lower physical intensity outdoors.',
    },
    {
      key: 'High' as const,
      range: '151 – 250 µg/m³',
      band: 'Band 3',
      action: 'Avoid strenuous outdoor activity',
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
      colorClass: 'border-orange-500 bg-orange-50/50',
      badgeClass: 'bg-orange-600 text-white',
      desc: 'Unhealthy air pollution. Shift workouts indoors and limit outdoor duration.',
    },
    {
      key: 'Very High' as const,
      range: '251 & above',
      band: 'Band 4',
      action: 'Minimise outdoor activity',
      icon: <AlertOctagon className="w-6 h-6 text-red-600" />,
      colorClass: 'border-red-600 bg-red-50/50',
      badgeClass: 'bg-red-600 text-white',
      desc: 'Very unhealthy air quality. Avoid going outside unless necessary.',
    },
  ];

  return (
    <section
      id="section-3"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FFF8F0] border-b border-navy-100"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#102D50] text-xs font-bold uppercase tracking-wider mb-2 border border-slate-200">
            <span>Chapter 3 of 7</span>
            <span className="text-slate-300">•</span>
            <span>Official Classification Scale</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#102D50] uppercase tracking-tight leading-none mb-3">
            WHAT DOES YOUR <span className="text-[#D9272E]">PM2.5 READING MEAN?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Use the 1-hour PM2.5 reading to guide what you do outdoors right now.
          </p>
        </div>

        {/* Dual Layout: Illustration 3 and Interactive Scale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Illustration 3 */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white max-w-sm sm:max-w-md w-full sticky top-24">
              <img
                src="/images/story03.png"
                alt="Singapore Haze Awareness Illustration - What Does Your PM2.5 Reading Mean? Official Bands: Normal, Elevated, High, Very High."
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: Interactive Category Bands Table */}
          <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
            {/* Live Indicator sync note */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between shadow-xs">
              <span className="text-xs font-semibold text-slate-600">
                Your selected region ({regionLabel}):
              </span>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl font-black text-[#102D50]">
                  {currentVal !== null ? `${currentVal} µg/m³` : '--'}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${currentCategory.badgeBg} ${currentCategory.badgeText}`}
                >
                  {currentCategory.descriptor}
                </span>
              </div>
            </div>

            {/* Category Cards with Active Highlight */}
            <div className="space-y-3">
              {categoryList.map((item) => {
                const isActive = currentCategory.descriptor === item.key;
                return (
                  <div
                    key={item.key}
                    className={`rounded-2xl p-4 sm:p-5 border-2 transition-all duration-300 relative ${
                      isActive
                        ? `bg-white ${item.colorClass} shadow-lg ring-2 ring-[#102D50]/20 scale-[1.01]`
                        : 'bg-white/90 border-slate-200 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute -top-3 right-4 bg-[#102D50] text-[#FFD34E] text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD34E] animate-ping" />
                        <span>Current Active Band</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-heading text-sm font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${item.badgeClass}`}
                        >
                          {item.key}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{item.band}</span>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-2xl font-black text-[#102D50]">
                          {item.range}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <span className="font-heading text-lg font-black text-[#102D50] uppercase tracking-wide block leading-snug">
                          {item.action}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note for vulnerable groups */}
            <div className="bg-[#102D50] text-white rounded-2xl p-4 sm:p-5 shadow-md flex items-start gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#D9272E] text-white flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-[#FFD34E] uppercase tracking-wider block">
                  Important: This scale is for healthy adults
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mt-1">
                  Children, older adults, pregnant women, and people with chronic heart or lung conditions need extra precautions at lower thresholds.
                </p>
                <div className="mt-3">
                  <a
                    href="#section-4"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                  >
                    <span>Next: Who needs to be more careful?</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
