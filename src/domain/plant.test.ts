import { describe, it, expect } from 'vitest'
import { getPlantStage, updatePlantState } from './plant'
import type { PlantState, ClimateState } from './types'

describe('plant', () => {
  describe('getPlantStage', () => {
    it('returns seed for low growth points', () => {
      expect(getPlantStage(0)).toBe('seed')
      expect(getPlantStage(50)).toBe('seed')
    })

    it('returns sprout for threshold growth', () => {
      expect(getPlantStage(100)).toBe('sprout')
      expect(getPlantStage(200)).toBe('sprout')
    })

    it('returns stem for medium growth', () => {
      expect(getPlantStage(300)).toBe('stem')
      expect(getPlantStage(500)).toBe('stem')
    })

    it('returns smallPlant for higher growth', () => {
      expect(getPlantStage(700)).toBe('smallPlant')
      expect(getPlantStage(1000)).toBe('smallPlant')
    })

    it('returns blooming for high growth', () => {
      expect(getPlantStage(1300)).toBe('blooming')
      expect(getPlantStage(2000)).toBe('blooming')
    })

    it('returns mature for very high growth', () => {
      expect(getPlantStage(2500)).toBe('mature')
      expect(getPlantStage(5000)).toBe('mature')
    })
  })

  describe('updatePlantState', () => {
    it('accumulates growth points over time', () => {
      const plant: PlantState = {
        stage: 'seed',
        growthPoints: 0,
        lastUpdatedAt: 0,
      }

      const climate: ClimateState = {
        sunlight: 1,
        rain: 0,
        wind: 0,
        night: 0,
      }

      const updated = updatePlantState(plant, climate, 1000) // 1 second

      expect(updated.growthPoints).toBeGreaterThan(plant.growthPoints)
      expect(updated.lastUpdatedAt).toBe(1000)
    })

    it('advances stage when threshold is crossed', () => {
      const plant: PlantState = {
        stage: 'seed',
        growthPoints: 90,
        lastUpdatedAt: 0,
      }

      const climate: ClimateState = {
        sunlight: 1,
        rain: 1, // rain boosts growth
        wind: 0,
        night: 0,
      }

      const updated = updatePlantState(plant, climate, 2000) // 2 seconds with high growth

      // Should advance to sprout if growth points cross 100
      if (updated.growthPoints >= 100) {
        expect(updated.stage).toBe('sprout')
      }
    })

    it('slows growth during night', () => {
      const plant: PlantState = {
        stage: 'seed',
        growthPoints: 0,
        lastUpdatedAt: 0,
      }

      const dayClimate: ClimateState = {
        sunlight: 1,
        rain: 0,
        wind: 0,
        night: 0,
      }

      const nightClimate: ClimateState = {
        sunlight: 0,
        rain: 0,
        wind: 0,
        night: 1,
      }

      const dayGrowth = updatePlantState(plant, dayClimate, 1000)
      const nightGrowth = updatePlantState(plant, nightClimate, 1000)

      expect(dayGrowth.growthPoints).toBeGreaterThan(nightGrowth.growthPoints)
    })
  })
})

