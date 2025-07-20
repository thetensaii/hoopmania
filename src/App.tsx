import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  )
}

export default App
