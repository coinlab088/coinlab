import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { OtpField } from '../../components/auth/OtpField'
import { isValidOtp } from '../../data/auth'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function SecurityGooglePage() {
  const { user, updateProfile, navigateAccount } = usePrototype()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  function handleBack() {
    navigateAccount({ screen: 'security' })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidOtp(otp)) {
      setError('请输入 6 位 Google 验证码')
      return
    }
    setError(undefined)
    setLoading(true)
    window.setTimeout(() => {
      updateProfile({ googleAuthBound: !user.googleAuthBound })
      setLoading(false)
      navigateAccount({ screen: 'security' })
    }, 400)
  }

  return (
    <SubPageLayout title="Google 验证器" onBack={handleBack}>
      {user.googleAuthBound ? (
        <>
          <p className="mb-2 text-body-sm text-secondary">
            已绑定 Google 验证器。解绑后，提币等敏感操作将不再需要 Google 验证码。
          </p>
          <p className="mb-6 text-caption text-primary-muted">当前状态：已绑定</p>

          <form onSubmit={handleSubmit}>
            <OtpField
              label="Google 验证码"
              value={otp}
              onChange={setOtp}
              error={error}
            />
            <AuthButton type="submit" loading={loading}>
              确认解绑
            </AuthButton>
          </form>
        </>
      ) : (
        <>
          <div className="mb-6 rounded-2xl border border-brand/20 bg-[linear-gradient(135deg,rgba(255,204,0,0.16),rgba(255,204,0,0.04))] p-5">
            <p className="text-caption uppercase tracking-[0.2em] text-brand">
              Google Authenticator
            </p>
            <h2 className="mt-2 text-h2 font-semibold text-primary">Google 验证器未绑定</h2>
            <p className="mt-2 text-body-sm leading-relaxed text-secondary">
              绑定后可用于登录、提币和敏感操作二次验证，显著提升账户安全性。
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-border-subtle bg-elevated p-4">
            <p className="text-body-sm font-medium text-primary">绑定后可获得</p>
            <ul className="mt-3 space-y-2 text-body-sm text-secondary">
              <li>1. 登录与资产操作多一层动态码保护</li>
              <li>2. 未授权设备无法仅凭密码进入账户</li>
              <li>3. 多端统一安全设置体验</li>
            </ul>
          </div>

          <AuthButton
            type="button"
            onClick={() => navigateAccount({ screen: 'security-google-setup' })}
          >
            去绑定
          </AuthButton>
        </>
      )}
    </SubPageLayout>
  )
}
