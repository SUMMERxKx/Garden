# Garden of Words 🌱

A writing-powered digital terrarium where your words become sunlight for a single evolving "soul plant" that reacts in real-time to your writing and music habits.

## 🌟 Concept

**Garden of Words** is a local-first web application that gamifies your writing practice through a beautiful, interactive terrarium. As you write, your words transform into environmental conditions that nurture a magical plant:

- **Writing → Sunlight**: The more you write, the more sunlight energy is generated, driving plant growth and bloom
- **Music → Rain**: Adjust the music intensity slider to create rainfall that accelerates growth
- **Idle Time → Night**: When you stop writing, night slowly falls with stars and fireflies
- **Writing Pace → Wind**: Fast typing creates strong winds that make the plant sway; calm typing creates gentle breezes

Your goal is to grow and evolve a single "soul plant" through consistent writing habits. Over time, the plant changes appearance (size, shape, color, flowers) based on your writing behavior patterns.

## 🚀 Features

- **Real-time Writing Tracking**: Tracks words written today, session words, and typing pace (WPM)
- **Dynamic Climate System**: Four climate inputs (sunlight, rain, wind, night) that respond to your activity
- **Evolving Plant**: Plant grows through 6 stages: seed → sprout → stem → small plant → blooming → mature
- **Beautiful Visuals**: 
  - Day/night sky transitions
  - Animated rain effects
  - Wind-swaying plant animations
  - Stars and fireflies during night
  - Smooth transitions and visual feedback
- **Local Persistence**: All data stored locally (localStorage) - no accounts required
- **Stats Dashboard**: Real-time display of writing stats and climate conditions

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Testing**: 
  - Unit Tests: Vitest + React Testing Library
  - E2E Tests: Playwright
- **State Management**: React Hooks + Context
- **Storage**: localStorage

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/SUMMERxKx/Garden.git
cd Garden
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🧪 Testing

### Unit Tests
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with UI:
```bash
npm test:ui
```

### E2E Tests
```bash
npm run test:e2e
```

Run E2E tests with UI:
```bash
npm run test:e2e:ui
```

## 🏗️ Building

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
Garden/
├── src/
│   ├── components/      # React components
│   │   ├── Plant.tsx    # Plant visualization component
│   │   ├── Terrarium.tsx # Main terrarium container
│   │   ├── Sky.tsx       # Sky with day/night effects
│   │   ├── Rain.tsx      # Rain animation component
│   │   ├── WritingArea.tsx
│   │   ├── StatsPanel.tsx
│   │   └── MusicControl.tsx
│   ├── domain/           # Pure domain logic (testable)
│   │   ├── types.ts      # TypeScript types
│   │   ├── writingStats.ts
│   │   ├── climate.ts
│   │   └── plant.ts
│   ├── hooks/            # Custom React hooks
│   │   ├── useWritingStats.ts
│   │   ├── useClimate.ts
│   │   └── usePlantState.ts
│   └── test/             # Test setup
├── e2e/                  # E2E tests (Playwright)
└── public/               # Static assets
```

## 🎮 How to Use

1. **Start Writing**: Type in the writing area on the left. Your words generate sunlight!
2. **Adjust Music**: Use the music intensity slider to control rainfall
3. **Watch Your Plant Grow**: 
   - Write more to increase sunlight and growth
   - Type faster to create wind effects
   - Stop writing to see night fall
   - Adjust music to see rain and accelerated growth
4. **Track Progress**: Check the stats panel to see your writing metrics and climate conditions

## 🌱 Plant Evolution Stages

- **Seed** (0-99 growth points): Starting stage
- **Sprout** (100-299): First signs of life
- **Stem** (300-699): Growing taller
- **Small Plant** (700-1299): Developing leaves
- **Blooming** (1300-2499): Flowers appear!
- **Mature** (2500+): Fully grown plant

## 🔮 Future Enhancements

- Real Spotify/Apple Music integration (currently uses manual slider)
- Multiple plant varieties
- Writing streaks and achievements
- Export writing history
- Custom themes
- Sound effects

## 📝 License

This project is open source and available for personal use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy Writing! 🌱✨**
