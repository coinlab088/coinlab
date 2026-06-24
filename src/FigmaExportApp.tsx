import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { FigmaToast } from './components/feedback/FigmaToast'
import { AppShell } from './components/AppShell'
import { AppFrame } from './components/platform/AppFrame'
import { H5ExportFrame } from './components/platform/H5ExportFrame'
import { PcExportFrame } from './components/platform/PcExportFrame'
import { ComplianceRestrictionSheet } from './components/sheets/ComplianceRestrictionSheet'
import { SettingsSheets } from './components/sheets/SettingsSheets'
import { OrderConfirmSheet, PairPickerSheet } from './components/trade/TradeSheets'
import { AppRouter } from './AppRouter'
import { InspectProvider } from './context/InspectContext'
import { PrototypeProvider, usePrototype } from './context/PrototypeContext'
import type { PrototypePreset } from './figma/types'

interface FigmaExportAppProps {
  preset: PrototypePreset
  title: string
}

function FigmaOverlays() {
  const { figmaToast } = usePrototype()

  return (
    <>
      <SettingsSheets />
      <PairPickerSheet />
      <OrderConfirmSheet />
      <ComplianceRestrictionSheet />
      {figmaToast && <FigmaToast toast={figmaToast} />}
    </>
  )
}

function FigmaExportShell({ children }: { children: ReactNode }) {
  const { previewPlatform } = usePrototype()
  const Frame =
    previewPlatform === 'pc'
      ? PcExportFrame
      : previewPlatform === 'h5'
        ? H5ExportFrame
        : AppFrame

  return (
    <Frame>
      <AppShell>{children}</AppShell>
    </Frame>
  )
}

function exportViewport(previewPlatform: PrototypePreset['previewPlatform']) {
  switch (previewPlatform) {
    case 'pc':
      return { width: '1440px', height: '900px' }
    case 'h5':
      return { width: '390px', height: '856px' }
    default:
      return { width: '390px', height: '812px' }
  }
}

export function FigmaExportApp({ preset, title }: FigmaExportAppProps) {
  const viewport = exportViewport(preset.previewPlatform)

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

    html.style.width = viewport.width
    html.style.height = viewport.height
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
  }, [title, viewport.height, viewport.width])

  return (
    <PrototypeProvider preset={preset}>
      <InspectProvider>
        <FigmaExportShell>
          <AppRouter />
          <FigmaOverlays />
        </FigmaExportShell>
      </InspectProvider>
    </PrototypeProvider>
  )
}
