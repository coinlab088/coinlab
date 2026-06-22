import { CatalogLinkCard, docPageUrl } from './components/figma/CatalogLinkCard'
import {
  designSystemDocs,
  designSystemVisualDemos,
} from './data/designSystemCatalog'
import { figmaPageUrl } from './figma/routes'
import { figmaScreenGroups, figmaScreens } from './figma/screens'

const designSystemUrl = figmaPageUrl('design-system')

export function FigmaIndexPage() {
  return (
    <div className="min-h-screen bg-base px-4 py-8 text-primary">
      <div className="mx-auto max-w-lg">
        <h1 className="text-h2 font-semibold">CoinNova Figma 导出页</h1>
        <p className="mt-2 text-body-sm text-secondary">
          每行链接对应一屏 390×812 移动端 UI，无验证页、无调试面板。复制到
          html.to.design 即可导入给设计 / 技术评审。
        </p>

        <a
          href={designSystemUrl}
          className="mt-6 flex items-center justify-between rounded-xl border border-brand/40 bg-brand-muted px-4 py-4 active:opacity-90"
        >
          <div>
            <p className="text-body font-semibold text-primary">全局设计规范</p>
            <p className="mt-0.5 text-caption text-secondary">
              配色 · 字体 · 按钮 · Toast / 弹窗规范说明
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-brand px-3 py-1.5 text-caption font-semibold text-brand-dark">
            查看
          </span>
        </a>

        <section className="mt-6 space-y-4">
          <div>
            <h2 className="mb-2 text-body-sm font-semibold text-primary">规范文档</h2>
            <div className="space-y-2">
              {designSystemDocs.map((doc) => (
                <CatalogLinkCard
                  key={doc.slug}
                  href={docPageUrl(doc.slug)}
                  title={doc.title}
                  description={doc.description}
                  badge="MD"
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-body-sm font-semibold text-primary">图示演示</h2>
            <div className="space-y-2">
              {designSystemVisualDemos.map((demo) => (
                <CatalogLinkCard
                  key={demo.path}
                  href={figmaPageUrl(demo.path)}
                  title={demo.title}
                  description={demo.description}
                  badge="图示"
                />
              ))}
            </div>
          </div>
        </section>

        <div className="mt-8 space-y-8">
          {figmaScreenGroups.map((group) => {
            const items = figmaScreens.filter(
              (s) => s.group === group.id && !s.path.startsWith('compliance/'),
            )
            if (items.length === 0) return null

            return (
              <section key={group.id}>
                <h2 className="mb-3 text-h3 font-semibold text-primary">{group.title}</h2>
                <ul className="space-y-3">
                  {items.map((screen) => {
                    const href = figmaPageUrl(screen.path)
                    return (
                      <li
                        key={screen.path}
                        className="rounded-lg border border-border-subtle bg-elevated p-4"
                      >
                        <p className="font-medium text-primary">{screen.label}</p>
                        {screen.description && (
                          <p className="mt-0.5 text-caption text-secondary">
                            {screen.description}
                          </p>
                        )}
                        <a
                          href={href}
                          className="mt-2 block break-all text-body-sm text-brand hover:underline"
                        >
                          {href}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
