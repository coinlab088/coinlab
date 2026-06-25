import { accountCopy } from '../../data/account'
import { InviteFriendsContent } from '../../pages/account/InviteFriendsPage'
import { PcModalShell } from './PcModalShell'

interface PcInviteModalProps {
  onClose: () => void
}

export function PcInviteModal({ onClose }: PcInviteModalProps) {
  return (
    <PcModalShell
      title={accountCopy.inviteTitle}
      onClose={onClose}
      maxWidth="max-w-3xl"
      scrollable
    >
      <InviteFriendsContent />
    </PcModalShell>
  )
}
