import type { ReactNode } from 'react'
import { Home, LineChart, TrendingUp, Wallet } from 'lucide-react'
import { usePrototype } from '../../context/PrototypeContext'
import type { BottomTabId } from '../../data/mock'
import { PcTopBar } from './PcTopBar'

const navItems: { id: BottomTabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'market', label: '行情', icon: LineChart },
  { id: 'trade', label: '交易', icon: TrendingUp },
  { id: 'assets', label: '资产', icon: Wallet },
]

interface PcAppLayoutProps {
  children: ReactNode
}

export function PcAppLayout({ children }: PcAppLayoutProps) {
  const { activeTab, setActiveTab } = usePrototype()

  return (
    <div className="flex h-full min-h-0 flex-col bg-base">
      <PcTopBar />
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-52 shrink-0 flex-col border-r border-border-subtle bg-sunken px-3 py-4">
          <nav className="space-y-1" aria-label="主导航">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm font-medium ${
                    active
                      ? 'bg-brand-muted text-brand'
                      : 'text-secondary hover:bg-elevated hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={active ? 2 : 1.5} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </main>
      </div>
    </div>
  )
}
