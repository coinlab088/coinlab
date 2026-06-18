import { useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { AuthButton } from '../../components/auth/AuthButton'
import type { FundRecord } from '../../data/records'
import { formatTradeAmount } from '../../data/trade'
import { walletCopy } from '../../data/wallet'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function WithdrawSuccessPage() {
  const { withdrawDraft, closeWallet, addFundRecord } = usePrototype()
  const recorded = useRef(false)

  useEffect(() => {
    if (!withdrawDraft || recorded.current) return
    recorded.current = true

    const record: FundRecord = {
      id: `fund-${Date.now()}`,
      type: 'withdraw',
      coin: withdrawDraft.coin,
      chain: withdrawDraft.chain,
      amount: withdrawDraft.amount,
      fee: withdrawDraft.fee,
      status: 'pending',
      address: withdrawDraft.address,
      txHash: '—',
      createdAt: Date.now(),
    }
    addFundRecord(record)
  }, [withdrawDraft, addFundRecord])

  if (!withdrawDraft) return null

  return (
    <SubPageLayout title={walletCopy.withdrawSuccessTitle} onBack={closeWallet}>
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 className="h-14 w-14 text-success" strokeWidth={1.5} />
        <p className="mt-4 text-h3 font-semibold text-primary">提币处理中</p>
        <p className="mt-2 max-w-[280px] text-body-sm text-secondary">
          {formatTradeAmount(withdrawDraft.receive, withdrawDraft.coin)}{' '}
          {withdrawDraft.coin} 将在网络确认后到账，可在充提记录中查看状态。
        </p>
      </div>
      <AuthButton onClick={closeWallet}>完成</AuthButton>
    </SubPageLayout>
  )
}
