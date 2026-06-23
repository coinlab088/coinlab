import { recordsCopy } from '../../data/records'
import {
  formatSpotBase,
  formatSpotQuote,
  formatTradeRecordTime,
  getAvgFillPrice,
  getFilledTotal,
  getLiquidityLabel,
  getOrderHistoryStatus,
  getOrderTradeAmount,
} from '../../data/trade'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import {
  DetailRow,
  OrderPairHeader,
} from '../../components/trade/SpotOrderCards'

export function OrderDetailPage() {
  const { recordsScreen, orders, navigateRecords } = usePrototype()
  const order = orders.find((o) => o.id === recordsScreen?.orderId)

  if (!order) return null

  const isFillView = order.filled > 0 && order.status !== 'open'
  const avgPrice = getAvgFillPrice(order)
  const filledTotal = getFilledTotal(order)

  function handleBack() {
    navigateRecords({ screen: 'orders' })
  }

  return (
    <SubPageLayout title={recordsCopy.orderDetailTitle} onBack={handleBack}>
      <OrderPairHeader order={order} time={formatTradeRecordTime(order.createdAt)} />

      <div className="mt-4 rounded-lg border border-border-subtle bg-sunken px-4 py-2">
        {isFillView ? (
          <>
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
          </>
        ) : (
          <>
            <DetailRow
              label="委托价格"
              value={formatSpotQuote(order.price, order.quote)}
            />
            <DetailRow
              label="委托数量"
              value={formatSpotBase(order.amount, order.base)}
            />
            <DetailRow
              label="交易额"
              value={formatSpotQuote(getOrderTradeAmount(order), order.quote)}
            />
            <DetailRow
              label="已成交"
              value={formatSpotBase(order.filled, order.base)}
            />
            {order.status !== 'open' && (
              <>
                <DetailRow
                  label="成交均价"
                  value={avgPrice > 0 ? formatSpotQuote(avgPrice, order.quote) : '--'}
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
              </>
            )}
          </>
        )}
        <DetailRow label="订单号" value={order.id} />
      </div>
    </SubPageLayout>
  )
}
