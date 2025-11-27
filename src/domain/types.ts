/**
 * Core domain types for Garden of Words
 */

export interface WritingStats {
  totalWordsToday: number
  sessionWords: number
  typingTimestamps: number[]
  lastActivityAt: number
}

export interface ClimateState {
  sunlight: number // 0-1 normalized
  rain: number // 0-1 normalized
  wind: number // 0-1 normalized
  night: number // 0-1 normalized
}

export type PlantStage = 'seed' | 'sprout' | 'stem' | 'smallPlant' | 'blooming' | 'mature'

export interface PlantState {
  stage: PlantStage
  growthPoints: number
  lastUpdatedAt: number
}

