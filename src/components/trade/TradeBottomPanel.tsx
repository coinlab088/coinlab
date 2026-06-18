import { useState } from 'react'
import { FileText } from 'lucide-react'
import type { SpotBalance, SpotOrder, TradePanelTab } from '../../data/trade'
import {
  formatOrderPrice,
  formatOrderTime,
  formatTradeAmount,
  getAvailableBalance,
  tradeCopy,
} from '../../data/trade'

interface TradeBottomPanelProps {
  orders: SpotOrder[]
  balances: SpotBalance[]
  pairBase: string
  pairQuote: string
  onCancel: (orderId: string) => void
  onOpenOrderHistory?: () => void
  isLoggedIn: boolean
}

export function TradeBottomPanel({
  orders,
  balances,
  pairBase,
  pairQuote,
  onCancel,
  onOpenOrderHistory,
  isLoggedIn,
}: TradeBottomPanelProps) {
  const [tab, setTab] = useState<TradePanelTab>('orders')
  const openOrders = orders.filter((o) => o.status === 'open')

  return (
    <section className="mt-2 border-t border-border-subtle">
      <div className="flex items-center justify-between px-3">
        <div className="flex gap-6">
        {(
          [
            { id: 'orders' as const, label: tradeCopy.openOrders },
            { id: 'assets' as const, label: tradeCopy.assets },
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
        {isLoggedIn && onOpenOrderHistory && (
          <button
            type="button"
            onClick={onOpenOrderHistory}
            className="py-2.5 text-caption text-brand"
          >
            全部订单
          </button>
        )}
      </div>

      {!isLoggedIn ? (
        <EmptyState text="登录后可查看" />
      ) : tab === 'orders' ? (
        openOrders.length === 0 ? (
          <EmptyState text="暂无委托" />
        ) : (
          <ul className="divide-y divide-border-subtle">
            {openOrders.map((order) => (
              <li key={order.id} className="px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-caption font-medium text-primary">
                      {order.base}/{order.quote}
                      <span
                        className={`ml-1.5 ${
                          order.side === 'buy' ? 'text-success' : 'text-danger'
                        }`}
                      >
                        {order.side === 'buy' ? '买' : '卖'}
                      </span>
                      <span className="ml-1 text-secondary">
                        {order.type === 'limit' ? '限价' : '市价'}
                      </span>
                    </p>
                    <p className="mt-0.5 text-[10px] text-secondary">
                      {formatOrderTime(order.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCancel(order.id)}
                    className="rounded border border-border px-2 py-0.5 text-[10px] text-primary"
                  >
                    撤单
                  </button>
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-secondary">
                  <span>
                    {formatOrderPrice(order.price, order.quote)} ×{' '}
                    {formatTradeAmount(order.amount, order.base)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )
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
