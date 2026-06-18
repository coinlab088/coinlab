export type KlineInterval = '15m' | '1H' | '4H' | '1D' | '1W'

export interface ChartScreenState {
  pairId: string
}

export interface Candle {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export const klineIntervals: { id: KlineInterval; label: string }[] = [
  { id: '15m', label: '15分' },
  { id: '1H', label: '1时' },
  { id: '4H', label: '4时' },
  { id: '1D', label: '1日' },
  { id: '1W', label: '1周' },
]

export const klineCopy = {
  title: 'K 线',
  high24h: '24h 最高',
  low24h: '24h 最低',
  vol24h: '24h 成交量',
} as const

export function generateCandles(basePrice: number, count = 48): Candle[] {
  const candles: Candle[] = []
  let price = basePrice
  const now = Date.now()

  for (let i = count - 1; i >= 0; i -= 1) {
    const drift = (Math.random() - 0.48) * basePrice * 0.012
    const open = price
    const close = Math.max(basePrice * 0.85, open + drift)
    const high = Math.max(open, close) + Math.random() * basePrice * 0.004
    const low = Math.min(open, close) - Math.random() * basePrice * 0.004
    const volume = basePrice * (800 + Math.random() * 4000)

    candles.push({
      time: now - i * 3_600_000,
      open,
      high,
      low,
      close,
      volume,
    })
    price = close
  }

  return candles
}

export function getIntervalSeed(interval: KlineInterval): number {
  switch (interval) {
    case '15m':
      return 1
    case '1H':
      return 2
    case '4H':
      return 3
    case '1D':
      return 4
    default:
      return 5
  }
}
