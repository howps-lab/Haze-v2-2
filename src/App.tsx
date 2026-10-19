/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback } from 'react';
import { HazeReadingState, RegionKey } from './types/haze';
import { fetchLiveHazeData, formatObservationTime } from './services/hazeApi';
import { HeaderNav } from './components/HeaderNav';
import { StoryChapterProgress } from './components/StoryChapterProgress';
import { ShareModal } from './components/ShareModal';
import { FooterAttribution } from './components/FooterAttribution';
import { Section1Hero } from './components/sections/Section1Hero';
import { Section2GoingOut } from './components/sections/Section2GoingOut';
import { Section3ReadingMeaning } from './components/sections/Section3ReadingMeaning';
import { Section4ExtraCare } from './components/sections/Section4ExtraCare';
import { Section5N95Mask } from './components/sections/Section5N95Mask';
import { Section6WhatElse } from './components/sections/Section6WhatElse';
import { Section7ProtectLovedOnes } from './components/sections/Section7ProtectLovedOnes';
import { AlertTriangle, WifiOff, Loader2 } from 'lucide-react';

export default function App() {
  const [readingState, setReadingState] = useState<HazeReadingState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('overall');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(1);

  // Load air quality data
  const loadData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    }
    setError(null);

    try {
      const data = await fetchLiveHazeData();
      setReadingState(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to air quality feed';
      setError(msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch and 5-minute auto refresh interval
  useEffect(() => {
    loadData(false);

    const interval = setInterval(() => {
      loadData(false);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [loadData]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const match = id.match(/section-(\d+)/);
          if (match && match[1]) {
            setActiveSection(parseInt(match[1], 10));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    });

    const sectionElements = document.querySelectorAll('section[id^="section-"]');
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  // Smooth scroll handler
  const handleNavigateSection = (sectionIndex: number) => {
    const target = document.getElementById(`section-${sectionIndex}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#102D50] selection:bg-[#FFD34E] selection:text-[#102D50]">
      {/* Chapter Progress Indicator */}
      <StoryChapterProgress
        currentSection={activeSection}
        onNavigate={handleNavigateSection}
      />

      {/* Sticky Header Nav */}
      <HeaderNav
        readingState={readingState}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
        onRefresh={() => loadData(true)}
        isRefreshing={isRefreshing}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Stale or Error Notice Banner if official service had network hiccup */}
      {readingState?.status === 'stale' && (
        <div className="bg-amber-100 border-b border-amber-300 px-4 py-2 text-xs font-semibold text-amber-900 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Notice: Showing cached reading from {formatObservationTime(readingState.timestamp)}. Live feed reconnecting...
          </span>
          <button
            onClick={() => loadData(true)}
            className="underline hover:text-amber-950 font-bold ml-2 cursor-pointer"
          >
            Retry now
          </button>
        </div>
      )}

      {error && !readingState && (
        <div className="bg-rose-100 border-b border-rose-300 px-4 py-3 text-xs font-semibold text-rose-900 flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4 text-[#D9272E] shrink-0" />
          <span>
            Unable to connect to NEA official server ({error}). Please check your connection.
          </span>
          <button
            onClick={() => loadData(true)}
            className="underline hover:text-rose-950 font-bold ml-2 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Initial Loading Screen */}
      {isLoading && !readingState ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-200 mb-4 animate-bounce">
            <Loader2 className="w-8 h-8 text-[#D9272E] animate-spin" />
          </div>
          <h2 className="font-heading text-3xl font-black text-[#102D50] uppercase tracking-wide">
            Connecting to NEA Singapore...
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Retrieving the latest verified 1-hour PM2.5 readings and health advisories.
          </p>
        </div>
      ) : (
        <main className="flex-1 w-full">
          {/* Chapter 1: The Haze Is Back (Hero) */}
          <Section1Hero
            readingState={readingState}
            selectedRegion={selectedRegion}
            onRefresh={() => loadData(true)}
            isRefreshing={isRefreshing}
          />

          {/* Chapter 2: Going Out? Check This First */}
          <Section2GoingOut
            readingState={readingState}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            onRefresh={() => loadData(true)}
            isRefreshing={isRefreshing}
          />

          {/* Chapter 3: What Does Your PM2.5 Reading Mean? */}
          <Section3ReadingMeaning
            readingState={readingState}
            selectedRegion={selectedRegion}
          />

          {/* Chapter 4: Some People Need Extra Care */}
          <Section4ExtraCare
            readingState={readingState}
            selectedRegion={selectedRegion}
          />

          {/* Chapter 5: Do You Need an N95? Not Always */}
          <Section5N95Mask
            readingState={readingState}
            selectedRegion={selectedRegion}
          />

          {/* Chapter 6: What Else Can You Do? */}
          <Section6WhatElse />

          {/* Chapter 7: Protect the People You Love */}
          <Section7ProtectLovedOnes
            readingState={readingState}
            selectedRegion={selectedRegion}
            onOpenShare={() => setIsShareOpen(true)}
            onRefresh={() => loadData(true)}
            isRefreshing={isRefreshing}
          />
        </main>
      )}

      {/* Footer & Official NEA Attribution */}
      <FooterAttribution readingState={readingState} />

      {/* Interactive Share Modal */}
      <ShareModal
        readingState={readingState}
        selectedRegion={selectedRegion}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
