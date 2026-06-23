import { CopyFigmaUrl } from './CopyFigmaUrl'
import { figmaExportUrl } from '../../figma/routes'

type CatalogLinkProps = {
  path: string
  title: string
  description?: string
  badge?: string
}

export function CatalogLinkCard({ path, title, description, badge }: CatalogLinkProps) {
  const url = figmaExportUrl(path)

  return (
    <div className="rounded-lg border border-border-subtle bg-elevated px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-body-sm font-medium text-primary">{title}</p>
          {description && (
            <p className="mt-0.5 text-caption leading-relaxed text-secondary">{description}</p>
          )}
        </div>
        {badge && (
          <span className="shrink-0 rounded-md bg-brand-muted px-2 py-1 text-[10px] font-semibold text-brand">
            {badge}
          </span>
        )}
      </div>
      <CopyFigmaUrl url={url} className="mt-2" />
    </div>
  )
}

export function docPageUrl(slug: string): string {
  return figmaExportUrl(`docs/${slug}`)
}
