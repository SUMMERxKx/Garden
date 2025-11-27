import type { ClimateState } from '../domain/types'

interface TerrariumProps {
  climate: ClimateState
}

export function Terrarium({ climate }: TerrariumProps) {
  return (
    <div className="h-full p-6 bg-gradient-to-b from-blue-200 to-green-100 flex items-center justify-center">
      <div className="w-full h-full max-w-2xl max-h-2xl bg-white/30 backdrop-blur-sm rounded-3xl border-4 border-white/50 shadow-2xl flex items-center justify-center relative overflow-hidden">
        <div className="text-center text-gray-600">
          <p className="text-lg">Terrarium Placeholder</p>
          <p className="text-sm mt-2">Your soul plant will grow here</p>
          <p className="text-xs mt-4 text-gray-500">
            Climate: S:{Math.round(climate.sunlight * 100)}% R:{Math.round(climate.rain * 100)}% W:{Math.round(climate.wind * 100)}% N:{Math.round(climate.night * 100)}%
          </p>
        </div>
      </div>
    </div>
  )
}

