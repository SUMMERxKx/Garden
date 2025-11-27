import type { ClimateState } from '../domain/types'

interface RainProps {
  climate: ClimateState
}

export function Rain({ climate }: RainProps) {
  if (climate.rain < 0.1) return null

  const rainDensity = Math.floor(climate.rain * 30) // 0-30 raindrops

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: rainDensity }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-blue-300 opacity-60"
          style={{
            left: `${(i * 37) % 100}%`,
            top: '-10px',
            width: '2px',
            height: `${10 + Math.random() * 20}px`,
            animation: `rainFall ${0.5 + Math.random() * 0.5}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

