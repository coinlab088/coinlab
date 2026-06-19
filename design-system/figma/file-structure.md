# CoinNova Figma 文件结构

> 无专职设计师时：**代码原型是唯一设计源**，Figma 为镜像与评审载体。  
> 新建 Figma 文件建议命名：`CoinNova App — UI`

## 画板尺寸

| 端 | Frame 尺寸 | 说明 |
|----|------------|------|
| APP | 390 × 812 | iPhone 14 逻辑分辨率，与 `AppFrame` 一致 |
| H5 | 390 × 812 | 含 TG 顶栏安全区 |
| PC | 1440 × 900 | 桌面首页/交易宽屏 |

## 建议 Canvas 分区

```
📁 00 — Cover & Tokens
   └ Cover（项目名、版本、链接到 GitHub Pages）
   └ Color / Type / Spacing 参考（可从 tokens.json 导入）

📁 01 — APP · 黄黑（默认）
   └ 行情 / 游客
   └ 行情 / 已登录
   └ 交易
   └ 资产
   └ 底部导航组件

📁 02 — APP · 绿白
   └ （同上关键页，至少游客首页 + 行情列表）

📁 03 — APP · 绿黑
   └ （同上关键页）

📁 04 — APP · 流程
   └ 认证：入口 / 登录 / 注册 / 验证码
   └ 充提：充值 / 拉地址 / 提现 / 成功
   └ 记录：流水 / 订单
   └ K 线详情
   └ 账户设置 / KYC

📁 05 — H5 · Telegram
   └ TG 授权 / 关联账户
   └ 行情 / 交易 / 资产（带 TG 顶栏）

📁 06 — PC Web
   └ 首页 Landing
   └ 行情 / 交易 / 资产
   └ K 线宽屏

📁 99 — Archive
   └ 历史 NXone 参考（只读，勿当新 UI 依据）
```

## Frame 命名规范

```
{端}/{主题}/{模块}/{状态}

示例：
APP/yellow-black/market/guest
APP/green-white/market/guest
APP/yellow-black/trade/logged-in
APP/yellow-black/wallet/deposit-address
H5/default/auth/tg-connect
PC/default/home/landing
```

## 组件化建议（Figma 内）

导入后逐步整理为 Components：

- `Nav/BottomTabBar`（3 Tab）
- `Nav/Header`
- `Market/SearchBar`
- `Market/PairRow`
- `Trade/OrderForm`
- `Button/Primary` `Button/Secondary`
- `Logo/CoinNova`（三主题变体）

组件仍以 **代码实现为准**；Figma 组件用于评审与对外展示，不要求 1:1 可开发导出。
