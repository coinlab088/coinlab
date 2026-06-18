import { useMemo, useState } from 'react'
import { usePrototype } from '../context/PrototypeContext'
import {
  marketPairs,
  marketTabs,
  portfolioSummary,
  marketQuickActions,
  type MarketTab,
} from '../data/mock'
import { AppLayout } from '../components/AppLayout'
import { Annotatable } from '../components/inspect/Annotatable'
import { BalanceHero } from '../components/BalanceHero'
import { GuestWelcome } from '../components/GuestWelcome'
import { GuideBanner } from '../components/GuideBanner'
import { MarketList } from '../components/MarketList'
import { MarketTabs } from '../components/MarketTabs'
import { QuickActions } from '../components/QuickActions'
import { FavoritesGrid } from '../components/market/FavoritesGrid'
import { MarketListHeader } from '../components/market/MarketListHeader'
import { MarketSearchBar } from '../components/market/MarketSearchBar'

export function MarketPage() {
  const { user, openAuth, favoritePairIds, openTradeSheet } = usePrototype()
  const { isLoggedIn } = user
  const [marketTab, setMarketTab] = useState<MarketTab>('market')
  const [query, setQuery] = useState('')

  const filteredPairs = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base =
      marketTab === 'favorites'
        ? marketPairs.filter((p) => favoritePairIds.includes(p.id))
        : marketPairs

    if (!q) return base
    return base.filter(
      (p) =>
        p.symbol.toLowerCase().includes(q) ||
        p.base.toLowerCase().includes(q) ||
        `${p.base}/${p.quote}`.toLowerCase().includes(q),
    )
  }, [marketTab, favoritePairIds, query])

  return (
    <AppLayout>
      {isLoggedIn ? (
        <BalanceHero portfolio={portfolioSummary} user={user} />
      ) : (
        <>
          <GuestWelcome />
          <div className="pb-2">
            <GuideBanner />
          </div>
        </>
      )}

      {isLoggedIn && (
        <div className="border-b border-border-subtle">
          <QuickActions actions={marketQuickActions} />
        </div>
      )}

      <Annotatable id="market-search">
        <MarketSearchBar value={query} onChange={setQuery} />
      </Annotatable>

      <MarketTabs tabs={marketTabs} active={marketTab} onChange={setMarketTab} />

      <div className="flex items-center justify-between border-b border-border-subtle px-3">
        <span className="relative py-2 text-caption font-medium text-primary">
          现货
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
        </span>
      </div>

      {marketTab === 'favorites' ? (
        <>
          <FavoritesGrid pairs={filteredPairs} />
          <div className="px-3 pb-3">
            <button
              type="button"
              onClick={() => openTradeSheet('add-favorite')}
              className="h-10 w-full rounded-md bg-brand text-body-sm font-semibold text-brand-dark active:bg-brand-hover"
            >
              添加自选
            </button>
          </div>
          {!isLoggedIn && (
            <div className="mx-3 mb-3 flex items-center justify-between rounded-lg bg-elevated px-3 py-2.5">
              <span className="text-caption text-secondary">登录后同步自选</span>
              <button
                type="button"
                onClick={openAuth}
                className="rounded-md bg-sunken px-3 py-1 text-caption font-medium text-primary"
              >
                登录
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <MarketListHeader />
          <MarketList pairs={filteredPairs} />
        </>
      )}
    </AppLayout>
  )
}
