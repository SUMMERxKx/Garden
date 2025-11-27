import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { WritingStats, PlantState } from './types'

describe('persistence', () => {
  beforeEach(() => {
    // Clear localStorage mock
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    ;(globalThis as any).localStorage = localStorageMock
  })

  it('can serialize and deserialize WritingStats', () => {
    const stats: WritingStats = {
      totalWordsToday: 100,
      sessionWords: 50,
      typingTimestamps: [1000, 2000, 3000],
      lastActivityAt: 3000,
    }

    const serialized = JSON.stringify(stats)
    const deserialized = JSON.parse(serialized) as WritingStats

    expect(deserialized.totalWordsToday).toBe(stats.totalWordsToday)
    expect(deserialized.sessionWords).toBe(stats.sessionWords)
    expect(deserialized.typingTimestamps).toEqual(stats.typingTimestamps)
    expect(deserialized.lastActivityAt).toBe(stats.lastActivityAt)
  })

  it('can serialize and deserialize PlantState', () => {
    const plant: PlantState = {
      stage: 'blooming',
      growthPoints: 1500,
      lastUpdatedAt: 1000,
    }

    const serialized = JSON.stringify(plant)
    const deserialized = JSON.parse(serialized) as PlantState

    expect(deserialized.stage).toBe(plant.stage)
    expect(deserialized.growthPoints).toBe(plant.growthPoints)
    expect(deserialized.lastUpdatedAt).toBe(plant.lastUpdatedAt)
  })
})

