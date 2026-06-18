import { ChevronRight, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { CoinBalance, PortfolioSummary } from '../data/mock'
import { formatBalance, formatChangePercent, formatUsd } from '../data/mock'
import { Sparkline } from './Sparkline'

interface AssetOverviewCardProps {
  portfolio: PortfolioSummary
  balances: CoinBalance[]
}

export function AssetOverviewCard({ portfolio, balances }: AssetOverviewCardProps) {
  const [visible, setVisible] = useState(true)
  const isPositive = portfolio.pnl24hPercent >= 0

  return (
    <section className="rounded-lg border border-border bg-elevated p-4 shadow-brand">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-body-sm text-secondary">总资产 (USD)</span>
          <button
            type="button"
            aria-label={visible ? '隐藏余额' : '显示余额'}
            onClick={() => setVisible((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-secondary transition-colors duration-200 active:opacity-70"
          >
            {visible ? (
              <Eye className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <EyeOff className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
        <button
          type="button"
          className="flex items-center gap-0.5 text-body-sm text-brand transition-colors duration-200 active:opacity-70"
        >
          资产详情
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      <p className="tabular-nums text-display text-primary">
        {visible ? `$${formatUsd(portfolio.totalUsd)}` : '••••••••'}
      </p>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-caption text-secondary">24h 盈亏</p>
          <p
            className={`tabular-nums text-price-md ${
              isPositive ? 'text-success' : 'text-danger'
            }`}
          >
            {visible ? (
              <>
                {isPositive ? '+' : '−'}${formatUsd(Math.abs(portfolio.pnl24hUsd))}{' '}
                ({formatChangePercent(portfolio.pnl24hPercent)})
              </>
            ) : (
              '••••'
            )}
          </p>
        </div>
        <div className="w-24">
          <Sparkline positive={isPositive} />
        </div>
      </div>

      <div className="mt-4 border-t border-border-subtle pt-3">
        <p className="mb-2 text-caption text-secondary">一期支持资产 · BSC / TRC20</p>
        <div className="space-y-2">
          {balances.map((coin) => (
            <div key={coin.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-muted text-caption font-semibold text-brand">
                  {coin.symbol.slice(0, 1)}
                </span>
                <div>
                  <span className="text-body-sm font-medium text-primary">{coin.symbol}</span>
                  {coin.chain && (
                    <p className="text-caption text-primary-muted">{coin.chain}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="tabular-nums text-body-sm text-primary">
                  {visible ? formatBalance(coin.balance, coin.symbol) : '••••'}
                </p>
                <p className="tabular-nums text-caption text-secondary">
                  {visible ? `$${formatUsd(coin.usdValue)}` : '••••'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
