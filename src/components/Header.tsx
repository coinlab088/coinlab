import type { ReactNode } from 'react'
import {
  Bell,
  CircleHelp,
  Globe,
  Headphones,
  User,
} from 'lucide-react'
import { usePrototype } from '../context/PrototypeContext'

function HeaderIconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center text-secondary active:opacity-70"
    >
      {children}
    </button>
  )
}

export function Header() {
  const { user, openAuth, openAccount, openSheet, openHelpCenter, openSupportCenter } =
    usePrototype()

  return (
    <header className="sticky top-0 z-20 bg-base/95 backdrop-blur-sm">
      <div className="flex h-12 items-center justify-between gap-2 px-3">
        <span className="shrink-0 text-h3 font-semibold tracking-tight text-primary">
          Coin<span className="text-brand">Nova</span>
        </span>

        <div className="flex min-w-0 items-center justify-end">
          <HeaderIconButton
            label="语言"
            onClick={() => openSheet('language')}
          >
            <Globe className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </HeaderIconButton>
          <HeaderIconButton label="客服" onClick={openSupportCenter}>
            <Headphones className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </HeaderIconButton>
          <HeaderIconButton label="帮助中心" onClick={openHelpCenter}>
            <CircleHelp className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </HeaderIconButton>
          {user.isLoggedIn && (
            <HeaderIconButton label="通知">
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </HeaderIconButton>
          )}
          <HeaderIconButton
            label={user.isLoggedIn ? '个人中心' : '登录'}
            onClick={user.isLoggedIn ? openAccount : openAuth}
          >
            <User
              className={`h-[18px] w-[18px] ${user.isLoggedIn ? 'text-brand' : ''}`}
              strokeWidth={1.5}
            />
          </HeaderIconButton>
        </div>
      </div>
    </header>
  )
}
