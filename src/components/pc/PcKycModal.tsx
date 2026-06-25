import { accountCopy } from '../../data/account'
import type { AccountScreenState } from '../../data/account'
import { KycContent } from '../../pages/account/KycContent'
import { KycSumsubContent } from '../../pages/account/KycSumsubContent'
import { PcModalShell } from './PcModalShell'
import type { PcKycScreen } from './pcAccountModalScreens'

interface PcKycModalProps {
  screen: PcKycScreen
  onClose: () => void
  onNavigate: (screen: AccountScreenState) => void
}

export function PcKycModal({ screen, onClose, onNavigate }: PcKycModalProps) {
  if (screen === 'kyc-sumsub') {
    return (
      <PcModalShell
        title={accountCopy.kycSumsubTitle}
        onClose={() => onNavigate({ screen: 'kyc' })}
        maxWidth="max-w-lg"
        scrollable
      >
        <KycSumsubContent onComplete={() => onNavigate({ screen: 'kyc' })} />
      </PcModalShell>
    )
  }

  return (
    <PcModalShell
      title={accountCopy.kycTitle}
      onClose={onClose}
      maxWidth="max-w-lg"
      scrollable
    >
      <KycContent onStart={() => onNavigate({ screen: 'kyc-sumsub' })} />
    </PcModalShell>
  )
}
