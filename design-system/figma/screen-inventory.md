# CoinNova 屏幕清单（导入 Figma 用）

在本地 `npm run dev` 后，用右下角 **原型调试** 面板切换状态，再按 [FIGMA-WORKFLOW.md](../../docs/FIGMA-WORKFLOW.md) 导入。

## APP — 主 Tab（每种主题至少导黄黑 + 绿白）

| 序号 | Frame 名 | 调试面板操作 |
|------|----------|--------------|
| 1 | market/guest | 游客 + 行情 Tab |
| 2 | market/logged-in | 已登录 + 行情 Tab |
| 3 | trade/default | 已登录 + 交易 Tab |
| 4 | assets/guest | 游客 + 资产 Tab |
| 5 | assets/logged-in | 已登录 + 资产 Tab |

**主题：** 预览端选 APP → 顶部切换 黄黑 / 绿白 / 绿黑（绿白必导：验证 Logo 无黑框）

## APP — 认证流

| 序号 | Frame 名 | 调试面板 → 认证流 |
|------|----------|-------------------|
| 6 | auth/entry | 登录页（入口） |
| 7 | auth/login | 登录页 |
| 8 | auth/register | 注册页 |
| 9 | auth/verify | 进入登录页后走流程，或从注册进入 |

也可从首页点击「注册 / 登录」进入后导入。

## APP — 钱包 / 记录 / 其他

| 序号 | Frame 名 | 操作 |
|------|----------|------|
| 10 | wallet/deposit | 资产页 → 充值 |
| 11 | wallet/deposit-address | 充值 → 选币链 → 地址页 |
| 12 | wallet/withdraw | 资产页 → 提现 |
| 13 | records/fund | 资产 → 充提流水 |
| 14 | records/orders | 交易 → 全部订单 |
| 15 | chart/kline | 调试面板 → K 线页 |
| 16 | account/settings | 调试面板 → 账户设置 |
| 17 | account/kyc | 账户 → KYC |
| 18 | compliance/restriction | 调试面板 → 地区限制弹窗 |

## H5

| 序号 | Frame 名 | 操作 |
|------|----------|------|
| 19 | h5/market | 预览端 → H5 + 行情 |
| 20 | h5/tg-connect | H5 + 游客点登录（TG 授权） |
| 21 | h5/tg-link | TG 授权后继续 |

## PC

| 序号 | Frame 名 | 操作 |
|------|----------|------|
| 22 | pc/home | 预览端 → PC（默认首页） |
| 23 | pc/market | PC + 行情 |
| 24 | pc/trade | PC + 交易 |
| 25 | pc/assets | PC + 资产 |
| 26 | pc/kline | 调试面板 → K 线（PC 宽屏） |

## 优先级（时间紧时）

**P0：** 1、2、3、5（黄黑）+ 2（绿白）  
**P1：** 认证 6–8、充提 10–12  
**P2：** H5、PC、其余流程
