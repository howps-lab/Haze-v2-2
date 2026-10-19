/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, Wind, Train } from 'lucide-react';
import { HazeReadingState, RegionKey } from '../../types/haze';
import { classifyPm25 } from '../../utils/hazeClassifier';

interface Section5N95MaskProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
}

export const Section5N95Mask: React.FC<Section5N95MaskProps> = ({
  readingState,
  selectedRegion,
}) => {
  const currentVal = readingState ? readingState.regions[selectedRegion].pm25 : null;
  const category = classifyPm25(currentVal);

  return (
    <section
      id="section-5"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FFF8F0] border-b border-navy-100"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#102D50] text-xs font-bold uppercase tracking-wider mb-2 border border-slate-200">
            <span>Chapter 5 of 7</span>
            <span className="text-slate-300">•</span>
            <span>Mask & Protection Guide</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#102D50] uppercase tracking-tight leading-none mb-3">
            DO YOU NEED AN N95? <span className="text-[#D9272E]">NOT ALWAYS.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            For short periods outdoors, such as commuting, an N95 mask is generally not needed.
          </p>
        </div>

        {/* Dual Layout: Illustration 5 & Mask Advisory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Illustration 5 */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white max-w-sm sm:max-w-md w-full sticky top-24">
              <img
                src="/images/story05.png"
                alt="Singapore Haze Awareness Illustration - Do You Need an N95? Not Always. Short trips vs Longer exposure."
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: Detailed Comparison Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
            {/* Current Reading Context Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Current Air Quality Reading:
                </span>
                <span className="font-heading text-2xl font-black text-[#102D50]">
                  {currentVal !== null ? `${currentVal} µg/m³` : '--'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-500 block">N95 Recommendation:</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#102D50]">
                  {category.maskRecommendation}
                </span>
              </div>
            </div>

            {/* Short Trip vs Longer Exposure Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Short Trip */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-500/30 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Train className="w-4 h-4" />
                    </div>
                    <span className="font-heading text-lg font-black text-emerald-800 uppercase tracking-wide">
                      Short Trip Outdoors
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Walking to the MRT / Bus Stop</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Going to school or office</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Running short neighborhood errands</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-emerald-900">
                    N95 generally not needed for short exposure.
                  </span>
                </div>
              </div>

              {/* Longer Outdoor Exposure */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-500/30 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Wind className="w-4 h-4" />
                    </div>
                    <span className="font-heading text-lg font-black text-amber-900 uppercase tracking-wide">
                      Longer Exposure
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium mb-4">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Spending several hours outdoors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Outdoor manual work or events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Prolonged outdoor sports/training</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span className="text-xs font-bold text-amber-950">
                    Check latest haze guidance; consider N95 if High.
                  </span>
                </div>
              </div>
            </div>

            {/* What About Children Box */}
            <div className="bg-rose-50 rounded-2xl p-4 sm:p-5 border border-rose-200 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-[#D9272E]" />
                <span className="font-heading text-lg font-black text-[#D9272E] uppercase tracking-wide">
                  What About Children?
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Adult N95 masks do not fit children’s facial contours properly. Gaps break the airtight seal, allowing unfiltered air to bypass the filter. Because N95 masks also increase breathing resistance, authorities recommend keeping children indoors rather than relying on masks.
              </p>
            </div>

            {/* Core Principle Banner */}
            <div className="bg-[#102D50] text-white rounded-2xl p-4 sm:p-5 shadow-sm flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#FFD34E] shrink-0 mt-0.5" />
              <div>
                <span className="font-heading text-base font-black text-[#FFD34E] uppercase tracking-wide block">
                  Masks Are Only One Part of Protection
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mt-0.5">
                  Reducing unnecessary outdoor exposure and keeping indoor spaces sealed and clean is far more effective than just wearing a mask.
                </p>
              </div>
            </div>

            {/* Next Chapter Link */}
            <div className="pt-1">
              <a
                href="#section-6"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#102D50] hover:text-[#D9272E] transition-colors group cursor-pointer"
              >
                <span>Next: Practical steps you can take</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
