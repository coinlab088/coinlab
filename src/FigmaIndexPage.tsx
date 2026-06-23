import { CatalogLinkCard } from './components/figma/CatalogLinkCard'
import { CopyFigmaUrl } from './components/figma/CopyFigmaUrl'
import {
  designSystemDocs,
  designSystemVisualDemos,
} from './data/designSystemCatalog'
import { figmaExportUrl } from './figma/routes'
import { figmaScreenGroups, figmaScreens } from './figma/screens'

const designSystemUrl = figmaExportUrl('design-system')

export function FigmaIndexPage() {
  return (
    <div className="min-h-screen bg-base px-4 py-8 text-primary">
      <div className="mx-auto max-w-lg">
        <h1 className="text-h2 font-semibold">CoinNova Figma 导出页</h1>
        <p className="mt-2 text-body-sm text-secondary">
          每行对应一屏 390×812 移动端 UI。复制下方完整链接粘贴到 html.to.design
          即可导入 Figma，无需调试面板。
        </p>

        <div className="mt-6 rounded-xl border border-brand/40 bg-brand-muted px-4 py-4">
          <p className="text-body font-semibold text-primary">全局设计规范</p>
          <p className="mt-0.5 text-caption text-secondary">
            配色 · 字体 · 按钮 · Toast / 弹窗规范说明
          </p>
          <CopyFigmaUrl url={designSystemUrl} className="mt-3" />
        </div>

        <section className="mt-6 space-y-4">
          <div>
            <h2 className="mb-2 text-body-sm font-semibold text-primary">规范文档</h2>
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
          </div>

          <div>
            <h2 className="mb-2 text-body-sm font-semibold text-primary">图示演示</h2>
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
                    const url = figmaExportUrl(screen.path)
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
                        <CopyFigmaUrl url={url} className="mt-2" />
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
