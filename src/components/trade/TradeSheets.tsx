import { BottomSheet, SheetOption } from '../sheets/BottomSheet'
import { marketPairs } from '../../data/mock'
import { formatChangePercent, formatPrice } from '../../data/mock'
import { usePrototype } from '../../context/PrototypeContext'

export function PairPickerSheet() {
  const {
    tradeSheet,
    closeTradeSheet,
    selectedPairId,
    selectPair,
    favoritePairIds,
    addFavorite,
  } = usePrototype()

  const isTradePicker = tradeSheet === 'pair-picker'
  const isAddFavorite = tradeSheet === 'add-favorite'
  const open = isTradePicker || isAddFavorite

  const pairs = isAddFavorite
    ? marketPairs.filter((p) => !favoritePairIds.includes(p.id))
    : marketPairs

  return (
    <BottomSheet
      title={isAddFavorite ? '添加自选' : '选择交易对'}
      open={open}
      onClose={closeTradeSheet}
    >
      <div className="max-h-[60vh] space-y-2 overflow-y-auto">
        {pairs.length === 0 ? (
          <p className="py-6 text-center text-body-sm text-secondary">
            已全部加入自选
          </p>
        ) : (
          pairs.map((pair) => (
            <SheetOption
              key={pair.id}
              label={`${pair.base}/${pair.quote}`}
              hint={`${formatPrice(pair.price)} · ${formatChangePercent(pair.change24h)}`}
              selected={isTradePicker && pair.id === selectedPairId}
              onClick={() => {
                if (isAddFavorite) {
                  addFavorite(pair.id)
                } else {
                  selectPair(pair.id)
                }
                closeTradeSheet()
              }}
            />
          ))
        )}
      </div>
    </BottomSheet>
  )
}

export function OrderConfirmSheet() {
  const {
    tradeSheet,
    pendingOrder,
    confirmOrder,
    cancelPendingOrder,
  } = usePrototype()

  if (!pendingOrder) return null

  const isBuy = pendingOrder.side === 'buy'

  return (
    <BottomSheet
      title="确认下单"
      open={tradeSheet === 'confirm'}
      onClose={cancelPendingOrder}
    >
      <div className="space-y-3">
        <div className="rounded-lg border border-border-subtle bg-sunken px-4 py-3 text-body-sm">
          <div className="flex justify-between py-1.5">
            <span className="text-secondary">交易对</span>
            <span className="text-primary">
              {pendingOrder.base}/{pendingOrder.quote}
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-secondary">方向</span>
            <span className={isBuy ? 'text-success' : 'text-danger'}>
              {isBuy ? '买入' : '卖出'} ·{' '}
              {pendingOrder.type === 'limit' ? '限价' : '市价'}
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-secondary">价格</span>
            <span className="tabular-nums text-primary">
              {formatPrice(pendingOrder.price)} {pendingOrder.quote}
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-secondary">数量</span>
            <span className="tabular-nums text-primary">
              {pendingOrder.amount} {pendingOrder.base}
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-secondary">
              {pendingOrder.side === 'buy' ? '应付' : '实收'}
            </span>
            <span className="tabular-nums text-primary">
              {formatPrice(pendingOrder.total)} {pendingOrder.quote}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={confirmOrder}
          className={`h-11 w-full rounded-md text-body-sm font-semibold text-white ${
            isBuy ? 'bg-success' : 'bg-danger'
          }`}
        >
          确认{isBuy ? '买入' : '卖出'}
        </button>
        <button
          type="button"
          onClick={cancelPendingOrder}
          className="h-11 w-full rounded-md border border-border text-body-sm text-primary"
        >
          取消
        </button>
      </div>
    </BottomSheet>
  )
}
