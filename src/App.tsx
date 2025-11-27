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
    <div className="h-screen w-screen flex overflow-hidden bg-gray-100">
      <div className="w-1/2 flex flex-col">
        <WritingArea />
        <div className="p-4 border-t border-gray-200 bg-white">
          <MusicControl
            musicIntensity={musicIntensity}
            onMusicIntensityChange={setMusicIntensity}
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="flex-1">
          <Terrarium climate={climate} />
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <StatsPanel writingStats={stats} climate={climate} />
        </div>
      </div>
    </div>
  )
}

export default App
