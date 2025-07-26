import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'
import { UI } from './UI'

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Experience />
      </Canvas>
      <UI />
    </div>
  )
}

export default App
