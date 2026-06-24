import { ChevronDown } from 'lucide-react'
import type { MarketPair } from '../../data/mock'
import {
  formatChangePercent,
  formatPrice,
  formatVolume,
} from '../../data/mock'

interface PcTradeTickerBarProps {
  pair: MarketPair
  onSelectPair: () => void
}

export function PcTradeTickerBar({ pair, onSelectPair }: PcTradeTickerBarProps) {
  const isPositive = pair.change24h >= 0
  const high = pair.price * 1.04
  const low = pair.price * 0.96

  const stats = [
    { label: '24小时涨跌', value: formatChangePercent(pair.change24h), tone: isPositive ? 'success' : 'danger' },
    { label: '24小时最高价', value: formatPrice(high) },
    { label: '24小时最低价', value: formatPrice(low) },
    { label: '24小时成交量', value: formatVolume(pair.volume24h) },
    { label: '24小时成交额', value: formatVolume(pair.volume24h * pair.price) },
  ] as const

  return (
    <div className="flex h-12 shrink-0 items-center gap-6 border-b border-border-subtle px-4">
      <button
        type="button"
        onClick={onSelectPair}
        className="flex shrink-0 items-center gap-1.5 active:opacity-80"
      >
        <span className="text-body font-semibold text-primary">
          {pair.base}/{pair.quote}
        </span>
        <ChevronDown className="h-4 w-4 text-secondary" strokeWidth={1.5} />
        <span
          className={`ml-1 tabular-nums text-body-sm font-medium ${
            isPositive ? 'text-success' : 'text-danger'
          }`}
        >
          {formatPrice(pair.price)}
        </span>
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto">
        {stats.map((item) => (
          <div key={item.label} className="flex shrink-0 items-baseline gap-2">
            <span className="text-caption text-secondary">{item.label}</span>
            <span
              className={`tabular-nums text-caption font-medium ${
                'tone' in item && item.tone === 'success'
                  ? 'text-success'
                  : 'tone' in item && item.tone === 'danger'
                    ? 'text-danger'
                    : 'text-primary'
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
