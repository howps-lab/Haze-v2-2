/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, CheckCircle, AlertTriangle, AlertOctagon, ExternalLink, RefreshCw } from 'lucide-react';
import { HazeReadingState, RegionKey } from '../../types/haze';
import { classifyPm25, getHeadlineForCategory } from '../../utils/hazeClassifier';
import { formatObservationTime, getRelativeTimeString } from '../../services/hazeApi';
import { SingaporeClock } from '../SingaporeClock';

interface Section1HeroProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Section1Hero: React.FC<Section1HeroProps> = ({
  readingState,
  selectedRegion,
  onRefresh,
  isRefreshing,
}) => {
  const currentVal = readingState ? readingState.regions[selectedRegion].pm25 : null;
  const category = classifyPm25(currentVal);
  const headlineInfo = getHeadlineForCategory(category.descriptor);
  const regionLabel = readingState?.regions[selectedRegion].label || 'Singapore (Max)';
  const obsTime = readingState ? formatObservationTime(readingState.timestamp) : 'Loading official feed...';
  const freshness = readingState ? getRelativeTimeString(readingState.retrievedAt) : '';

  return (
    <section
      id="section-1"
      className="relative min-h-[92vh] flex flex-col justify-between pt-6 pb-12 px-4 sm:px-6 overflow-hidden border-b border-navy-100 bg-[#FFF8F0]"
    >
      {/* Background ambient light */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 opacity-30 transition-colors duration-700"
        style={{ backgroundColor: category.glowColor }}
      />

      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Editorial Top Intro */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-navy-100 shadow-xs mb-3 text-xs font-bold text-[#102D50]">
            <span className="w-2 h-2 rounded-full bg-[#D9272E] animate-ping" />
            <span>Official NEA Real-Time Feed</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Chapter 1 of 7</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-[#102D50] uppercase tracking-tight leading-[0.95] mb-3">
            THE HAZE <span className="text-[#D9272E]">IS BACK</span>
          </h1>

          <p className="text-base sm:text-xl font-medium text-slate-700 leading-snug">
            {headlineInfo.subhead}
          </p>
        </div>

        {/* Hero Content Grid: Graphic on one side / Live prominent Air Quality Card on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-5xl mx-auto w-full mb-8">
          {/* Left: Illustrated Artwork Card (Preserves the official illustration) */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group max-w-sm sm:max-w-md w-full">
              <img
                src="/images/story01.png"
                alt="Singapore Haze Awareness Illustration - The Haze Is Back. Showing runners, school children, and elderly on Singapore Park Connector."
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#102D50] uppercase tracking-wide">
                  Singapore Clean Air Campaign
                </span>
                <span className="text-[10px] bg-[#102D50] text-[#FFD34E] font-bold px-2 py-0.5 rounded-full">
                  Official Guide
                </span>
              </div>
            </div>
          </div>

          {/* Right: Prominent Live Air Quality Display */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-4">
            {/* The Main Numerical Card */}
            <div
              className={`bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-3 transition-all duration-500 relative overflow-hidden ${category.cardBorder}`}
            >
              {/* Top Row: Region & Freshness */}
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    1-Hour PM2.5 •
                  </span>
                  <span className="text-xs font-extrabold text-[#102D50] uppercase">
                    {regionLabel}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{freshness ? `Updated ${freshness}` : 'Live'}</span>
                </div>
              </div>

              {/* Center Big Number */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 my-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-6xl sm:text-7xl md:text-8xl font-black text-[#102D50] leading-none tracking-tight">
                    {currentVal !== null ? currentVal : '--'}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-heading text-xl sm:text-2xl font-bold text-slate-500 leading-none">
                      µg/m³
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      1-hr concentration
                    </span>
                  </div>
                </div>

                {/* Big Category Badge */}
                <div className="flex flex-col items-start sm:items-end">
                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-base sm:text-lg font-heading font-black uppercase tracking-wider shadow-sm ${category.badgeBg} ${category.badgeText}`}
                  >
                    {category.descriptor === 'Normal' && <CheckCircle className="w-5 h-5" />}
                    {category.descriptor === 'Elevated' && <AlertTriangle className="w-5 h-5" />}
                    {(category.descriptor === 'High' || category.descriptor === 'Very High') && (
                      <AlertOctagon className="w-5 h-5" />
                    )}
                    {category.descriptor}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 mt-1">
                    Band {category.band} ({category.range})
                  </span>
                </div>
              </div>

              {/* Verified Health Recommendation */}
              <div className={`mt-4 p-3.5 rounded-2xl ${category.accentBg} border border-slate-200/80`}>
                <span className="text-[11px] font-bold text-[#102D50] uppercase tracking-wider block mb-1">
                  Immediate Advisory:
                </span>
                <p className="text-sm font-semibold text-[#102D50] leading-snug">
                  {category.generalAdvisory}
                </p>
              </div>

              {/* Observation Timestamp & Singapore Clock */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">
                    Latest Observation:
                  </span>
                  <span className="font-semibold text-slate-700">{obsTime}</span>
                </div>

                <div className="shrink-0">
                  <SingaporeClock compact className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200" />
                </div>
              </div>
            </div>

            {/* Quick Actions & Official Source */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#section-2"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#D9272E] hover:bg-[#b91c22] text-white font-heading text-lg sm:text-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Check Current Air Quality</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </a>

              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 text-[#102D50] ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh Reading</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>Source: National Environment Agency (NEA)</span>
              <a
                href="https://www.haze.gov.sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#102D50] font-semibold underline inline-flex items-center gap-1"
              >
                <span>Official haze.gov.sg</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="text-center mt-2">
          <a
            href="#section-2"
            className="inline-flex flex-col items-center gap-1 text-slate-500 hover:text-[#102D50] transition-colors group cursor-pointer"
          >
            <span className="text-xs font-bold tracking-wider uppercase group-hover:text-[#D9272E]">
              Scroll to explore what to do
            </span>
            <div className="w-6 h-9 rounded-full border-2 border-slate-300 group-hover:border-[#102D50] flex items-start justify-center p-1 transition-colors">
              <div className="w-1.5 h-2 rounded-full bg-[#D9272E] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
