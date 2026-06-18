import type { MarketPair } from './mock'
import { formatPrice } from './mock'

export type OrderSide = 'buy' | 'sell'
export type OrderType = 'limit' | 'market'
export type OrderStatus = 'open' | 'filled' | 'cancelled'

export interface SpotBalance {
  symbol: string
  available: number
  frozen: number
}

export interface OrderBookLevel {
  price: number
  amount: number
}

export interface SpotOrder {
  id: string
  pairId: string
  base: string
  quote: string
  side: OrderSide
  type: OrderType
  price: number
  amount: number
  filled: number
  total: number
  fee: number
  status: OrderStatus
  createdAt: number
}

export interface PendingOrder {
  pairId: string
  base: string
  quote: string
  side: OrderSide
  type: OrderType
  price: number
  amount: number
  total: number
  fee: number
}

export type TradeSheet = 'confirm' | 'pair-picker' | 'add-favorite' | null
export type TradePanelTab = 'orders' | 'assets'

export const TRADE_FEE_RATE = 0.001

export const defaultSpotBalances: SpotBalance[] = [
  { symbol: 'USDT', available: 8_420.5, frozen: 0 },
  { symbol: 'BTC', available: 0.0524, frozen: 0 },
  { symbol: 'ETH', available: 1.18, frozen: 0 },
  { symbol: 'BNB', available: 4.28, frozen: 0 },
  { symbol: 'TRX', available: 12_800, frozen: 0 },
  { symbol: 'SOL', available: 8.6, frozen: 0 },
]

export function generateOrderBook(midPrice: number): {
  asks: OrderBookLevel[]
  bids: OrderBookLevel[]
} {
  const asks: OrderBookLevel[] = []
  const bids: OrderBookLevel[] = []
  const step = midPrice >= 100 ? midPrice * 0.00015 : midPrice * 0.0008

  for (let i = 5; i >= 1; i -= 1) {
    asks.push({
      price: midPrice + step * i,
      amount: 0.08 + i * 0.04,
    })
    bids.push({
      price: midPrice - step * i,
      amount: 0.1 + i * 0.035,
    })
  }

  return { asks, bids }
}

export function getAmountDecimals(symbol: string): number {
  if (symbol === 'BTC') return 5
  if (symbol === 'ETH') return 4
  if (symbol === 'TRX') return 0
  if (symbol === 'USDT') return 2
  return 3
}

export function formatTradeAmount(value: number, symbol: string): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: getAmountDecimals(symbol),
  })
}

export function calcOrderTotal(
  price: number,
  amount: number,
  side: OrderSide,
): { total: number; fee: number } {
  const gross = price * amount
  const fee = gross * TRADE_FEE_RATE
  return {
    total: side === 'buy' ? gross + fee : gross - fee,
    fee,
  }
}

export function getAvailableBalance(
  balances: SpotBalance[],
  symbol: string,
): number {
  return balances.find((b) => b.symbol === symbol)?.available ?? 0
}

export function validateOrderInput(input: {
  side: OrderSide
  type: OrderType
  price: number
  amount: number
  pair: MarketPair
  balances: SpotBalance[]
}): string | null {
  const { side, type, price, amount, pair, balances } = input

  if (!amount || amount <= 0) return '请输入有效数量'
  if (type === 'limit' && (!price || price <= 0)) return '请输入有效价格'

  const effectivePrice = type === 'market' ? pair.price : price
  const { total, fee } = calcOrderTotal(effectivePrice, amount, side)

  if (side === 'buy') {
    const usdt = getAvailableBalance(balances, pair.quote)
    if (total > usdt) return 'USDT 余额不足'
  } else {
    const base = getAvailableBalance(balances, pair.base)
    if (amount > base) return `${pair.base} 余额不足`
  }

  if (fee <= 0) return '订单金额过小'

  return null
}

export function formatOrderPrice(price: number, quote = 'USDT'): string {
  return `${formatPrice(price)} ${quote}`
}

export function formatOrderTime(ts: number): string {
  return new Date(ts).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function applyMarketFill(
  balances: SpotBalance[],
  order: Pick<SpotOrder, 'side' | 'base' | 'quote' | 'price' | 'amount' | 'total' | 'fee'>,
): SpotBalance[] {
  const next = balances.map((b) => ({ ...b }))

  const adjust = (symbol: string, availableDelta: number) => {
    const row = next.find((b) => b.symbol === symbol)
    if (row) row.available = Math.max(0, row.available + availableDelta)
  }

  if (order.side === 'buy') {
    adjust(order.quote, -order.total)
    adjust(order.base, order.amount)
  } else {
    adjust(order.base, -order.amount)
    adjust(order.quote, order.price * order.amount - order.fee)
  }

  return next
}

export function freezeForLimitOrder(
  balances: SpotBalance[],
  order: Pick<PendingOrder, 'side' | 'base' | 'quote' | 'amount' | 'total'>,
): SpotBalance[] {
  const next = balances.map((b) => ({ ...b }))

  if (order.side === 'buy') {
    const row = next.find((b) => b.symbol === order.quote)
    if (row) {
      row.available -= order.total
      row.frozen += order.total
    }
  } else {
    const row = next.find((b) => b.symbol === order.base)
    if (row) {
      row.available -= order.amount
      row.frozen += order.amount
    }
  }

  return next
}

export function unfreezeLimitOrder(
  balances: SpotBalance[],
  order: Pick<SpotOrder, 'side' | 'base' | 'quote' | 'amount' | 'total'>,
): SpotBalance[] {
  const next = balances.map((b) => ({ ...b }))

  if (order.side === 'buy') {
    const row = next.find((b) => b.symbol === order.quote)
    if (row) {
      row.available += order.total
      row.frozen = Math.max(0, row.frozen - order.total)
    }
  } else {
    const row = next.find((b) => b.symbol === order.base)
    if (row) {
      row.available += order.amount
      row.frozen = Math.max(0, row.frozen - order.amount)
    }
  }

  return next
}

export const tradeCopy = {
  buy: '买入',
  sell: '卖出',
  limit: '限价',
  market: '市价',
  openOrders: '委托',
  assets: '资产',
  confirmTitle: '确认下单',
  placeOrder: '下单',
} as const
