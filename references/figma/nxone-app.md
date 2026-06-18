# NXone App 设计稿（Figma）

> **类型：** 外部资料库  
> **状态：** 已通过 Figma API 同步结构（2026-06-18）

## 链接

| 项 | 值 |
|----|-----|
| **标题** | NXone App 设计稿 |
| **Figma URL** | https://www.figma.com/design/0rZLBP3GFqnhpygeh9XjRU/NXone-App-%E8%AE%BE%E8%AE%A1%E7%A8%BF |
| **File Key** | `0rZLBP3GFqnhpygeh9XjRU` |
| **Embed** | `https://embed.figma.com/design/0rZLBp3GFqnhpygeh9XjRU/NXone-App-...?embed-host=share` |

## 文档分工（重要）

| 文档 | 用途 |
|------|------|
| **[historical-pages.md](./historical-pages.md)** | **历史页面业务逻辑、流程、一期裁剪** ← 主要学习入口 |
| [exports/file-structure.md](./exports/file-structure.md) | 全量 Frame 结构树（API 导出） |
| [design-system/MASTER.md](../../design-system/MASTER.md) | CoinLab **新 UI** 唯一规范 |

### 明确边界

- **历史 Figma：** 规范 + 业务逻辑 + 状态机 + 功能边界  
- **CoinLab 新 UI：** 只遵循 `MASTER.md`（黄黑极简），**不照搬** NXone 视觉

## API 同步

Token 配置：项目根目录 `.env.local` → `FIGMA_ACCESS_TOKEN`（已 gitignore）

```bash
python3 scripts/figma_fetch.py 3
```

## CoinLab 一期优先学习的 Canvas

1. `Nxone-首页`
2. `NXone-行情`
3. `NXone-交易`（仅现货逻辑）
4. `NXone-资产-充提`
5. `NXone-登录注册`
6. `NXone-我的`

详见 [historical-pages.md](./historical-pages.md)。

---

**相关：** [references/README.md](../README.md)
