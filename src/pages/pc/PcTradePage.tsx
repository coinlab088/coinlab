import { useMemo, useState } from 'react'
import { usePrototype } from '../../context/PrototypeContext'
import { marketPairs } from '../../data/mock'
import { generateOrderBook } from '../../data/trade'
import { PcAppLayout } from '../../components/pc/PcAppLayout'
import { PcTradeChartPanel } from '../../components/pc/PcTradeChartPanel'
import { PcTradeTickerBar } from '../../components/pc/PcTradeTickerBar'
import { OrderBook } from '../../components/trade/OrderBook'
import { OrderForm } from '../../components/trade/OrderForm'
import { TradeBottomPanel } from '../../components/trade/TradeBottomPanel'

export function PcTradePage() {
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
    <PcAppLayout scroll="hidden">
      <div className="flex h-full min-h-0 flex-col">
        <PcTradeTickerBar
          pair={pair}
          onSelectPair={() => openTradeSheet('pair-picker')}
        />

        <div className="flex min-h-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1">
              <PcTradeChartPanel pair={pair} />

              <div className="flex w-[260px] shrink-0 flex-col border-l border-border-subtle bg-base p-2">
                <OrderBook
                  pair={pair}
                  asks={asks}
                  bids={bids}
                  onPriceSelect={setSelectedPrice}
                />
              </div>
            </div>

            <div className="h-[200px] shrink-0 border-t border-border-subtle bg-base">
              <TradeBottomPanel
                variant="pc"
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
            </div>
          </div>

          <div className="w-[300px] shrink-0 overflow-y-auto border-l border-border-subtle bg-base p-3">
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
        </div>
      </div>
    </PcAppLayout>
  )
}
