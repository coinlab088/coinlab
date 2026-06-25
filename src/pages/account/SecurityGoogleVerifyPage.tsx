import { X } from 'lucide-react'
import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { TextField } from '../../components/auth/TextField'
import { usePrototype } from '../../context/PrototypeContext'
import { accountCopy } from '../../data/account'
import { isValidOtp } from '../../data/auth'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function SecurityGoogleVerifyPage() {
  const { navigateAccount, updateProfile, previewPlatform } = usePrototype()
  const [phoneCode, setPhoneCode] = useState('')
  const [googleCode, setGoogleCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ phoneCode?: string; googleCode?: string }>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!isValidOtp(phoneCode)) next.phoneCode = '请输入 6 位手机验证码'
    if (!isValidOtp(googleCode)) next.googleCode = '请输入 6 位谷歌验证码'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    window.setTimeout(() => {
      updateProfile({ googleAuthBound: true })
      setLoading(false)
      navigateAccount({ screen: 'security' })
    }, 400)
  }

  const content = (
    <form onSubmit={handleSubmit}>
      <TextField
        label="手机验证"
        value={phoneCode}
        onChange={(value) => setPhoneCode(value.replace(/\D/g, '').slice(0, 6))}
        placeholder="请输入验证码"
        error={errors.phoneCode}
        autoComplete="one-time-code"
        suffix={
          <button type="button" className="text-body-sm font-medium text-primary">
            获取验证码
          </button>
        }
      />
      <TextField
        label="新身份验证应用"
        value={googleCode}
        onChange={(value) => setGoogleCode(value.replace(/\D/g, '').slice(0, 6))}
        placeholder="请输入新身份验证应用验证码"
        error={errors.googleCode}
        autoComplete="one-time-code"
      />
      <AuthButton type="submit" loading={loading}>
        确认
      </AuthButton>
    </form>
  )

  if (previewPlatform === 'pc') {
    return (
      <SubPageLayout
        title={accountCopy.googleVerifyTitle}
        onBack={() => navigateAccount({ screen: 'security-google-setup' })}
      >
        <div className="mx-auto max-w-[480px] rounded-[28px] border border-border-subtle bg-elevated p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2 className="text-h2 font-semibold text-primary">{accountCopy.googleVerifyTitle}</h2>
            <button
              type="button"
              onClick={() => navigateAccount({ screen: 'security-google-setup' })}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-sunken text-secondary"
              aria-label="关闭"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
          {content}
        </div>
      </SubPageLayout>
    )
  }

  return (
    <SubPageLayout
      title={accountCopy.googleVerifyTitle}
      onBack={() => navigateAccount({ screen: 'security-google-setup' })}
    >
      {content}
    </SubPageLayout>
  )
}
