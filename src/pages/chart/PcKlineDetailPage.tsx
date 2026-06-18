import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { Annotatable } from '../../components/inspect/Annotatable'
import { KlineChart } from '../../components/chart/KlineChart'
import { PcAppLayout } from '../../components/pc/PcAppLayout'
import { usePrototype } from '../../context/PrototypeContext'
import { marketPairs, formatChangePercent, formatPrice, formatVolume } from '../../data/mock'
import {
  generateCandles,
  getIntervalSeed,
  klineCopy,
  klineIntervals,
  type KlineInterval,
} from '../../data/kline'

export function PcKlineDetailPage() {
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
    () => generateCandles(pair.price, 60 + getIntervalSeed(interval) * 6),
    [pair.price, interval],
  )

  const favorited = isFavorite(pair.id)

  return (
    <PcAppLayout>
      <div className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={closeKline}
              className="text-body-sm text-secondary hover:text-primary"
            >
              ← 返回
            </button>
            <div>
              <h1 className="text-h2 font-semibold text-primary">
                {pair.base}/{pair.quote}
              </h1>
              <p className="tabular-nums text-h1 text-primary">
                {formatPrice(pair.price)}
                <span
                  className={`ml-3 text-body ${
                    pair.change24h >= 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  {formatChangePercent(pair.change24h)}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(pair.id)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle"
            >
              <Star
                className={`h-4 w-4 ${favorited ? 'fill-brand text-brand' : 'text-secondary'}`}
              />
            </button>
            <button
              type="button"
              onClick={() => {
                openTrade(pair.id)
                closeKline()
              }}
              className="h-9 rounded-md bg-success px-4 text-body-sm font-semibold text-white"
            >
              买入
            </button>
            <button
              type="button"
              onClick={() => {
                openTrade(pair.id)
                closeKline()
              }}
              className="h-9 rounded-md bg-danger px-4 text-body-sm font-semibold text-white"
            >
              卖出
            </button>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          {klineIntervals.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setInterval(item.id)}
              className={`rounded-md px-4 py-1.5 text-caption font-medium ${
                interval === item.id
                  ? 'bg-brand-muted text-brand'
                  : 'bg-sunken text-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Annotatable id="kline-chart" className="min-h-0 flex-1 rounded-xl bg-sunken p-4">
          <KlineChart candles={candles} height={420} />
        </Annotatable>

        <div className="mt-4 grid grid-cols-3 gap-4 rounded-xl border border-border-subtle bg-elevated p-4">
          <Stat label={klineCopy.high24h} value={formatPrice(pair.price * 1.04)} />
          <Stat label={klineCopy.low24h} value={formatPrice(pair.price * 0.96)} />
          <Stat label={klineCopy.vol24h} value={formatVolume(pair.volume24h)} />
        </div>
      </div>
    </PcAppLayout>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-caption text-secondary">{label}</p>
      <p className="mt-1 tabular-nums text-body font-medium text-primary">{value}</p>
    </div>
  )
}
