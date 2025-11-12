import { Canvas } from '@react-three/fiber'
import { Experience } from './3d/Experience'
import { UI } from './ui/UI'
import { useEffect } from 'react'
import { useBestScore } from './hooks/useBestScore'

let didInit = false

function App() {
  const { loadBestScore } = useBestScore()

  useEffect(() => {
    if (!didInit) {
      didInit = true
      loadBestScore()
    }
  }, [loadBestScore])

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
