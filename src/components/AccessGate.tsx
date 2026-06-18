import type { FormEvent, ReactNode } from 'react'
import { useState } from 'react'
import { Lock } from 'lucide-react'
import { CoinLabLogo } from './CoinLabLogo'

const ACCESS_STORAGE_KEY = 'coinlab_pages_access'
const ACCESS_CODE = 'cl202606'

function isAccessGranted(): boolean {
  try {
    return sessionStorage.getItem(ACCESS_STORAGE_KEY) === 'granted'
  } catch {
    return false
  }
}

function grantAccess(): void {
  try {
    sessionStorage.setItem(ACCESS_STORAGE_KEY, 'granted')
  } catch {
    // ignore quota / private mode
  }
}

interface AccessGateProps {
  children: ReactNode
}

export function AccessGate({ children }: AccessGateProps) {
  const enableGate = import.meta.env.PROD
  const [granted, setGranted] = useState(() => !enableGate || isAccessGranted())
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (code.trim() === ACCESS_CODE) {
      grantAccess()
      setGranted(true)
      setError(false)
      return
    }
    setError(true)
  }

  if (granted) {
    return children
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-xl border border-border-subtle bg-elevated p-8 shadow-md">
        <div className="flex flex-col items-center text-center">
          <CoinLabLogo size={64} />
          <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-brand-muted">
            <Lock className="h-5 w-5 text-brand" strokeWidth={1.5} />
          </div>
          <h1 className="mt-4 text-h3 font-semibold text-primary">访问验证</h1>
          <p className="mt-2 text-body-sm text-secondary">
            本原型仅限授权人员访问，请输入验证码
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="access-code" className="sr-only">
              验证码
            </label>
            <input
              id="access-code"
              type="password"
              inputMode="text"
              autoComplete="off"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError(false)
              }}
              placeholder="请输入验证码"
              className={`h-11 w-full rounded-md border bg-sunken px-4 text-body-sm text-primary outline-none placeholder:text-secondary ${
                error ? 'border-danger' : 'border-border-subtle focus:border-brand'
              }`}
            />
            {error && (
              <p className="mt-2 text-caption text-danger">验证码错误，请重试</p>
            )}
          </div>
          <button
            type="submit"
            className="h-11 w-full rounded-md bg-brand text-body-sm font-semibold text-brand-dark active:bg-brand-hover"
          >
            进入原型
          </button>
        </form>

        <p className="mt-4 text-center text-[10px] text-primary-muted">
          验证状态仅在当前浏览器标签页会话内有效
        </p>
      </div>
    </div>
  )
}