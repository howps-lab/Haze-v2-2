/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Footprints, Bike, Flame, Baby, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { CategoryInfo, HazeCategory } from '../types/haze';

interface ActivityGuidanceProps {
  category: CategoryInfo;
  currentPm25: number;
  className?: string;
}

type ActivityId = 'walking' | 'jogging' | 'cycling' | 'playground';

export const ActivityGuidance: React.FC<ActivityGuidanceProps> = ({
  category,
  currentPm25,
  className = '',
}) => {
  const [activeActivity, setActiveActivity] = useState<ActivityId>('walking');

  const activities: Array<{
    id: ActivityId;
    title: string;
    icon: React.ReactNode;
    color: string;
    sublabel: string;
  }> = [
    {
      id: 'walking',
      title: 'WALKING',
      icon: <Footprints className="w-5 h-5" />,
      color: 'bg-[#15803d]',
      sublabel: 'Light commute & errands',
    },
    {
      id: 'jogging',
      title: 'JOGGING',
      icon: <Flame className="w-5 h-5" />,
      color: 'bg-[#ea580c]',
      sublabel: 'Running & high exertion',
    },
    {
      id: 'cycling',
      title: 'CYCLING',
      icon: <Bike className="w-5 h-5" />,
      color: 'bg-[#0284c7]',
      sublabel: 'Commuting & road bikes',
    },
    {
      id: 'playground',
      title: 'PLAYGROUND',
      icon: <Baby className="w-5 h-5" />,
      color: 'bg-[#7c3aed]',
      sublabel: 'Children & outdoor play',
    },
  ];

  const getActivityStatus = (id: ActivityId, cat: HazeCategory) => {
    switch (cat) {
      case 'Normal':
        return {
          status: 'Safe',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
          recommendation: category.walkingAdvisory,
          details: 'Air quality is within healthy limits. No restrictions for this activity.',
        };
      case 'Elevated':
        if (id === 'walking') {
          return {
            status: 'Generally Safe',
            badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
            icon: <CheckCircle className="w-4 h-4 text-amber-600" />,
            recommendation: 'Normal walking is fine. Keep trips reasonable.',
            details: 'Healthy individuals can walk and commute normally. Stay hydrated.',
          };
        }
        if (id === 'jogging') {
          return {
            status: 'Reduce Exertion',
            badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
            icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
            recommendation: 'Reduce pace or move workout to an indoor gym.',
            details: 'Heavy breathing draws particles deeper into lungs. Lower your tempo.',
          };
        }
        if (id === 'cycling') {
          return {
            status: 'Moderate Pace',
            badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
            icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
            recommendation: 'Avoid strenuous sprints. Casual commuting is fine.',
            details: 'Consider an indoor spin trainer if planning a long ride.',
          };
        }
        return {
          status: 'Limit Play Time',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          recommendation: 'Limit outdoor playground time for children.',
          details: 'Children breathe faster than adults; consider indoor play alternatives.',
        };

      case 'High':
        if (id === 'walking') {
          return {
            status: 'Short Trips Only',
            badgeClass: 'bg-orange-100 text-orange-800 border-orange-400',
            icon: <AlertTriangle className="w-4 h-4 text-orange-600" />,
            recommendation: 'Limit walking to essential short trips (e.g. to MRT station).',
            details: 'Avoid taking scenic or prolonged outdoor strolls.',
          };
        }
        if (id === 'jogging') {
          return {
            status: 'Avoid Outdoor Run',
            badgeClass: 'bg-red-100 text-red-800 border-red-400',
            icon: <XCircle className="w-4 h-4 text-red-600" />,
            recommendation: 'Do NOT jog outdoors. Switch to indoor treadmill or bodyweight exercises.',
            details: 'Strenuous activity during high haze significantly increases respiratory distress.',
          };
        }
        if (id === 'cycling') {
          return {
            status: 'Avoid Cycling',
            badgeClass: 'bg-red-100 text-red-800 border-red-400',
            icon: <XCircle className="w-4 h-4 text-red-600" />,
            recommendation: 'Avoid outdoor cycling workouts.',
            details: 'High physical exertion increases intake of fine PM2.5 particulates.',
          };
        }
        return {
          status: 'Avoid Playground',
          badgeClass: 'bg-red-100 text-red-800 border-red-400',
          icon: <XCircle className="w-4 h-4 text-red-600" />,
          recommendation: 'Strictly keep children indoors with air cleaner on.',
          details: 'Do not visit outdoor playgrounds while readings remain in High band.',
        };

      case 'Very High':
        return {
          status: 'Minimise Outdoors',
          badgeClass: 'bg-red-200 text-red-900 border-red-500 font-black',
          icon: <XCircle className="w-4 h-4 text-red-700" />,
          recommendation: 'Minimise or avoid outdoor exposure completely.',
          details: 'Air pollution is at hazardous levels. Stay indoors and keep doors/windows shut.',
        };
    }
  };

  const currentStatus = getActivityStatus(activeActivity, category.descriptor);

  return (
    <div className={`w-full ${className}`}>
      {/* 4 Interactive Buttons Matching Illustration 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        {activities.map((act) => {
          const isSelected = activeActivity === act.id;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => setActiveActivity(act.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-full font-heading text-sm font-bold tracking-wider uppercase transition-all cursor-pointer shadow-xs border ${
                isSelected
                  ? `${act.color} text-white shadow-md scale-[1.03] ring-2 ring-navy-900/30 border-transparent`
                  : 'bg-white hover:bg-slate-50 text-navy-800 border-slate-200'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {act.icon}
              </div>
              <span className="truncate">{act.title}</span>
            </button>
          );
        })}
      </div>

      {/* Advisory card for the selected activity */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-navy-100 shadow-sm transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl sm:text-2xl font-black text-[#102D50] tracking-tight uppercase">
              {activities.find((a) => a.id === activeActivity)?.title} ADVISORY
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              (at {currentPm25} µg/m³)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentStatus.badgeClass}`}
            >
              {currentStatus.icon}
              {currentStatus.status}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base font-semibold text-[#102D50] mb-2 leading-relaxed">
          {currentStatus.recommendation}
        </p>

        <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>{currentStatus.details}</span>
        </div>
      </div>
    </div>
  );
};
