import {
  formatRecordTime,
  getFundRecord,
  getFundStatusLabel,
  getFundTypeLabel,
  recordsCopy,
} from '../../data/records'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { CopyField } from '../../components/common/CopyButton'
import { formatTradeAmount } from '../../data/trade'

export function FundDetailPage() {
  const { recordsScreen, fundRecords, navigateRecords } = usePrototype()
  const record = getFundRecord(recordsScreen?.fundId ?? '', fundRecords)

  if (!record) return null

  function handleBack() {
    navigateRecords({ screen: 'fund' })
  }

  return (
    <SubPageLayout title={recordsCopy.fundDetailTitle} onBack={handleBack}>
      <div className="mb-5 text-center">
        <p className="text-caption text-secondary">{getFundTypeLabel(record.type)}</p>
        <p
          className={`mt-1 tabular-nums text-h1 font-semibold ${
            record.type === 'deposit' ? 'text-success' : 'text-danger'
          }`}
        >
          {record.type === 'deposit' ? '+' : '−'}
          {formatTradeAmount(record.amount, record.coin)} {record.coin}
        </p>
        <p className="mt-1 text-body-sm text-secondary">
          {getFundStatusLabel(record.status)}
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-border-subtle bg-sunken px-4 py-3 text-body-sm">
        <Row label="网络" value={record.chain} />
        <Row label="手续费" value={`${formatTradeAmount(record.fee, record.coin)} ${record.coin}`} />
        <Row label="时间" value={formatRecordTime(record.createdAt)} />
      </div>

      <div className="mt-4 space-y-3">
        <CopyField label="地址" value={record.address} />
        {record.txHash !== '—' && (
          <CopyField label="TxHash" value={record.txHash} />
        )}
      </div>
    </SubPageLayout>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-secondary">{label}</span>
      <span className="text-right text-primary">{value}</span>
    </div>
  )
}
