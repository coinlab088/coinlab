import { CircleHelp, Headphones } from 'lucide-react'
import { usePrototype } from '../context/PrototypeContext'

const items = [
  { id: 'support' as const, label: '客服', icon: Headphones },
  { id: 'help' as const, label: '帮助中心', icon: CircleHelp },
]

export function ServiceEntries() {
  const { openHelpCenter, openSupportCenter } = usePrototype()

  return (
    <nav
      aria-label="基础服务"
      className="flex border-b border-border-subtle px-6 pb-4 pt-1"
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              item.id === 'help' ? openHelpCenter() : openSupportCenter()
            }
            className="flex flex-1 flex-col items-center gap-2 active:opacity-70"
          >
            <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
            <span className="text-caption text-secondary">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
