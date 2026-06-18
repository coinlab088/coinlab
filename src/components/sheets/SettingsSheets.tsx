import { usePrototype } from '../../context/PrototypeContext'
import { fiatCurrencies, locales } from '../../data/settings'
import { BottomSheet, SheetOption } from './BottomSheet'

export function SettingsSheets() {
  const {
    activeSheet,
    closeSheet,
    locale,
    setLocale,
    fiat,
    setFiat,
  } = usePrototype()

  return (
    <>
      <BottomSheet
        title="语言"
        open={activeSheet === 'language'}
        onClose={closeSheet}
      >
        <div className="space-y-2">
          {locales.map((item) => (
            <SheetOption
              key={item.id}
              label={item.label}
              selected={locale === item.id}
              onClick={() => {
                setLocale(item.id)
                closeSheet()
              }}
            />
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        title="法币显示"
        open={activeSheet === 'fiat'}
        onClose={closeSheet}
      >
        <p className="mb-3 text-body-sm text-secondary">
          用于资产估值与行情法币换算显示
        </p>
        <div className="space-y-2">
          {fiatCurrencies.map((item) => (
            <SheetOption
              key={item.id}
              label={item.label}
              hint={`符号 ${item.symbol}`}
              selected={fiat === item.id}
              onClick={() => {
                setFiat(item.id)
                closeSheet()
              }}
            />
          ))}
        </div>
      </BottomSheet>
    </>
  )
}
