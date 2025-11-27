import { useState, useCallback } from 'react'
import { calculateWritingStats } from '../domain/writingStats'
import type { WritingStats } from '../domain/types'

const INITIAL_STATS: WritingStats = {
  totalWordsToday: 0,
  sessionWords: 0,
  typingTimestamps: [],
  lastActivityAt: Date.now(),
}

export function useWritingStats() {
  const [stats, setStats] = useState<WritingStats>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('writingStats')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Reset daily stats if it's a new day
        const today = new Date().toDateString()
        const savedDate = localStorage.getItem('writingStatsDate')
        if (savedDate !== today) {
          return { ...INITIAL_STATS, lastActivityAt: Date.now() }
        }
        return { ...parsed, lastActivityAt: parsed.lastActivityAt || Date.now() }
      } catch {
        return INITIAL_STATS
      }
    }
    return INITIAL_STATS
  })

  const updateText = useCallback((text: string) => {
    setStats((prev) => {
      const newStats = calculateWritingStats(prev, text, Date.now())
      // Save to localStorage
      localStorage.setItem('writingStats', JSON.stringify(newStats))
      localStorage.setItem('writingStatsDate', new Date().toDateString())
      return newStats
    })
  }, [])

  return { stats, updateText }
}

