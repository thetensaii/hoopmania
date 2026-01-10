import { Canvas } from '@react-three/fiber'
import { Experience } from './3d/Experience'
import { UI } from './ui/UI'
import { useEffect } from 'react'
import { useBestScore } from './hooks/useBestScore'
import { css } from '../styled-system/css'
import { Providers } from './Providers'
import { usePlayerName } from './hooks/usePlayerName'

let didInit = false

function App() {
  const { loadBestScore } = useBestScore()
  const { loadPlayerName } = usePlayerName()

  useEffect(() => {
    if (!didInit) {
      didInit = true
      loadBestScore()
      loadPlayerName()
    }
  }, [loadBestScore, loadPlayerName])

  return (
    <div className={css({ h: '[100dvh]', touchAction: 'none' })}>
      <Providers>
        <Canvas>
          <Experience />
        </Canvas>
        <UI />
      </Providers>
    </div>
  )
}

export default App
