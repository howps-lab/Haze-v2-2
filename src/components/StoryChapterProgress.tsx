/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface StoryChapterProgressProps {
  currentSection: number;
  onNavigate: (sectionIndex: number) => void;
}

const CHAPTERS = [
  { id: 'section-1', number: 1, label: 'The Haze Is Back' },
  { id: 'section-2', number: 2, label: 'Going Out? Check This First' },
  { id: 'section-3', number: 3, label: 'What Does PM2.5 Mean?' },
  { id: 'section-4', number: 4, label: 'Some People Need Extra Care' },
  { id: 'section-5', number: 5, label: 'Do You Need an N95?' },
  { id: 'section-6', number: 6, label: 'What Else Can You Do?' },
  { id: 'section-7', number: 7, label: 'Protect The People You Love' },
];

export const StoryChapterProgress: React.FC<StoryChapterProgressProps> = ({
  currentSection,
  onNavigate,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = window.scrollY;
        setScrollProgress(Math.min(100, Math.max(0, (current / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top thin horizontal progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200/50">
        <div
          className="h-full bg-gradient-to-r from-[#D9272E] via-[#FFD34E] to-[#102D50] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating desktop right-hand chapter dots */}
      <nav
        aria-label="Story chapters"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-auto"
      >
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-slate-200/80 shadow-lg flex flex-col gap-2">
          {CHAPTERS.map((chap, idx) => {
            const isActive = currentSection === idx + 1;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => onNavigate(idx + 1)}
                className="group relative flex items-center justify-end cursor-pointer"
                aria-label={`Jump to Section ${chap.number}: ${chap.label}`}
              >
                {/* Tooltip on hover */}
                <span className="absolute right-7 py-1 px-2.5 rounded-lg bg-[#102D50] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                  {chap.number}. {chap.label}
                </span>

                <div
                  className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'w-7 h-7 bg-[#D9272E] text-white font-bold text-xs shadow-md scale-110'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-500 m-2.25'
                  }`}
                >
                  {isActive && <span>{chap.number}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
