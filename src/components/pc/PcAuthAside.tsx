import { useMemo } from 'react'
import { Send } from 'lucide-react'
import { CoinAvatar } from '../CoinAvatar'
import { KlineChart } from '../chart/KlineChart'
import { marketPairs } from '../../data/marketPairs'
import { formatChangePercent, formatPrice } from '../../data/mock'
import { generateCandles } from '../../data/kline'

const previewPair = marketPairs[0]

function PcAuthPhonePreview() {
  const isPositive = previewPair.change24h >= 0
  const candles = useMemo(
    () => generateCandles(previewPair.price, 48),
    [],
  )

  const high24h = previewPair.price * 1.018
  const low24h = previewPair.price * 0.982
  const turnover = previewPair.volume24h * previewPair.price

  return (
    <div className="relative w-[272px]" aria-hidden>
      <div className="overflow-hidden rounded-[28px] bg-[#1a1a1a] shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center justify-center pt-2.5">
          <div className="h-1 w-16 rounded-full bg-white/20" />
        </div>

        <div className="px-3.5 pb-3 pt-2">
          <div className="flex items-center gap-2">
            <CoinAvatar symbol={previewPair.base} size={22} />
            <span className="text-[13px] font-semibold text-primary">
              {previewPair.base}/{previewPair.quote}
            </span>
          </div>

          <div className="mt-2 flex items-start justify-between gap-2">
            <div>
              <p
                className={`text-[26px] font-semibold leading-none tabular-nums ${
                  isPositive ? 'text-success' : 'text-danger'
                }`}
              >
                {formatPrice(previewPair.price)}
              </p>
              <p
                className={`mt-1 text-[11px] tabular-nums ${
                  isPositive ? 'text-success' : 'text-danger'
                }`}
              >
                {formatChangePercent(previewPair.change24h)}
              </p>
            </div>
            <div className="grid shrink-0 gap-0.5 text-right text-[9px] leading-tight text-secondary">
              <p>
                <span className="text-secondary/70">24h 高 </span>
                {formatPrice(high24h)}
              </p>
              <p>
                <span className="text-secondary/70">24h 低 </span>
                {formatPrice(low24h)}
              </p>
              <p>
                <span className="text-secondary/70">24h 量 </span>
                {(previewPair.volume24h / 1_000_000).toFixed(2)}M
              </p>
              <p>
                <span className="text-secondary/70">24h 额 </span>
                ${(turnover / 1_000_000_000).toFixed(2)}B
              </p>
            </div>
          </div>

          <div className="mt-3 flex gap-3 border-b border-border-subtle pb-2 text-[10px]">
            {['图表', '概况', '数据', '交易'].map((tab, i) => (
              <span
                key={tab}
                className={
                  i === 0
                    ? 'font-medium text-primary'
                    : 'text-secondary'
                }
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-secondary/70">
            <div className="flex gap-2">
              {['15m', '1h', '4h', '1D'].map((tf, i) => (
                <span
                  key={tf}
                  className={i === 1 ? 'text-brand' : undefined}
                >
                  {tf}
                </span>
              ))}
            </div>
            <span>MA7 · MA30</span>
          </div>

          <div className="mt-1 overflow-hidden rounded-lg bg-black/30">
            <KlineChart candles={candles} height={108} />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 left-1/2 h-20 w-40 -translate-x-1/2 rounded-full bg-brand/15 blur-2xl" />
    </div>
  )
}

export function PcAuthAside() {
  return (
    <aside className="relative flex w-[38%] shrink-0 flex-col overflow-hidden bg-sunken px-10 py-12 lg:px-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(255,204,0,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <header className="shrink-0">
          <h2 className="text-[28px] font-bold leading-tight text-primary lg:text-[32px]">
            安心交易！
          </h2>
          <p className="mt-3 max-w-sm text-body-sm leading-relaxed text-secondary">
            CoinNova 绝不会将用户的资金借出。您可以通过我们定期发布的储备金证明与
            SAFU 用户保护基金进行验证。
          </p>
        </header>

        <div className="flex flex-1 items-center justify-center py-8">
          <PcAuthPhonePreview />
        </div>

        <div className="shrink-0 rounded-xl bg-elevated p-4 ring-1 ring-border-subtle transition-colors hover:bg-elevated/80">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-muted">
              <Send className="h-4 w-4 text-brand" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-body font-semibold text-primary">
                加入我们的 Telegram 社区
              </p>
              <p className="mt-0.5 text-body-sm text-secondary">
                学课程、享福利、共交流
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
