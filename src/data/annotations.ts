export interface AnnotationSlice {
  width: string
  height?: string
  minHeight?: string
  padding?: string
  gap?: string
  radius?: string
  colors: string[]
  tailwind: string
  css: string
}

export interface Annotation {
  id: string
  index: number
  page: string
  label: string
  requirement: string
  logic: string
  slice: AnnotationSlice
}

export const annotations: Annotation[] = [
  {
    id: 'pc-home-hero',
    index: 1,
    page: 'PC 首页',
    label: '品牌 Hero',
    requirement: '首屏需传达品牌定位与核心 CTA，支持未登录用户一键进入行情。',
    logic: '点击「开始交易」→ setActiveTab(market)；未登录可浏览行情，交易/资产触发登录。',
    slice: {
      width: '100%',
      minHeight: '480px',
      padding: '40px 32px',
      gap: '32px',
      colors: ['#000000', '#FFCC00', '#121212'],
      tailwind: 'px-8 pt-10 pb-10 border-b border-border-subtle',
      css: 'padding: 40px 32px; background: #000000;',
    },
  },
  {
    id: 'tg-connect',
    index: 2,
    page: 'TG 授权',
    label: 'Telegram 授权页',
    requirement: 'H5/TG 小程序内首次进入需展示 Bot 授权说明与权限清单，符合 Telegram WebApp 规范。',
    logic: 'openAuth() 在 h5 端路由至 tg-connect；授权后进入 tg-link 选择关联或新建账户。',
    slice: {
      width: '390px',
      minHeight: '100%',
      padding: '24px 16px',
      colors: ['#17212b', '#2aabee', '#FFCC00'],
      tailwind: 'px-4 py-6 bg-base',
      css: 'max-width: 390px; padding: 24px 16px;',
    },
  },
  {
    id: 'kline-chart',
    index: 3,
    page: 'K 线详情',
    label: 'K 线图表区',
    requirement: '展示蜡烛图、成交量柱、周期切换；正式环境对接行情 WebSocket。',
    logic: 'TradePairBar K 线按钮 / 行情行图表图标 → openKline(pairId)；底部买入卖出跳转交易 Tab。',
    slice: {
      width: '100%',
      height: '280px',
      padding: '12px 12px 0',
      colors: ['#22C55E', '#EF4444', '#1A1A1A'],
      tailwind: 'h-[280px] px-3 pt-3 bg-sunken rounded-lg',
      css: 'height: 280px; padding: 12px 12px 0; background: #0A0A0A;',
    },
  },
  {
    id: 'market-search',
    index: 4,
    page: '行情',
    label: '行情搜索',
    requirement: '支持交易对符号模糊搜索，结果实时过滤列表。',
    logic: '输入框 onChange 过滤 marketPairs；空结果展示占位文案。',
    slice: {
      width: '100%',
      height: '40px',
      padding: '0 12px',
      radius: '8px',
      colors: ['#121212', '#2A2A2A', '#737373'],
      tailwind: 'h-10 px-3 rounded-md bg-elevated border border-border-subtle',
      css: 'height: 40px; padding: 0 12px; border-radius: 8px;',
    },
  },
  {
    id: 'trade-order-form',
    index: 5,
    page: '交易',
    label: '下单表单',
    requirement: '限价/市价切换，买入卖出，余额校验，未登录引导登录。',
    logic: 'submitOrder → 确认弹窗 → confirmOrder 扣款/挂单；市价立即成交，限价冻结余额。',
    slice: {
      width: '168px',
      minHeight: '320px',
      padding: '8px',
      gap: '8px',
      colors: ['#FFCC00', '#22C55E', '#EF4444'],
      tailwind: 'w-[168px] p-2 space-y-2',
      css: 'width: 168px; padding: 8px;',
    },
  },
  {
    id: 'deposit-address',
    index: 6,
    page: '充币',
    label: '充币地址',
    requirement: '首充需获取地址，后续同币种网络直接展示；地址支持复制与二维码。',
    logic: 'activatedDepositKeys 记录已获取组合；首次走 deposit-fetching 模拟 API。',
    slice: {
      width: '100%',
      padding: '16px',
      gap: '16px',
      colors: ['#FFCC00', '#121212'],
      tailwind: 'p-4 space-y-4 bg-elevated rounded-lg',
      css: 'padding: 16px; border-radius: 12px;',
    },
  },
]

export function getAnnotation(id: string): Annotation | undefined {
  return annotations.find((a) => a.id === id)
}
