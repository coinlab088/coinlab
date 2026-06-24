import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { AuthPageShell } from '../../components/auth/AuthPageShell'
import { TextField } from '../../components/auth/TextField'
import { authCopy, isValidEmail } from '../../data/auth'
import { usePrototype } from '../../context/PrototypeContext'

export function RegisterPage() {
  const { closeAuth, openLogin, setAuthScreen } = usePrototype()
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState<string>()
  const [termsError, setTermsError] = useState<string>()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let valid = true

    if (!isValidEmail(email)) {
      setEmailError('请输入有效邮箱地址')
      valid = false
    } else {
      setEmailError(undefined)
    }

    if (!agreed) {
      setTermsError('请阅读并同意相关协议')
      valid = false
    } else {
      setTermsError(undefined)
    }

    if (!valid) return

    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setAuthScreen({ screen: 'register-verify', email: email.trim() })
    }, 400)
  }

  return (
    <AuthPageShell title={authCopy.registerTitle} onBack={closeAuth}>
      <p className="mb-6 text-body-sm text-secondary">
        使用邮箱注册 CoinNova 账户
      </p>

      <form onSubmit={handleSubmit}>
        <TextField
          label="邮箱"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="name@example.com"
          error={emailError}
          autoComplete="email"
        />

        <label className="mb-6 flex items-start gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border accent-brand"
          />
          <span className="text-body-sm text-secondary">{authCopy.termsLabel}</span>
        </label>
        {termsError && (
          <p className="-mt-4 mb-4 text-body-sm text-danger" role="alert">
            {termsError}
          </p>
        )}

        <AuthButton type="submit" loading={loading}>
          获取验证码
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-body-sm text-secondary">
        已有账户？{' '}
        <button
          type="button"
          onClick={openLogin}
          className="font-medium text-brand active:opacity-70"
        >
          去登录
        </button>
      </p>
    </AuthPageShell>
  )
}
