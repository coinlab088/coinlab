import { ChevronRight, Headphones, Mail, Ticket } from 'lucide-react'
import {
  supportChannels,
  supportCopy,
  supportFaq,
} from '../../data/support'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

const channelIcons = {
  chat: Headphones,
  email: Mail,
  ticket: Ticket,
} as const

export function SupportCenterPage() {
  const { closeSupport, navigateSupport } = usePrototype()

  return (
    <SubPageLayout title={supportCopy.supportTitle} onBack={closeSupport}>
      <p className="mb-4 text-body-sm text-secondary">
        7×24 小时为您服务，请选择联系方式
      </p>

      <div className="mb-5 space-y-2">
        {supportChannels.map((ch) => {
          const Icon = channelIcons[ch.id as keyof typeof channelIcons] ?? Headphones
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => {
                if (ch.id === 'chat') {
                  navigateSupport({ screen: 'support-chat' })
                }
              }}
              className="flex w-full items-center gap-3 rounded-lg border border-border-subtle bg-elevated px-4 py-3.5 text-left active:bg-sunken"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-muted">
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-body-sm font-medium text-primary">
                  {ch.title}
                </p>
                <p className="text-caption text-secondary">{ch.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-secondary" />
            </button>
          )
        })}
      </div>

      <p className="mb-2 text-caption font-medium text-secondary">热门问题</p>
      <ul className="rounded-lg border border-border-subtle bg-sunken">
        {supportFaq.map((q) => (
          <li
            key={q}
            className="border-b border-border-subtle px-4 py-2.5 text-body-sm text-primary last:border-b-0"
          >
            {q}
          </li>
        ))}
      </ul>
    </SubPageLayout>
  )
}
