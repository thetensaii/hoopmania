import { Canvas } from '@react-three/fiber'
import { Experience } from './3d/Experience'
import { UI } from './ui/UI'
import { css } from '../styled-system/css'
import { Suspense } from 'react'
import { Providers } from './Providers'
import { UiLoadingScreen } from './ui/UiLoadingScreen'


function App() {
  return (
    <div className={css({ h: '[100dvh]', touchAction: 'none' })}>
      <Providers>
        <Canvas>
          <Experience />
        </Canvas>
        <Suspense fallback={<UiLoadingScreen />}>
          <UI />
        </Suspense>
      </Providers>
    </div>
  )
}

export default App
