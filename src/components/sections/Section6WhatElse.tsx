/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Home, Dumbbell, AirVent, Stethoscope, Pill, AlertTriangle } from 'lucide-react';

export const Section6WhatElse: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'CUT DOWN OUTDOOR TIME',
      desc: 'Postpone unnecessary outings or social gatherings outdoors when air pollution readings spike.',
      quote: '“Maybe another day! It’s safer indoors!”',
      icon: <Home className="w-5 h-5 text-white" />,
      color: 'bg-orange-500',
    },
    {
      num: 2,
      title: 'MOVE ACTIVITIES INDOORS',
      desc: 'Swap long park runs and sports matches for home yoga, indoor cycling, or gym routines.',
      quote: '“Too hazy outside today. Let’s do a workout indoors!”',
      icon: <Dumbbell className="w-5 h-5 text-white" />,
      color: 'bg-blue-600',
    },
    {
      num: 3,
      title: 'KEEP INDOOR AIR CLEAN',
      desc: 'Shut windows and balcony sliding doors. Run air conditioning or a portable HEPA air purifier to clear particulates.',
      quote: '“Close doors and windows, and turn on the air purifier.”',
      icon: <AirVent className="w-5 h-5 text-white" />,
      color: 'bg-emerald-600',
    },
    {
      num: 4,
      title: 'PAY ATTENTION TO YOUR BODY',
      desc: 'Watch out for throat irritation, watery eyes, coughing, or shortness of breath. Rest and drink plenty of water.',
      quote: '“Feeling unwell? Reduce exposure and seek medical care promptly.”',
      icon: <Stethoscope className="w-5 h-5 text-white" />,
      color: 'bg-purple-600',
    },
  ];

  return (
    <section
      id="section-6"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-navy-100"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-[#102D50] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Chapter 6 of 7</span>
            <span className="text-slate-300">•</span>
            <span>Practical Exposure Reduction</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#102D50] uppercase tracking-tight leading-none mb-3">
            WHAT ELSE <span className="text-[#D9272E]">CAN YOU DO?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Simple, actionable ways to protect your health and minimize haze exposure at home and at work.
          </p>
        </div>

        {/* Dual Layout: Illustration 6 & 4 Numbered Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Illustration 6 */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 bg-[#FFF5E7] max-w-sm sm:max-w-md w-full sticky top-24">
              <img
                src="/images/story06.png"
                alt="Singapore Haze Awareness Illustration - What Else Can You Do? 4 Steps: Cut down outdoor time, Move activities indoors, Keep indoor air clean, Pay attention to your body."
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: 4 Numbered Steps Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="bg-[#FFF8F0] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className={`w-8 h-8 rounded-full ${st.color} flex items-center justify-center font-heading text-lg font-black shadow-xs`}>
                        {st.num}
                      </div>
                      <span className="font-heading text-lg font-black text-[#102D50] uppercase tracking-wide">
                        {st.title}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-3">
                      {st.desc}
                    </p>
                  </div>

                  <div className="bg-white/80 rounded-xl p-2.5 border border-slate-200/60 text-xs italic text-slate-700 font-semibold">
                    {st.quote}
                  </div>
                </div>
              ))}
            </div>

            {/* Inhaler & Chronic Conditions Banner */}
            <div className="bg-rose-50 rounded-2xl p-4 sm:p-5 border border-rose-200 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9272E] text-white flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading text-lg font-black text-[#D9272E] uppercase tracking-wide block">
                  Heart or Lung Condition?
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mt-0.5">
                  Keep your necessary prescription inhalers and medications readily available. If you experience shortness of breath, consult your family doctor early.
                </p>
              </div>
            </div>

            {/* Bottom Reminder Pill */}
            <div className="bg-[#102D50] text-[#FFD34E] rounded-2xl p-4 text-center shadow-md">
              <span className="font-heading text-lg sm:text-xl font-black uppercase tracking-wider block">
                WHEN IN DOUBT, SPEND LESS TIME IN THE HAZE.
              </span>
              <span className="text-xs text-slate-200 font-medium mt-0.5 block">
                Cleaner air starts with small, sensible choices for you and your family.
              </span>
            </div>

            {/* Next Chapter Link */}
            <div className="pt-1">
              <a
                href="#section-7"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#102D50] hover:text-[#D9272E] transition-colors group cursor-pointer"
              >
                <span>Next: Protect the people you love</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
