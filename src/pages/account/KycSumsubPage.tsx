import { useState } from 'react'
import { Camera, CreditCard, ScanFace } from 'lucide-react'
import { AuthButton } from '../../components/auth/AuthButton'
import { accountCopy, kycProviderCopy } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

const sumsubSteps = [
  { id: 'doc', icon: CreditCard, label: '证件上传' },
  { id: 'selfie', icon: Camera, label: '自拍验证' },
  { id: 'liveness', icon: ScanFace, label: '活体检测' },
] as const

export function KycSumsubPage() {
  const { updateProfile, navigateAccount } = usePrototype()
  const [activeStep, setActiveStep] = useState(0)

  function handleBack() {
    navigateAccount({ screen: 'kyc' })
  }

  function handleNext() {
    if (activeStep < sumsubSteps.length - 1) {
      setActiveStep((s) => s + 1)
      return
    }
    updateProfile({ kycStatus: 'pending' })
    navigateAccount({ screen: 'kyc' })
  }

  const step = sumsubSteps[activeStep]
  const StepIcon = step.icon

  return (
    <SubPageLayout title={accountCopy.kycSumsubTitle} onBack={handleBack}>
      <div className="mb-4 flex items-center justify-between rounded-lg border border-border-subtle bg-[#1a1f36] px-4 py-3">
        <div>
          <p className="text-body-sm font-semibold text-white">Sumsub</p>
          <p className="text-caption text-white/60">{kycProviderCopy.sdkPlaceholder}</p>
        </div>
        <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
          SDK v2
        </span>
      </div>

      <div className="mb-4 flex gap-2">
        {sumsubSteps.map((item, index) => (
          <div
            key={item.id}
            className={`h-1 flex-1 rounded-full ${
              index <= activeStep ? 'bg-brand' : 'bg-sunken'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-sunken px-4 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-elevated">
          <StepIcon className="h-8 w-8 text-brand" strokeWidth={1.25} />
        </div>
        <p className="mt-4 text-body font-medium text-primary">{step.label}</p>
        <p className="mt-2 max-w-[260px] text-caption text-secondary">
          {kycProviderCopy.sdkHint}
        </p>
        <div className="mt-6 w-full max-w-[240px] rounded-lg border border-border-subtle bg-base px-4 py-8 text-caption text-primary-muted">
          WebSDK 组件占位区
        </div>
      </div>

      <p className="mt-4 text-center text-caption text-primary-muted">
        步骤 {activeStep + 1} / {sumsubSteps.length}
      </p>

      <div className="mt-6">
        <AuthButton onClick={handleNext}>
          {activeStep < sumsubSteps.length - 1 ? '下一步' : '提交审核'}
        </AuthButton>
      </div>
    </SubPageLayout>
  )
}
