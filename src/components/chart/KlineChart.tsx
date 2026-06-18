import { useMemo } from 'react'
import type { Candle } from '../../data/kline'

interface KlineChartProps {
  candles: Candle[]
  height?: number
}

export function KlineChart({ candles, height = 240 }: KlineChartProps) {
    const { paths, min, max } = useMemo(() => {
    if (candles.length === 0) {
      return { paths: [], volumes: [], min: 0, max: 1 }
    }

    const lows = candles.map((c) => c.low)
    const highs = candles.map((c) => c.high)
    const minPrice = Math.min(...lows)
    const maxPrice = Math.max(...highs)
    const range = maxPrice - minPrice || 1
    const maxVol = Math.max(...candles.map((c) => c.volume))
    const barWidth = 100 / candles.length
    const gap = barWidth * 0.2

    const candlePaths = candles.map((c, i) => {
      const x = i * barWidth + barWidth / 2
      const yHigh = ((maxPrice - c.high) / range) * 72 + 4
      const yLow = ((maxPrice - c.low) / range) * 72 + 4
      const yOpen = ((maxPrice - c.open) / range) * 72 + 4
      const yClose = ((maxPrice - c.close) / range) * 72 + 4
      const up = c.close >= c.open
      const bodyTop = Math.min(yOpen, yClose)
      const bodyH = Math.max(Math.abs(yClose - yOpen), 0.8)
      const volH = (c.volume / maxVol) * 18

      return {
        wick: `M${x} ${yHigh} L${x} ${yLow}`,
        body: {
          x: x - (barWidth - gap) / 2,
          y: bodyTop,
          w: barWidth - gap,
          h: bodyH,
          up,
        },
        vol: {
          x: x - (barWidth - gap) / 2,
          y: 96 - volH,
          w: barWidth - gap,
          h: volH,
          up,
        },
      }
    })

    return { paths: candlePaths, min: minPrice, max: maxPrice }
  }, [candles])

  return (
    <div className="relative w-full" style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        {[0, 25, 50, 75].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y * 0.72 + 4}
            x2="100"
            y2={y * 0.72 + 4}
            stroke="#1A1A1A"
            strokeWidth="0.15"
          />
        ))}
        {paths.map((p, i) => (
          <g key={i}>
            <path d={p.wick} stroke={p.body.up ? '#22C55E' : '#EF4444'} strokeWidth="0.2" />
            <rect
              x={p.body.x}
              y={p.body.y}
              width={p.body.w}
              height={p.body.h}
              fill={p.body.up ? '#22C55E' : '#EF4444'}
              rx="0.1"
            />
            <rect
              x={p.vol.x}
              y={p.vol.y}
              width={p.vol.w}
              height={p.vol.h}
              fill={p.vol.up ? '#22C55E55' : '#EF444455'}
              rx="0.1"
            />
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute right-0 top-0 flex h-[72%] flex-col justify-between py-1 text-[9px] tabular-nums text-secondary">
        <span>{max.toFixed(2)}</span>
        <span>{((max + min) / 2).toFixed(2)}</span>
        <span>{min.toFixed(2)}</span>
      </div>
    </div>
  )
}
