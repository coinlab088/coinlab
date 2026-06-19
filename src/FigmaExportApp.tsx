import { useEffect } from 'react'
import { AppShell } from './components/AppShell'
import { AppFrame } from './components/platform/AppFrame'
import { AppRouter } from './AppRouter'
import { InspectProvider } from './context/InspectContext'
import { PrototypeProvider } from './context/PrototypeContext'
import type { PrototypePreset } from './figma/types'

interface FigmaExportAppProps {
  preset: PrototypePreset
  title: string
}

export function FigmaExportApp({ preset, title }: FigmaExportAppProps) {
  useEffect(() => {
    document.title = `${title} — CoinNova Figma`
    const html = document.documentElement
    const { body } = document
    const prev = {
      htmlWidth: html.style.width,
      htmlHeight: html.style.height,
      htmlMargin: html.style.margin,
      bodyMargin: body.style.margin,
      bodyOverflow: body.style.overflow,
      bodyBg: body.style.background,
    }

    html.style.width = '390px'
    html.style.height = '812px'
    html.style.margin = '0'
    body.style.margin = '0'
    body.style.overflow = 'hidden'
    body.style.background = 'var(--color-base)'

    return () => {
      html.style.width = prev.htmlWidth
      html.style.height = prev.htmlHeight
      html.style.margin = prev.htmlMargin
      body.style.margin = prev.bodyMargin
      body.style.overflow = prev.bodyOverflow
      body.style.background = prev.bodyBg
    }
  }, [title])

  return (
    <PrototypeProvider preset={preset}>
      <InspectProvider>
        <AppFrame>
          <AppShell>
            <AppRouter />
          </AppShell>
        </AppFrame>
      </InspectProvider>
    </PrototypeProvider>
  )
}
