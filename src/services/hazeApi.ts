/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HazeReadingState, RegionData, RegionKey } from '../types/haze';

const STORAGE_KEY = 'sg_haze_last_reading_v1';
const API_URL = 'https://api.data.gov.sg/v1/environment/pm25';

interface NeaApiResponse {
  region_metadata: Array<{
    name: string;
    label_location: {
      latitude: number;
      longitude: number;
    };
  }>;
  items: Array<{
    timestamp: string;
    update_timestamp: string;
    readings: {
      pm25_one_hourly: Record<string, number>;
    };
  }>;
  api_info?: {
    status: string;
  };
}

export async function fetchLiveHazeData(): Promise<HazeReadingState> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(API_URL, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Official NEA API returned HTTP ${response.status}`);
    }

    const data: NeaApiResponse = await response.json();

    if (!data.items || data.items.length === 0 || !data.items[0].readings?.pm25_one_hourly) {
      throw new Error('Incomplete data payload received from official air quality feed');
    }

    const latestItem = data.items[0];
    const rawReadings = latestItem.readings.pm25_one_hourly;

    const metadataMap: Record<string, { latitude: number; longitude: number }> = {};
    if (data.region_metadata) {
      data.region_metadata.forEach((reg) => {
        metadataMap[reg.name.toLowerCase()] = reg.label_location;
      });
    }

    const regions: Record<RegionKey, RegionData> = {
      central: {
        key: 'central',
        label: 'Central',
        pm25: Number(rawReadings['central'] ?? 0),
        latitude: metadataMap['central']?.latitude ?? 1.35735,
        longitude: metadataMap['central']?.longitude ?? 103.82,
      },
      east: {
        key: 'east',
        label: 'East',
        pm25: Number(rawReadings['east'] ?? 0),
        latitude: metadataMap['east']?.latitude ?? 1.35735,
        longitude: metadataMap['east']?.longitude ?? 103.94,
      },
      north: {
        key: 'north',
        label: 'North',
        pm25: Number(rawReadings['north'] ?? 0),
        latitude: metadataMap['north']?.latitude ?? 1.41803,
        longitude: metadataMap['north']?.longitude ?? 103.82,
      },
      south: {
        key: 'south',
        label: 'South',
        pm25: Number(rawReadings['south'] ?? 0),
        latitude: metadataMap['south']?.latitude ?? 1.29587,
        longitude: metadataMap['south']?.longitude ?? 103.82,
      },
      west: {
        key: 'west',
        label: 'West',
        pm25: Number(rawReadings['west'] ?? 0),
        latitude: metadataMap['west']?.latitude ?? 1.35735,
        longitude: metadataMap['west']?.longitude ?? 103.7,
      },
      overall: {
        key: 'overall',
        label: 'Singapore (Max)',
        pm25: 0,
        latitude: 1.3521,
        longitude: 103.8198,
      },
    };

    // Compute max and dominant region
    const regionalValues = [
      { key: 'central' as RegionKey, val: regions.central.pm25 },
      { key: 'east' as RegionKey, val: regions.east.pm25 },
      { key: 'north' as RegionKey, val: regions.north.pm25 },
      { key: 'south' as RegionKey, val: regions.south.pm25 },
      { key: 'west' as RegionKey, val: regions.west.pm25 },
    ];

    regionalValues.sort((a, b) => b.val - a.val);
    const highest = regionalValues[0];

    regions.overall.pm25 = highest.val;

    const state: HazeReadingState = {
      timestamp: latestItem.timestamp,
      updateTimestamp: latestItem.update_timestamp,
      retrievedAt: Date.now(),
      regions,
      overallPm25: highest.val,
      dominantRegion: highest.key,
      status: 'healthy',
    };

    // Cache to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors in restricted contexts
    }

    return state;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to reach official air quality server';

    // Attempt to recover cached reading as stale state
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as HazeReadingState;
        return {
          ...parsed,
          status: 'stale',
          errorMessage: errorMsg,
        };
      }
    } catch {
      // Fall through to error state
    }

    throw new Error(errorMsg);
  }
}

/**
 * Format an ISO timestamp from Singapore NEA into human-readable Singapore local time.
 */
export function formatObservationTime(isoString: string): string {
  if (!isoString) return 'Observation unavailable';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    return new Intl.DateTimeFormat('en-SG', {
      timeZone: 'Asia/Singapore',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return isoString;
  }
}

/**
 * Calculates human-readable time since last data fetch (e.g., 'Just now', '2m ago')
 */
export function getRelativeTimeString(timestampMs: number): string {
  const diffSec = Math.floor((Date.now() - timestampMs) / 1000);
  if (diffSec < 20) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  return `${diffHours}h ago`;
}
