import { Canvas } from '@react-three/fiber'
import { init } from '@plausible-analytics/tracker'
import { Experience } from './3d/Experience'
import { UI } from './ui/UI'
import { css } from '../styled-system/css'
import { UILoadingOverlay } from './ui/UILoadingOverlay'
import { useInitApp } from './hooks/useInitApp'
import { Environment } from './environment'

init({
  domain: Environment.VITE_WEBAPP_HOST,
  endpoint: Environment.VITE_PLAUSIBLE_ENDPOINT_URL,
})



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
      <UI />
    </div>
  )
}

export default App
