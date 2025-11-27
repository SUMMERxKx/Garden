import type { WritingStats, ClimateState } from '../domain/types'
import { calculatePace } from '../domain/writingStats'

interface StatsPanelProps {
  writingStats: WritingStats
  climate: ClimateState
}

function ClimateBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600">{label}:</span>
        <span className="font-semibold">{Math.round(value * 100)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 rounded-full"
          style={{
            width: `${value * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}

export function StatsPanel({ writingStats, climate }: StatsPanelProps) {
  const pace = calculatePace(writingStats, Date.now())

  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm space-y-3">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Writing Stats</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Words Today:</span>
          <span className="font-bold text-lg text-blue-600">{writingStats.totalWordsToday}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Session Words:</span>
          <span className="font-semibold text-gray-800">{writingStats.sessionWords}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Pace:</span>
          <span className="font-semibold text-gray-800">{Math.round(pace)} WPM</span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Climate Conditions</h4>
        <div className="space-y-2">
          <ClimateBar label="Sunlight" value={climate.sunlight} color="#FCD34D" />
          <ClimateBar label="Rain" value={climate.rain} color="#60A5FA" />
          <ClimateBar label="Wind" value={climate.wind} color="#A78BFA" />
          <ClimateBar label="Night" value={climate.night} color="#1E293B" />
        </div>
      </div>
    </div>
  )
}

