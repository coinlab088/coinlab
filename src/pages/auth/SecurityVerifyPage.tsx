import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { AuthPageShell } from '../../components/auth/AuthPageShell'
import { OtpField } from '../../components/auth/OtpField'
import { authCopy, isValidOtp } from '../../data/auth'
import { usePrototype } from '../../context/PrototypeContext'

interface SecurityVerifyPageProps {
  email: string
  flow: 'login' | 'register'
}

export function SecurityVerifyPage({ email, flow }: SecurityVerifyPageProps) {
  const { setAuthScreen, completeAuth } = usePrototype()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  function handleBack() {
    if (flow === 'login') {
      setAuthScreen({ screen: 'login' })
    } else {
      setAuthScreen({ screen: 'register-password', email })
    }
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
      setLoading(false)
      completeAuth()
    }, 500)
  }

  return (
    <AuthPageShell title={authCopy.securityTitle} onBack={handleBack}>
      <p className="mb-2 text-body-sm text-secondary">
        请输入 Google 验证器中的 6 位动态码
      </p>
      <p className="mb-6 text-caption text-primary-muted">
        账户：{email}
      </p>

      <form onSubmit={handleSubmit}>
        <OtpField
          label="Google 验证码"
          value={otp}
          onChange={setOtp}
          error={error}
        />

        <AuthButton type="submit" loading={loading}>
          {flow === 'register' ? '进入 CoinNova' : '确认登录'}
        </AuthButton>
      </form>

      <p className="mt-4 text-center text-caption text-primary-muted">
        原型提示：任意 6 位数字即可通过
      </p>
    </AuthPageShell>
  )
}
