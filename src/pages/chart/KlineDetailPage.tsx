import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { Annotatable } from '../../components/inspect/Annotatable'
import { KlineChart } from '../../components/chart/KlineChart'
import { usePrototype } from '../../context/PrototypeContext'
import { marketPairs, formatChangePercent, formatPrice, formatVolume } from '../../data/mock'
import {
  generateCandles,
  getIntervalSeed,
  klineCopy,
  klineIntervals,
  type KlineInterval,
} from '../../data/kline'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function KlineDetailPage() {
  const {
    chartScreen,
    closeKline,
    openTrade,
    isFavorite,
    toggleFavorite,
  } = usePrototype()

  const [interval, setInterval] = useState<KlineInterval>('1H')

  const pair = useMemo(
    () =>
      marketPairs.find((p) => p.id === chartScreen?.pairId) ?? marketPairs[0],
    [chartScreen?.pairId],
  )

  const candles = useMemo(
    () => generateCandles(pair.price, 40 + getIntervalSeed(interval) * 4),
    [pair.price, interval],
  )

  const favorited = isFavorite(pair.id)

  return (
    <SubPageLayout title={klineCopy.title} onBack={closeKline}>
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-h3 font-semibold text-primary">
            {pair.base}/{pair.quote}
          </p>
          <p className="tabular-nums text-h2 font-semibold text-primary">
            {formatPrice(pair.price)}
          </p>
          <p
            className={`tabular-nums text-body-sm ${
              pair.change24h >= 0 ? 'text-success' : 'text-danger'
            }`}
          >
            {formatChangePercent(pair.change24h)}
          </p>
        </div>
        <button
          type="button"
          aria-label={favorited ? '取消自选' : '加入自选'}
          onClick={() => toggleFavorite(pair.id)}
          className="flex h-9 w-9 items-center justify-center text-secondary"
        >
          <Star
            className={`h-5 w-5 ${favorited ? 'fill-brand text-brand' : ''}`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      <div className="mb-3 flex gap-1 overflow-x-auto">
        {klineIntervals.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setInterval(item.id)}
            className={`shrink-0 rounded-md px-3 py-1.5 text-caption font-medium ${
              interval === item.id
                ? 'bg-brand-muted text-brand'
                : 'bg-sunken text-secondary'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Annotatable id="kline-chart" className="mb-4 rounded-lg bg-sunken p-2">
        <KlineChart candles={candles} height={260} />
      </Annotatable>

      <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg border border-border-subtle bg-elevated px-3 py-3 text-center">
        <Stat label={klineCopy.high24h} value={formatPrice(pair.price * 1.04)} />
        <Stat label={klineCopy.low24h} value={formatPrice(pair.price * 0.96)} />
        <Stat label={klineCopy.vol24h} value={formatVolume(pair.volume24h)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            openTrade(pair.id)
            closeKline()
          }}
          className="h-11 rounded-md bg-success text-body-sm font-semibold text-white"
        >
          买入
        </button>
        <button
          type="button"
          onClick={() => {
            openTrade(pair.id)
            closeKline()
          }}
          className="h-11 rounded-md bg-danger text-body-sm font-semibold text-white"
        >
          卖出
        </button>
      </div>
    </SubPageLayout>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-secondary">{label}</p>
      <p className="mt-0.5 tabular-nums text-caption text-primary">{value}</p>
    </div>
  )
}
