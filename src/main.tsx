import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FigmaExportApp } from './FigmaExportApp'
import { FigmaIndexPage } from './FigmaIndexPage'
import { resolveFigmaRoute, stripBasePath } from './figma/routes'
import './index.css'

const figmaRoute = resolveFigmaRoute(stripBasePath(window.location.pathname))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {figmaRoute?.type === 'screen' ? (
      <FigmaExportApp
        preset={figmaRoute.screen.preset}
        title={figmaRoute.screen.label}
      />
    ) : figmaRoute?.type === 'index' ? (
      <FigmaIndexPage />
    ) : (
      <App />
    )}
  </StrictMode>,
)
