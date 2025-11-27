import type { ClimateState } from '../domain/types'
import { Sky } from './Sky'
import { Rain } from './Rain'
import { Plant } from './Plant'
import { usePlantState } from '../hooks/usePlantState'

interface TerrariumProps {
  climate: ClimateState
}

export function Terrarium({ climate }: TerrariumProps) {
  const plantState = usePlantState(climate)

  return (
    <div className="h-full p-6 bg-gradient-to-b from-blue-200 to-green-100 flex items-center justify-center">
      <div className="w-full h-full max-w-2xl max-h-2xl bg-white/20 backdrop-blur-sm rounded-3xl border-4 border-white/50 shadow-2xl relative overflow-hidden">
        <Sky climate={climate}>
          {/* Ground/Soil */}
          <div
            className="absolute bottom-0 w-full"
            style={{
              height: '30%',
              background: `linear-gradient(to top, 
                rgb(${101 + climate.rain * 50}, ${67 + climate.rain * 30}, 33),
                rgb(${139 + climate.rain * 40}, ${90 + climate.rain * 30}, 43)
              )`,
            }}
          >
            {/* Plant container - centered on ground */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-end justify-center" style={{ height: '100%' }}>
              <Plant plantState={plantState} climate={climate} />
            </div>
          </div>

          {/* Rain overlay */}
          <Rain climate={climate} />
        </Sky>
      </div>
    </div>
  )
}

