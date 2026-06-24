import { useMemo, useState } from 'react'
import type { MarketPair } from '../../data/mock'
import { KlineChart } from '../chart/KlineChart'
import {
  generateCandles,
  getIntervalSeed,
  klineIntervals,
  type KlineInterval,
} from '../../data/kline'

type ChartTab = 'chart' | 'depth'

interface PcTradeChartPanelProps {
  pair: MarketPair
}

export function PcTradeChartPanel({ pair }: PcTradeChartPanelProps) {
  const [tab, setTab] = useState<ChartTab>('chart')
  const [interval, setInterval] = useState<KlineInterval>('1H')

  const candles = useMemo(
    () => generateCandles(pair.price, 60 + getIntervalSeed(interval) * 6),
    [pair.price, interval],
  )

  return (
    <div className="flex min-w-0 flex-1 flex-col border-r border-border-subtle">
      <div className="flex shrink-0 items-center justify-between border-b border-border-subtle px-3">
        <div className="flex gap-4">
          {(
            [
              { id: 'chart' as const, label: '图表' },
              { id: 'depth' as const, label: '深度' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`relative py-2.5 text-body-sm font-medium ${
                tab === item.id ? 'text-primary' : 'text-secondary'
              }`}
            >
              {item.label}
              {tab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
              )}
            </button>
          ))}
        </div>

        {tab === 'chart' && (
          <div className="flex gap-1">
            {klineIntervals.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setInterval(item.id)}
                className={`rounded px-2 py-0.5 text-caption ${
                  interval === item.id
                    ? 'bg-brand-muted text-brand'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative min-h-0 flex-1 bg-sunken p-2">
        {tab === 'chart' ? (
          <KlineChart candles={candles} height={360} />
        ) : (
          <div className="flex h-full min-h-[280px] items-center justify-center text-body-sm text-secondary">
            深度图（原型占位）
          </div>
        )}
      </div>
    </div>
  )
}
