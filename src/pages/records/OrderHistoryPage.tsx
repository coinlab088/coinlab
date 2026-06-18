import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { recordsCopy } from '../../data/records'
import {
  formatOrderPrice,
  formatOrderTime,
  formatTradeAmount,
  type SpotOrder,
} from '../../data/trade'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

type OrderFilter = 'all' | 'open' | 'filled' | 'cancelled'

export function OrderHistoryPage() {
  const { orders, closeRecords, navigateRecords } = usePrototype()
  const [filter, setFilter] = useState<OrderFilter>('all')

  const visible = useMemo(() => {
    if (filter === 'all') return orders
    return orders.filter((o) => o.status === filter)
  }, [orders, filter])

  return (
    <SubPageLayout title={recordsCopy.ordersTitle} onBack={closeRecords}>
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            { id: 'all' as const, label: '全部' },
            { id: 'open' as const, label: '委托中' },
            { id: 'filled' as const, label: '已成交' },
            { id: 'cancelled' as const, label: '已撤销' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-full px-3 py-1 text-caption font-medium ${
              filter === item.id
                ? 'bg-brand-muted text-brand'
                : 'bg-sunken text-secondary'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-body-sm text-secondary">暂无订单</p>
      ) : (
        <ul className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-elevated">
          {visible.map((order) => (
            <li key={order.id}>
              <button
                type="button"
                onClick={() =>
                  navigateRecords({ screen: 'order-detail', orderId: order.id })
                }
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-sunken"
              >
                <OrderSummary order={order} />
                <ChevronRight className="h-4 w-4 shrink-0 text-secondary" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </SubPageLayout>
  )
}

function OrderSummary({ order }: { order: SpotOrder }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="text-body-sm font-medium text-primary">
        {order.base}/{order.quote}
        <span
          className={`ml-2 ${
            order.side === 'buy' ? 'text-success' : 'text-danger'
          }`}
        >
          {order.side === 'buy' ? '买入' : '卖出'}
        </span>
        <span className="ml-1 text-caption text-secondary">
          {order.type === 'limit' ? '限价' : '市价'}
        </span>
      </p>
      <p className="mt-0.5 tabular-nums text-caption text-secondary">
        {formatOrderPrice(order.price, order.quote)} ×{' '}
        {formatTradeAmount(order.amount, order.base)}
      </p>
      <p className="text-caption text-secondary">
        {formatOrderTime(order.createdAt)} · {statusLabel(order.status)}
      </p>
    </div>
  )
}

function statusLabel(status: SpotOrder['status']) {
  switch (status) {
    case 'open':
      return '委托中'
    case 'filled':
      return '已成交'
    default:
      return '已撤销'
  }
}
