import { useState, type ReactNode } from 'react'
import { CircleDollarSign, Download, Globe, Search, User } from 'lucide-react'
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
    activeTab,
    setActiveTab,
    openLogin,
    openRegister,
    openSheet,
  } = usePrototype()
  const [search, setSearch] = useState('')

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (search.trim()) setActiveTab('market')
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-6 border-b border-border-subtle bg-base px-5">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 active:opacity-80"
        >
          <CoinNovaLogo size={28} />
          <span className="text-body font-semibold tracking-tight text-primary">
            Coin<span className="text-brand">Nova</span>
          </span>
        </button>

        <nav className="flex items-center gap-5" aria-label="产品导航">
          <button
            type="button"
            onClick={() => setActiveTab('trade')}
            className={`relative py-4 text-body-sm font-medium ${
              activeTab === 'trade' ? 'text-brand' : 'text-secondary hover:text-primary'
            }`}
          >
            现货
            {activeTab === 'trade' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
          <button
            type="button"
            disabled
            className="cursor-not-allowed py-4 text-body-sm text-secondary/50"
            title="即将上线"
          >
            合约
          </button>
        </nav>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <form onSubmit={handleSearchSubmit} className="hidden sm:block">
          <label className="flex h-9 w-56 items-center gap-2 rounded-lg bg-sunken px-3 lg:w-64">
            <Search className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.5} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索币对和其他产品"
              className="min-w-0 flex-1 bg-transparent text-body-sm text-primary outline-none placeholder:text-secondary"
            />
          </label>
        </form>

        {user.isLoggedIn ? (
          <button
            type="button"
            onClick={() => setActiveTab('assets')}
            className="flex items-center gap-2 rounded-lg border border-border-subtle bg-elevated px-3 py-1.5 text-body-sm text-primary hover:border-brand/40"
          >
            <User className="h-4 w-4 text-brand" strokeWidth={1.5} />
            {user.nickname}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={openLogin}
              className="px-3 py-1.5 text-body-sm text-primary hover:text-brand"
            >
              登录
            </button>
            <button
              type="button"
              onClick={openRegister}
              className="rounded-lg bg-brand px-4 py-1.5 text-body-sm font-semibold text-brand-dark hover:bg-brand-hover"
            >
              注册
            </button>
          </>
        )}

        <TopIcon label="下载 App">
          <Download className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </TopIcon>
        <button
          type="button"
          onClick={() => openSheet('fiat')}
          aria-label="法币计价"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-elevated text-primary hover:border-brand/40"
        >
          <CircleDollarSign className="h-4 w-4 text-secondary" strokeWidth={1.5} />
        </button>
        <TopIcon label="语言" onClick={() => openSheet('language')}>
          <Globe className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </TopIcon>
      </div>
    </header>
  )
}
