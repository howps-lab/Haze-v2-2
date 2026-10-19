/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface SingaporeClockProps {
  compact?: boolean;
  className?: string;
}

export const SingaporeClock: React.FC<SingaporeClockProps> = ({ compact = false, className = '' }) => {
  const [timeState, setTimeState] = useState<{
    time: string;
    seconds: string;
    date: string;
  }>({
    time: '--:--',
    seconds: '--',
    date: 'Loading Singapore Time...',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeFormatter = new Intl.DateTimeFormat('en-SG', {
        timeZone: 'Asia/Singapore',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const secFormatter = new Intl.DateTimeFormat('en-SG', {
        timeZone: 'Asia/Singapore',
        second: '2-digit',
      });

      const dateFormatter = new Intl.DateTimeFormat('en-SG', {
        timeZone: 'Asia/Singapore',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      setTimeState({
        time: timeFormatter.format(now),
        seconds: secFormatter.format(now),
        date: dateFormatter.format(now),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs font-medium text-navy-800 ${className}`}>
        <Clock className="w-3.5 h-3.5 text-navy-600 animate-pulse" />
        <span className="font-semibold">{timeState.time}</span>
        <span className="text-[10px] text-gray-500 font-mono">:{timeState.seconds}</span>
        <span className="bg-navy-100 text-navy-700 text-[10px] px-1 py-0.2 rounded font-semibold ml-0.5">SGT</span>
      </div>
    );
  }

  return (
    <div
      className={`bg-white/90 backdrop-blur-sm border border-navy-100 rounded-xl px-3.5 py-2 shadow-xs inline-flex items-center gap-2.5 ${className}`}
      role="timer"
      aria-label="Singapore Standard Time"
    >
      <div className="w-7 h-7 rounded-lg bg-navy-50 flex items-center justify-center text-navy-700 shrink-0">
        <Clock className="w-4 h-4 text-[#102D50]" />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-base font-bold text-[#102D50] tracking-tight">
            {timeState.time}
          </span>
          <span className="font-mono text-xs text-navy-500 font-medium">
            :{timeState.seconds}
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#102D50] text-[#FFD34E] ml-1">
            SGT (UTC+8)
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
          {timeState.date}
        </span>
      </div>
    </div>
  );
};
