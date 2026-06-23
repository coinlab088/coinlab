import type { MarketTab } from '../data/mock'

interface MarketTabsProps {
  tabs: { id: MarketTab; label: string }[]
  active: MarketTab
  onChange: (tab: MarketTab) => void
}

export function MarketTabs({ tabs, active, onChange }: MarketTabsProps) {
  return (
    <div className="flex gap-5">
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative pb-3 text-body-sm font-medium transition-colors duration-200 active:opacity-70 ${
              isActive ? 'text-primary' : 'text-secondary'
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
        )
      })}
    </div>
  )
}
