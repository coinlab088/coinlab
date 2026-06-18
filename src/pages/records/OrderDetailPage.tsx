import { recordsCopy } from '../../data/records'
import type { SpotOrder } from '../../data/trade'
import {
  formatOrderPrice,
  formatOrderTime,
  formatTradeAmount,
} from '../../data/trade'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function OrderDetailPage() {
  const { recordsScreen, orders, navigateRecords } = usePrototype()
  const order = orders.find((o) => o.id === recordsScreen?.orderId)

  if (!order) return null

  function handleBack() {
    navigateRecords({ screen: 'orders' })
  }

  return (
    <SubPageLayout title={recordsCopy.orderDetailTitle} onBack={handleBack}>
      <div className="mb-5 text-center">
        <p className="text-caption text-secondary">
          {order.base}/{order.quote}
        </p>
        <p
          className={`mt-1 text-h3 font-semibold ${
            order.side === 'buy' ? 'text-success' : 'text-danger'
          }`}
        >
          {order.side === 'buy' ? '买入' : '卖出'} ·{' '}
          {order.type === 'limit' ? '限价' : '市价'}
        </p>
        <p className="mt-1 text-body-sm text-secondary">
          {statusText(order.status)}
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-border-subtle bg-sunken px-4 py-3 text-body-sm">
        <Row label="委托价格" value={formatOrderPrice(order.price, order.quote)} />
        <Row
          label="委托数量"
          value={`${formatTradeAmount(order.amount, order.base)} ${order.base}`}
        />
        <Row
          label="成交数量"
          value={`${formatTradeAmount(order.filled, order.base)} ${order.base}`}
        />
        <Row label="成交额" value={formatOrderPrice(order.total, order.quote)} />
        <Row label="手续费" value={formatOrderPrice(order.fee, order.quote)} />
        <Row label="订单号" value={order.id} />
        <Row label="下单时间" value={formatOrderTime(order.createdAt)} />
      </div>
    </SubPageLayout>
  )
}

function statusText(status: SpotOrder['status']) {
  switch (status) {
    case 'open':
      return '委托中'
    case 'filled':
      return '已成交'
    default:
      return '已撤销'
  }
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="shrink-0 text-secondary">{label}</span>
      <span className="break-all text-right text-primary">{value}</span>
    </div>
  )
}
