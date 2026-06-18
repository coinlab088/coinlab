import { ShieldCheck, ShieldAlert, Clock, ExternalLink } from 'lucide-react'
import { AuthButton } from '../../components/auth/AuthButton'
import { accountCopy, kycProviderCopy } from '../../data/account'
import { getKycLabel } from '../../data/mock'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

function KycStatusIcon({
  status,
}: {
  status: ReturnType<typeof usePrototype>['user']['kycStatus']
}) {
  if (status === 'verified') {
    return <ShieldCheck className="h-10 w-10 text-success" strokeWidth={1.5} />
  }
  if (status === 'pending') {
    return <Clock className="h-10 w-10 text-brand" strokeWidth={1.5} />
  }
  return <ShieldAlert className="h-10 w-10 text-secondary" strokeWidth={1.5} />
}

export function KycPage() {
  const { user, navigateAccount } = usePrototype()

  function handleBack() {
    navigateAccount({ screen: 'hub' })
  }

  function handleStart() {
    navigateAccount({ screen: 'kyc-sumsub' })
  }

  return (
    <SubPageLayout title={accountCopy.kycTitle} onBack={handleBack}>
      <div className="mb-4 flex items-center gap-3 rounded-lg border border-border-subtle bg-sunken px-4 py-3">
        <SumsubBadge />
        <div className="min-w-0 flex-1">
          <p className="text-body-sm font-medium text-primary">
            {kycProviderCopy.tagline}
          </p>
          <p className="mt-0.5 text-caption text-secondary">
            {kycProviderCopy.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center py-4 text-center">
        <KycStatusIcon status={user.kycStatus} />
        <p className="mt-4 text-h3 font-semibold text-primary">
          {getKycLabel(user.kycStatus)}
        </p>
        <p className="mt-2 max-w-[280px] text-body-sm text-secondary">
          {user.kycStatus === 'verified' &&
            '您已完成 Sumsub 身份认证，可正常使用充提与交易功能。'}
          {user.kycStatus === 'pending' &&
            '您的认证资料正在 Sumsub 审核中，通常 1–3 个工作日完成。'}
          {user.kycStatus === 'unverified' &&
            '完成 Sumsub 身份认证后可解锁提币功能，并提升账户安全等级。'}
        </p>
      </div>

      {user.kycStatus === 'unverified' && (
        <>
          <div className="mb-6 rounded-lg border border-border-subtle bg-sunken p-4">
            <p className="text-body-sm font-medium text-primary">需要准备</p>
            <ul className="mt-2 space-y-1 text-caption text-secondary">
              <li>· 政府签发的有效证件（护照 / 身份证）</li>
              <li>· 清晰的证件正反面照片</li>
              <li>· Sumsub 人脸识别与活体检测</li>
            </ul>
          </div>
          <AuthButton onClick={handleStart}>开始 Sumsub 认证</AuthButton>
          <p className="mt-3 flex items-center justify-center gap-1 text-caption text-primary-muted">
            <ExternalLink className="h-3 w-3" />
            将跳转至 Sumsub 安全验证环境
          </p>
        </>
      )}

      {user.kycStatus === 'pending' && (
        <div className="rounded-lg border border-brand/30 bg-brand-muted px-4 py-3 text-body-sm text-secondary">
          Sumsub 审核期间您可正常交易与充币，提币功能将在认证通过后开放。
        </div>
      )}
    </SubPageLayout>
  )
}

function SumsubBadge() {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a1f36] text-[11px] font-bold tracking-tight text-white"
      aria-hidden
    >
      S
    </div>
  )
}
