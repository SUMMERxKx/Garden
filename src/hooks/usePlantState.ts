import { useState, useEffect } from 'react'
import { updatePlantState } from '../domain/plant'
import type { PlantState, ClimateState } from '../domain/types'

const INITIAL_PLANT_STATE: PlantState = {
  stage: 'seed',
  growthPoints: 0,
  lastUpdatedAt: Date.now(),
}

export function usePlantState(climate: ClimateState): PlantState {
  const [plantState, setPlantState] = useState<PlantState>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('plantState')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return {
          ...parsed,
          lastUpdatedAt: parsed.lastUpdatedAt || Date.now(),
        }
      } catch {
        return INITIAL_PLANT_STATE
      }
    }
    return INITIAL_PLANT_STATE
  })

  useEffect(() => {
    // Update plant state regularly based on climate
    const interval = setInterval(() => {
      setPlantState((prev) => {
        const updated = updatePlantState(prev, climate, Date.now())
        // Save to localStorage
        localStorage.setItem('plantState', JSON.stringify(updated))
        return updated
      })
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [climate])

  return plantState
}

