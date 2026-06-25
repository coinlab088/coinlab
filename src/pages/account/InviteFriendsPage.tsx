import type { ReactNode } from 'react'
import { Gift, Link2, Share2, Users } from 'lucide-react'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { AuthButton } from '../../components/auth/AuthButton'
import { CopyField } from '../../components/common/CopyButton'
import { accountCopy } from '../../data/account'
import {
  referralHighlights,
  referralRewardRules,
  referralSteps,
  referralSummary,
} from '../../data/referral'
import { usePrototype } from '../../context/PrototypeContext'

function formatCommission(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function InviteFriendsPage() {
  const { navigateAccount } = usePrototype()

  return (
    <SubPageLayout
      title={accountCopy.inviteTitle}
      onBack={() => navigateAccount({ screen: 'hub' })}
    >
      <InviteFriendsContent />
    </SubPageLayout>
  )
}

export function InviteFriendsContent() {
  return (
    <>
      <section className="mb-5 overflow-hidden rounded-2xl border border-brand/20 bg-[linear-gradient(135deg,rgba(255,204,0,0.16),rgba(255,204,0,0.04))]">
        <div className="flex items-start justify-between gap-4 px-5 py-5">
          <div className="min-w-0 flex-1">
            <p className="text-caption uppercase tracking-[0.2em] text-brand">
              Referral Program
            </p>
            <h2 className="mt-2 text-h2 font-semibold text-primary">
              邀请好友注册，赚取返佣奖励
            </h2>
            <p className="mt-2 max-w-2xl text-body-sm leading-relaxed text-secondary">
              邀请好友注册 CoinNova，好友完成注册、充值与交易后，您将持续获得奖励与手续费返佣。
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand/40 bg-[radial-gradient(circle_at_top,rgba(255,204,0,0.2),rgba(255,204,0,0.04))] shadow-[0_0_0_1px_rgba(255,204,0,0.08)]">
              <Gift className="h-7 w-7 text-brand" strokeWidth={1.7} />
            </span>
          </div>
        </div>

        <div
          className="grid gap-3 border-t border-border-subtle/80 px-5 py-4 md:grid-cols-3"
        >
          <StatCard
            icon={<Users className="h-5 w-5 text-brand" strokeWidth={1.75} />}
            label="累计邀请"
            value={`${referralSummary.totalInvites}`}
          />
          <StatCard
            icon={<Gift className="h-5 w-5 text-brand" strokeWidth={1.75} />}
            label="有效好友"
            value={`${referralSummary.qualifiedFriends}`}
          />
          <StatCard
            icon={<Share2 className="h-5 w-5 text-brand" strokeWidth={1.75} />}
            label="累计返佣"
            value={`${formatCommission(referralSummary.commissionUsdt)} USDT`}
          />
        </div>
      </section>

      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <CopyField label="邀请码" value={referralSummary.inviteCode} />
        <CopyField label="邀请链接" value={referralSummary.inviteLink} />
      </div>

      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        {referralHighlights.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border-subtle bg-elevated px-4 py-4"
          >
            <p className="text-caption text-secondary">{item.label}</p>
            <p className="mt-1 text-body font-semibold text-primary">{item.value}</p>
            <p className="mt-2 text-body-sm leading-relaxed text-secondary">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <section className="mb-5 rounded-xl border border-border-subtle bg-elevated p-4">
        <div className="mb-3 flex items-center gap-2">
          <Link2 className="h-4 w-4 text-brand" strokeWidth={1.75} />
          <h3 className="text-body font-semibold text-primary">如何获得奖励</h3>
        </div>
        <ol className="space-y-3">
          {referralSteps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-muted text-caption font-semibold text-brand">
                {index + 1}
              </span>
              <p className="pt-0.5 text-body-sm leading-relaxed text-secondary">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-6 rounded-xl border border-border-subtle bg-sunken p-4">
        <h3 className="mb-3 text-body font-semibold text-primary">奖励规则</h3>
        <div className="space-y-3">
          {referralRewardRules.map((rule) => (
            <div key={rule.title} className="rounded-lg border border-border-subtle bg-elevated px-4 py-3">
              <p className="text-body-sm font-medium text-primary">{rule.title}</p>
              <p className="mt-1 text-body-sm leading-relaxed text-secondary">{rule.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <AuthButton type="button">立即邀请好友</AuthButton>
    </>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-base/70 px-4 py-3.5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-muted/80">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-body-sm text-secondary">{label}</p>
          <p className="mt-1 text-h3 font-semibold leading-none text-primary">{value}</p>
        </div>
      </div>
    </div>
  )
}
