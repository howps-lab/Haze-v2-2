/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Share2, ArrowUp, ExternalLink, Heart, Shield, RefreshCw } from 'lucide-react';
import { HazeReadingState, RegionKey } from '../../types/haze';
import { classifyPm25 } from '../../utils/hazeClassifier';
import { formatObservationTime } from '../../services/hazeApi';

interface Section7ProtectLovedOnesProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
  onOpenShare: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Section7ProtectLovedOnes: React.FC<Section7ProtectLovedOnesProps> = ({
  readingState,
  selectedRegion,
  onOpenShare,
  onRefresh,
  isRefreshing,
}) => {
  const currentVal = readingState ? readingState.regions[selectedRegion].pm25 : null;
  const category = classifyPm25(currentVal);
  const regionLabel = readingState?.regions[selectedRegion].label || 'Singapore (Max)';
  const obsTime = readingState ? formatObservationTime(readingState.timestamp) : 'Live';

  return (
    <section
      id="section-7"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FFF8F0] border-b border-navy-100"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#D9272E] text-xs font-bold uppercase tracking-wider mb-2 border border-rose-200">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Chapter 7 of 7</span>
            <span className="text-slate-300">•</span>
            <span>Community Care & Action</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#102D50] uppercase tracking-tight leading-none mb-3">
            PROTECT THE <span className="text-[#D9272E]">PEOPLE YOU LOVE</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Haze conditions can change throughout the day. Looking out for one another keeps Singapore healthy and resilient.
          </p>
        </div>

        {/* Dual Layout: Illustration 7 & Family Protection Callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left: Illustration 7 */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white max-w-sm sm:max-w-md w-full sticky top-24">
              <img
                src="/images/story07.png"
                alt="Singapore Haze Awareness Illustration - Protect The People You Love. Multi-generational family together at home, looking out for one another."
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: Key Precautions Summary & Big Share CTA */}
          <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
            {/* 3 Core Habits Cards matching Illustration 7 top cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs text-center flex flex-col items-center">
                <span className="font-heading text-xs font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mb-1">
                  Going Out?
                </span>
                <p className="text-xs font-bold text-[#102D50] leading-snug">
                  Check latest 1-hour PM2.5
                </p>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs text-center flex flex-col items-center">
                <span className="font-heading text-xs font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mb-1">
                  Readings Rising?
                </span>
                <p className="text-xs font-bold text-[#102D50] leading-snug">
                  Reduce outdoor exposure
                </p>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs text-center flex flex-col items-center">
                <span className="font-heading text-xs font-black uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full mb-1">
                  Vulnerable Kin?
                </span>
                <p className="text-xs font-bold text-[#102D50] leading-snug">
                  Take extra precautions
                </p>
              </div>
            </div>

            {/* Live Reading Summary Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#102D50]/10 shadow-md">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Summary for {regionLabel}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Observed: {obsTime}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-5xl font-black text-[#102D50] leading-none">
                    {currentVal !== null ? currentVal : '--'}
                  </span>
                  <span className="text-xs font-bold text-slate-500">µg/m³ PM2.5</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-black uppercase ${category.badgeBg} ${category.badgeText}`}
                  >
                    {category.descriptor}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#D9272E] ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Update Reading</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-3 leading-relaxed">
                Remember that haze concentrations can vary between Singapore’s East, West, North, South, and Central zones. Keep checking before outdoor plans.
              </p>
            </div>

            {/* Big Prominent Share Button matching illustration 7 banner */}
            <button
              type="button"
              onClick={onOpenShare}
              className="w-full flex items-center justify-center gap-3 py-4 sm:py-5 px-6 rounded-3xl bg-gradient-to-r from-[#D9272E] to-[#e11d48] hover:from-[#b91c22] hover:to-[#be123c] text-white font-heading text-xl sm:text-2xl font-black uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="block leading-tight">SHARE THIS WITH SOMEONE YOU CARE ABOUT</span>
                <span className="block text-xs font-normal normal-case opacity-90">
                  It might help them stay safer during the haze
                </span>
              </div>
            </button>

            {/* Reassuring Community Quote */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center">
              <span className="text-xs sm:text-sm font-bold text-emerald-900 block">
                “Stay informed. Take care of one another. Cleaner Air, Brighter Lives.” ♡
              </span>
              <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                Singapore National Haze Awareness Initiative
              </span>
            </div>

            {/* Action Buttons: Back to top & Official Link */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="#section-1"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-[#102D50] font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 text-[#D9272E]" />
                <span>Back to Current Reading</span>
              </a>

              <a
                href="https://www.haze.gov.sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#102D50] hover:bg-[#163861] text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
              >
                <span>Visit Official Haze.gov.sg</span>
                <ExternalLink className="w-4 h-4 text-[#FFD34E]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
