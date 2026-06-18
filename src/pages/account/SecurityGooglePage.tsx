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
      <p className="mb-2 text-body-sm text-secondary">
        {user.googleAuthBound
          ? '解绑后提币等敏感操作将不再需要 Google 验证码。'
          : '绑定 Google 验证器可提升账户安全等级。'}
      </p>
      <p className="mb-6 text-caption text-primary-muted">
        当前状态：{user.googleAuthBound ? '已绑定' : '未绑定'}
      </p>

      <form onSubmit={handleSubmit}>
        <OtpField
          label="Google 验证码"
          value={otp}
          onChange={setOtp}
          error={error}
        />
        <AuthButton type="submit" loading={loading}>
          {user.googleAuthBound ? '确认解绑' : '确认绑定'}
        </AuthButton>
      </form>

      {!user.googleAuthBound && (
        <div className="mt-6 rounded-lg border border-border-subtle bg-sunken p-4">
          <p className="text-body-sm font-medium text-primary">绑定步骤</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-caption text-secondary">
            <li>下载 Google Authenticator</li>
            <li>扫描下方二维码或手动输入密钥</li>
            <li>输入 App 中显示的 6 位验证码</li>
          </ol>
          <div className="mt-3 flex h-28 items-center justify-center rounded-md border border-dashed border-border bg-elevated text-caption text-secondary">
            二维码占位（原型）
          </div>
        </div>
      )}
    </SubPageLayout>
  )
}
