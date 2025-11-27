import type { WritingStats, ClimateState } from '../domain/types'
import { calculatePace } from '../domain/writingStats'

interface StatsPanelProps {
  writingStats: WritingStats
  climate: ClimateState
}

export function StatsPanel({ writingStats, climate }: StatsPanelProps) {
  const pace = calculatePace(writingStats, Date.now())

  return (
    <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 space-y-2">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Stats</h3>
      
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Words Today:</span>
          <span className="font-semibold">{writingStats.totalWordsToday}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Session Words:</span>
          <span className="font-semibold">{writingStats.sessionWords}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Pace:</span>
          <span className="font-semibold">{Math.round(pace)} WPM</span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">Climate</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Sunlight:</span>
            <span className="font-semibold">{Math.round(climate.sunlight * 100)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rain:</span>
            <span className="font-semibold">{Math.round(climate.rain * 100)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Wind:</span>
            <span className="font-semibold">{Math.round(climate.wind * 100)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Night:</span>
            <span className="font-semibold">{Math.round(climate.night * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

