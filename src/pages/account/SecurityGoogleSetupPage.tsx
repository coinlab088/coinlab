import { Copy, Plus } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { FigmaQrPlaceholder } from '../../components/figma/FigmaQrPlaceholder'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { usePrototype } from '../../context/PrototypeContext'
import { accountCopy } from '../../data/account'

const GOOGLE_SECRET = '5XUXUOOCYOSWT3BV'

export function SecurityGoogleSetupPage() {
  const { navigateAccount, figmaExport } = usePrototype()
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(GOOGLE_SECRET)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <SubPageLayout
      title={accountCopy.googleSetupTitle}
      onBack={() => navigateAccount({ screen: 'security-google' })}
    >
      <div className="mb-4 rounded-full bg-elevated px-4 py-3 text-center text-body-sm text-primary">
        下载身份验证器
      </div>

      <div className="relative space-y-6 pl-8">
        <div className="absolute bottom-6 left-[11px] top-3 w-px bg-border-subtle" />

        <GoogleStep number={1}>
          <p className="text-body-sm leading-relaxed text-primary">
            复制 16 位密钥，或扫描下方二维码
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border-subtle bg-elevated px-4 py-3">
            <span className="min-w-0 flex-1 truncate text-body-sm tracking-[0.08em] text-primary">
              {GOOGLE_SECRET}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-8 w-8 items-center justify-center rounded-md text-secondary hover:bg-sunken"
              aria-label="复制密钥"
            >
              <Copy className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
          {copied && <p className="mt-2 text-caption text-brand">已复制密钥</p>}
          <div className="mt-4 flex justify-start">
            <div className="rounded-2xl bg-white p-3">
              <FigmaQrPlaceholder size={104} />
            </div>
          </div>
        </GoogleStep>

        <GoogleStep number={2}>
          <p className="text-body-sm leading-relaxed text-primary">
            打开谷歌验证器，点击 <span className="font-semibold text-brand">+</span>，使用您刚刚复制的
            16 位密钥添加新的身份验证器
          </p>
          <div className="mt-4 flex h-28 w-28 items-center justify-center rounded-[24px] border-2 border-dashed border-border bg-elevated">
            <Plus className="h-8 w-8 text-brand" strokeWidth={1.75} />
          </div>
        </GoogleStep>

        <GoogleStep number={3}>
          <p className="text-body-sm leading-relaxed text-primary">
            返回 CoinNova，验证新的身份验证器动态码
          </p>
        </GoogleStep>
      </div>

      <p className="mt-8 text-caption text-secondary">
        请确保您已完成步骤 2，在进行下一步
      </p>

      <div className="mt-6">
        <AuthButton
          type="button"
          onClick={() => navigateAccount({ screen: 'security-google-verify' })}
        >
          下一步
        </AuthButton>
      </div>

      {figmaExport && (
        <p className="mt-4 text-center text-caption text-primary-muted">
          Figma 导出：二维码与演示图为静态示意
        </p>
      )}
    </SubPageLayout>
  )
}

function GoogleStep({
  number,
  children,
}: {
  number: number
  children: ReactNode
}) {
  return (
    <section className="relative">
      <span className="absolute -left-8 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-brand-dark">
        {number}
      </span>
      {children}
    </section>
  )
}
