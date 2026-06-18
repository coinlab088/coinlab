import { useState } from 'react'
import { Send } from 'lucide-react'
import { supportCopy } from '../../data/support'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

const mockReplies = [
  '您好，我是 CoinLab 客服小助手，请问有什么可以帮您？',
]

export function SupportChatPage() {
  const { navigateSupport } = usePrototype()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<
    { role: 'agent' | 'user'; text: string }[]
  >(mockReplies.map((text) => ({ role: 'agent' as const, text })))

  function handleBack() {
    navigateSupport({ screen: 'support' })
  }

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          text: '已收到您的问题，客服将尽快为您处理。（原型演示）',
        },
      ])
    }, 600)
  }

  return (
    <SubPageLayout title={supportCopy.chatTitle} onBack={handleBack}>
      <div className="flex h-full min-h-[320px] flex-col">
        <div className="flex-1 space-y-3 overflow-y-auto pb-3">
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <p
                className={`max-w-[80%] rounded-lg px-3 py-2 text-body-sm ${
                  msg.role === 'user'
                    ? 'bg-brand text-brand-dark'
                    : 'bg-sunken text-primary'
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 border-t border-border-subtle pt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您的问题…"
            className="h-10 min-w-0 flex-1 rounded-md border border-border bg-sunken px-3 text-body-sm text-primary outline-none focus:border-brand"
          />
          <button
            type="button"
            onClick={handleSend}
            aria-label="发送"
            className="flex h-10 w-10 items-center justify-center rounded-md bg-brand text-brand-dark active:opacity-80"
          >
            <Send className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </SubPageLayout>
  )
}
