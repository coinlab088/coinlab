# CoinLab 参考资料

存放设计、产品与行业参考，**非**项目 Source of Truth。

## 放什么

- 竞品截图与交互笔记
- 合规 / 风控文案参考
- 第三方 API、链、钱包集成文档链接
- UI/UX Pro Max 检索结果摘要（可选）

## 不放什么

- 设计 Token 与组件规范 → 见 [design-system/MASTER.md](../design-system/MASTER.md)
- 可运行代码 → 见 [src/](../src/)

## 文件命名建议

```
references/
├── competitors/          # 竞品分析
├── compliance/           # 合规与风险提示
├── integrations/         # 外部集成文档
└── ui-ux-pro-max/        # Pro Max 检索导出（可选）
```

## 已登记参考

| 资料 | 路径 | 用途 |
|------|------|------|
| NXone 历史页面（业务逻辑） | [figma/historical-pages.md](./figma/historical-pages.md) | **规范/流程/一期裁剪** |
| NXone Figma 索引 | [figma/nxone-app.md](./figma/nxone-app.md) | 链接、API 同步说明 |
| Figma 结构导出 | [figma/exports/file-structure.md](./figma/exports/file-structure.md) | 全量 Frame 树 |

## 已接入工具

| 工具 | 路径 |
|------|------|
| UI/UX Pro Max | `.cursor/skills/ui-ux-pro-max/` |

生成设计系统建议：

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "crypto exchange fintech" --design-system -p "CoinLab" -f markdown
```
