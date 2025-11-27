import { useState } from 'react'
import { WritingArea } from './components/WritingArea'
import { Terrarium } from './components/Terrarium'
import { MusicControl } from './components/MusicControl'
import { StatsPanel } from './components/StatsPanel'
import { useWritingStats } from './hooks/useWritingStats'
import { useClimate } from './hooks/useClimate'

function App() {
  const [musicIntensity, setMusicIntensity] = useState(0)
  const { stats } = useWritingStats()
  const climate = useClimate(stats, musicIntensity)

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-1/2 flex flex-col border-r border-gray-300 shadow-lg">
        <div className="flex-1 overflow-hidden">
          <WritingArea />
        </div>
        <div className="p-4 border-t border-gray-300 bg-white/90 backdrop-blur-sm">
          <MusicControl
            musicIntensity={musicIntensity}
            onMusicIntensityChange={setMusicIntensity}
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <Terrarium climate={climate} />
        </div>
        <div className="p-4 border-t border-gray-300 bg-white/90 backdrop-blur-sm">
          <StatsPanel writingStats={stats} climate={climate} />
        </div>
      </div>
    </div>
  )
}

export default App
