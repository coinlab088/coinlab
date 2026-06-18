import { Search } from 'lucide-react'

interface MarketSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function MarketSearchBar({ value, onChange }: MarketSearchBarProps) {
  return (
    <div className="px-3 pt-2">
      <label className="flex h-9 items-center gap-2 rounded-full bg-sunken px-3">
        <Search className="h-4 w-4 text-secondary" strokeWidth={1.5} />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索币种"
          className="min-w-0 flex-1 bg-transparent text-body-sm text-primary outline-none placeholder:text-secondary"
        />
      </label>
    </div>
  )
}
