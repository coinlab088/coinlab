# 反馈层规范：Toast / 弹窗 / Bottom Sheet

> **适用范围：** CoinNova 移动端 APP（390×812）  
> **优先级：** 本文件 **override** `MASTER.md` 第 19 节中 Toast / Modal 相关条目  
> **实现参考：** `src/components/sheets/BottomSheet.tsx`、`ComplianceRestrictionSheet.tsx`

---

## 1. 层级与类型选型

### 1.1 Z-Index 栈

| 层级 | z-index | 组件 |
|------|---------|------|
| 页面内容 | 0–10 | Tab 页、列表 |
| 固定栏 | 20 | Header、Bottom Tab |
| Bottom Sheet / Modal | 40 | 选择器、确认单、设置 |
| Alert / 合规阻断 | 50 | 地区限制、删除账户二次确认 |
| Toast | 60 | 操作结果反馈 |
| 全屏阻塞 Loading | 70 | 仅链上签名等待等（需超时文案） |

**禁止：** Modal 套 Modal；Toast 与 Alert 同时出现（先关 Alert 再 Toast）。

### 1.2 类型选型

| 类型 | 场景 | 示例 |
|------|------|------|
| **Toast** | 非阻断、可自动消失的操作结果 | 复制成功、下单成功、网络错误 |
| **Bottom Sheet** | 需要用户阅读或轻量选择 | 语言/法币、交易对、下单确认 |
| **Center Modal** | 中等信息量、需居中注意力 | 删除确认、解绑 2FA |
| **Alert Dialog** | 合规/安全阻断，单一主操作 | 地区限制、风险强提示 |
| **Full Screen** | 多步骤、表单密集 | KYC、提现验证（非本文件范围） |

---

## 2. 遮罩（Scrim）

| Token | 值 | 用途 |
|-------|-----|------|
| `overlay-scrim-default` | `rgba(0,0,0,0.60)` | Bottom Sheet、选择器 |
| `overlay-scrim-heavy` | `rgba(0,0,0,0.70)` | Alert、合规阻断 |
| `overlay-scrim-toast` | 无遮罩 | Toast 不阻断底层操作 |

- 点击遮罩：**Bottom Sheet / Modal** 默认关闭；**Alert Dialog** 默认**不**关闭（防误触）。
- 动画：`opacity` 150ms `ease-out` 入场；退场 120ms。

---

## 3. Bottom Sheet

### 3.1 结构

```
┌───────────────────────────── max-w 390px ─────────────────────────────┐
│                        [drag handle 40×4]                              │
│  Title (text-h3)                                          [关闭 36×36] │
│  ─────────────────────────────────────────────────────────────────── │
│  Content area（可滚动 max-h 60vh）                                      │
│  [Primary CTA]                                                         │
│  [Secondary / Ghost]                                                     │
│  safe-area-bottom padding                                                │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.2 尺寸与样式

| 属性 | 规范 |
|------|------|
| 宽度 | 100%，`max-width: 390px` |
| 顶角 | `radius-xl`（16px）仅顶部；PC 预览时四角 `radius-xl` |
| 背景 | `bg-elevated`（`--color-elevated`） |
| 边框 | `1px border-border-subtle` |
| 内边距 | 水平 16px；顶 12px；底 32px + safe-area |
| 拖拽条 | 宽 40px、高 4px、`bg-border`、居中，`mb-12px` |
| 标题 | `text-h3` / `text-primary` |
| 关闭按钮 | 36×36 touch target，Lucide `X` 20px，`text-secondary` |

### 3.3 内容变体

**A. 选项列表（SheetOption）**

| 状态 | 背景 | 边框 | 文字 |
|------|------|------|------|
| 默认 | `bg-sunken` | `border-border-subtle` | `text-primary` |
| 选中 | `bg-brand-muted` | `border-brand` | `text-brand` + 右侧「当前」|

- 行高：最小 48px；内边距 `12px 16px`；圆角 `radius-md`
- 副文案：`text-caption text-secondary`

**B. 确认单（如订单确认）**

- 摘要区：`rounded-lg border border-border-subtle bg-sunken px-4 py-3`
- 行：`flex justify-between py-1.5`；标签 `text-secondary`，值 `text-primary tabular-nums`
- 买入方向：`text-success`；卖出：`text-danger`
- 主按钮：买入 `bg-success` / 卖出 `bg-danger`，高 44px，`radius-md`
- 次按钮：描边 `border-border`，文案「取消」

### 3.4 动效

- 入场：自底部 `translateY(100%) → 0`，250ms `cubic-bezier(0.32, 0.72, 0, 1)`
- 退场：反向 200ms
- `prefers-reduced-motion`：仅 opacity 切换，无位移

---

## 4. Center Modal（居中弹窗）

用于比 Sheet 更「正式」但仍需快速确认的场景。

| 属性 | 规范 |
|------|------|
| 宽度 | `max-width: 320px`（移动端）；PC 预览 `max-width: 400px` |
| 圆角 | `radius-xl` 四角 |
| 内边距 | 20px 24px 24px |
| 标题 | `text-h3`，左对齐或居中（删除类居中） |
| 正文 | `text-body-sm text-secondary`，最多 4 行，超出滚动 |
| 按钮区 | 纵向堆叠：Primary 全宽 → Secondary 全宽；间距 12px |

**破坏性操作：** 标题旁或顶部使用 `AlertTriangle` 48px 圆形底 `bg-danger-bg`；主按钮用 Danger 色，文案用动词（「确认删除」），禁止「确定」。

---

## 5. Alert Dialog（合规 / 阻断）

参考 `ComplianceRestrictionSheet` 模式。

| 属性 | 规范 |
|------|------|
| 布局 | 移动端 Bottom 对齐；内容居中 |
| 顶角 | `rounded-t-2xl`（移动端）/ `rounded-2xl`（PC） |
| 遮罩 | `overlay-scrim-heavy` |
| 图标 | 56px 圆形容器 `bg-brand-muted`，内 `AlertTriangle` 28px `text-brand` |
| 正文 | `text-body-sm text-secondary`，最大宽度 300px，居中 |
| 内链 | `text-primary underline`，点击跳转帮助 |
| 主 CTA | 全宽 `h-12 rounded-full bg-brand text-brand-dark` |
| 阴影 | 可选 `0 -8px 40px rgba(brand, 0.08)` 顶部品牌光晕 |
| 关闭 | 无右上角 X；仅主按钮退出（防误关） |

`role="alertdialog"`，必须 `aria-labelledby` + `aria-describedby`。

---

## 6. Toast

> 原型尚未实现 Toast 组件；新增时必须遵守本节。

### 6.1 位置与尺寸

| 属性 | 规范 |
|------|------|
| 位置 | **顶部优先**：`safe-area-top + 12px`，水平居中 |
| 备选 | 底部：`tab-bar 上方 12px`（不与 Bottom Sheet 同时使用） |
| 宽度 | `calc(100% - 32px)`，`max-width: 358px` |
| 最小高度 | 44px |
| 圆角 | `radius-md`（10px） |
| 内边距 | `12px 16px` |
| 最大行数 | 2 行，超出省略 |

### 6.2 结构

```
[Icon 18px]  [Message text-body-sm flex-1]  [× 可选 32×32]
```

### 6.3 类型

| 类型 | 左边框/图标色 | 背景 | 默认时长 | 场景 |
|------|---------------|------|----------|------|
| **Success** | `success` | `success-bg` | 3s | 复制成功、下单成功 |
| **Error** | `danger` | `danger-bg` | 5s | 网络失败、余额不足 |
| **Warning** | `warning` / `brand` | `warning-bg` | 4s | 滑点过大、维护预告 |
| **Info** | `info` | `info-bg` | 3s | 功能说明、非关键提示 |

- 左侧色条：可选 3px 左边框，与图标二选一，不重复强调。
- 文字：`text-primary`（绿白主题下为深色字）。
- 可手动关闭：Error / Warning 必须带 ×；Success 可省略。

### 6.4 行为

- 同时最多 **1 条** Toast；新 Toast 替换旧条（不堆叠）。
- 入场：`opacity 0→1` + `translateY(-8px→0)`，200ms。
- 退场：opacity 120ms。
- 不阻断点击；底层页面可滚动（与 Modal 区分）。
- 禁止：全宽 Banner 式 Toast；带 Primary 按钮的 Toast（应改 Bottom Sheet）。

### 6.5 文案

- 动词开头：「已复制 UID」「下单失败，请重试」
- 禁止营销、emoji、感叹号连用
- 错误 Toast 附一句可行动建议（≤20 字）

---

## 7. 三主题适配

所有反馈层使用 CSS 变量，**禁止 hardcode 色值**。

| 元素 | 黄黑 | 绿白 | 绿黑 |
|------|------|------|------|
| Sheet 背景 | `#121212` | `#F4F4F5` | `#141414` |
| 遮罩 | `black/60–70` | 同左 | 同左 |
| 主 CTA | `#FFCC00` 底 + 黑字 | `#7BEA0C` 底 + 黑字 | `#7BEA0C` 底 + 黑字 |
| Toast Success 图标 | `#22C55E` | `#16A34A` | `#7BEA0C` |

绿白主题下 Sheet 边框用 `border-subtle`（浅灰），避免过深分割线。

---

## 8. 无障碍

- Sheet / Modal：`role="dialog"` 或 `alertdialog`，`aria-modal="true"`，打开时焦点落入容器，关闭归还触发点。
- 遮罩按钮：`aria-label="关闭"`。
- Toast：`role="status"`（Success/Info）或 `role="alert"`（Error/Warning）；`aria-live="polite"` / `"assertive"`。
- 对比度：Toast 文字与背景 ≥ 4.5:1。
- 动效：遵守 `prefers-reduced-motion`。

---

## 9. Figma 组件命名

| 组件 | Figma 名 |
|------|----------|
| Bottom Sheet / 选择 | `Overlay/BottomSheet-Select` |
| Bottom Sheet / 确认 | `Overlay/BottomSheet-Confirm` |
| Center Modal | `Overlay/Modal-Center` |
| Alert Dialog | `Overlay/Alert-Compliance` |
| Toast Success | `Overlay/Toast-Success` |
| Toast Error | `Overlay/Toast-Error` |

**Figma 导出直链（含弹窗态）见 `/figma` 目录 → 分组「Toast / 弹窗 / Bottom Sheet」。**

| 路径 | 说明 |
|------|------|
| `overlay/sheet-language` | 语言 Bottom Sheet |
| `overlay/sheet-fiat` | 法币 Bottom Sheet |
| `overlay/sheet-pair-picker` | 交易对选择 |
| `overlay/sheet-order-confirm` | 下单确认 |
| `overlay/sheet-add-favorite` | 添加自选 |
| `overlay/alert-compliance` | 地区限制 Alert |
| `overlay/toast-success` | Toast 成功 |
| `overlay/toast-error` | Toast 错误 |
| `overlay/toast-warning` | Toast 警告 |
| `overlay/toast-info` | Toast 提示 |

---

## 10. 反模式

| 禁止 | 原因 |
|------|------|
| Toast 堆叠 3 条以上 | 干扰交易 |
| 成功 Toast 配大红配色 | 语义混乱 |
| Sheet 无关闭路径 | 用户被困 |
| 合规 Alert 点遮罩关闭 | 合规无效 |
| 弹窗内再放弹窗 | 迷失 |
| Toast 放长段落 | 应改 Sheet |
| 使用 emoji 作状态图标 | 不专业 |

---

## 11. 验收清单

- [ ] 遮罩透明度符合 `scrim-default` / `scrim-heavy`
- [ ] Sheet 顶角仅上方圆角（移动端）
- [ ] 所有关闭/确认触控 ≥ 44×44pt
- [ ] 主题切换后弹层背景/边框随 Token 变化
- [ ] Error Toast 5s 或可手动关
- [ ] 无 Modal 嵌套
- [ ] `prefers-reduced-motion` 下无滑入动画
