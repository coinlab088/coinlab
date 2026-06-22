import { figmaPageUrl } from './figma/routes'
import { figmaScreenGroups, figmaScreens } from './figma/screens'

export function FigmaIndexPage() {
  return (
    <div className="min-h-screen bg-base px-4 py-8 text-primary">
      <div className="mx-auto max-w-lg">
        <h1 className="text-h2 font-semibold">CoinNova Figma 导出页</h1>
        <p className="mt-2 text-body-sm text-secondary">
          每行链接对应一屏 390×812 移动端 UI，无验证页、无调试面板。复制到
          html.to.design 即可导入给设计 / 技术评审。
        </p>

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
