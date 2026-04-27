import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './Providers.tsx'
import { init } from '@plausible-analytics/tracker'
import { Environment } from './environment'

init({
  domain: Environment.VITE_WEBAPP_HOST,
  endpoint: Environment.VITE_PLAUSIBLE_ENDPOINT_URL,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
