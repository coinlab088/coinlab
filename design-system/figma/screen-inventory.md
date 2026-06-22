# CoinNova 屏幕清单（导入 Figma 用）

**推荐：** 打开 https://coinlab088.github.io/coinlab/figma（或本地 `http://localhost:5173/figma`）复制直链，无需调试面板。

**主题：** 除行情绿白 / 绿黑样例外，细节页均为 **黄黑** 主题。

---

## 主 Tab

| Frame 名 | 直链路径 |
|----------|----------|
| market/guest | `/figma/market/guest` |
| market/guest/green-white | `/figma/market/guest/green-white` |
| market/guest/green-black | `/figma/market/guest/green-black` |
| market/logged-in | `/figma/market/logged-in` |
| trade | `/figma/trade` |
| assets/guest | `/figma/assets/guest` |
| assets/logged-in | `/figma/assets/logged-in` |

---

## 登录注册

| Frame 名 | 直链路径 |
|----------|----------|
| auth/entry | `/figma/auth/entry` |
| auth/login | `/figma/auth/login` |
| auth/login-verify | `/figma/auth/login-verify` |
| auth/register | `/figma/auth/register` |
| auth/register-verify | `/figma/auth/register-verify` |
| auth/set-password | `/figma/auth/set-password` |
| auth/security-verify | `/figma/auth/security-verify` |
| auth/tg-connect | `/figma/auth/tg-connect` |
| auth/tg-link | `/figma/auth/tg-link` |

---

## 账户设置

| Frame 名 | 直链路径 |
|----------|----------|
| account/settings | `/figma/account/settings` |
| account/profile | `/figma/account/profile` |
| account/security | `/figma/account/security` |
| account/security-google | `/figma/account/security-google` |
| account/security-email | `/figma/account/security-email` |
| account/security-login-password | `/figma/account/security-login-password` |
| account/security-payment-password | `/figma/account/security-payment-password` |
| account/kyc | `/figma/account/kyc` |
| account/kyc-sumsub | `/figma/account/kyc-sumsub` |
| account/logout | `/figma/account/logout` |
| account/delete | `/figma/account/delete` |
| account/delete-verify | `/figma/account/delete-verify` |
| account/delete-success | `/figma/account/delete-success` |

---

## 充提

| Frame 名 | 直链路径 |
|----------|----------|
| wallet/deposit | `/figma/wallet/deposit` |
| wallet/deposit-fetching | `/figma/wallet/deposit-fetching` |
| wallet/deposit-address | `/figma/wallet/deposit-address` |
| wallet/withdraw | `/figma/wallet/withdraw` |
| wallet/withdraw-verify | `/figma/wallet/withdraw-verify` |
| wallet/withdraw-success | `/figma/wallet/withdraw-success` |

---

## 记录

| Frame 名 | 直链路径 |
|----------|----------|
| records/fund | `/figma/records/fund` |
| records/fund-detail | `/figma/records/fund-detail` |
| records/orders | `/figma/records/orders` |
| records/order-detail | `/figma/records/order-detail` |

---

## 帮助与客服

| Frame 名 | 直链路径 |
|----------|----------|
| support/help | `/figma/support/help` |
| support/help-article | `/figma/support/help-article` |
| support/center | `/figma/support/center` |
| support/chat | `/figma/support/chat` |

---

## 行情详情

| Frame 名 | 直链路径 |
|----------|----------|
| chart/kline | `/figma/chart/kline` |

---

## 设计规范

| Frame 名 | 直链路径 | 说明 |
|----------|----------|------|
| 设计规范 | `/figma/design-system` | 全局 Token / 组件说明 + 文档与图示入口 |
| MASTER 文档 | `/figma/docs/master` | Markdown 全文阅读 |
| 反馈层文档 | `/figma/docs/feedback-overlays` | Toast / Sheet / Alert 规范 |
| 导出清单文档 | `/figma/docs/screen-inventory` | 本文件在线版 |
| README | `/figma/docs/readme` | 设计系统目录说明 |

---

## Toast / 弹窗 / Bottom Sheet（给技术评审）

| Frame 名 | 直链路径 | 类型 |
|----------|----------|------|
| overlay/sheet-language | `/figma/overlay/sheet-language` | Bottom Sheet |
| overlay/sheet-fiat | `/figma/overlay/sheet-fiat` | Bottom Sheet |
| overlay/sheet-pair-picker | `/figma/overlay/sheet-pair-picker` | Bottom Sheet |
| overlay/sheet-order-confirm | `/figma/overlay/sheet-order-confirm` | Bottom Sheet |
| overlay/sheet-add-favorite | `/figma/overlay/sheet-add-favorite` | Bottom Sheet |
| overlay/alert-compliance | `/figma/overlay/alert-compliance` | Alert Dialog |
| overlay/toast-success | `/figma/overlay/toast-success` | Toast |
| overlay/toast-error | `/figma/overlay/toast-error` | Toast |
| overlay/toast-warning | `/figma/overlay/toast-warning` | Toast |
| overlay/toast-info | `/figma/overlay/toast-info` | Toast |

规范详见 [`pages/feedback-overlays.md`](../pages/feedback-overlays.md)。

---

## 优先级

**P0 页面：** market/guest、market/logged-in、trade、assets/logged-in  
**P0 反馈层：** overlay/sheet-order-confirm、overlay/alert-compliance、overlay/toast-success、overlay/toast-error
