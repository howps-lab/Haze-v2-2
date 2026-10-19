/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RegionKey = 'overall' | 'central' | 'east' | 'north' | 'south' | 'west';

export type HazeBand = 1 | 2 | 3 | 4;

export type HazeCategory = 'Normal' | 'Elevated' | 'High' | 'Very High';

export interface CategoryInfo {
  band: HazeBand;
  descriptor: HazeCategory;
  range: string;
  min: number;
  max: number | null;
  colorName: 'green' | 'amber' | 'orange' | 'red';
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
  accentBg: string;
  glowColor: string;
  generalAdvisory: string;
  vulnerableAdvisory: string;
  walkingAdvisory: string;
  joggingAdvisory: string;
  cyclingAdvisory: string;
  playgroundAdvisory: string;
  maskRecommendation: string;
}

export interface RegionData {
  key: RegionKey;
  label: string;
  pm25: number;
  latitude: number;
  longitude: number;
}

export interface HazeReadingState {
  timestamp: string; // ISO string from NEA
  updateTimestamp: string;
  retrievedAt: number; // local Date.now()
  regions: Record<RegionKey, RegionData>;
  overallPm25: number;
  dominantRegion: RegionKey;
  status: 'healthy' | 'stale' | 'offline' | 'error';
  isFallback?: boolean;
  errorMessage?: string;
}

export interface ActivityDetail {
  id: 'walking' | 'jogging' | 'cycling' | 'playground';
  name: string;
  iconName: string;
  intensity: 'light' | 'moderate' | 'strenuous';
  description: string;
}
