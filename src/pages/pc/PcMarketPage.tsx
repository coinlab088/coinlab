import { useMemo, useState } from 'react'
import { usePrototype } from '../../context/PrototypeContext'
import {
  marketPairs,
  marketTabs,
  portfolioSummary,
  marketQuickActions,
  type MarketTab,
} from '../../data/mock'
import { PcAppLayout } from '../../components/pc/PcAppLayout'
import { BalanceHero } from '../../components/BalanceHero'
import { GuestWelcome } from '../../components/GuestWelcome'
import { GuideBanner } from '../../components/GuideBanner'
import { MarketList } from '../../components/MarketList'
import { MarketTabs } from '../../components/MarketTabs'
import { QuickActions } from '../../components/QuickActions'
import { FavoritesGrid } from '../../components/market/FavoritesGrid'
import { MarketListHeader } from '../../components/market/MarketListHeader'
import { MarketSearchBar } from '../../components/market/MarketSearchBar'

export function PcMarketPage() {
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
    <PcAppLayout>
      <div className="flex min-h-full flex-col gap-6 p-6">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            {isLoggedIn ? (
              <BalanceHero portfolio={portfolioSummary} user={user} />
            ) : (
              <div className="rounded-xl border border-border-subtle bg-elevated p-6">
                <GuestWelcome />
                <GuideBanner />
              </div>
            )}
            {isLoggedIn && (
              <div className="rounded-xl border border-border-subtle bg-elevated p-3">
                <QuickActions actions={marketQuickActions} />
              </div>
            )}
            {marketTab === 'favorites' && (
              <div className="rounded-xl border border-border-subtle bg-elevated p-3">
                <FavoritesGrid pairs={filteredPairs} />
              </div>
            )}
          </aside>

          <section className="min-w-0 rounded-xl border border-border-subtle bg-elevated">
            <div className="border-b border-border-subtle p-4">
              <MarketSearchBar value={query} onChange={setQuery} />
              <div className="mt-3">
                <MarketTabs tabs={marketTabs} active={marketTab} onChange={setMarketTab} />
              </div>
            </div>

            {marketTab === 'favorites' ? (
              <div className="p-4">
                <button
                  type="button"
                  onClick={() => openTradeSheet('add-favorite')}
                  className="mb-4 h-10 rounded-md bg-brand px-4 text-body-sm font-semibold text-brand-dark hover:bg-brand-hover"
                >
                  添加自选
                </button>
                {!isLoggedIn && (
                  <div className="mb-4 flex items-center justify-between rounded-lg bg-sunken px-4 py-3">
                    <span className="text-body-sm text-secondary">登录后同步自选</span>
                    <button
                      type="button"
                      onClick={openAuth}
                      className="rounded-md bg-elevated px-3 py-1.5 text-caption font-medium text-primary"
                    >
                      登录
                    </button>
                  </div>
                )}
                <FavoritesGrid pairs={filteredPairs} />
              </div>
            ) : (
              <>
                <MarketListHeader />
                <MarketList pairs={filteredPairs} />
              </>
            )}
          </section>
        </div>
      </div>
    </PcAppLayout>
  )
}
