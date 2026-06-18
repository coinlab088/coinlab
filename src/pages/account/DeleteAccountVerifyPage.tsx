import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { OtpField } from '../../components/auth/OtpField'
import { TextField } from '../../components/auth/TextField'
import { isValidOtp, isValidPassword } from '../../data/auth'
import { accountCopy } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function DeleteAccountVerifyPage() {
  const { navigateAccount } = usePrototype()
  const [password, setPassword] = useState('')
  const [googleOtp, setGoogleOtp] = useState('')
  const [emailOtp, setEmailOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    password?: string
    googleOtp?: string
    emailOtp?: string
  }>({})

  function handleBack() {
    navigateAccount({ screen: 'delete' })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors: typeof errors = {}

    if (!isValidPassword(password)) {
      nextErrors.password = '请输入登录密码'
    }
    if (!isValidOtp(googleOtp)) {
      nextErrors.googleOtp = '请输入 Google 验证码'
    }
    if (!isValidOtp(emailOtp)) {
      nextErrors.emailOtp = '请输入邮箱验证码'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      navigateAccount({ screen: 'delete-success' })
    }, 500)
  }

  return (
    <SubPageLayout title={accountCopy.deleteVerifyTitle} onBack={handleBack}>
      <p className="mb-5 text-body-sm text-secondary">
        为保障账户安全，注销前需完成以下验证。
      </p>

      <form onSubmit={handleSubmit}>
        <TextField
          label="登录密码"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="current-password"
        />
        <OtpField
          label="Google 验证码"
          value={googleOtp}
          onChange={setGoogleOtp}
          error={errors.googleOtp}
        />
        <OtpField
          label="邮箱验证码"
          value={emailOtp}
          onChange={setEmailOtp}
          error={errors.emailOtp}
        />
        <AuthButton type="submit" loading={loading} variant="primary">
          确认注销
        </AuthButton>
      </form>

      <p className="mt-4 text-center text-caption text-primary-muted">
        原型提示：任意有效格式即可通过
      </p>
    </SubPageLayout>
  )
}
