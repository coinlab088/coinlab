import { useMemo, useState, type ReactNode } from 'react'
import { ChevronDown, Filter, PackageOpen } from 'lucide-react'
import { recordsCopy } from '../../data/records'
import { getOrderDisplayStatus } from '../../data/trade'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { BottomSheet, SheetOption } from '../../components/sheets/BottomSheet'
import {
  FillDetailCard,
  HistoryOrderCard,
  OpenOrderCard,
} from '../../components/trade/SpotOrderCards'

type RecordTab = 'open' | 'history' | 'fills'

type FilterSheet = 'pair' | 'type' | 'side' | 'status' | null

type PairFilter = 'all' | string
type TypeFilter = 'all' | 'limit' | 'market'
type SideFilter = 'all' | 'buy' | 'sell'
type StatusFilter = 'all' | 'partial' | 'filled' | 'cancelled'

const DATE_RANGE_LABEL = '2026-03-10 到 2026-06-23'

export function OrderHistoryPage() {
  const { orders, closeRecords, navigateRecords, cancelOrder, cancelAllOpenOrders } =
    usePrototype()
  const [tab, setTab] = useState<RecordTab>('history')
  const [filterSheet, setFilterSheet] = useState<FilterSheet>(null)
  const [pairFilter, setPairFilter] = useState<PairFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [sideFilter, setSideFilter] = useState<SideFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const openCount = orders.filter((o) => o.status === 'open').length

  const tabOrders = useMemo(() => {
    switch (tab) {
      case 'open':
        return orders.filter((o) => o.status === 'open')
      case 'fills':
        return orders.filter((o) => o.filled > 0)
      case 'history':
      default:
        return orders.filter((o) => o.status !== 'open')
    }
  }, [orders, tab])

  const visible = useMemo(() => {
    return tabOrders.filter((order) => {
      if (pairFilter !== 'all' && order.pairId !== pairFilter) return false
      if (typeFilter !== 'all' && order.type !== typeFilter) return false
      if (sideFilter !== 'all' && order.side !== sideFilter) return false
      if (statusFilter !== 'all' && tab === 'history') {
        const label = getOrderDisplayStatus(order)
        if (statusFilter === 'partial' && label !== '部分成交') return false
        if (statusFilter === 'filled' && label !== '完全成交') return false
        if (statusFilter === 'cancelled' && label !== '已撤销') return false
      }
      return true
    })
  }, [tabOrders, pairFilter, typeFilter, sideFilter, statusFilter, tab])

  const pairOptions = useMemo(() => {
    const ids = [...new Set(orders.map((o) => o.pairId))]
    return ids.map((id) => {
      const order = orders.find((o) => o.pairId === id)!
      return { id, label: `${order.base}/${order.quote}` }
    })
  }, [orders])

  const showTypeFilter = tab !== 'fills'
  const showStatusFilter = tab === 'history'

  return (
    <div className="relative h-full min-h-0">
      <SubPageLayout title={recordsCopy.ordersTitle} onBack={closeRecords}>
        <div className="-mx-4 mb-3 border-b border-border-subtle px-4">
          <div className="flex">
            {(
              [
                { id: 'open' as const, label: `当前委托(${openCount})` },
                { id: 'history' as const, label: '历史委托' },
                { id: 'fills' as const, label: '成交明细' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`relative flex-1 py-3 text-center text-body-sm font-medium ${
                  tab === item.id ? 'text-primary' : 'text-secondary'
                }`}
              >
                {item.label}
                {tab === item.id && (
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full bg-brand" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="-mx-4 mb-2 flex items-center gap-2 overflow-x-auto px-4 pb-1">
          <FilterChip
            label="全部币对"
            value={
              pairFilter === 'all'
                ? undefined
                : pairOptions.find((p) => p.id === pairFilter)?.label
            }
            onClick={() => setFilterSheet('pair')}
          />
          {showTypeFilter && (
            <FilterChip
              label="限价 | 市价"
              value={
                typeFilter === 'all'
                  ? undefined
                  : typeFilter === 'limit'
                    ? '限价'
                    : '市价'
              }
              onClick={() => setFilterSheet('type')}
            />
          )}
          {tab === 'fills' && (
            <FilterChip
              label="方向"
              value={
                sideFilter === 'all' ? undefined : sideFilter === 'buy' ? '买入' : '卖出'
              }
              onClick={() => setFilterSheet('side')}
            />
          )}
          {showStatusFilter && (
            <FilterChip
              label="状态"
              value={statusFilterLabel(statusFilter)}
              onClick={() => setFilterSheet('status')}
            />
          )}
          <button
            type="button"
            aria-label="高级筛选"
            className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sunken text-secondary"
          >
            <Filter className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {tab === 'open' && openCount > 0 && (
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={cancelAllOpenOrders}
              className="text-caption text-brand"
            >
              全部撤单
            </button>
          </div>
        )}

        {(tab === 'history' || tab === 'fills') && (
          <p className="mb-3 text-caption text-secondary">{DATE_RANGE_LABEL}</p>
        )}

        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-border-subtle">
            {visible.map((order) => (
              <li key={order.id}>
                {tab === 'open' ? (
                  <OpenOrderCard order={order} onCancel={() => cancelOrder(order.id)} />
                ) : tab === 'fills' ? (
                  <FillDetailCard order={order} />
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      navigateRecords({ screen: 'order-detail', orderId: order.id })
                    }
                    className="w-full py-4 text-left active:bg-sunken"
                  >
                    <HistoryOrderCard order={order} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </SubPageLayout>

      <FilterSheetModal
        open={filterSheet === 'pair'}
        title="币对"
        onClose={() => setFilterSheet(null)}
      >
        <SheetOption
          label="全部币对"
          selected={pairFilter === 'all'}
          onClick={() => {
            setPairFilter('all')
            setFilterSheet(null)
          }}
        />
        {pairOptions.map((pair) => (
          <SheetOption
            key={pair.id}
            label={pair.label}
            selected={pairFilter === pair.id}
            onClick={() => {
              setPairFilter(pair.id)
              setFilterSheet(null)
            }}
          />
        ))}
      </FilterSheetModal>

      <FilterSheetModal
        open={filterSheet === 'type'}
        title="委托类型"
        onClose={() => setFilterSheet(null)}
      >
        {(
          [
            { id: 'all' as const, label: '全部' },
            { id: 'market' as const, label: '市价' },
            { id: 'limit' as const, label: '限价' },
          ] as const
        ).map((item) => (
          <SheetOption
            key={item.id}
            label={item.label}
            selected={typeFilter === item.id}
            onClick={() => {
              setTypeFilter(item.id)
              setFilterSheet(null)
            }}
          />
        ))}
      </FilterSheetModal>

      <FilterSheetModal
        open={filterSheet === 'side'}
        title="方向"
        onClose={() => setFilterSheet(null)}
      >
        {(
          [
            { id: 'all' as const, label: '全部' },
            { id: 'buy' as const, label: '买入' },
            { id: 'sell' as const, label: '卖出' },
          ] as const
        ).map((item) => (
          <SheetOption
            key={item.id}
            label={item.label}
            selected={sideFilter === item.id}
            onClick={() => {
              setSideFilter(item.id)
              setFilterSheet(null)
            }}
          />
        ))}
      </FilterSheetModal>

      <FilterSheetModal
        open={filterSheet === 'status'}
        title="状态"
        onClose={() => setFilterSheet(null)}
      >
        {(
          [
            { id: 'all' as const, label: '全部' },
            { id: 'partial' as const, label: '部分成交' },
            { id: 'filled' as const, label: '完全成交' },
            { id: 'cancelled' as const, label: '已撤销' },
          ] as const
        ).map((item) => (
          <SheetOption
            key={item.id}
            label={item.label}
            selected={statusFilter === item.id}
            onClick={() => {
              setStatusFilter(item.id)
              setFilterSheet(null)
            }}
          />
        ))}
      </FilterSheetModal>
    </div>
  )
}

function FilterChip({
  label,
  value,
  onClick,
}: {
  label: string
  value?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1 rounded-md bg-sunken px-2.5 py-1.5 text-caption text-secondary"
    >
      <span>{value ?? label}</span>
      <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
    </button>
  )
}

function FilterSheetModal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <BottomSheet open={open} title={title} onClose={onClose}>
      <div className="space-y-2">{children}</div>
      <button
        type="button"
        onClick={onClose}
        className="mt-4 h-11 w-full rounded-md bg-brand text-body-sm font-semibold text-brand-dark active:opacity-90"
      >
        取消
      </button>
    </BottomSheet>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <PackageOpen className="h-12 w-12 text-secondary" strokeWidth={1.25} />
      <p className="mt-4 text-body-sm text-secondary">暂无数据</p>
    </div>
  )
}

function statusFilterLabel(filter: StatusFilter): string | undefined {
  switch (filter) {
    case 'partial':
      return '部分成交'
    case 'filled':
      return '完全成交'
    case 'cancelled':
      return '已撤销'
    default:
      return undefined
  }
}
