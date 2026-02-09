import { Canvas } from '@react-three/fiber'
import { Experience } from './3d/Experience'
import { UI } from './ui/UI'
import { css } from '../styled-system/css'
import { Suspense } from 'react'
import { UILoadingOverlay } from './ui/UILoadingOverlay'
import { useInitApp } from './hooks/useInitApp'


function App() {
  const { isPending } = useInitApp()

  if (isPending) {
    return <UILoadingOverlay />
  }

  return (
    <div className={css({ h: '[100dvh]', touchAction: 'none' })}>
      <Canvas>
        <Experience />
      </Canvas>
      <Suspense fallback={<UILoadingOverlay />}>
        <UI />
      </Suspense>
    </div>
  )
}

export default App
