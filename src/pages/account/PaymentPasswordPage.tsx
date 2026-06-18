import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { OtpField } from '../../components/auth/OtpField'
import { TextField } from '../../components/auth/TextField'
import { isValidOtp, isValidPassword } from '../../data/auth'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function PaymentPasswordPage() {
  const { user, updateProfile, navigateAccount } = usePrototype()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    password?: string
    confirm?: string
    otp?: string
  }>({})

  function handleBack() {
    navigateAccount({ screen: 'security' })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors: typeof errors = {}

    if (!isValidPassword(password)) {
      nextErrors.password = '支付密码至少 8 位'
    }
    if (password !== confirm) {
      nextErrors.confirm = '两次输入的密码不一致'
    }
    if (!isValidOtp(otp)) {
      nextErrors.otp = '请输入 6 位 Google 验证码'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    window.setTimeout(() => {
      updateProfile({ paymentPasswordSet: true })
      setLoading(false)
      navigateAccount({ screen: 'security' })
    }, 400)
  }

  return (
    <SubPageLayout
      title={user.paymentPasswordSet ? '修改支付密码' : '设置支付密码'}
      onBack={handleBack}
    >
      <p className="mb-5 text-body-sm text-secondary">
        支付密码用于提币、转账等资金操作，请与登录密码区分设置。
      </p>

      <form onSubmit={handleSubmit}>
        <TextField
          label="支付密码"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="new-password"
        />
        <TextField
          label="确认支付密码"
          type="password"
          value={confirm}
          onChange={setConfirm}
          error={errors.confirm}
          autoComplete="new-password"
        />
        <OtpField
          label="Google 验证码"
          value={otp}
          onChange={setOtp}
          error={errors.otp}
        />
        <AuthButton type="submit" loading={loading}>
          {user.paymentPasswordSet ? '确认修改' : '确认设置'}
        </AuthButton>
      </form>
    </SubPageLayout>
  )
}
