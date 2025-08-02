import { Canvas } from '@react-three/fiber'
import { Experience } from './3d/Experience'
import { UI } from './ui/UI'

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
