import { useEffect, type ReactNode } from 'react'
import { CatalogLinkCard, docPageUrl } from '../../components/figma/CatalogLinkCard'
import { appThemes } from '../../data/appTheme'
import {
  designSystemDocs,
  designSystemVisualDemos,
} from '../../data/designSystemCatalog'
import { designTokens } from '../../data/designTokens'
import { figmaExportUrl } from '../../figma/routes'

const tokens = designTokens

const themeLabels: Record<string, string> = {
  'yellow-black': '黄黑（默认）',
}

const typeSamples = [
  { token: 'display', className: 'text-display', sample: 'Display 28/34' },
  { token: 'h1', className: 'text-h1', sample: '标题 H1 22/28' },
  { token: 'h2', className: 'text-h2', sample: '标题 H2 18/24' },
  { token: 'h3', className: 'text-h3', sample: '标题 H3 16/22' },
  { token: 'body', className: 'text-body', sample: '正文 Body 15/22' },
  { token: 'body-sm', className: 'text-body-sm', sample: '次要 Body SM 13/18' },
  { token: 'caption', className: 'text-caption', sample: '说明 Caption 11/16' },
  { token: 'price-lg', className: 'text-price-lg tabular-nums', sample: '67,842.50' },
]

const colorKeys = [
  { key: 'base', label: 'Base' },
  { key: 'elevated', label: 'Elevated' },
  { key: 'brand', label: 'Brand' },
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'success', label: 'Success' },
  { key: 'danger', label: 'Danger' },
] as const

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 border-b border-border-subtle pb-2 text-h3 font-semibold text-primary">
        {title}
      </h2>
      {children}
    </section>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border-subtle py-2.5 last:border-b-0">
      <span className="text-body-sm text-secondary">{label}</span>
      <span className="text-body-sm font-medium text-primary">{value}</span>
    </div>
  )
}

export function DesignSystemDemoPage() {
  useEffect(() => {
    document.title = '设计规范 — CoinNova'
    document.documentElement.style.width = ''
    document.documentElement.style.height = ''
    document.body.style.overflow = ''
  }, [])

  return (
    <div className="min-h-screen bg-base text-primary">
      <div className="mx-auto w-full max-w-[390px] px-4 py-6">
        <header className="mb-8 text-center">
          <p className="text-caption font-medium uppercase tracking-widest text-brand">
            CoinNova Design System
          </p>
          <h1 className="mt-2 text-h1 font-semibold">全局设计规范</h1>
          <p className="mt-2 text-body-sm text-secondary">
            版本 {tokens.version} · 移动端 390×812 · Source: design-system/MASTER.md
          </p>
          <a
            href={figmaExportUrl('')}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-md border border-border px-4 text-body-sm font-medium text-primary active:bg-elevated"
          >
            ← 返回导出目录
          </a>
        </header>

        <Section title="文档规范（Markdown）">
          <p className="mb-3 text-body-sm text-secondary">
            完整设计说明以 Markdown 维护，点击下方可在演示环境内直接阅读。
          </p>
          <div className="space-y-2">
            {designSystemDocs.map((doc) => (
              <CatalogLinkCard
                key={doc.slug}
                path={`docs/${doc.slug}`}
                title={doc.title}
                description={doc.description}
                badge="MD"
              />
            ))}
          </div>
        </Section>

        <Section title="图示演示（390×812）">
          <p className="mb-3 text-body-sm text-secondary">
            Toast / 弹窗 / Bottom Sheet 的可视化样机，可复制直链导入 Figma。
          </p>
          <div className="space-y-2">
            {designSystemVisualDemos.map((demo) => (
              <CatalogLinkCard
                key={demo.path}
                path={demo.path}
                title={demo.title}
                description={demo.description}
                badge="图示"
              />
            ))}
          </div>
        </Section>

        <Section title="产品定位">
          <div className="rounded-lg border border-border-subtle bg-elevated p-4 text-body-sm leading-relaxed text-secondary">
            专业 · 可信 · 安全的移动端数字资产平台。深色金融科技基调，高信息密度、克制视觉，避免博彩与霓虹风格。
          </div>
        </Section>

        <Section title="布局基准">
          <div className="rounded-lg border border-border-subtle bg-elevated px-4">
            <SpecRow label="视口" value="390 × 812 px" />
            <SpecRow label="顶栏高度" value={`${tokens.layout.headerHeight}px`} />
            <SpecRow label="底栏高度" value={`${tokens.layout.tabBarHeight}px`} />
            <SpecRow label="最小触控" value={`${tokens.layout.minTouchTarget}×${tokens.layout.minTouchTarget} pt`} />
            <SpecRow label="间距网格" value="4px" />
            <SpecRow label="屏幕边距" value={`${tokens.layout.screenPaddingX}px (layout-screen-x)`} />
            <SpecRow label="内容顶距" value={`${tokens.layout.contentPaddingTop}px (layout-content-top)`} />
            <SpecRow label="区块内距" value={`${tokens.layout.sectionPaddingY}px (layout-section-y)`} />
            <SpecRow label="同组间距" value={`${tokens.layout.stackGap}px (layout-stack)`} />
            <SpecRow label="字体" value={`${tokens.typography.fontFamily.sans} / ${tokens.typography.fontFamily.mono}`} />
          </div>
        </Section>

        <Section title="主题配色">
          {appThemes.map((theme) => {
            const colors = tokens.themes[theme.id as keyof typeof tokens.themes]
            return (
              <div key={theme.id} className="mb-4 last:mb-0">
                <p className="mb-2 text-body-sm font-medium text-primary">
                  {themeLabels[theme.id] ?? theme.label}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {colorKeys.map(({ key, label }) => (
                    <div key={key} className="text-center">
                      <div
                        className="mx-auto h-10 w-10 rounded-md border border-border-subtle"
                        style={{ background: colors[key as keyof typeof colors] }}
                      />
                      <p className="mt-1 text-[9px] text-secondary">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </Section>

        <Section title="字体层级">
          <div className="space-y-3 rounded-lg border border-border-subtle bg-elevated p-4">
            {typeSamples.map((item) => (
              <div key={item.token} className="flex items-baseline justify-between gap-3">
                <span className={`${item.className} text-primary`}>{item.sample}</span>
                <span className="shrink-0 text-caption text-secondary">{item.token}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="圆角">
          <div className="flex flex-wrap gap-3">
            {Object.entries(tokens.radius).map(([name, px]) => (
              <div
                key={name}
                className="flex h-14 w-14 items-center justify-center border border-border bg-elevated text-caption text-secondary"
                style={{ borderRadius: `${px}px` }}
              >
                {name}
              </div>
            ))}
          </div>
        </Section>

        <Section title="按钮">
          <div className="space-y-3">
            <button
              type="button"
              className="h-11 w-full rounded-md bg-brand text-body-sm font-semibold text-brand-dark"
            >
              Primary · 主操作
            </button>
            <button
              type="button"
              className="h-11 w-full rounded-md border border-border text-body-sm font-medium text-primary"
            >
              Secondary · 取消 / 次要
            </button>
            <button
              type="button"
              className="h-11 w-full rounded-md bg-success text-body-sm font-semibold text-white"
            >
              Success · 买入确认
            </button>
            <button
              type="button"
              className="h-11 w-full rounded-md bg-danger text-body-sm font-semibold text-white"
            >
              Danger · 卖出 / 删除
            </button>
          </div>
        </Section>

        <Section title="Toast">
          <div className="space-y-2">
            {(
              [
                ['success', '已复制 UID', 'success-bg border-l-success'],
                ['error', '下单失败，请重试', 'danger-bg border-l-danger'],
                ['warning', '滑点较大，请确认', 'warning-bg border-l-warning'],
                ['info', '行情每 3 秒更新', 'info-bg border-l-info'],
              ] as const
            ).map(([variant, msg, cls]) => (
              <div
                key={variant}
                className={`rounded-md border border-border-subtle border-l-[3px] px-3 py-2.5 text-body-sm text-primary ${cls}`}
              >
                {msg}
              </div>
            ))}
          </div>
          <p className="mt-2 text-caption text-secondary">
            顶部 safe-area+12px · Success 3s / Error 5s · 详见 feedback-overlays.md
          </p>
        </Section>

        <Section title="弹窗 / Sheet">
          <div className="rounded-lg border border-border-subtle bg-elevated px-4">
            <SpecRow label="Bottom Sheet" value="z-40 · 选择 / 确认" />
            <SpecRow label="Alert Dialog" value="z-50 · 合规阻断" />
            <SpecRow label="遮罩默认" value="black 60%" />
            <SpecRow label="遮罩加重" value="black 70%" />
            <SpecRow label="Sheet 顶角" value={`${tokens.overlay.bottomSheet.radiusTop}px`} />
          </div>
          <p className="mt-3 text-caption text-secondary">
            完整规范见{' '}
            <a href={docPageUrl('feedback-overlays')} className="text-brand">
              feedback-overlays.md
            </a>
            ，图示见上方「图示演示」或 overlay 直链。
          </p>
        </Section>

        <Section title="图标">
          <p className="text-body-sm text-secondary">
            Lucide Icons · 描边 1.5px · Tab 24px / 列表 20px / 按钮内 18px · 禁止 Emoji 作图标
          </p>
        </Section>

        <footer className="border-t border-border-subtle pt-6 text-center text-caption text-secondary">
          <a href={docPageUrl('master')} className="text-brand">
            MASTER.md
          </a>
          {' · '}
          <a href={docPageUrl('feedback-overlays')} className="text-brand">
            feedback-overlays.md
          </a>
          {' · '}
          <a href={figmaExportUrl('')} className="text-brand">
            导出目录
          </a>
        </footer>
      </div>
    </div>
  )
}
