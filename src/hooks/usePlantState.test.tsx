import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePlantState } from './usePlantState'
import type { ClimateState } from '../domain/types'

describe('usePlantState', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    vi.fn().mockClear()
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    ;(globalThis as any).localStorage = localStorageMock
  })

  it('initializes with seed stage', () => {
    const { result } = renderHook(() => {
      const climate: ClimateState = {
        sunlight: 0,
        rain: 0,
        wind: 0,
        night: 0,
      }
      return usePlantState(climate)
    })

    expect(result.current.stage).toBe('seed')
    expect(result.current.growthPoints).toBe(0)
  })

  it('updates plant state over time with climate', async () => {
    const climate: ClimateState = {
      sunlight: 1,
      rain: 0.5,
      wind: 0,
      night: 0,
    }

    const { result } = renderHook(() => usePlantState(climate))

    // Wait for at least one update cycle
    await waitFor(
      () => {
        expect(result.current.growthPoints).toBeGreaterThan(0)
      },
      { timeout: 2000 }
    )
  })
})

