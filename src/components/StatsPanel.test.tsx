import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatsPanel } from './StatsPanel'
import type { WritingStats, ClimateState } from '../domain/types'

describe('StatsPanel', () => {
  it('displays writing stats correctly', () => {
    const stats: WritingStats = {
      totalWordsToday: 150,
      sessionWords: 50,
      typingTimestamps: [],
      lastActivityAt: Date.now(),
    }

    const climate: ClimateState = {
      sunlight: 0.5,
      rain: 0.3,
      wind: 0.2,
      night: 0.1,
    }

    render(<StatsPanel writingStats={stats} climate={climate} />)

    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText(/50%/)).toBeInTheDocument() // Sunlight
  })

  it('displays climate bars with correct values', () => {
    const stats: WritingStats = {
      totalWordsToday: 0,
      sessionWords: 0,
      typingTimestamps: [],
      lastActivityAt: Date.now(),
    }

    const climate: ClimateState = {
      sunlight: 0.75,
      rain: 0.5,
      wind: 0.25,
      night: 0,
    }

    render(<StatsPanel writingStats={stats} climate={climate} />)

    expect(screen.getByText(/75%/)).toBeInTheDocument() // Sunlight
    expect(screen.getByText(/50%/)).toBeInTheDocument() // Rain
    expect(screen.getByText(/25%/)).toBeInTheDocument() // Wind
  })
})

