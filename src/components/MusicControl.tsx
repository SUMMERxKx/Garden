interface MusicControlProps {
  musicIntensity: number
  onMusicIntensityChange: (value: number) => void
}

export function MusicControl({ musicIntensity, onMusicIntensityChange }: MusicControlProps) {
  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          🎵 Music Intensity
        </label>
        <span className="text-sm font-bold text-blue-600">{Math.round(musicIntensity * 100)}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={musicIntensity}
        onChange={(e) => onMusicIntensityChange(parseFloat(e.target.value))}
        className="w-full h-3 bg-gradient-to-r from-gray-200 to-blue-200 rounded-lg appearance-none cursor-pointer transition-all"
        style={{
          background: `linear-gradient(to right, #E5E7EB 0%, #60A5FA ${musicIntensity * 100}%, #E5E7EB ${musicIntensity * 100}%)`,
        }}
      />
      <p className="text-xs text-gray-500 mt-2">💧 Adjust to control rainfall in your terrarium</p>
    </div>
  )
}

