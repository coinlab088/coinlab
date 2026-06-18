import { LineChart, TrendingUp, Wallet } from 'lucide-react'
import { usePrototype } from '../context/PrototypeContext'
import type { BottomTabId } from '../data/mock'

const tabIcons = {
  market: LineChart,
  trade: TrendingUp,
  assets: Wallet,
} as const

const tabs: { id: Exclude<BottomTabId, 'home'>; label: string }[] = [
  { id: 'market', label: '行情' },
  { id: 'trade', label: '交易' },
  { id: 'assets', label: '资产' },
]

export function BottomTabBar() {
  const { activeTab, setActiveTab } = usePrototype()

  return (
    <nav
      className="z-20 shrink-0 border-t border-border-subtle bg-base/95 backdrop-blur-sm"
      aria-label="主导航"
    >
      <div className="flex h-tab-bar items-stretch">
        {tabs.map((tab) => {
          const Icon = tabIcons[tab.id]
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 active:opacity-70 ${
                isActive ? 'text-brand' : 'text-primary-muted'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
