import type { ClimateState } from '../domain/types'

interface SkyProps {
  climate: ClimateState
  children: React.ReactNode
}

export function Sky({ climate, children }: SkyProps) {
  // Sky gradient based on night level
  // Day: blue gradient, Night: dark blue/purple gradient
  const nightLevel = climate.night

  // Interpolate between day and night
  const skyColor = `rgb(
    ${Math.round(135 * (1 - nightLevel) + 25 * nightLevel)},
    ${Math.round(206 * (1 - nightLevel) + 25 * nightLevel)},
    ${Math.round(250 * (1 - nightLevel) + 112 * nightLevel)}
  )`

  return (
    <div
      className="absolute inset-0 transition-colors duration-1000"
      style={{
        background: `linear-gradient(to bottom, ${skyColor}, ${skyColor}dd)`,
      }}
    >
      {/* Sun */}
      {nightLevel < 0.5 && (
        <div
          className="absolute top-8 right-8 rounded-full transition-opacity duration-1000"
          style={{
            width: `${60 + climate.sunlight * 40}px`,
            height: `${60 + climate.sunlight * 40}px`,
            backgroundColor: `rgba(255, 255, 0, ${0.8 * (1 - nightLevel)})`,
            boxShadow: `0 0 ${30 * climate.sunlight}px rgba(255, 255, 0, ${0.6 * climate.sunlight})`,
            opacity: 1 - nightLevel * 2,
          }}
        />
      )}

      {/* Stars */}
      {nightLevel > 0.3 && (
        <div className="absolute inset-0">
          {Array.from({ length: Math.floor(nightLevel * 20) }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: '2px',
                height: '2px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                opacity: nightLevel,
                boxShadow: '0 0 2px white',
              }}
            />
          ))}
        </div>
      )}

      {/* Fireflies */}
      {nightLevel > 0.5 && (
        <div className="absolute inset-0">
          {Array.from({ length: Math.floor(nightLevel * 5) }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-300"
              style={{
                width: '4px',
                height: '4px',
                left: `${Math.random() * 100}%`,
                top: `${50 + Math.random() * 50}%`,
                opacity: nightLevel * 0.8,
                boxShadow: '0 0 4px yellow',
                animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {children}
    </div>
  )
}

