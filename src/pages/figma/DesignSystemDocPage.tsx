import { useEffect } from 'react'
import { MarkdownDocViewer } from '../../components/figma/MarkdownDocViewer'
import { getDesignSystemDoc } from '../../data/designSystemCatalog'
import { designSystemDocContent } from '../../data/designSystemDocContent'
import { figmaPageUrl } from '../../figma/routes'

type Props = {
  slug: string
}

export function DesignSystemDocPage({ slug }: Props) {
  const doc = getDesignSystemDoc(slug)
  const content = designSystemDocContent[slug]

  useEffect(() => {
    document.title = doc ? `${doc.title} — CoinNova` : '文档未找到 — CoinNova'
    document.documentElement.style.width = ''
    document.documentElement.style.height = ''
    document.body.style.overflow = ''
  }, [doc])

  if (!doc || !content) {
    return (
      <div className="min-h-screen bg-base px-4 py-8 text-primary">
        <div className="mx-auto max-w-[390px] text-center">
          <p className="text-body text-secondary">未找到该文档</p>
          <a
            href={figmaPageUrl('design-system')}
            className="mt-4 inline-block text-body-sm text-brand"
          >
            ← 返回设计规范
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base text-primary">
      <div className="mx-auto w-full max-w-[390px] px-4 py-6">
        <header className="mb-6 border-b border-border-subtle pb-4">
          <p className="text-caption font-medium uppercase tracking-widest text-brand">
            文档规范
          </p>
          <h1 className="mt-1 text-h2 font-semibold">{doc.title}</h1>
          <p className="mt-1 text-body-sm text-secondary">{doc.description}</p>
          <p className="mt-1 text-caption text-secondary">{doc.file}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={figmaPageUrl('design-system')}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-caption font-medium text-primary active:bg-elevated"
            >
              ← 设计规范
            </a>
            <a
              href={figmaPageUrl('')}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-caption font-medium text-secondary active:bg-elevated"
            >
              导出目录
            </a>
          </div>
        </header>

        <MarkdownDocViewer content={content} />
      </div>
    </div>
  )
}
