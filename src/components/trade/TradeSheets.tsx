import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { BottomSheet, SheetOption } from '../sheets/BottomSheet'
import { marketPairs, formatChangePercent, formatPrice } from '../../data/mock'
import { usePrototype } from '../../context/PrototypeContext'

export function PairPickerSheet() {
  const { tradeSheet, closeTradeSheet, selectedPairId, selectPair } = usePrototype()

  const open = tradeSheet === 'pair-picker'
  const [query, setQuery] = useState('')

  const pairs = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return marketPairs

    return marketPairs.filter(
      (pair) =>
        pair.symbol.toLowerCase().includes(q) ||
        pair.base.toLowerCase().includes(q) ||
        pair.quote.toLowerCase().includes(q) ||
        `${pair.base}/${pair.quote}`.toLowerCase().includes(q),
    )
  }, [query])

  function handleClose() {
    setQuery('')
    closeTradeSheet()
  }

  return (
    <BottomSheet title="选择交易对" open={open} onClose={handleClose}>
      <label className="mb-3 flex h-10 items-center gap-2 rounded-full bg-sunken px-3">
        <Search className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.5} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索交易对"
          className="min-w-0 flex-1 bg-transparent text-body-sm text-primary outline-none placeholder:text-secondary"
        />
      </label>

      <div className="max-h-[60vh] space-y-2 overflow-y-auto">
        {pairs.length === 0 ? (
          <p className="py-6 text-center text-body-sm text-secondary">
            未找到匹配的交易对
          </p>
        ) : (
          pairs.map((pair) => (
            <SheetOption
              key={pair.id}
              label={`${pair.base}/${pair.quote}`}
              hint={`${formatPrice(pair.price)} · ${formatChangePercent(pair.change24h)}`}
              selected={pair.id === selectedPairId}
              onClick={() => {
                selectPair(pair.id)
                handleClose()
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
