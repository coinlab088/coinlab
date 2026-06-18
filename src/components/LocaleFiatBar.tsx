import { usePrototype } from '../context/PrototypeContext'
import { fiatCurrencies, locales } from '../data/settings'

export function LocaleFiatBar() {
  const { locale, fiat, openSheet } = usePrototype()

  const localeLabel =
    locales.find((l) => l.id === locale)?.short ?? locale
  const fiatLabel = fiatCurrencies.find((f) => f.id === fiat)?.id ?? fiat

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <button
        type="button"
        onClick={() => openSheet('language')}
        className="rounded-md border border-border-subtle bg-sunken px-3 py-1.5 text-caption text-primary active:opacity-70"
      >
        {localeLabel}
      </button>
      <button
        type="button"
        onClick={() => openSheet('fiat')}
        className="rounded-md border border-border-subtle bg-sunken px-3 py-1.5 text-caption text-primary active:opacity-70"
      >
        {fiatLabel}
      </button>
    </div>
  )
}
