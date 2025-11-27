interface MusicControlProps {
  musicIntensity: number
  onMusicIntensityChange: (value: number) => void
}

export function MusicControl({ musicIntensity, onMusicIntensityChange }: MusicControlProps) {
  return (
    <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Music Intensity: {Math.round(musicIntensity * 100)}%
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={musicIntensity}
        onChange={(e) => onMusicIntensityChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <p className="text-xs text-gray-500 mt-1">Adjust to control rainfall</p>
    </div>
  )
}

