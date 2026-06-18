const CDN_BASE =
  'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color'

/** spothq icon slug overrides when symbol ≠ filename */
const SLUG_MAP: Record<string, string> = {
  BTC: 'btc',
  ETH: 'eth',
  BNB: 'bnb',
  TRX: 'trx',
  SOL: 'sol',
  USDT: 'usdt',
  XRP: 'xrp',
  ADA: 'ada',
  AVAX: 'avax',
  LINK: 'link',
  DOGE: 'doge',
  DOT: 'dot',
  MATIC: 'matic',
  SHIB: 'shib',
  LTC: 'ltc',
  BCH: 'bch',
  UNI: 'uni',
  ATOM: 'atom',
  XLM: 'xlm',
  ETC: 'etc',
  FIL: 'fil',
  ICP: 'icp',
  HBAR: 'hbar',
  VET: 'vet',
  MKR: 'mkr',
  AAVE: 'aave',
  GRT: 'grt',
  ALGO: 'algo',
  NEAR: 'near',
  APT: 'apt',
  ARB: 'arb',
  OP: 'op',
  INJ: 'inj',
  IMX: 'imx',
  STX: 'stx',
  SAND: 'sand',
  MANA: 'mana',
  CRO: 'cro',
  QNT: 'qnt',
  FET: 'fet',
  RNDR: 'rndr',
  PEPE: 'pepe',
  BONK: 'bonk',
  SEI: 'sei',
  TIA: 'tia',
  LDO: 'ldo',
  FLOKI: 'floki',
  EGLD: 'egld',
  TON: 'ton',
  SUI: 'sui',
  WLD: 'wld',
}

export function getCoinIconUrl(symbol: string): string | null {
  const slug = SLUG_MAP[symbol.toUpperCase()]
  if (!slug) return null
  return `${CDN_BASE}/${slug}.svg`
}
