/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, HeartPulse, Pill, Stethoscope, Baby, Heart, Shield } from 'lucide-react';
import { HazeReadingState, RegionKey } from '../../types/haze';
import { classifyPm25 } from '../../utils/hazeClassifier';

interface Section4ExtraCareProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
}

export const Section4ExtraCare: React.FC<Section4ExtraCareProps> = ({
  readingState,
  selectedRegion,
}) => {
  const currentVal = readingState ? readingState.regions[selectedRegion].pm25 : null;
  const category = classifyPm25(currentVal);

  const vulnerableGroups = [
    {
      title: 'CHILDREN',
      desc: 'Young children have faster breathing rates and developing lungs, absorbing more air per kilogram of body weight.',
      advice: 'Keep play indoors when haze levels rise. Ensure classrooms and bedrooms have closed windows.',
      color: 'bg-blue-600',
      icon: <Baby className="w-5 h-5 text-white" />,
    },
    {
      title: 'ELDERLY',
      desc: 'Older adults may have lower cardiovascular reserves and diminished respiratory defense mechanisms.',
      advice: 'Avoid morning exercises in open parks when PM2.5 is elevated. Stay in well-ventilated or air-conditioned rooms.',
      color: 'bg-emerald-600',
      icon: <Shield className="w-5 h-5 text-white" />,
    },
    {
      title: 'PREGNANT WOMEN',
      desc: 'Expectant mothers experience physiological changes in cardiac output and respiratory workload.',
      advice: 'Minimize exposure during smog or haze spikes. Rest indoors and stay well hydrated.',
      color: 'bg-purple-600',
      icon: <Heart className="w-5 h-5 text-white" />,
    },
    {
      title: 'HEART OR LUNG CONDITIONS',
      desc: 'Individuals with asthma, COPD, or ischemic heart disease are most sensitive to fine particulate matter.',
      advice: 'Carry relief inhalers and prescribed heart medicines at all times. Avoid all outdoor exertion.',
      color: 'bg-rose-600',
      icon: <HeartPulse className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section
      id="section-4"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-navy-100"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#D9272E] text-xs font-bold uppercase tracking-wider mb-2 border border-rose-200">
            <span>Chapter 4 of 7</span>
            <span className="text-slate-300">•</span>
            <span>Vulnerable Groups Advisory</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#102D50] uppercase tracking-tight leading-none mb-3">
            SOME PEOPLE <span className="text-[#D9272E]">NEED EXTRA CARE</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Certain individuals are more susceptible to air pollution and should take earlier precautions.
          </p>
        </div>

        {/* Dual Layout: Illustration 4 & Guidance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Illustration 4 */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 bg-[#FFF5E7] max-w-sm sm:max-w-md w-full sticky top-24">
              <img
                src="/images/story04.png"
                alt="Singapore Haze Awareness Illustration - Some People Need Extra Care: Children, Elderly, Pregnant Women, Heart or Lung Conditions."
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: Group Guidelines */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* When PM2.5 Rises guidance block */}
            <div className="bg-[#FFF8F0] rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-xs">
              <span className="text-xs font-extrabold text-[#102D50] uppercase tracking-wider block mb-2">
                Official Advisory for Vulnerable Persons:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">
                      When Elevated (56-150)
                    </span>
                  </div>
                  <p className="text-xs font-bold text-amber-950">
                    Avoid strenuous outdoor activity. Reduce prolonged time outside.
                  </p>
                </div>

                <div className="bg-rose-100/70 border border-rose-300 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase text-rose-900 bg-rose-200 px-2 py-0.5 rounded-md">
                      When High / Very High (151+)
                    </span>
                  </div>
                  <p className="text-xs font-bold text-rose-950">
                    Avoid outdoor activity. Stay indoors with air filtration on.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Vulnerable Group Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {vulnerableGroups.map((group) => (
                <div
                  key={group.title}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${group.color} flex items-center justify-center shrink-0 shadow-xs`}>
                      {group.icon}
                    </div>
                    <span className="font-heading text-lg font-black text-[#102D50] tracking-wide uppercase">
                      {group.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">
                    {group.desc}
                  </p>
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <span className="text-[11px] font-bold text-[#102D50] block">Precaution:</span>
                    <span className="text-xs text-slate-700 font-medium leading-snug">
                      {group.advice}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Medication & Doctor Callout */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#102D50]/15 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-heading text-base font-black text-[#102D50] uppercase tracking-wide block">
                    Keep Prescribed Medication Readily Available
                  </span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    If you or your family members have asthma or chronic bronchitis, ensure quick-relief inhalers (e.g. Salbutamol) are not expired and kept within reach.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#D9272E] flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-heading text-base font-black text-[#D9272E] uppercase tracking-wide block">
                    Feeling Unwell? Seek Medical Attention
                  </span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    If you experience persistent chest tightness, severe breathlessness, wheezing, or dizziness, visit a polyclinic or nearest GP clinic promptly.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Chapter Link */}
            <div className="pt-1">
              <a
                href="#section-5"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#102D50] hover:text-[#D9272E] transition-colors group cursor-pointer"
              >
                <span>Next: Do you need an N95 mask?</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
