/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { SingaporeClock } from './SingaporeClock';
import { HazeReadingState } from '../types/haze';
import { formatObservationTime } from '../services/hazeApi';

interface FooterAttributionProps {
  readingState: HazeReadingState | null;
}

export const FooterAttribution: React.FC<FooterAttributionProps> = ({ readingState }) => {
  const obsTime = readingState ? formatObservationTime(readingState.timestamp) : 'Live';

  return (
    <footer className="bg-[#102D50] text-slate-300 py-12 px-4 sm:px-6 border-t border-navy-900">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Col 1: Branding & Public Service info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D9272E] to-[#FFD34E] flex items-center justify-center font-display text-white text-base font-black">
                SG
              </div>
              <span className="font-heading text-2xl font-black text-white tracking-wide">
                THE HAZE — SINGAPORE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              An illustrated public awareness campaign and real-time air quality monitor designed for Singapore residents, families, and outdoor enthusiasts.
            </p>
            <div className="pt-1">
              <SingaporeClock compact className="text-slate-200 bg-[#0C2340] border-slate-700" />
            </div>
          </div>

          {/* Col 2: Official Data Sources */}
          <div className="md:col-span-4 space-y-2">
            <span className="font-heading text-sm font-black text-white uppercase tracking-wider block">
              Official Data Attribution
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Air quality data is retrieved directly from the National Environment Agency (NEA) official open data services (<code className="text-slate-300 font-mono">api.data.gov.sg</code>).
            </p>
            <div className="space-y-1.5 pt-1">
              <a
                href="https://www.haze.gov.sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#FFD34E] hover:underline flex items-center gap-1"
              >
                <span>Haze.gov.sg (Official Portal)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.nea.gov.sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
              >
                <span>National Environment Agency (NEA)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.moh.gov.sg/resources-statistics/educational-resources/haze"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
              >
                <span>Ministry of Health (MOH) Haze Advisory</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 3: Timestamps & Integrity */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-heading text-sm font-black text-white uppercase tracking-wider block">
              Data Verification
            </span>
            <div className="bg-[#0C2340] p-3 rounded-xl border border-slate-700/60 text-xs space-y-1">
              <span className="text-[11px] text-slate-400 block">Latest NEA Observation:</span>
              <span className="font-bold text-white block">{obsTime}</span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Singapore NEA Scale</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider and disclaimer */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            Band 1 (0–55 µg/m³ Normal) • Band 2 (56–150 µg/m³ Elevated) • Band 3 (151–250 µg/m³ High) • Band 4 (251+ µg/m³ Very High).
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with care for Singapore</span>
            <Heart className="w-3 h-3 text-[#D9272E] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
