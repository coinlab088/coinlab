import { figmaPageUrl } from '../../figma/routes'

type CatalogLinkProps = {
  href: string
  title: string
  description?: string
  badge?: string
}

export function CatalogLinkCard({ href, title, description, badge }: CatalogLinkProps) {
  return (
    <a
      href={href}
      className="flex items-start justify-between gap-3 rounded-lg border border-border-subtle bg-elevated px-4 py-3 active:bg-base"
    >
      <div className="min-w-0">
        <p className="text-body-sm font-medium text-primary">{title}</p>
        {description && (
          <p className="mt-0.5 text-caption leading-relaxed text-secondary">{description}</p>
        )}
      </div>
      {badge ? (
        <span className="shrink-0 rounded-md bg-brand-muted px-2 py-1 text-[10px] font-semibold text-brand">
          {badge}
        </span>
      ) : (
        <span className="shrink-0 text-caption text-brand">打开</span>
      )}
    </a>
  )
}

export function docPageUrl(slug: string): string {
  return figmaPageUrl(`docs/${slug}`)
}
