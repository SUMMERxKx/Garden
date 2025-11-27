import type { PlantState, PlantStage, ClimateState } from './types'

/**
 * Plant evolution thresholds
 */
const PLANT_THRESHOLDS: Record<PlantStage, number> = {
  seed: 0,
  sprout: 100,
  stem: 300,
  smallPlant: 700,
  blooming: 1300,
  mature: 2500,
}

/**
 * Get the next stage for a given growth points value
 */
export function getPlantStage(growthPoints: number): PlantStage {
  if (growthPoints >= PLANT_THRESHOLDS.mature) return 'mature'
  if (growthPoints >= PLANT_THRESHOLDS.blooming) return 'blooming'
  if (growthPoints >= PLANT_THRESHOLDS.smallPlant) return 'smallPlant'
  if (growthPoints >= PLANT_THRESHOLDS.stem) return 'stem'
  if (growthPoints >= PLANT_THRESHOLDS.sprout) return 'sprout'
  return 'seed'
}

/**
 * Calculate growth points gain per second based on climate
 */
function calculateGrowthRate(climate: ClimateState): number {
  // Base growth from sunlight
  const sunlightGrowth = climate.sunlight * 0.5

  // Rain accelerates growth
  const rainBoost = climate.rain * 0.3

  // Night doesn't stop growth but slows it slightly
  const nightPenalty = climate.night * 0.2

  return Math.max(0, sunlightGrowth + rainBoost - nightPenalty)
}

/**
 * Update plant state based on climate and elapsed time
 */
export function updatePlantState(
  plantState: PlantState,
  climate: ClimateState,
  now: number
): PlantState {
  const elapsedSeconds = (now - plantState.lastUpdatedAt) / 1000
  const growthRate = calculateGrowthRate(climate)
  const growthPointsGained = growthRate * elapsedSeconds

  const newGrowthPoints = plantState.growthPoints + growthPointsGained
  const newStage = getPlantStage(newGrowthPoints)

  return {
    stage: newStage,
    growthPoints: newGrowthPoints,
    lastUpdatedAt: now,
  }
}

