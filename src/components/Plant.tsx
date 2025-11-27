import type { PlantState, ClimateState } from '../domain/types'

interface PlantProps {
  plantState: PlantState
  climate: ClimateState
}

export function Plant({ plantState, climate }: PlantProps) {
  const { stage } = plantState

  // Wind animation intensity
  const windIntensity = climate.wind
  const swayAnimation = `sway ${1 + windIntensity * 2}s ease-in-out infinite`

  // Plant size based on stage
  const stageSizes: Record<PlantState['stage'], { width: string; height: string }> = {
    seed: { width: '8px', height: '8px' },
    sprout: { width: '12px', height: '20px' },
    stem: { width: '16px', height: '40px' },
    smallPlant: { width: '24px', height: '60px' },
    blooming: { width: '32px', height: '80px' },
    mature: { width: '40px', height: '100px' },
  }

  const size = stageSizes[stage]

  // Plant colors based on stage
  const stageColors: Record<PlantState['stage'], { stem: string; leaf: string; flower?: string }> = {
    seed: { stem: '#8B4513', leaf: '#8B4513' },
    sprout: { stem: '#228B22', leaf: '#32CD32' },
    stem: { stem: '#228B22', leaf: '#32CD32' },
    smallPlant: { stem: '#228B22', leaf: '#228B22' },
    blooming: { stem: '#228B22', leaf: '#228B22', flower: '#FF69B4' },
    mature: { stem: '#006400', leaf: '#228B22', flower: '#FF1493' },
  }

  const colors = stageColors[stage]

  return (
    <div
      className="relative flex items-end justify-center"
      style={{
        width: size.width,
        height: size.height,
        animation: windIntensity > 0.1 ? swayAnimation : 'none',
        transformOrigin: 'bottom center',
      }}
    >
      {/* Stem */}
      <div
        className="absolute bottom-0"
        style={{
          width: '4px',
          height: size.height,
          backgroundColor: colors.stem,
          borderRadius: '2px',
        }}
      />

      {/* Leaves/Plant body */}
      {stage !== 'seed' && (
        <>
          {/* Left leaf */}
          <div
            className="absolute"
            style={{
              left: '-8px',
              bottom: `calc(${size.height} * 0.6)`,
              width: '12px',
              height: '12px',
              backgroundColor: colors.leaf,
              borderRadius: '50% 0 50% 0',
              transform: `rotate(-45deg) scale(${1 + windIntensity * 0.3})`,
            }}
          />
          {/* Right leaf */}
          <div
            className="absolute"
            style={{
              right: '-8px',
              bottom: `calc(${size.height} * 0.6)`,
              width: '12px',
              height: '12px',
              backgroundColor: colors.leaf,
              borderRadius: '0 50% 0 50%',
              transform: `rotate(45deg) scale(${1 + windIntensity * 0.3})`,
            }}
          />
        </>
      )}

      {/* Additional leaves for larger stages */}
      {stage === 'smallPlant' || stage === 'blooming' || stage === 'mature' ? (
        <>
          <div
            className="absolute"
            style={{
              left: '-6px',
              bottom: `calc(${size.height} * 0.4)`,
              width: '10px',
              height: '10px',
              backgroundColor: colors.leaf,
              borderRadius: '50% 0 50% 0',
              transform: `rotate(-30deg) scale(${1 + windIntensity * 0.2})`,
            }}
          />
          <div
            className="absolute"
            style={{
              right: '-6px',
              bottom: `calc(${size.height} * 0.4)`,
              width: '10px',
              height: '10px',
              backgroundColor: colors.leaf,
              borderRadius: '0 50% 0 50%',
              transform: `rotate(30deg) scale(${1 + windIntensity * 0.2})`,
            }}
          />
        </>
      ) : null}

      {/* Flowers for blooming and mature stages */}
      {(stage === 'blooming' || stage === 'mature') && colors.flower && (
        <div
          className="absolute"
          style={{
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16px',
            height: '16px',
            backgroundColor: colors.flower,
            borderRadius: '50%',
            boxShadow: `0 0 8px ${colors.flower}`,
          }}
        />
      )}

      {/* Growth glow effect based on sunlight */}
      {climate.sunlight > 0.3 && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `0 0 ${20 * climate.sunlight}px rgba(255, 255, 0, ${climate.sunlight * 0.5})`,
          }}
        />
      )}
    </div>
  )
}

