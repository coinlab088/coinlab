# CoinNova：无设计师团队的 Figma 工作流

## 角色分工

| 角色 | 谁来做 | 产出 |
|------|--------|------|
| **UI 设计** | AI + 代码（本仓库 React 原型） | 可交互 UI、`design-system/MASTER.md` |
| **设计规范** | `src/index.css` + `tailwind.config.js` | 三主题 Token |
| **Figma 镜像** | 你（约 30 分钟一次性）+ 插件导入 | 对外展示的 UI 稿文件 |
| **迭代** | 先改代码 → 再重新导入变更页 | 代码永远优先 |

**结论：** 不需要专职设计师；也不需要 AI 直接「写入」Figma API。  
**正确路径：** 代码即设计稿 → 插件导入 Figma → 按结构整理命名。

---

## 为什么不能只靠 Figma 写入权限？

- Figma REST API **不能**批量创建完整界面（只能读结构、导出图、写评论）。
- Cursor 当前**没有** Figma 写入 MCP。
- 本仓库 `scripts/figma_fetch.py` 仅用于**读取**历史 NXone 稿。

因此：**给你 Token 也不能让我像在 Figma 里画图一样自动建稿。**

---

## 推荐方案：html.to.design（可编辑图层）

最适合「代码已经是设计」的场景。

### CoinNova Figma 文件

- **项目链接：** https://www.figma.com/design/jIeAC4hhx3XtBmgNtfG2ms/CoinNova
- **范围：** 先只做 APP 移动端（390×812），**PC 暂不导入**

### 首页单屏导入（当前任务）

**链接目录（含 Toast / 弹窗）：** https://coinlab088.github.io/coinlab/figma

**推荐：使用 Figma 专用直链（无验证页、无调试面板）**

| 项 | 值 |
|----|-----|
| 链接目录 | http://localhost:5173/figma |
| 首页（黄黑游客） | http://localhost:5173/figma/market/guest |
| 首页（绿白游客） | http://localhost:5173/figma/market/guest/green-white |
| 线上（部署后） | https://coinlab088.github.io/coinlab/figma/market/guest |
| Frame 尺寸 | 390 × 812（页面即手机框，无需裁切） |
| Frame 命名 | `APP/yellow-black/market/guest` |

**操作步骤：**

1. 打开 http://localhost:5173/figma 复制对应页面链接
2. Figma → **html.to.design** → Import from URL → 粘贴直链
3. 视口 **390px** → 导入后拖入 [CoinNova](https://www.figma.com/design/jIeAC4hhx3XtBmgNtfG2ms/CoinNova) 目标 Frame

> 旧方式 `https://coinlab088.github.io/coinlab/` 会命中已移除的验证页，请改用 `/figma/...` 直链。

---

### 一次性准备

1. 在 Figma 新建文件：`CoinNova App — UI`
2. 安装 Figma 插件：**[html.to.design](https://www.html.to.design/)**（免费档够用）
3. 本地启动原型：
   ```bash
   npm run dev
   ```
4. 打开 http://localhost:5173/

### 导入单页步骤

1. 用右下角 **原型调试** 切到目标页面/状态（见 [screen-inventory.md](../design-system/figma/screen-inventory.md)）
2. Figma → Plugins → html.to.design → **Import from URL**
3. URL 填 `http://localhost:5173/`（导入的是手机框**内**的 APP 区域；若插件抓全页，导入后裁切 390×812）
4. 将生成的 Frame 重命名为规范名，例如 `APP/yellow-black/market/guest`
5. 拖到对应 Canvas（见 [file-structure.md](../design-system/figma/file-structure.md)）

### 导入设计 Token

1. 打开 `design-system/figma/tokens.json`
2. Figma → 安装 **Tokens Studio for Figma** 或手动建 Variables
3. 按三个 theme 建 Color Collection：`yellow-black` / `green-white` / `green-black`

字体：在 Figma 中启用 **IBM Plex Sans** / **IBM Plex Mono**（与 `index.html` 一致）。

---

## 备选方案

### A. 截图铺稿（最快，不可编辑）

- 浏览器对每屏截图 → 拖入 Figma → 对齐 390×812
- 适合对外路演；不适合开发标注

### B. 线上地址导入

- 部署地址：https://coinlab088.github.io/coinlab/
- 需先输入访问码 `cl202606`，部分插件对带 Gate 的页面支持较差  
- **建议仍以 localhost 导入为主**

### C. 从 Figma 反推代码（不做）

- 历史 NXone 稿仅作业务参考，见 `references/figma/historical-pages.md`
- 新 UI **不以 Figma 为源**，避免双源不一致

---

## 你需要提供什么

1. **新建 Figma 文件**，把链接发到对话里（便于后续我写注释清单；Token 仍不必给写权限）
2. **（可选）** `FIGMA_ACCESS_TOKEN` 放入 `.env.local` — 仅用于 `python3 scripts/figma_fetch.py` 读历史稿，与导入新稿无关
3. 完成首轮导入后告诉我，我可以按 Frame 列表帮你做 **组件命名 / 标注 / 缺页补全**

---

## 迭代节奏

```
需求 → AI 改代码 → 本地预览确认 → 仅对变更页重新 html.to.design 导入 → 覆盖旧 Frame
```

设计规范变更时同步更新：

- `design-system/MASTER.md`
- `design-system/figma/tokens.json`
- `src/index.css` 主题变量

---

## 相关文件

| 文件 | 用途 |
|------|------|
| [design-system/MASTER.md](../design-system/MASTER.md) | 设计原则与组件规范 |
| [design-system/figma/tokens.json](../design-system/figma/tokens.json) | Figma 颜色/字号 Token |
| [design-system/figma/file-structure.md](../design-system/figma/file-structure.md) | Canvas / Frame 结构 |
| [design-system/figma/screen-inventory.md](../design-system/figma/screen-inventory.md) | 全量屏幕导入清单 |
