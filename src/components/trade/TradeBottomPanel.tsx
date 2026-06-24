import { useMemo, useState } from 'react'
import { FileText } from 'lucide-react'
import type { SpotBalance, SpotOrder, TradePanelTab } from '../../data/trade'
import {
  formatTradeAmount,
  getAvailableBalance,
  tradeCopy,
} from '../../data/trade'
import { OpenOrderCard } from './SpotOrderCards'

interface TradeBottomPanelProps {
  orders: SpotOrder[]
  balances: SpotBalance[]
  pairBase: string
  pairQuote: string
  pairId: string
  onCancel: (orderId: string) => void
  onCancelAll?: () => void
  onOpenOrderHistory?: () => void
  isLoggedIn: boolean
  variant?: 'mobile' | 'pc'
}

export function TradeBottomPanel({
  orders,
  balances,
  pairBase,
  pairQuote,
  pairId,
  onCancel,
  onCancelAll,
  onOpenOrderHistory,
  isLoggedIn,
  variant = 'mobile',
}: TradeBottomPanelProps) {
  const isPc = variant === 'pc'
  const [tab, setTab] = useState<TradePanelTab>('orders')
  const [currentPairOnly, setCurrentPairOnly] = useState(false)

  const openOrders = useMemo(() => {
    const open = orders.filter((o) => o.status === 'open')
    if (!currentPairOnly) return open
    return open.filter((o) => o.pairId === pairId)
  }, [orders, currentPairOnly, pairId])

  const tabs = isPc
    ? ([
        {
          id: 'orders' as const,
          label: `当前委托(${openOrders.length})`,
        },
        { id: 'assets' as const, label: tradeCopy.assets },
      ] as const)
    : ([
        {
          id: 'orders' as const,
          label: `${tradeCopy.openOrders}(${openOrders.length})`,
        },
        { id: 'assets' as const, label: tradeCopy.assets },
      ] as const)

  return (
    <section
      className={`flex h-full flex-col ${isPc ? '' : 'mt-2 border-t border-border-subtle'}`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border-subtle px-4">
        <div className="flex gap-6">
          {tabs.map((item) => (
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
        <div className="flex items-center gap-4">
          {isPc && tab === 'orders' && isLoggedIn && (
            <label className="flex items-center gap-2 text-caption text-secondary">
              <input
                type="checkbox"
                checked={currentPairOnly}
                onChange={(e) => setCurrentPairOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-border accent-brand"
              />
              当前交易品种
            </label>
          )}
          {isLoggedIn && onOpenOrderHistory && (
            <button
              type="button"
              onClick={onOpenOrderHistory}
              className="py-2.5 text-caption text-brand"
            >
              {isPc ? '订单历史' : '全部订单'}
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
      {!isLoggedIn ? (
        <EmptyState text="登录后可查看" />
      ) : tab === 'orders' ? (
        <>
          {!isPc && (
          <div className="flex items-center justify-between px-3 py-2">
            <label className="flex items-center gap-2 text-caption text-secondary">
              <input
                type="checkbox"
                checked={currentPairOnly}
                onChange={(e) => setCurrentPairOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-border accent-brand"
              />
              只看当前
            </label>
            {openOrders.length > 0 && onCancelAll && (
              <button
                type="button"
                onClick={onCancelAll}
                className="text-caption text-brand"
              >
                全部撤单
              </button>
            )}
          </div>
          )}
          {isPc && openOrders.length > 0 && onCancelAll && (
            <div className="flex justify-end px-4 py-1">
              <button
                type="button"
                onClick={onCancelAll}
                className="text-caption text-brand"
              >
                全部撤单
              </button>
            </div>
          )}
          {openOrders.length === 0 ? (
            <EmptyState text="暂无委托" />
          ) : (
            <ul className="divide-y divide-border-subtle px-3">
              {openOrders.map((order) => (
                <li key={order.id}>
                  <OpenOrderCard
                    order={order}
                    compact
                    onCancel={() => onCancel(order.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="px-3 py-2">
          <AssetRow
            symbol={pairBase}
            available={getAvailableBalance(balances, pairBase)}
          />
          <AssetRow
            symbol={pairQuote}
            available={getAvailableBalance(balances, pairQuote)}
          />
        </div>
      )}
      </div>
    </section>
  )
}

function AssetRow({
  symbol,
  available,
}: {
  symbol: string
  available: number
}) {
  return (
    <div className="flex items-center justify-between border-b border-border-subtle py-2.5 last:border-b-0">
      <span className="text-caption text-primary">{symbol}</span>
      <span className="tabular-nums text-caption text-secondary">
        可用 {formatTradeAmount(available, symbol)}
      </span>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center py-10 text-secondary">
      <FileText className="h-8 w-8 opacity-40" strokeWidth={1.25} />
      <p className="mt-2 text-caption">{text}</p>
    </div>
  )
}
