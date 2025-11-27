import { WritingArea } from './components/WritingArea'
import { Terrarium } from './components/Terrarium'

function App() {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="w-1/2">
        <WritingArea />
      </div>
      <div className="w-1/2">
        <Terrarium />
      </div>
    </div>
  )
}

export default App
