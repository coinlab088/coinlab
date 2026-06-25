import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Gift,
  Headphones,
} from 'lucide-react'
import type { QuickAction } from '../data/mock'
import { usePrototype } from '../context/PrototypeContext'

const iconMap = {
  deposit: ArrowDownToLine,
  withdraw: ArrowUpFromLine,
  invite: Gift,
  support: Headphones,
} as const

interface QuickActionsProps {
  actions: QuickAction[]
}

export function QuickActions({ actions }: QuickActionsProps) {
  const { openWallet, openSupportCenter, navigateAccount } = usePrototype()

  return (
    <nav
      aria-label="快捷操作"
      className="layout-screen-x layout-section-y grid grid-cols-4 gap-2"
    >
      {actions.map((action) => {
        const Icon = iconMap[action.id]

        return (
          <button
            key={action.id}
            type="button"
            onClick={() => {
              if (action.id === 'deposit') openWallet('deposit')
              if (action.id === 'withdraw') openWallet('withdraw')
              if (action.id === 'invite') navigateAccount({ screen: 'invite' })
              if (action.id === 'support') openSupportCenter()
            }}
            className="flex flex-col items-center gap-1.5 py-1 active:opacity-70"
          >
            <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
            <span className="text-center text-[10px] leading-tight text-secondary">
              {action.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
