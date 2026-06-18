import { previewPlatforms } from '../../data/platform'
import { usePrototype } from '../../context/PrototypeContext'
import { AppThemeSwitcher } from './AppThemeSwitcher'

export function PlatformSwitcher() {
  const { previewPlatform, setPreviewPlatform } = usePrototype()

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div
        className="inline-flex rounded-lg border border-border-subtle bg-elevated p-1"
        role="tablist"
        aria-label="预览端"
      >
        {previewPlatforms.map((platform) => {
          const active = previewPlatform === platform.id
          return (
            <button
              key={platform.id}
              type="button"
              role="tab"
              aria-selected={active}
              title={platform.hint}
              onClick={() => setPreviewPlatform(platform.id)}
              className={`min-w-[72px] rounded-md px-4 py-2 text-body-sm font-medium transition-colors ${
                active
                  ? 'bg-brand text-brand-dark'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {platform.label}
            </button>
          )
        })}
      </div>

      {previewPlatform === 'app' && <AppThemeSwitcher />}

      <p className="text-caption text-primary-muted">
        {previewPlatforms.find((p) => p.id === previewPlatform)?.hint}
      </p>
    </div>
  )
}
