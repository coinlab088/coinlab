# CoinNova Design System

CoinNova 设计系统目录。所有 UI 实现须遵守本规范。

## 结构

```
design-system/
├── MASTER.md       # 全局规范（唯一 Source of Truth）
├── figma/          # Figma Token 与导出清单
└── pages/          # 页面/专题 override（按需创建）
    ├── feedback-overlays.md   # Toast、弹窗、Bottom Sheet
    └── <page>.md              # 其他页面级规则
```

## 使用方式

1. **实现任何页面前**先读 `MASTER.md`
2. 若存在 `pages/<page>.md`，其规则 **override** MASTER 对应部分
3. 无页面 override 时，仅使用 MASTER

## 与代码的关系

| 层 | 位置 |
|----|------|
| 设计规范 | `design-system/MASTER.md` |
| Tailwind Token | `tailwind.config.js` |
| 原型组件 | `src/components/` |

Token 变更时同步更新 `MASTER.md` 与 `tailwind.config.js`。

## 持久化（UI/UX Pro Max）

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" \
  --design-system --persist -p "CoinLab"
```

页面级：

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" \
  --design-system --persist -p "CoinLab" --page "trading"
```
