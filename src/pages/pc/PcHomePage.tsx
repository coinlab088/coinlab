import { useMemo, useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  QrCode,
  Shield,
  Smartphone,
} from 'lucide-react'
import { Annotatable } from '../../components/inspect/Annotatable'
import { FigmaQrPlaceholder } from '../../components/figma/FigmaQrPlaceholder'
import { CoinAvatar } from '../../components/CoinAvatar'
import { PcAppLayout } from '../../components/pc/PcAppLayout'
import { marketPairs } from '../../data/marketPairs'
import {
  formatChangePercent,
  formatPrice,
} from '../../data/mock'
import { usePrototype } from '../../context/PrototypeContext'
import { useFigmaExport } from '../../hooks/useFigmaExport'

const heroStats = [
  {
    rank: 'No.1',
    title: '客户资产',
    sub: '资产',
    value: '$8,432,156,280',
  },
  {
    rank: 'No.1',
    title: '交易量',
    sub: '24H',
    value: '$2,186,904,512',
  },
]

const awards = [
  '获评《福布斯》2025 年最受信任的加密货币交易平台',
  '在《财富》2024 年亚洲金融科技创新者榜单中排名第 1',
  '入选 CNBC 2025 年全球顶级金融科技公司榜单',
]

const safuStats = [
  { label: 'SAFU 钱包', value: '1,248,600 USDT' },
  { label: '受助用户', value: '12,486' },
  { label: '追回资金', value: '$18,432,900' },
]

const faqItems = [
  {
    q: '为什么 CoinNova 是值得信赖的交易平台？',
    a: 'CoinNova 提供现货交易、多链充提与 Sumsub 身份认证，采用冷热钱包分离与 SAFU 用户保护基金，为全球用户提供安全、透明的数字资产服务。',
  },
  {
    q: 'CoinNova 提供哪些产品？',
    a: '现货交易、多链充提、身份认证（KYC）、订单与充提记录查询；支持移动端 App、H5 与 PC Web 多端同步。',
  },
  {
    q: '如何在 CoinNova 购买加密货币？',
    a: '注册并完成身份认证后，可通过充币或法币通道（规划中）入金，在现货市场使用限价或市价单买入目标资产。',
  },
  {
    q: '如何追踪加密货币价格？',
    a: '在行情页浏览 50+ USDT 交易对，点击 K 线图标查看蜡烛图与周期切换，支持自选与搜索过滤。',
  },
]

export function PcHomePage() {
  const { setActiveTab, openAuth, openTrade, user } = usePrototype()
  const figmaExport = useFigmaExport()
  const [email, setEmail] = useState('')
  const [marketTab, setMarketTab] = useState<'hot' | 'new'>('hot')
  const [openFaq, setOpenFaq] = useState<number | null>(figmaExport ? -1 : 0)

  const hotPairs = useMemo(() => marketPairs.slice(0, 6), [])
  const displayPairs = marketTab === 'hot' ? hotPairs : marketPairs.slice(6, 12)

  function handleRegister() {
    if (user.isLoggedIn) {
      setActiveTab('trade')
    } else {
      openAuth()
    }
  }

  return (
    <PcAppLayout>
      <div className="bg-base text-primary">
        <Annotatable id="pc-home-hero">
          <section className="border-b border-border-subtle px-8 pb-10 pt-10">
            <h1 className="text-[36px] font-semibold leading-tight tracking-tight">
              <span className="text-brand">1,248,600+</span>
              用户的共同选择
            </h1>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {heroStats.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border-subtle bg-elevated p-5"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-brand px-1.5 py-0.5 text-caption font-bold text-brand-dark">
                      {item.rank}
                    </span>
                    <span className="text-body-sm text-secondary">{item.title}</span>
                    <span className="text-caption text-primary-muted">{item.sub}</span>
                  </div>
                  <p className="mt-3 tabular-nums text-h2 font-semibold text-primary">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex max-w-xl items-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="邮箱 / 手机号码"
                className="h-12 min-w-0 flex-1 rounded-md border border-border-subtle bg-sunken px-4 text-body-sm text-primary outline-none placeholder:text-secondary focus:border-brand"
              />
              <button
                type="button"
                onClick={handleRegister}
                className="h-12 shrink-0 rounded-md bg-brand px-8 text-body-sm font-semibold text-brand-dark hover:bg-brand-hover"
              >
                注册
              </button>
            </div>
            <p className="mt-2 text-caption text-brand">
              新用户专享奖励，完成注册即可领取
            </p>
          </section>
        </Annotatable>

        <section className="grid grid-cols-[1fr_280px] gap-6 border-b border-border-subtle px-8 py-8">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMarketTab('hot')}
                className={`text-body-sm font-medium ${
                  marketTab === 'hot' ? 'text-primary' : 'text-secondary'
                }`}
              >
                热门
              </button>
              <button
                type="button"
                onClick={() => setMarketTab('new')}
                className={`text-body-sm font-medium ${
                  marketTab === 'new' ? 'text-primary' : 'text-secondary'
                }`}
              >
                新币
              </button>
            </div>

            <ul className="divide-y divide-border-subtle rounded-xl border border-border-subtle bg-elevated">
              {displayPairs.map((pair) => (
                <li key={pair.id}>
                  <button
                    type="button"
                    onClick={() => openTrade(pair.id)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-sunken"
                  >
                    <CoinAvatar symbol={pair.base} size={32} />
                    <div className="min-w-0 flex-1">
                      <p className="text-body-sm font-medium text-primary">
                        {pair.base}
                        <span className="ml-1 text-caption text-secondary">
                          {pair.base === 'BTC' ? 'Bitcoin' : pair.base}
                        </span>
                      </p>
                    </div>
                    <span className="tabular-nums text-body-sm text-primary">
                      ${formatPrice(pair.price)}
                    </span>
                    <span
                      className={`w-16 text-right tabular-nums text-body-sm ${
                        pair.change24h >= 0 ? 'text-success' : 'text-danger'
                      }`}
                    >
                      {formatChangePercent(pair.change24h)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setActiveTab('market')}
              className="mt-4 text-body-sm font-medium text-brand hover:underline"
            >
              查看全部 50+ 代币 →
            </button>
          </div>

          <aside className="rounded-xl border border-border-subtle bg-elevated p-5">
            <span className="inline-block rounded bg-brand-muted px-2 py-0.5 text-caption font-medium text-brand">
              新币
            </span>
            <p className="mt-3 text-h3 font-semibold text-primary">LAB</p>
            <p className="text-caption text-secondary">CoinNova 平台币即将上线</p>
            <div className="mt-4 flex gap-2 tabular-nums">
              {['02', '14', '36'].map((n, i) => (
                <span key={i} className="flex flex-col items-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-sunken text-body font-semibold">
                    {n}
                  </span>
                  <span className="mt-1 text-caption text-secondary">
                    {['时', '分', '秒'][i]}
                  </span>
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-col items-center rounded-lg border border-dashed border-border bg-sunken py-4">
              {figmaExport ? (
                <FigmaQrPlaceholder size={80} />
              ) : (
                <QrCode className="h-10 w-10 text-secondary" strokeWidth={1.25} />
              )}
              <p className="mt-2 text-caption text-secondary">扫描下载 App</p>
            </div>
          </aside>
        </section>

        <section className="border-b border-border-subtle px-8 py-8">
          <div className="grid grid-cols-3 gap-4">
            {awards.map((text) => (
              <div
                key={text}
                className="rounded-xl border border-border-subtle bg-sunken px-4 py-5 text-body-sm leading-relaxed text-secondary"
              >
                {text}
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 border-b border-border-subtle px-8 py-10">
          <div>
            <div className="flex items-center gap-2">
              {figmaExport ? (
                <span className="text-h3" aria-hidden>
                  🛡
                </span>
              ) : (
                <Shield className="h-6 w-6 text-brand" strokeWidth={1.5} />
              )}
              <h2 className="text-h3 font-semibold text-primary">
                资金受 SAFU 保护
              </h2>
            </div>
            <p className="mt-3 text-body-sm leading-relaxed text-secondary">
              用户资产安全基金（SAFU）用于在极端情况下保护用户资金。您的安全始终是我们的首要任务。
            </p>
            <p className="mt-4 text-caption text-secondary">
              截至 2026 年 6 月，SAFU 规模达
            </p>
            <p className="tabular-nums text-h2 font-semibold text-brand">
              15,000 BTC
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {safuStats.map((item) => (
              <div
                key={item.label}
                className="min-h-[88px] rounded-lg border border-border-subtle bg-elevated p-4"
              >
                <p className="text-body-sm text-secondary">{item.label}</p>
                <p className="mt-2 text-body font-semibold text-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-border-subtle px-8 py-10">
          <h2 className="text-h2 font-semibold text-primary">随时随地，开启交易</h2>
          <div className="mt-6 flex items-center gap-10">
            <div className="flex h-36 w-36 items-center justify-center rounded-xl border border-dashed border-border bg-sunken">
              {figmaExport ? (
                <FigmaQrPlaceholder size={112} />
              ) : (
                <QrCode className="h-16 w-16 text-secondary" strokeWidth={1} />
              )}
            </div>
            <div>
              <p className="text-body-sm text-secondary">扫码下载 App</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['iOS / Android', 'macOS', 'Windows', 'Linux', 'TG 小程序'].map(
                  (platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-elevated px-3 py-2 text-body-sm text-primary"
                    >
                      {!figmaExport && (
                        <Smartphone className="h-3.5 w-3.5 text-secondary" strokeWidth={1.5} />
                      )}
                      {platform}
                    </span>
                  ),
                )}
              </div>
              <button
                type="button"
                className="mt-4 text-caption text-brand hover:underline"
              >
                更多下载选择
              </button>
            </div>
          </div>
        </section>

        <section className="px-8 py-10">
          <h2 className="text-h2 font-semibold text-primary">常见问题</h2>
          <ul className="mt-6 divide-y divide-border-subtle rounded-xl border border-border-subtle bg-elevated">
            {faqItems.map((item, index) => {
              const expanded = figmaExport || openFaq === index
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => !figmaExport && setOpenFaq(expanded ? null : index)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex gap-3">
                      <span className="text-body-sm font-semibold text-brand">
                        {index + 1}
                      </span>
                      <span className="text-body-sm font-medium text-primary">
                        {item.q}
                      </span>
                    </span>
                    {figmaExport ? (
                      <span className="shrink-0 text-secondary" aria-hidden>
                        {expanded ? '▲' : '▼'}
                      </span>
                    ) : expanded ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-secondary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-secondary" />
                    )}
                  </button>
                  {expanded && (
                    <p className="border-t border-border-subtle px-5 pb-4 pl-12 text-body-sm leading-relaxed text-secondary">
                      {item.a}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section className="mx-8 mb-8 rounded-xl bg-brand px-8 py-10 text-center">
          <h2 className="text-h2 font-semibold text-brand-dark">
            CoinNova：手续费低廉的安全交易平台
          </h2>
          <button
            type="button"
            onClick={handleRegister}
            className="mt-6 h-11 rounded-md bg-brand-dark px-10 text-body-sm font-semibold text-brand hover:opacity-90"
          >
            立即注册
          </button>
        </section>
      </div>
    </PcAppLayout>
  )
}
