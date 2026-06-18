import type { OrderBookLevel } from '../../data/trade'
import { formatTradeAmount } from '../../data/trade'
import type { MarketPair } from '../../data/mock'
import { formatPrice } from '../../data/mock'

interface OrderBookProps {
  pair: MarketPair
  asks: OrderBookLevel[]
  bids: OrderBookLevel[]
  onPriceSelect?: (price: number) => void
}

function DepthBar({
  width,
  tone,
}: {
  width: number
  tone: 'ask' | 'bid'
}) {
  return (
    <span
      className={`absolute inset-y-0 right-0 ${
        tone === 'ask' ? 'bg-danger/12' : 'bg-success/12'
      }`}
      style={{ width: `${width}%` }}
    />
  )
}

export function OrderBook({ pair, asks, bids, onPriceSelect }: OrderBookProps) {
  const maxAmount = Math.max(
    ...asks.map((l) => l.amount),
    ...bids.map((l) => l.amount),
  )
  const isPositive = pair.change24h >= 0

  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1 flex justify-between text-[9px] text-secondary">
        <span>价格({pair.quote})</span>
        <span>数量({pair.base})</span>
      </div>

      <div className="space-y-px">
        {asks.map((level) => (
          <button
            key={`ask-${level.price}`}
            type="button"
            onClick={() => onPriceSelect?.(level.price)}
            className="relative flex w-full items-center justify-between py-px text-left active:opacity-80"
          >
            <DepthBar width={(level.amount / maxAmount) * 100} tone="ask" />
            <span className="relative z-10 tabular-nums text-[10px] text-danger">
              {formatPrice(level.price)}
            </span>
            <span className="relative z-10 tabular-nums text-[10px] text-secondary">
              {formatTradeAmount(level.amount, pair.base)}
            </span>
          </button>
        ))}
      </div>

      <div className="py-1 text-center">
        <p
          className={`tabular-nums text-body-sm font-semibold ${
            isPositive ? 'text-success' : 'text-danger'
          }`}
        >
          {formatPrice(pair.price)}
        </p>
        <p className="tabular-nums text-[9px] text-secondary">
          ≈¥{(pair.price * 6.9).toFixed(2)}
        </p>
      </div>

      <div className="space-y-px">
        {bids.map((level) => (
          <button
            key={`bid-${level.price}`}
            type="button"
            onClick={() => onPriceSelect?.(level.price)}
            className="relative flex w-full items-center justify-between py-px text-left active:opacity-80"
          >
            <DepthBar width={(level.amount / maxAmount) * 100} tone="bid" />
            <span className="relative z-10 tabular-nums text-[10px] text-success">
              {formatPrice(level.price)}
            </span>
            <span className="relative z-10 tabular-nums text-[10px] text-secondary">
              {formatTradeAmount(level.amount, pair.base)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
