# CoinNova 屏幕清单（导入 Figma 用）

**推荐：** 打开 https://coinlab088.github.io/coinlab/figma（或本地 `http://localhost:5173/figma`）复制直链，无需调试面板。

---

## 页面

| Frame 名 | 直链路径 |
|----------|----------|
| market/guest | `/figma/market/guest` |
| market/guest/green-white | `/figma/market/guest/green-white` |
| market/logged-in | `/figma/market/logged-in` |
| trade | `/figma/trade` |
| assets/guest | `/figma/assets/guest` |
| assets/logged-in | `/figma/assets/logged-in` |
| auth/login | `/figma/auth/login` |
| auth/register | `/figma/auth/register` |
| wallet/deposit | `/figma/wallet/deposit` |
| wallet/deposit-address | `/figma/wallet/deposit-address` |
| wallet/withdraw | `/figma/wallet/withdraw` |
| chart/kline | `/figma/chart/kline` |

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
