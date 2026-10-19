/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RefreshCw, Share2, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { HazeReadingState, RegionKey } from '../types/haze';
import { classifyPm25 } from '../utils/hazeClassifier';
import { SingaporeClock } from './SingaporeClock';
import { getRelativeTimeString } from '../services/hazeApi';

interface HeaderNavProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
  onSelectRegion: (reg: RegionKey) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenShare: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  readingState,
  selectedRegion,
  onSelectRegion,
  onRefresh,
  isRefreshing,
  onOpenShare,
}) => {
  const currentPm25 = readingState ? readingState.regions[selectedRegion].pm25 : null;
  const category = classifyPm25(currentPm25);
  const relativeUpdate = readingState ? getRelativeTimeString(readingState.retrievedAt) : '';

  return (
    <header className="sticky top-0 z-40 bg-[#102D50]/95 backdrop-blur-md text-white border-b border-navy-800 shadow-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <a
          href="#section-1"
          className="flex items-center gap-2 group text-decoration-none shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D9272E] to-[#FFD34E] flex items-center justify-center shadow-xs">
            <span className="font-display text-white text-base font-black leading-none">SG</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading text-lg sm:text-xl font-black tracking-wider leading-none text-[#FFF5E7] group-hover:text-[#FFD34E] transition-colors">
              THE HAZE
            </span>
            <span className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider leading-none mt-0.5">
              Singapore Real-Time
            </span>
          </div>
        </a>

        {/* Center Live Pill & Singapore Clock */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Region Switcher dropdown */}
          <div className="flex items-center bg-[#0C2340] rounded-xl px-2.5 py-1 border border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 mr-1.5 uppercase">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => onSelectRegion(e.target.value as RegionKey)}
              aria-label="Select monitoring region"
              className="bg-transparent text-xs font-bold text-white border-none focus:outline-none cursor-pointer"
            >
              <option value="overall" className="bg-[#102D50] text-white">Singapore (Max)</option>
              <option value="central" className="bg-[#102D50] text-white">Central</option>
              <option value="east" className="bg-[#102D50] text-white">East</option>
              <option value="north" className="bg-[#102D50] text-white">North</option>
              <option value="south" className="bg-[#102D50] text-white">South</option>
              <option value="west" className="bg-[#102D50] text-white">West</option>
            </select>
          </div>

          {/* Live PM2.5 mini badge */}
          {currentPm25 !== null && (
            <div className="flex items-center gap-2 bg-[#0C2340] rounded-xl px-3 py-1 border border-slate-700/60">
              <span className="text-xs text-slate-300 font-medium">1-hr PM2.5:</span>
              <span className="font-heading text-lg font-black text-white leading-none">
                {currentPm25}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">µg/m³</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${category.badgeBg} ${category.badgeText}`}
              >
                {category.descriptor}
              </span>
            </div>
          )}

          {/* Singapore Clock */}
          <div className="bg-[#0C2340] rounded-xl px-2.5 py-1 border border-slate-700/60">
            <SingaporeClock compact className="text-slate-200" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title={relativeUpdate ? `Last updated ${relativeUpdate}` : 'Refresh readings'}
            aria-label="Refresh latest readings from NEA"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0C2340] hover:bg-[#163861] border border-slate-700/60 text-slate-200 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#FFD34E] ${isRefreshing ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={onOpenShare}
            aria-label="Share haze guide"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#D9272E] hover:bg-[#b91c22] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Official Link */}
          <a
            href="https://www.haze.gov.sg/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit official Haze.gov.sg website"
            className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white text-xs font-semibold px-2 py-1.5 transition-colors"
          >
            <span>haze.gov.sg</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Mobile subheader with region and Singapore clock */}
      <div className="md:hidden bg-[#0C2340] px-3 py-1.5 border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <select
            value={selectedRegion}
            onChange={(e) => onSelectRegion(e.target.value as RegionKey)}
            aria-label="Select region"
            className="bg-transparent text-xs font-bold text-white border-b border-slate-600 focus:outline-none cursor-pointer"
          >
            <option value="overall" className="bg-[#102D50] text-white">SG (Max)</option>
            <option value="central" className="bg-[#102D50] text-white">Central</option>
            <option value="east" className="bg-[#102D50] text-white">East</option>
            <option value="north" className="bg-[#102D50] text-white">North</option>
            <option value="south" className="bg-[#102D50] text-white">South</option>
            <option value="west" className="bg-[#102D50] text-white">West</option>
          </select>
          {currentPm25 !== null && (
            <span className="font-heading font-black text-sm text-[#FFD34E]">
              {currentPm25} µg/m³ ({category.descriptor})
            </span>
          )}
        </div>
        <SingaporeClock compact className="text-slate-300 text-[11px]" />
      </div>
    </header>
  );
};
