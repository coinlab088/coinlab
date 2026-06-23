import { ChevronRight } from 'lucide-react'
import {
  formatSpotBase,
  formatSpotQuote,
  formatTradeRecordTime,
  getAvgFillPrice,
  getFilledTotal,
  getLiquidityLabel,
  getOrderHistoryStatus,
  getOrderTradeAmount,
  type SpotOrder,
} from '../../data/trade'

export function SideBadge({ side }: { side: SpotOrder['side'] }) {
  const isBuy = side === 'buy'
  return (
    <span
      className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${
        isBuy ? 'border-success text-success' : 'border-danger text-danger'
      }`}
    >
      {isBuy ? '买入' : '卖出'}
    </span>
  )
}

export function TypeBadge({ type }: { type: SpotOrder['type'] }) {
  return (
    <span className="rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-secondary">
      {type === 'limit' ? '限价' : '市价'}
    </span>
  )
}

export function OrderPairHeader({
  order,
  showChevron = false,
  time,
}: {
  order: SpotOrder
  showChevron?: boolean
  time?: string
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="flex items-center gap-0.5 text-body-sm font-semibold text-primary">
          {order.base}/{order.quote}
          {showChevron && <ChevronRight className="h-3.5 w-3.5 text-secondary" />}
        </span>
        <SideBadge side={order.side} />
        <TypeBadge type={order.type} />
      </div>
      {time && (
        <span className="shrink-0 text-[10px] tabular-nums text-secondary">{time}</span>
      )}
    </div>
  )
}

export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 text-caption">
      <span className="shrink-0 text-secondary">{label}</span>
      <span className="break-all text-right tabular-nums text-primary">{value}</span>
    </div>
  )
}

/** 当前委托卡片（交易页 / 现货订单-当前委托） */
export function OpenOrderCard({
  order,
  onCancel,
  compact = false,
}: {
  order: SpotOrder
  onCancel?: () => void
  compact?: boolean
}) {
  return (
    <div className={compact ? 'py-2.5' : 'py-4'}>
      <OrderPairHeader
        order={order}
        showChevron
        time={formatTradeRecordTime(order.createdAt)}
      />
      <div className="mt-2">
        <DetailRow
          label={`委托价格(${order.quote})`}
          value={formatSpotQuote(order.price, order.quote)}
        />
        <DetailRow
          label={`委托数量(${order.base})`}
          value={formatSpotBase(order.amount, order.base)}
        />
        <DetailRow
          label={`交易额(${order.quote})`}
          value={formatSpotQuote(getOrderTradeAmount(order), order.quote)}
        />
        <DetailRow
          label={`已成交(${order.base})`}
          value={formatSpotBase(order.filled, order.base)}
        />
      </div>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className={`mt-3 rounded-md border border-border text-caption font-medium text-primary active:bg-elevated ${
            compact ? 'h-8 px-4' : 'h-9 w-full'
          }`}
        >
          撤单
        </button>
      )}
    </div>
  )
}

/** 历史委托卡片 */
export function HistoryOrderCard({ order }: { order: SpotOrder }) {
  const avgPrice = getAvgFillPrice(order)
  const filledTotal = getFilledTotal(order)

  return (
    <div>
      <OrderPairHeader
        order={order}
        showChevron
        time={formatTradeRecordTime(order.createdAt)}
      />
      <div className="mt-2">
        <DetailRow
          label="委托价格"
          value={formatSpotQuote(order.price, order.quote)}
        />
        <DetailRow
          label="委托数量"
          value={formatSpotBase(order.amount, order.base)}
        />
        <DetailRow
          label="成交均价"
          value={avgPrice > 0 ? formatSpotQuote(avgPrice, order.quote) : '--'}
        />
        <DetailRow
          label="成交数量"
          value={formatSpotBase(order.filled, order.base)}
        />
        <DetailRow
          label="成交总额"
          value={filledTotal > 0 ? formatSpotQuote(filledTotal, order.quote) : '--'}
        />
        <DetailRow
          label="手续费"
          value={order.fee > 0 ? formatSpotQuote(order.fee, order.quote) : '--'}
        />
        <DetailRow label="状态" value={getOrderHistoryStatus(order)} />
      </div>
    </div>
  )
}

/** 成交明细卡片 */
export function FillDetailCard({ order }: { order: SpotOrder }) {
  const filledTotal = getFilledTotal(order)

  return (
    <div className="py-4">
      <OrderPairHeader order={order} showChevron />
      <div className="mt-2">
        <DetailRow
          label="成交价格"
          value={formatSpotQuote(order.price, order.quote)}
        />
        <DetailRow
          label="成交数量"
          value={formatSpotBase(order.filled, order.base)}
        />
        <DetailRow
          label="成交总额"
          value={formatSpotQuote(filledTotal, order.quote)}
        />
        <DetailRow label="流动性方向" value={getLiquidityLabel(order)} />
        <DetailRow
          label="手续费"
          value={order.fee > 0 ? formatSpotQuote(order.fee, order.quote) : '--'}
        />
        <DetailRow label="成交时间" value={formatTradeRecordTime(order.createdAt)} />
      </div>
    </div>
  )
}
