import { ArrowUpDown } from 'lucide-react'

export function MarketListHeader() {
  return (
    <div className="flex items-center justify-between px-3 py-2 text-[10px] text-secondary">
      <span className="flex items-center gap-0.5">
        名称 / 成交额
        <ArrowUpDown className="h-3 w-3" strokeWidth={1.5} />
      </span>
      <span className="flex items-center gap-0.5">
        价格 / 24H涨幅
        <ArrowUpDown className="h-3 w-3" strokeWidth={1.5} />
      </span>
    </div>
  )
}
