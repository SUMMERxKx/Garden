import type { WritingStats, ClimateState } from './types'
import { calculatePace, calculateIdleFraction } from './writingStats'

/**
 * Calculate climate state from writing stats, music intensity, and current time
 */
export function calculateClimateState(
  writingStats: WritingStats,
  musicIntensity: number, // 0-1 slider value
  now: number
): ClimateState {
  // Sunlight: based on total words written today (normalized)
  // Using a logarithmic scale so it doesn't require thousands of words
  const sunlightBase = Math.min(1, writingStats.totalWordsToday / 500)
  const sunlight = Math.min(1, sunlightBase + writingStats.sessionWords / 100)

  // Rain: directly from music intensity slider
  const rain = Math.max(0, Math.min(1, musicIntensity))

  // Wind: based on typing pace
  // Normalize pace: 0-100 WPM maps to 0-1 wind
  const pace = calculatePace(writingStats, now)
  const wind = Math.min(1, pace / 100)

  // Night: based on idle time
  const idleFraction = calculateIdleFraction(writingStats.lastActivityAt, now)
  const night = idleFraction

  return {
    sunlight: Math.max(0, Math.min(1, sunlight)),
    rain: Math.max(0, Math.min(1, rain)),
    wind: Math.max(0, Math.min(1, wind)),
    night: Math.max(0, Math.min(1, night)),
  }
}

