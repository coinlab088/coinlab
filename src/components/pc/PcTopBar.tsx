import type { ReactNode } from 'react'
import {
  Bell,
  CircleDollarSign,
  CircleHelp,
  Globe,
  Headphones,
  User,
} from 'lucide-react'
import { CoinNovaLogo } from '../CoinNovaLogo'
import { usePrototype } from '../../context/PrototypeContext'

function TopIcon({
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
      className="flex h-9 w-9 items-center justify-center rounded-md text-secondary hover:bg-elevated hover:text-primary"
    >
      {children}
    </button>
  )
}

export function PcTopBar() {
  const {
    user,
    openAuth,
    openAccount,
    openSheet,
    openHelpCenter,
    openSupportCenter,
  } = usePrototype()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-subtle bg-base px-5">
      <div className="flex items-center gap-3">
        <CoinNovaLogo size={32} />
        <span className="text-h3 font-semibold tracking-tight text-primary">
          Coin<span className="text-brand">Nova</span>
        </span>
        <span className="rounded bg-sunken px-2 py-0.5 text-[10px] text-secondary">
          Web
        </span>
      </div>

      <div className="flex items-center gap-1">
        <TopIcon label="语言" onClick={() => openSheet('language')}>
          <Globe className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </TopIcon>
        <TopIcon label="法币" onClick={() => openSheet('fiat')}>
          <CircleDollarSign className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </TopIcon>
        <TopIcon label="客服" onClick={openSupportCenter}>
          <Headphones className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </TopIcon>
        <TopIcon label="帮助中心" onClick={openHelpCenter}>
          <CircleHelp className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </TopIcon>
        {user.isLoggedIn && (
          <TopIcon label="通知">
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </TopIcon>
        )}
        <button
          type="button"
          onClick={user.isLoggedIn ? openAccount : openAuth}
          className="ml-2 flex items-center gap-2 rounded-lg border border-border-subtle bg-elevated px-3 py-1.5 text-body-sm text-primary hover:border-brand/40"
        >
          <User
            className={`h-4 w-4 ${user.isLoggedIn ? 'text-brand' : 'text-secondary'}`}
            strokeWidth={1.5}
          />
          {user.isLoggedIn ? user.nickname : '登录'}
        </button>
      </div>
    </header>
  )
}
