import { usePrototype } from './context/PrototypeContext'
import { KlineDetailPage } from './pages/chart/KlineDetailPage'
import { PcKlineDetailPage } from './pages/chart/PcKlineDetailPage'

export function ChartRouter() {
  const { chartScreen, previewPlatform } = usePrototype()

  if (!chartScreen) return null

  if (previewPlatform === 'pc') {
    return <PcKlineDetailPage />
  }

  return <KlineDetailPage />
}
