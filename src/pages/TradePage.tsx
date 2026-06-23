import { useMemo, useState } from 'react'
import { usePrototype } from '../context/PrototypeContext'
import { marketPairs } from '../data/mock'
import { generateOrderBook } from '../data/trade'
import { AppLayout } from '../components/AppLayout'
import { Annotatable } from '../components/inspect/Annotatable'
import { OrderBook } from '../components/trade/OrderBook'
import { OrderForm } from '../components/trade/OrderForm'
import { TradeBottomPanel } from '../components/trade/TradeBottomPanel'
import { TradePairBar } from '../components/trade/TradePairBar'

export function TradePage() {
  const {
    user,
    openAuth,
    selectedPairId,
    spotBalances,
    orders,
    submitOrder,
    cancelOrder,
    cancelAllOpenOrders,
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
    <AppLayout>
      <div className="border-b border-border-subtle px-3 pt-1">
        <div className="flex gap-4">
          <span className="relative py-2 text-caption font-medium text-primary">
            现货
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
          </span>
        </div>
      </div>

      <TradePairBar
        pair={pair}
        onSelectPair={() => openTradeSheet('pair-picker')}
        onOpenKline={() => openKline(pair.id)}
      />

      <div className="flex items-start gap-2 px-3 pb-2">
        <Annotatable id="trade-order-form">
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
        </Annotatable>
        <OrderBook
          pair={pair}
          asks={asks}
          bids={bids}
          onPriceSelect={setSelectedPrice}
        />
      </div>

      <TradeBottomPanel
        orders={orders}
        balances={spotBalances}
        pairBase={pair.base}
        pairQuote={pair.quote}
        pairId={pair.id}
        onCancel={cancelOrder}
        onCancelAll={cancelAllOpenOrders}
        onOpenOrderHistory={openOrderHistory}
        isLoggedIn={user.isLoggedIn}
      />
    </AppLayout>
  )
}
