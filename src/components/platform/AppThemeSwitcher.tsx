import { appThemes } from '../../data/appTheme'
import { usePrototype } from '../../context/PrototypeContext'

export function AppThemeSwitcher() {
  const { appTheme, setAppTheme } = usePrototype()

  return (
    <div
      className="inline-flex rounded-lg border border-border-subtle bg-elevated p-1"
      role="group"
      aria-label="APP 主题"
    >
      {appThemes.map((item) => {
        const active = appTheme === item.id
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => setAppTheme(item.id)}
            className={`min-w-[56px] rounded-md px-3 py-2 text-body-sm font-medium transition-colors ${
              active
                ? 'bg-brand text-brand-dark'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
