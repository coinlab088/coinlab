import { getHelpArticle } from '../../data/support'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function HelpArticlePage() {
  const { supportScreen, navigateSupport } = usePrototype()
  const article = getHelpArticle(supportScreen?.articleId ?? '')

  if (!article) return null

  function handleBack() {
    navigateSupport({ screen: 'help' })
  }

  return (
    <SubPageLayout title={article.title} onBack={handleBack}>
      <p className="mb-4 text-caption text-secondary">{article.description}</p>
      <div className="space-y-4">
        {article.sections.map((section, index) => (
          <section key={`${article.id}-${index}`}>
            {section.heading && (
              <h2 className="mb-1.5 text-body-sm font-semibold text-primary">
                {section.heading}
              </h2>
            )}
            <p className="text-body-sm leading-relaxed text-secondary">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </SubPageLayout>
  )
}
