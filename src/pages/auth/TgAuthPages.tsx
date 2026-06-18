import { useState } from 'react'
import { Check, Shield } from 'lucide-react'
import { AuthButton } from '../../components/auth/AuthButton'
import { Annotatable } from '../../components/inspect/Annotatable'
import { tgAuthCopy, mockTgUser } from '../../data/tgAuth'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function TgConnectPage() {
  const { closeAuth, setAuthScreen } = usePrototype()
  const [loading, setLoading] = useState(false)

  function handleAuthorize() {
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setAuthScreen({ screen: 'tg-link' })
    }, 900)
  }

  return (
    <SubPageLayout title={tgAuthCopy.connectTitle} onBack={closeAuth}>
      <Annotatable id="tg-connect">
        <div className="flex flex-col items-center py-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2aabee] text-2xl font-bold text-white">
            N
          </div>
          <p className="mt-4 text-h3 font-semibold text-primary">{tgAuthCopy.botName}</p>
          <p className="text-caption text-secondary">{tgAuthCopy.botHandle}</p>
          <p className="mt-4 max-w-[300px] text-body-sm text-secondary">
            CoinNova 请求通过 Telegram 验证您的身份，以便在小程序内安全登录与接收通知。
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-border-subtle bg-sunken p-4">
          <p className="mb-3 flex items-center gap-2 text-body-sm font-medium text-primary">
            <Shield className="h-4 w-4 text-brand" />
            将获取以下权限
          </p>
          <ul className="space-y-2">
            {tgAuthCopy.permissions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-caption text-secondary"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <AuthButton loading={loading} onClick={handleAuthorize}>
          {tgAuthCopy.authorize}
        </AuthButton>

        <p className="mt-3 text-center text-caption text-primary-muted">
          原型：模拟 Telegram WebApp `requestWriteAccess` 流程
        </p>
      </Annotatable>
    </SubPageLayout>
  )
}

export function TgLinkPage() {
  const { setAuthScreen, completeAuth } = usePrototype()
  const tg = mockTgUser

  function handleLinkExisting() {
    setAuthScreen({ screen: 'login' })
  }

  function handleCreateNew() {
    setAuthScreen({ screen: 'register' })
  }

  function handleQuickComplete() {
    setAuthScreen({ screen: 'tg-success' })
    window.setTimeout(() => completeAuth(), 600)
  }

  return (
    <SubPageLayout title={tgAuthCopy.linkTitle} onBack={() => setAuthScreen({ screen: 'tg-connect' })}>
      <div className="flex flex-col items-center py-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2aabee]/20 text-lg font-semibold text-[#2aabee]">
          {tg.firstName[0]}
        </div>
        <p className="mt-3 text-body font-semibold text-primary">
          {tg.firstName} @{tg.username}
        </p>
        <p className="mt-1 text-caption text-secondary">Telegram ID {tg.id}</p>
      </div>

      <p className="mb-5 text-center text-body-sm text-secondary">
        {tgAuthCopy.linkedHint}
      </p>

      <div className="space-y-3">
        <AuthButton onClick={handleLinkExisting}>{tgAuthCopy.linkExisting}</AuthButton>
        <button
          type="button"
          onClick={handleCreateNew}
          className="h-12 w-full rounded-md border border-border text-body-sm font-medium text-primary active:bg-elevated"
        >
          {tgAuthCopy.createNew}
        </button>
        <button
          type="button"
          onClick={handleQuickComplete}
          className="w-full py-2 text-caption text-brand"
        >
          原型：一键完成 TG 关联登录
        </button>
      </div>
    </SubPageLayout>
  )
}
