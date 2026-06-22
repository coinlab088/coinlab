# CoinLab Design System — MASTER

> **Version:** 1.0.0  
> **Product:** 加密货币交易所 / Web3 钱包 / 资产管理类移动端 App  
> **Direction:** 专业 · 可信 · 安全 · 深色金融科技 · 高信息密度 · 克制 · 移动端优先  
> **Source:** UI/UX Pro Max（Fintech/Crypto + Fintech Banking 推理规则，经 CoinLab 约束校准）  
> **Scope:** 全局设计规范。页面级 override 见 `design-system/pages/`（按需创建，本文件为唯一 Source of Truth）

---

## 1. 产品设计定位

CoinLab 是一款面向移动端的专业级数字资产平台，整合 **中心化交易**、**链上钱包** 与 **资产管理** 能力。

**我们要传递的感受：**
- 像持牌金融机构一样 **可靠、透明、可预期**
- 像专业交易终端一样 **高效、信息完整、操作路径清晰**
- 像现代 Web3 工具一样 **功能完整**，但 **视觉克制、不炒作**

**我们要避免的联想：**
- 博彩 / 二元期权 / 高杠杆诱导
- 资金盘 / 理财承诺 / 「稳赚」「翻倍」类营销
- 赛博朋克 / 霓虹 / 科幻 HUD 等过度炫酷风格

**视觉基调：** Dark Mode (OLED) +  restrained Glassmorphism（半透明分层，非 flashy 光效）  
**信息密度：** 高——用户需在单屏内完成读价、决策、下单或转账，但不拥挤。

---

## 2. 目标用户

| 用户群 | 特征 | 核心诉求 |
|--------|------|----------|
| **活跃交易者** | 频繁查看行情、下单 | 低延迟反馈、K 线/深度/订单簿清晰、误触防护 |
| **长期持有者** | 关注资产总览与充提 | 余额准确、历史可追溯、安全提示明确 |
| **Web3 用户** | 多链、自托管或半托管 | 网络/地址/Gas/交易状态一目了然 |
| **新手用户** | 首次接触 crypto | 步骤引导、术语解释、风险披露前置 |

**共性：** 在移动端完成高价值操作，对 **安全感知** 和 **数字可读性** 要求极高。

---

## 3. 核心设计原则

### 3.1 Trust First（信任优先）
- 所有涉及资金的操作必须 **可审查、可撤销（在链上确认前）、有明确反馈**
- 展示安全相关标识：加密传输、2FA、生物识别、冷存储说明（按实际能力）
- 费用、滑点、Gas、网络必须在确认页 **完整列出**

### 3.2 Clarity Over Spectacle（清晰胜于炫技）
- 数据与操作分离；价格用等宽数字；涨跌用 **颜色 + 符号** 双重编码
- 动效仅服务于 **状态反馈**（加载、成功、失败、价格变动），禁止装饰性 infinite animation

### 3.3 Mobile First（移动端优先）
- 设计基准宽度 **375px**；触控目标 ≥ **44×44pt**
- 单手可达：主要 CTA 位于拇指热区（底部 Tab / 底部 Sheet）
- 列表虚拟化；行情更新节流，避免整页闪烁

### 3.4 High Density, Low Noise（高密度、低噪音）
- 用 **层级、对齐、分隔线** 组织信息，而非大块留白或 heavy shadow
- 单屏信息块不超过 **3 个视觉层级**（背景 → 卡片 → 强调数据）

### 3.5 Security by Design（安全内建）
- 敏感操作：二次确认 + 生物识别 / PIN
- 链上操作：展示 network、contract、amount、recipient 完整信息
- 禁止在 UI 中使用 emoji 作为安全或状态图标

### 3.6 Restrained Fintech Aesthetic（克制金融科技美学）
- 主色 **Gold 信任 + Slate 深色底**；Accent 紫仅用于 Web3/高级功能，面积 ≤ 10%
- 禁止：Matrix 绿、全屏 neon glow、glitch、scanline、Orbitron 大面积使用

---

## 4. 信息架构原则

### 4.1 顶层模块（Bottom Tab）

```
市场 | 交易 | 资产 | 钱包（或合并至资产）
```

- **市场：** 行情发现、搜索、自选
- **交易：** 当前交易对、K 线、下单
- **资产：** 账户总览、充提、历史、PnL
- **钱包：** 链上地址、Send/Receive/Swap、Activity（若与 CEX 账户分离）

### 4.2 层级规则
- **L0 全局：** Tab Bar + 顶栏（标题 / 搜索 / 通知）
- **L1 模块首页：** 列表或 Dashboard 摘要
- **L2 详情：** 交易对详情、代币详情、交易记录详情
- **L3 操作流：** 下单、充提、签名——使用 **全屏 Sheet 或 Stack Push**，禁止 Modal 套 Modal

### 4.3 导航模式
- 模块内：**Stack Navigation**（Push / Pop）
- 跨模块：**Tab 切换**，切换时保留各 Tab 滚动状态
- 操作类：**Bottom Sheet**（半屏确认）→ **Full Screen**（最终确认 / 签名）

### 4.4 内容优先级（每屏）
1. **当前状态**（价格 / 余额 / 网络）
2. **用户要做的动作**（买 / 卖 / 发送）
3. **支撑信息**（深度、历史、说明）
4. **次要入口**（设置、帮助）

---

## 5. 移动端布局原则

### 5.1 安全区域与边距
| Token | 值 | 用途 |
|-------|-----|------|
| `screen-padding-x` | 16px | 屏幕左右内边距 |
| `screen-padding-y` | 12px | 区块上下间距（紧凑列表可用 8px） |
| `tab-bar-height` | 56px + safe-area | 底部导航 |
| `header-height` | 48px + safe-area | 顶栏 |
| `bottom-sheet-handle` | 32px | Sheet 拖拽指示区 |

### 5.2 栅格
- 单列为主；双列仅用于 **Bento 摘要卡**（如资产分布）
- 最大内容宽度：移动端全宽；Tablet ≥768px 时内容区 max **480px** 居中

### 5.3 固定元素
- 交易页：**下单区** 可 sticky 于底部（在 Tab Bar 之上）
- 顶栏固定时，内容区必须 `padding-top` 补偿，避免遮挡
- 禁止内容被 Tab Bar / 下单栏遮挡

### 5.4 触控
- 最小点击区域：**44×44pt**；图标 24px 时加 `hitSlop` 扩展
- 使用 `Pressable`，按下 opacity **0.7** 或 Android ripple
- 列表项整行可点，右侧箭头/收藏为独立 hit area

### 5.5 响应断点
| 断点 | 宽度 | 策略 |
|------|------|------|
| `xs` | 375px | 设计基准 |
| `sm` | 390px | 标准 iPhone |
| `md` | 768px | 双栏可选 |
| `lg` | 1024px+ | 居中窄栏，非桌面重布局 |

---

## 6. 色彩系统

> 基于 UI/UX Pro Max Fintech/Crypto 调色板，去除 neon，强化对比与语义。

### 6.1 品牌与界面色

| Token | Hex | 用途 |
|-------|-----|------|
| `color-bg-base` | `#0F172A` | 页面背景 (slate-900) |
| `color-bg-elevated` | `#1E293B` | 卡片 / 面板 (slate-800) |
| `color-bg-sunken` | `#0B1120` | 输入框、内嵌区域 |
| `color-bg-overlay` | `#1E293BCC` | 半透明浮层 (80% opacity) |
| `color-border-default` | `#334155` | 默认边框 (slate-700) |
| `color-border-subtle` | `#1E293B` | 弱分隔 |
| `color-text-primary` | `#F8FAFC` | 主文字 (slate-50) |
| `color-text-secondary` | `#94A3B8` | 次要文字 (slate-400) |
| `color-text-muted` | `#64748B` | 辅助 / 占位 (slate-500，禁用于正文) |
| `color-text-disabled` | `#475569` | 禁用态 (slate-600) |

### 6.2 品牌色

| Token | Hex | 用途 |
|-------|-----|------|
| `color-brand-primary` | `#F59E0B` | 品牌金、主 CTA、选中态 |
| `color-brand-primary-hover` | `#D97706` | 主色按下 |
| `color-brand-secondary` | `#FBBF24` | 次要强调、标签 |
| `color-brand-accent` | `#8B5CF6` | Web3 / 链上功能（克制使用） |
| `color-brand-accent-muted` | `#8B5CF633` | Accent 背景 20% |

### 6.3 语义色（交易 / 状态）

| Token | Hex | 用途 |
|-------|-----|------|
| `color-success` | `#26A69A` | 涨 / 买入 / 成功 / 已确认 |
| `color-success-bg` | `#26A69A1A` | 成功背景 10% |
| `color-danger` | `#EF5350` | 跌 / 卖出 / 错误 / 失败 |
| `color-danger-bg` | `#EF53501A` | 错误背景 10% |
| `color-warning` | `#F59E0B` | 风险提示、待确认 |
| `color-warning-bg` | `#F59E0B1A` | 警告背景 10% |
| `color-info` | `#38BDF8` | 中性提示 (sky-400) |
| `color-info-bg` | `#38BDF81A` | 信息背景 10% |

### 6.4 图表专用

| Token | Hex | 用途 |
|-------|-----|------|
| `color-chart-bullish` | `#26A69A` | K 线阳柱 |
| `color-chart-bearish` | `#EF5350` | K 线阴柱 |
| `color-chart-volume` | `#64748B66` | 成交量 40% opacity |
| `color-chart-grid` | `#334155` | 图表网格线 |
| `color-chart-crosshair` | `#94A3B8` | 十字线 |

### 6.5 对比度要求
- 正文 `text-primary` on `bg-base`：≥ **7:1**（WCAG AAA）
- 次要文字 on `bg-elevated`：≥ **4.5:1**（WCAG AA）
- 涨跌色：必须配合 **↑ ↓ + / −** 符号，不可仅依赖颜色

### 6.6 禁止用色
- `#00FF00` Matrix 绿、`#FF00FF` 霓虹洋红、全屏渐变紫粉
- 高饱和红绿闪烁背景
- 纯白 `#FFFFFF` 作为页面背景

---

## 7. 字体系统

> 采用 UI/UX Pro Max **Financial Trust** 方案；**不使用 Orbitron** 于数据/交易界面。

### 7.1 字体族

| Token | 字体 | 用途 |
|-------|------|------|
| `font-family-base` | **IBM Plex Sans**, system-ui, sans-serif | 全局默认 |
| `font-family-mono` | **IBM Plex Mono**, ui-monospace, monospace | 地址、Tx Hash、订单 ID |

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

- Web 端使用 `font-display: swap`
- 数字列启用 `font-variant-numeric: tabular-nums`

### 7.2 字号阶梯（移动端）

| Token | Size | Line Height | Weight | 用途 |
|-------|------|-------------|--------|------|
| `text-display` | 28px | 34px | 600 | 资产总览大数字 |
| `text-h1` | 22px | 28px | 600 | 页面标题 |
| `text-h2` | 18px | 24px | 600 | 区块标题 |
| `text-h3` | 16px | 22px | 600 | 卡片标题 |
| `text-body` | 15px | 22px | 400 | 正文 |
| `text-body-sm` | 13px | 18px | 400 | 次要说明 |
| `text-caption` | 11px | 16px | 400 | 标签、时间戳 |
| `text-price-lg` | 20px | 24px | 600 | 当前价（tabular-nums） |
| `text-price-md` | 15px | 20px | 500 | 列表价格 |
| `text-price-sm` | 13px | 18px | 500 | 涨跌幅 |

### 7.3 字重规则
- 标题：600；正文：400；强调数据：500–600
- 禁止 300 用于小于 15px 的文字（对比度不足）

---

## 8. 间距系统

基于 **4px** 基准网格：

| Token | 值 | 用途 |
|-------|-----|------|
| `space-0` | 0 | — |
| `space-1` | 4px | 图标与文字间距 |
| `space-2` | 8px | 紧凑列表行内、Tag 内边距 |
| `space-3` | 12px | 卡片内边距（紧凑） |
| `space-4` | 16px | 标准卡片内边距、屏幕边距 |
| `space-5` | 20px | 区块间距 |
| `space-6` | 24px | 大区块间距 |
| `space-8` | 32px | 空状态、引导页 |
| `space-10` | 40px | 底部 Sheet 顶部留白 |

**组件内边距默认值：**
- Button：`12px 16px`（高 44px）
- Card：`16px`
- List Item：`12px 16px`（高 ≥ 56px）
- Input：`12px 16px`（高 48px）

---

## 9. 圆角系统

| Token | 值 | 用途 |
|-------|-----|------|
| `radius-none` | 0 | 表格、全宽分割条 |
| `radius-sm` | 6px | Tag、Badge、小按钮 |
| `radius-md` | 10px | 输入框、标准按钮 |
| `radius-lg` | 12px | 卡片、Bottom Sheet 顶角 |
| `radius-xl` | 16px | 大卡片、Modal |
| `radius-full` | 9999px | 头像、圆形 Icon Button |

- 同一卡片内子元素圆角 ≤ 父元素
- 禁止混用 8px / 10px / 14px 无规律圆角

---

## 10. 阴影与边框规则

### 10.1 边框（首选）
深色 UI 以 **1px 实线边框** 定义层级，优于 heavy shadow：

| Token | 值 |
|-------|-----|
| `border-default` | 1px solid `#334155` |
| `border-subtle` | 1px solid `#1E293B` |
| `border-focus` | 2px solid `#F59E0B` |
| `border-error` | 1px solid `#EF5350` |

### 10.2 阴影（克制使用）

| Token | 值 | 用途 |
|-------|-----|------|
| `shadow-none` | none | 默认卡片 |
| `shadow-sm` | `0 1px 2px #00000040` | 浮起按钮 |
| `shadow-md` | `0 4px 12px #00000060` | Bottom Sheet、Dropdown |
| `shadow-glow-brand` | `0 0 8px #F59E0B33` | **仅**价格跳动瞬时反馈，≤300ms |

### 10.3 Glass 效果（restrained glassmorphism）
```
background: rgba(30, 41, 59, 0.80);
backdrop-filter: blur(12px);
border: 1px solid #334155;
```
- 仅用于：顶栏、Bottom Sheet、浮动下单栏
- 禁止：全屏 glass 导致文字对比度不足

---

## 11. 图标风格

### 11.1 图标库
- **唯一来源：** Lucide Icons 或 Heroicons（Outline 24×24）
- **禁止：** Emoji 作为 UI 图标；自定义 neon 图标；3D 图标

### 11.2 规格
| 场景 | 尺寸 | 描边 |
|------|------|------|
| Tab Bar | 24px | 1.5px |
| 列表行 | 20px | 1.5px |
| 按钮内 | 18px | 2px |
| 空状态插图 | 48px | 1.5px |

- 默认色：`#94A3B8`；选中 / 激活：`#F59E0B`
- 语义图标：success `#26A69A`、danger `#EF5350`、warning `#F59E0B`

### 11.3 代币 / 链 Logo
- 圆形 32px（列表）/ 40px（详情）
- 使用官方 SVG；缺失时用 **首字母 + 品牌色底** 占位，不用 emoji

---

## 12. 按钮组件规范

### 12.1 类型

| 类型 | 背景 | 文字 | 边框 | 用途 |
|------|------|------|------|------|
| **Primary** | `#F59E0B` | `#0F172A` | none | 主操作：确认、提交、买入 |
| **Secondary** | transparent | `#F8FAFC` | `#334155` | 次要：取消、切换 |
| **Ghost** | transparent | `#94A3B8` | none |  tertiary：查看全部 |
| **Danger** | `#EF5350` | `#FFFFFF` | none | 删除、全部卖出（需二次确认） |
| **Success** | `#26A69A` | `#FFFFFF` | none | 买入确认（交易语境） |
| **Disabled** | `#1E293B` | `#475569` | `#334155` | 不可用 |

### 12.2 尺寸

| Size | Height | Padding X | Font |
|------|--------|-----------|------|
| `lg` | 48px | 20px | 16px / 600 |
| `md` | 44px | 16px | 15px / 600 |
| `sm` | 36px | 12px | 13px / 500 |

### 12.3 状态
- **Default → Pressed：** opacity 0.85 或背景加深，**150ms** `transition-colors`
- **Loading：** 显示 spinner，**disabled**，禁止重复提交
- **Focus：** 2px `#F59E0B` outline，offset 2px

### 12.4 规则
- 每屏最多 **1 个 Primary** 按钮
- 交易语境：**Buy** 用 Success 色系，**Sell** 用 Danger 色系，与 Primary 金按钮区分
- 禁止：渐变按钮、发光按钮、scale 放大 hover（移动端无 hover）

---

## 13. 卡片组件规范

### 13.1 基础卡片
```
background: #1E293B
border: 1px solid #334155
border-radius: 12px
padding: 16px
```

### 13.2 变体

| 变体 | 特征 | 用途 |
|------|------|------|
| **Default** | 标准边框 | 通用信息 |
| **Interactive** | 按压缩放 opacity，整卡可点 | 市场列表项、资产项 |
| **Highlighted** | 左边框 3px `#F59E0B` | 当前选中交易对 |
| **Warning** | 背景 `#F59E0B1A` + 边框 `#F59E0B` | 风险提醒 |
| **Danger** | 背景 `#EF53501A` + 边框 `#EF5350` | 错误 / 失败交易 |

### 13.3 内容结构
```
[可选 Icon 32px] [Title text-h3]          [Trailing action]
[Subtitle text-body-sm text-secondary]
[Primary data — tabular-nums, text-price-lg]
[Footer: caption / link]
```

- 卡片间距：`12px`（列表）/ `16px`（Dashboard）
- 禁止：卡片 hover scale、3D tilt、video 背景

---

## 14. 表单组件规范

### 14.1 输入框
```
height: 48px
background: #0B1120
border: 1px solid #334155
border-radius: 10px
padding: 12px 16px
font: 15px IBM Plex Sans, tabular-nums（数字输入）
```

| 状态 | 样式 |
|------|------|
| Focus | border `#F59E0B` 2px |
| Error | border `#EF5350` + 下方 error text 13px |
| Disabled | bg `#1E293B`, text `#475569` |

### 14.2 Label 与辅助文字
- **必须**有 visible label，禁止 placeholder-only
- Label：`13px / 500 / #94A3B8`，位于输入框上方 4px
- Helper：`13px / #64748B`；Error：`13px / #EF5350`

### 14.3 验证时机
- 常规字段：**onBlur** 验证
- 金额 / 地址：**onChange** 实时校验 + onBlur 最终校验
- Submit 时：汇总所有错误，滚动至首个错误字段

### 14.4 特殊输入

| 类型 | 规则 |
|------|------|
| **金额** | 右对齐；千分位；显示可用余额 + Max 按钮 |
| **地址** | Monospace；支持粘贴 / 扫码；校验 checksum |
| **百分比** | 滑块 + 输入联动；预设 25/50/75/100% |
| **2FA / PIN** | 分格输入；mask；禁止截屏提示（平台能力允许时） |

### 14.5 Submit 反馈
Loading → Success Toast / 跳转；Error → 内联 + Toast，**禁止无反馈静默失败**

---

## 15. Tab / Navigation 组件规范

### 15.1 Bottom Tab Bar
```
height: 56px + safe-area-inset-bottom
background: #1E293B (或 glass overlay)
border-top: 1px solid #334155
```
- Tab 数量：**4–5 个**，禁止超过 5 个
- 图标 24px + Label `11px`
- 选中：图标 + 文字 `#F59E0B`；未选中：`#64748B`
- 禁止：中间 oversized 凸起按钮（博彩 App 常见 pattern）

### 15.2 Top Tab（模块内切换）
- 样式：文字 Tab + 底部 2px 指示条 `#F59E0B`
- 例：「现货 | 合约」「全部 | 自选」
- 高度 44px；横向 scroll 当 Tab > 4

### 15.3 Header
```
height: 48px + safe-area
title: text-h1, 居中或左对齐
leading: 返回 / 关闭（44pt hit area）
trailing: 1–2 个 icon action
```

### 15.4 导航行为
- Push 新页：右进左出
- Bottom Sheet：底部滑入，支持下拉关闭
- 全屏操作流（签名确认）：禁用下拉关闭，仅允许 explicit Cancel

---

## 16. 行情列表组件规范

### 16.1 行结构（高 56px）
```
[Coin Logo 32px] [Symbol text-h3 + /USDT caption]     [Last Price text-price-md]
                  [Vol caption]                         [Change% badge]
```

### 16.2 数据格式
- **价格：** tabular-nums；≥1 时 2 位小数，<1 时 significant digits
- **涨跌幅：** `+2.35%` / `−1.20%`；Badge 背景 success-bg / danger-bg
- **成交量：** 缩写 K / M / B

### 16.3 表头（可选 sticky）
| 交易对 | 最新价 | 24h 涨跌 |
- 支持点击表头排序；排序指示 ▲▼

### 16.4 性能
- 使用虚拟列表；`React.memo` 行组件
- 价格更新：**节流** 100–200ms，仅更新变化 cell，禁止整表 re-render
- 实时闪烁：仅 **价格数字** 背景 flash ≤300ms，**禁止**整行闪烁

### 16.5 空 / 加载
- 加载：Skeleton 行 × 8
- 空自选：插图 + 「添加自选」Secondary 按钮

---

## 17. 资产卡片组件规范

### 17.1 总览卡（Dashboard 顶部）
```
Total Balance (USD)     text-display, tabular-nums
≈ 0.5234 BTC           text-body-sm, text-secondary
24h PnL: +$128.50 (+2.1%)   success color + ▲
[Mini sparkline 7d]    高 40px, 无坐标轴
```

### 17.2 代币行（高 64px）
```
[Logo 32] [Symbol + Full Name]     [Balance tabular-nums]
          [Available / Locked caption]  [Fiat value text-secondary]
```

### 17.3 资产分布（可选 Bento）
- 2×2 网格，每格：类别名 + 占比 % + 金额
- 用 **`color-brand-primary` / `color-info` / `color-brand-accent`** 区分，禁用彩虹色

### 17.4 规则
- 余额数字 **右对齐**
- Locked / Staking 必须单独一行说明，不可隐藏
- 禁止：「今日收益」夸大动画、金币雨、转盘

---

## 18. 交易操作组件规范

### 18.1 下单面板结构
```
[Buy | Sell] segmented control
[Limit | Market | ...] top tabs
Price input (limit only)
Amount input + [25|50|75|100%]
≈ Total / Fee / Est. receive
[Primary Buy/Sell button — full width, 48px]
```

### 18.2 Segmented Control
- Buy：选中态 bg `#26A69A1A` + text `#26A69A`
- Sell：选中态 bg `#EF53501A` + text `#EF5350`
- 高 36px；圆角 `radius-md`

### 18.3 确认 Sheet（必须项）
- 交易对、方向、类型
- 价格、数量、总额
- 手续费、预计成交
- 风险提示（如有）
- 「确认买入 / 卖出」Primary + 「取消」Ghost

### 18.4 Web3 签名确认
- Network badge
- From / To 地址（mono，可复制）
- Amount + Token symbol
- Gas fee estimate + total
- 状态步骤：`Review → Sign → Pending → Confirmed / Failed`

### 18.5 安全规则
- 下单按钮与 Confirm 分离，防误触
- Market 单必须额外提示滑点
- 大额操作（阈值可配置）强制二次确认 + 生物识别

---

## 19. 弹窗 / Toast / Loading / Empty / Error 状态规范

> **详细规范见：** [`pages/feedback-overlays.md`](pages/feedback-overlays.md)（Toast、Bottom Sheet、Center Modal、Alert Dialog 的尺寸、动效、三主题与无障碍）。

### 19.1 Modal / Bottom Sheet

| 类型 | 用法 | z-index |
|------|------|---------|
| **Bottom Sheet** | 筛选、选择、下单确认 | 40 |
| **Center Modal** | 删除确认、解绑等重要操作 | 40 |
| **Alert Dialog** | 合规阻断、不可误关的安全提示 | 50 |
| **Full Screen** | 签名、KYC 步骤 | — |

- 遮罩：默认 `black/60`；Alert 用 `black/70`
- Sheet 顶角 `radius-xl`（仅顶部）；必须有 drag handle + 关闭按钮
- 禁止 Modal 叠 Modal

### 19.2 Toast

- 位置：顶部 `safe-area + 12px` 优先；底部 Tab 上 12px 备选
- 时长：Success 3s / Error 5s / Warning 4s（Error、Warning 可手动关闭）
- 结构：`[Icon 18px] [Message text-body-sm] [×]`
- 语义色：`success` / `danger` / `warning` / `info` + 对应 `*-bg`
- 同时仅 1 条；不阻断点击

### 19.3 Loading
| 场景 | 模式 |
|------|------|
| 首屏 | Skeleton |
| 列表刷新 | 顶部 pull indicator |
| 按钮提交 | Inline spinner + disabled |
| 区块加载 | Skeleton 匹配布局 |
| >3s | 追加「仍在处理…」caption |

- 禁止：全屏 blocking 无 timeout 提示

### 19.4 Empty
- Icon 48px `#64748B` + Title `text-h3` + Description `text-body-sm` + CTA（如有）
- 语气中性，禁止营销文案

### 19.5 Error
- 内联 field error + 页面级 Error Banner（可重试）
- 网络错误：明确说明 + 「重试」Secondary 按钮
- 链上失败：Tx Hash（如有）+ 失败原因 + 支持链接

---

## 20. 风险提示与安全提示规范

### 20.1 风险等级

| 等级 | 视觉 | 场景 |
|------|------|------|
| **Info** | `#38BDF8` 左边框 | 市场波动、功能说明 |
| **Warning** | `#F59E0B` bg 10% | 高波动、滑点、合约风险 |
| **Critical** | `#EF5350` bg 10% | 不可逆操作、钓鱼提醒 |

### 20.2 文案原则
- **陈述事实**，禁止承诺收益
- 使用「可能」「请注意」而非「稳赚」「暴涨」
- 必须含 **具体风险点**（如：「市价单在波动行情下可能以不利价格成交」）

### 20.3 安全提示（Must Have）
- 登录 / 交易 / 提币：展示安全状态 icon + 文案
- 地址粘贴：防钓鱼校验提示
- 新设备登录：通知 + 确认
- 链上确认页：完整展示 recipient / network / amount

### 20.4 禁止内容
- 「保本」「零风险」「躺赚」「邀请返利」
- 倒计时紧迫感（「仅剩 XX 秒」）用于交易诱导
- 虚假 social proof（伪造在线人数、虚假收益率）

---

## 21. 页面验收标准

### 21.1 视觉
- [ ] 符合色彩 Token，无 hardcode 随机色
- [ ] 字体、字号、圆角、间距均来自 Design Token
- [ ] 图标统一 Lucide/Heroicons，无 emoji 图标
- [ ] 深色背景下边框可见
- [ ] 无 neon / glitch / 全屏渐变 / 金币雨动效

### 21.2 交互
- [ ] 触控目标 ≥ 44×44pt
- [ ] 所有可点击元素有 press feedback
- [ ] 异步操作 >300ms 有 Loading
- [ ] 提交按钮 Loading 时 disabled
- [ ] 支持 `prefers-reduced-motion`

### 21.3 数据与无障碍
- [ ] 价格/余额 tabular-nums 右对齐
- [ ] 涨跌有颜色 + 符号双编码
- [ ] 正文对比度 ≥ 4.5:1
- [ ] 表单有 label；错误有描述
- [ ] 图表提供数据 table 或 accessibility label

### 21.4 安全与合规
- [ ] 资金操作有确认步骤
- [ ] 费用/Gas/网络 在确认页完整展示
- [ ] 无收益承诺、无博彩式 UI
- [ ] 风险披露在操作前可见

### 21.5 移动端
- [ ] 375px 无横向滚动
- [ ] 内容不被 Tab Bar / 固定栏遮挡
- [ ] 列表滚动流畅，无明显 jank
- [ ] 单手可达主 CTA

---

## 22. 设计反模式清单

> 来源：UI/UX Pro Max Fintech/Crypto + Fintech Banking anti-patterns，及 CoinLab 约束。

| # | 反模式 | 原因 |
|---|--------|------|
| 1 | 浅色默认主题 | 不符合 OLED 交易场景；夜间刺眼 |
| 2 | 无安全标识 / 状态 | 降低信任，违反 Fintech 规则 |
| 3 | Cyberpunk / neon / glitch | 博彩感、降低可信度、accessibility 差 |
| 4 | Orbitron / 科幻字体用于数据 | 数字难读，显「土味 crypto」 |
| 5 | Emoji 作图标 | 不专业、跨平台不一致 |
| 6 | 装饰性 infinite animation | 分散注意力、耗电 |
| 7 | 整行价格闪烁 | 博彩/彩票感 |
| 8 | 「稳赚」「翻倍」「零风险」文案 | 合规风险、资金盘联想 |
| 9 | 倒计时 + 大红 CTA 诱导交易 | 营销/博彩 pattern |
| 10 | 中间凸起 Tab + 转盘图标 | 常见博彩 App 结构 |
| 11 | 隐藏手续费 / Gas | 信任崩塌 |
| 12 | Placeholder-only 表单 | 无障碍违规 |
| 13 | 交易状态不明确 | Web3 必反 pattern |
| 14 | Modal 套 Modal | 用户迷失 |
| 15 | 纯颜色表示涨跌 | 色盲不可访问 |
| 16 | Scale hover 导致布局跳动 | 不专业 |
| 17 | 高饱和紫粉 AI 渐变 | 廉价 SaaS 感 |
| 18 | 3D 金币 / 烟花庆祝 | 过度娱乐化 |
| 19 | 无 loading 的冻结 UI | UX 大忌 |
| 20 | 白色 `#FFFFFF` 大面积背景 | 不符合深色金融科技定位 |

---

## 23. 后续页面生成时必须遵守的规则

1. **先读 MASTER**：生成任何页面前必须读取本文件；若存在 `design-system/pages/<page>.md`，其规则 **override** 本文件对应部分。
2. **不写业务代码**：设计阶段仅输出结构、Token、组件规格；实现代码遵循项目后续选定的技术栈。
3. **Token 优先**：颜色、字体、间距、圆角必须使用本文 Token 名，禁止随意 hardcode。
4. **移动端优先**：先设计 375px，再适配更大屏；主 CTA 在拇指热区。
5. **数据界面用 IBM Plex Sans + tabular-nums**；地址 / Hash 用 IBM Plex Mono。
6. **交易 / 钱包操作必须含确认流**，且展示完整费用与网络信息。
7. **动效克制**：150–300ms 过渡；仅 loading / 状态 / 价格瞬时反馈；尊重 `prefers-reduced-motion`。
8. **图标仅 Lucide / Heroicons**；代币 Logo 用官方资源。
9. **图表**：K 线用 Candlestick（阳 `#26A69A` / 阴 `#EF5350`）；实时数据节流；闪烁提供 pause。
10. **列表性能**：虚拟化 + memo + 稳定 key；禁止 index as key。
11. **风险与安全文案**遵循第 20 节；禁止收益承诺与博彩式 pattern。
12. **验收**：交付前对照第 21 节 checklist 逐项自检。
13. **反模式**：对照第 22 节，出现任意一条即需修正。
14. **Accent 紫 `#8B5CF6`** 仅用于 Web3 / 链上能力，面积 ≤10%，不可作 Primary CTA。
15. **一页一 Primary CTA**；交易 Buy/Sell 用语义色，不与品牌金 Primary 混淆。

---

*Generated for CoinLab · UI/UX Pro Max v1 · 2026-06-17*
