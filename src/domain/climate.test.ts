import { describe, it, expect } from 'vitest'
import { calculateClimateState } from './climate'
import type { WritingStats } from './types'

describe('climate', () => {
  describe('calculateClimateState', () => {
    it('calculates climate from writing stats and music', () => {
      const stats: WritingStats = {
        totalWordsToday: 100,
        sessionWords: 50,
        typingTimestamps: [Date.now() - 1000, Date.now()],
        lastActivityAt: Date.now(),
      }

      const climate = calculateClimateState(stats, 0.5, Date.now())

      expect(climate.sunlight).toBeGreaterThanOrEqual(0)
      expect(climate.sunlight).toBeLessThanOrEqual(1)
      expect(climate.rain).toBe(0.5)
      expect(climate.wind).toBeGreaterThanOrEqual(0)
      expect(climate.wind).toBeLessThanOrEqual(1)
      expect(climate.night).toBe(0) // recently active
    })

    it('clamps all values between 0 and 1', () => {
      const stats: WritingStats = {
        totalWordsToday: 10000,
        sessionWords: 5000,
        typingTimestamps: Array(100).fill(Date.now()),
        lastActivityAt: Date.now(),
      }

      const climate = calculateClimateState(stats, 1.5, Date.now()) // music > 1

      expect(climate.sunlight).toBeLessThanOrEqual(1)
      expect(climate.rain).toBe(1) // clamped
      expect(climate.wind).toBeLessThanOrEqual(1)
      expect(climate.night).toBeLessThanOrEqual(1)
    })

    it('calculates night from idle time', () => {
      const stats: WritingStats = {
        totalWordsToday: 0,
        sessionWords: 0,
        typingTimestamps: [],
        lastActivityAt: Date.now() - 200000, // 200 seconds ago
      }

      const climate = calculateClimateState(stats, 0, Date.now())

      expect(climate.night).toBeGreaterThan(0)
      expect(climate.night).toBeLessThanOrEqual(1)
    })
  })
})

