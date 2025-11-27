import { describe, it, expect } from 'vitest'
import {
  countWords,
  calculateWritingStats,
  calculatePace,
  calculateIdleFraction,
} from './writingStats'
import type { WritingStats } from './types'

describe('writingStats', () => {
  describe('countWords', () => {
    it('counts words correctly', () => {
      expect(countWords('hello world')).toBe(2)
      expect(countWords('one two three')).toBe(3)
      expect(countWords('')).toBe(0)
      expect(countWords('   ')).toBe(0)
      expect(countWords('single')).toBe(1)
    })
  })

  describe('calculateWritingStats', () => {
    it('calculates stats for new text', () => {
      const previous: WritingStats = {
        totalWordsToday: 0,
        sessionWords: 0,
        typingTimestamps: [],
        lastActivityAt: 1000,
      }

      const result = calculateWritingStats(previous, 'hello world', 2000)

      expect(result.sessionWords).toBe(2)
      expect(result.totalWordsToday).toBe(2)
      expect(result.lastActivityAt).toBe(2000)
      expect(result.typingTimestamps.length).toBe(1)
    })

    it('tracks incremental word additions', () => {
      const previous: WritingStats = {
        totalWordsToday: 5,
        sessionWords: 2,
        typingTimestamps: [1000],
        lastActivityAt: 1000,
      }

      const result = calculateWritingStats(previous, 'hello world test', 2000)

      expect(result.sessionWords).toBe(3)
      expect(result.totalWordsToday).toBe(6) // 5 + 1 new word
      expect(result.typingTimestamps.length).toBe(2)
    })

    it('does not add timestamp when word count decreases', () => {
      const previous: WritingStats = {
        totalWordsToday: 5,
        sessionWords: 3,
        typingTimestamps: [1000],
        lastActivityAt: 1000,
      }

      const result = calculateWritingStats(previous, 'hello', 2000)

      expect(result.sessionWords).toBe(1)
      expect(result.totalWordsToday).toBe(5) // no change
      expect(result.typingTimestamps.length).toBe(1) // no new timestamp
    })
  })

  describe('calculatePace', () => {
    it('returns 0 for insufficient data', () => {
      const stats: WritingStats = {
        totalWordsToday: 0,
        sessionWords: 0,
        typingTimestamps: [],
        lastActivityAt: 1000,
      }

      expect(calculatePace(stats, 2000)).toBe(0)
    })

    it('calculates pace from recent timestamps', () => {
      const now = 60000
      const stats: WritingStats = {
        totalWordsToday: 0,
        sessionWords: 0,
        typingTimestamps: [0, 10000, 20000, 30000, 40000, 50000],
        lastActivityAt: 50000,
      }

      const pace = calculatePace(stats, now, 60)
      expect(pace).toBeGreaterThan(0)
    })
  })

  describe('calculateIdleFraction', () => {
    it('returns 0 for recent activity', () => {
      const now = 1000
      expect(calculateIdleFraction(900, now, 300)).toBeCloseTo(0, 2)
    })

    it('returns 1 for very idle time', () => {
      const now = 400000 // 400 seconds
      expect(calculateIdleFraction(1000, now, 300)).toBe(1)
    })

    it('returns fractional value for partial idle', () => {
      const now = 150000 // 150 seconds
      const fraction = calculateIdleFraction(0, now, 300)
      expect(fraction).toBeCloseTo(0.5, 1)
    })
  })
})

