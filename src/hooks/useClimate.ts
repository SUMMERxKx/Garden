import { useState, useEffect } from 'react'
import { calculateClimateState } from '../domain/climate'
import type { ClimateState, WritingStats } from '../domain/types'

export function useClimate(
  writingStats: WritingStats,
  musicIntensity: number
): ClimateState {
  const [climate, setClimate] = useState<ClimateState>(() =>
    calculateClimateState(writingStats, musicIntensity, Date.now())
  )

  useEffect(() => {
    // Update climate state regularly (every 100ms for smooth transitions)
    const interval = setInterval(() => {
      setClimate(calculateClimateState(writingStats, musicIntensity, Date.now()))
    }, 100)

    return () => clearInterval(interval)
  }, [writingStats, musicIntensity])

  return climate
}

