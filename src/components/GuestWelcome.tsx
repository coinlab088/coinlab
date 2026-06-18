import { CoinLabLogo } from './CoinLabLogo'
import { usePrototype } from '../context/PrototypeContext'

interface GuestWelcomeProps {
  themedLogo?: boolean
}

export function GuestWelcome({ themedLogo = false }: GuestWelcomeProps) {
  const { openAuth } = usePrototype()

  return (
    <section className="flex flex-col items-center px-6 pb-4 pt-7 text-center">
      <CoinLabLogo size={96} className="shadow-sm" themed={themedLogo} />

      <h1 className="mt-7 text-h1 font-semibold tracking-tight text-primary">
        欢迎来到 CoinLab
      </h1>
      <p className="mt-2 max-w-[280px] text-body-sm leading-relaxed text-secondary">
        注册后即可充币、交易与管理数字资产
      </p>

      <button
        type="button"
        onClick={openAuth}
        className="mt-8 h-12 w-full rounded-full bg-brand text-body font-semibold text-brand-dark active:bg-brand-hover"
      >
        注册 / 登录
      </button>
    </section>
  )
}
