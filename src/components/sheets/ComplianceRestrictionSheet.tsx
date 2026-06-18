import { AlertTriangle } from 'lucide-react'
import { complianceCopy } from '../../data/compliance'
import { usePrototype } from '../../context/PrototypeContext'

export function ComplianceRestrictionSheet() {
  const {
    showComplianceRestriction,
    closeComplianceRestriction,
    openHelpCenter,
    navigateSupport,
    previewPlatform,
  } = usePrototype()

  const isPc = previewPlatform === 'pc'

  if (!showComplianceRestriction) return null

  return (
    <div
      className={`absolute inset-0 z-50 flex justify-center ${
        isPc ? 'items-center p-6' : 'items-end'
      }`}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="compliance-restriction-title"
        aria-describedby="compliance-restriction-desc"
        className={`relative z-10 w-full border border-border-subtle bg-elevated px-5 pb-8 pt-3 shadow-[0_-8px_40px_rgba(255,204,0,0.08)] ${
          isPc ? 'max-w-md rounded-2xl' : 'max-w-[390px] rounded-t-2xl'
        }`}
      >
        {!isPc && <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-border" />}

        <div className="flex flex-col items-center text-center">
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-muted">
            <AlertTriangle
              className="h-7 w-7 text-brand"
              strokeWidth={1.5}
            />
          </span>

          <p
            id="compliance-restriction-desc"
            className="max-w-[300px] text-body-sm leading-relaxed text-secondary"
          >
            {complianceCopy.message}
            <button
              type="button"
              onClick={() => {
                closeComplianceRestriction()
                openHelpCenter()
                navigateSupport({
                  screen: 'help-article',
                  articleId: 'agreement',
                })
              }}
              className="text-primary underline decoration-primary/40 underline-offset-2 active:opacity-70"
            >
              {complianceCopy.termsLabel}
            </button>
            。
          </p>

          <button
            type="button"
            onClick={closeComplianceRestriction}
            className="mt-8 h-12 w-full rounded-full bg-brand text-body font-semibold text-brand-dark active:bg-brand-hover"
          >
            {complianceCopy.back}
          </button>
        </div>

        <span id="compliance-restriction-title" className="sr-only">
          地区合规限制
        </span>
      </div>
    </div>
  )
}
