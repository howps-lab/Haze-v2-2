/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CategoryInfo, HazeBand, HazeCategory } from '../types/haze';

export const CATEGORIES: Record<HazeCategory, CategoryInfo> = {
  Normal: {
    band: 1,
    descriptor: 'Normal',
    range: '0 – 55 µg/m³',
    min: 0,
    max: 55,
    colorName: 'green',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    cardBorder: 'border-emerald-500',
    accentBg: 'bg-emerald-50',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    generalAdvisory: 'Normal activities can be continued.',
    vulnerableAdvisory: 'Normal activities can be continued.',
    walkingAdvisory: 'Safe for regular walking and commuting outdoors.',
    joggingAdvisory: 'Safe for outdoor jogging and running workouts.',
    cyclingAdvisory: 'Safe for road and leisure cycling.',
    playgroundAdvisory: 'Safe for children to play outdoors at parks and playgrounds.',
    maskRecommendation: 'No masks needed for outdoor activities in this range.',
  },
  Elevated: {
    band: 2,
    descriptor: 'Elevated',
    range: '56 – 150 µg/m³',
    min: 56,
    max: 150,
    colorName: 'amber',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-navy-900',
    cardBorder: 'border-amber-400',
    accentBg: 'bg-amber-50',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    generalAdvisory: 'Reduce prolonged or strenuous outdoor physical exertion.',
    vulnerableAdvisory: 'Avoid strenuous outdoor activity. Reduce prolonged outdoor time.',
    walkingAdvisory: 'Commuting and light walking are generally fine. Keep trips reasonable.',
    joggingAdvisory: 'Consider lowering intensity or shifting workout to an indoor gym.',
    cyclingAdvisory: 'Avoid intense sprint cycling; switch to casual pace or indoor spin.',
    playgroundAdvisory: 'Keep play sessions short or shift play to indoor spaces.',
    maskRecommendation: 'Generally not needed for short outdoor trips. Vulnerable persons or those doing prolonged outdoor work may consider N95 if advised.',
  },
  High: {
    band: 3,
    descriptor: 'High',
    range: '151 – 250 µg/m³',
    min: 151,
    max: 250,
    colorName: 'orange',
    badgeBg: 'bg-orange-600',
    badgeText: 'text-white',
    cardBorder: 'border-orange-500',
    accentBg: 'bg-orange-50',
    glowColor: 'rgba(234, 88, 12, 0.3)',
    generalAdvisory: 'Avoid strenuous outdoor physical exertion. Spend less time outdoors.',
    vulnerableAdvisory: 'Avoid all outdoor activity. Stay indoors with windows closed.',
    walkingAdvisory: 'Limit walking outdoors to necessary short errands and direct commutes.',
    joggingAdvisory: 'Do not jog outdoors. Work out indoors or do home stretches.',
    cyclingAdvisory: 'Avoid outdoor cycling. Use an indoor stationary trainer.',
    playgroundAdvisory: 'Keep children indoors. Avoid outdoor playgrounds entirely.',
    maskRecommendation: 'An N95 mask is recommended if you have prolonged outdoor exposure. Ensure a tight seal.',
  },
  'Very High': {
    band: 4,
    descriptor: 'Very High',
    range: '251 µg/m³ and above',
    min: 251,
    max: null,
    colorName: 'red',
    badgeBg: 'bg-red-600',
    badgeText: 'text-white',
    cardBorder: 'border-red-600',
    accentBg: 'bg-red-50',
    glowColor: 'rgba(220, 38, 38, 0.35)',
    generalAdvisory: 'Minimise outdoor activity. Stay indoors with clean air filtration.',
    vulnerableAdvisory: 'Minimise all outdoor exposure. Stay indoors with air purifier running.',
    walkingAdvisory: 'Avoid going outdoors unless absolutely essential.',
    joggingAdvisory: 'Strictly no outdoor workouts. Exercise gently indoors.',
    cyclingAdvisory: 'Strictly avoid outdoor cycling.',
    playgroundAdvisory: 'Keep all children indoors with closed windows.',
    maskRecommendation: 'Wear a properly fitted N95 mask if you must go outdoors. Avoid prolonged exposure.',
  },
};

/**
 * Classifies a numerical 1-hour PM2.5 reading into Singapore's official NEA categories.
 * Safe against NaN, null, undefined, negative numbers.
 */
export function classifyPm25(val: number | null | undefined): CategoryInfo {
  if (val === null || val === undefined || isNaN(val) || val < 0) {
    // Default safe fallback representation
    return CATEGORIES.Normal;
  }

  const rounded = Math.round(val);

  if (rounded <= 55) {
    return CATEGORIES.Normal;
  }
  if (rounded <= 150) {
    return CATEGORIES.Elevated;
  }
  if (rounded <= 250) {
    return CATEGORIES.High;
  }
  return CATEGORIES['Very High'];
}

/**
 * Returns human-readable contextual headline based on verified PM2.5 reading
 */
export function getHeadlineForCategory(cat: HazeCategory): {
  headline: string;
  subhead: string;
  badgeLabel: string;
} {
  switch (cat) {
    case 'Normal':
      return {
        headline: 'AIR QUALITY IS CURRENTLY IN THE NORMAL RANGE',
        subhead: 'Singapore air quality is currently good. Enjoy outdoor activities with peace of mind.',
        badgeLabel: 'Good Air Quality Today',
      };
    case 'Elevated':
      return {
        headline: 'HAZE READINGS ARE CURRENTLY ELEVATED',
        subhead: "Singapore's air quality has entered the Elevated range. Review guidance before heading outdoors.",
        badgeLabel: 'Elevated Haze Advisory',
      };
    case 'High':
      return {
        headline: 'AIR QUALITY HAS REACHED THE HIGH RANGE',
        subhead: 'Haze pollution is currently High. Reduce strenuous outdoor activities and protect loved ones.',
        badgeLabel: 'High Haze Alert',
      };
    case 'Very High':
      return {
        headline: 'HAZE WARNING: VERY HIGH AIR QUALITY READINGS',
        subhead: 'Singapore air quality is Very High. Minimise outdoor exposure and keep indoor air filtered.',
        badgeLabel: 'Very High Haze Warning',
      };
  }
}
