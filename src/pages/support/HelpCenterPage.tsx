import { ChevronRight } from 'lucide-react'
import { helpArticles, supportCopy } from '../../data/support'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function HelpCenterPage() {
  const { closeSupport, navigateSupport } = usePrototype()

  return (
    <SubPageLayout title={supportCopy.helpTitle} onBack={closeSupport}>
      <p className="mb-4 text-body-sm text-secondary">
        查阅平台规则、常见问题与费率说明
      </p>
      <ul className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-elevated">
        {helpArticles.map((article) => (
          <li key={article.id}>
            <button
              type="button"
              onClick={() =>
                navigateSupport({
                  screen: 'help-article',
                  articleId: article.id,
                })
              }
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left active:bg-sunken"
            >
              <div className="min-w-0">
                <p className="text-body-sm font-medium text-primary">
                  {article.title}
                </p>
                <p className="mt-0.5 text-caption text-secondary">
                  {article.description}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-secondary" />
            </button>
          </li>
        ))}
      </ul>
    </SubPageLayout>
  )
}
