import { useMemo, useState } from 'react'
import { usePrototype } from '../../context/PrototypeContext'
import { marketPairs } from '../../data/mock'
import { generateOrderBook } from '../../data/trade'
import { PcAppLayout } from '../../components/pc/PcAppLayout'
import { OrderBook } from '../../components/trade/OrderBook'
import { OrderForm } from '../../components/trade/OrderForm'
import { TradeBottomPanel } from '../../components/trade/TradeBottomPanel'
import { TradePairBar } from '../../components/trade/TradePairBar'

export function PcTradePage() {
  const {
    user,
    openAuth,
    selectedPairId,
    spotBalances,
    orders,
    submitOrder,
    cancelOrder,
    openTradeSheet,
    openOrderHistory,
    openKline,
  } = usePrototype()

  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)

  const pair = useMemo(
    () => marketPairs.find((p) => p.id === selectedPairId) ?? marketPairs[0],
    [selectedPairId],
  )

  const { asks, bids } = useMemo(
    () => generateOrderBook(pair.price),
    [pair.price],
  )

  return (
    <PcAppLayout>
      <div className="flex h-full min-h-0 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <TradePairBar
            pair={pair}
            onSelectPair={() => openTradeSheet('pair-picker')}
            onOpenKline={() => openKline(pair.id)}
          />
          <span className="rounded-full bg-brand-muted px-3 py-1 text-caption font-medium text-brand">
            现货交易
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(280px,320px)_minmax(200px,1fr)_minmax(280px,360px)] gap-4">
          <div className="rounded-xl border border-border-subtle bg-elevated p-4">
            <OrderForm
              pair={pair}
              balances={spotBalances}
              isLoggedIn={user.isLoggedIn}
              onLogin={openAuth}
              selectedPrice={selectedPrice}
              onSubmit={({ side, type, price, amount, total, fee }) =>
                submitOrder({
                  pairId: pair.id,
                  base: pair.base,
                  quote: pair.quote,
                  side,
                  type,
                  price,
                  amount,
                  total,
                  fee,
                })
              }
            />
          </div>

          <div className="rounded-xl border border-border-subtle bg-elevated p-3">
            <OrderBook
              pair={pair}
              asks={asks}
              bids={bids}
              onPriceSelect={setSelectedPrice}
            />
          </div>

          <div className="min-h-0 overflow-hidden rounded-xl border border-border-subtle bg-elevated">
            <TradeBottomPanel
              orders={orders}
              balances={spotBalances}
              pairBase={pair.base}
              pairQuote={pair.quote}
              onCancel={cancelOrder}
              onOpenOrderHistory={openOrderHistory}
              isLoggedIn={user.isLoggedIn}
            />
          </div>
        </div>
      </div>
    </PcAppLayout>
  )
}
