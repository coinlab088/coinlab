# GitHub Pages 部署说明

## 你需要提供 / 在 GitHub 上完成的配置

1. **创建仓库**（若还没有）
   - 本仓库：`coinlab` → https://github.com/coinlab088/coinlab
   - 可以是 **Private** 仓库（Pages 仍可仅通过链接访问）

2. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CoinLab prototype"
   git branch -M main
   git remote add origin https://github.com/coinlab088/coinlab.git
   git push -u origin main
   ```

3. **开启 GitHub Pages**
   - 仓库 → **Settings** → **Pages**
   - **Build and deployment** → Source 选 **GitHub Actions**
   - 保存后，推送 `main` 分支会自动触发 `.github/workflows/deploy-pages.yml`

4. **首次部署后访问地址**
   - 项目页：`https://coinlab088.github.io/coinlab/`

## 访问验证

- 打开链接后需输入验证码：**`cl202606`**
- 验证通过后当前浏览器会话内可正常浏览（`sessionStorage`）
- 关闭标签页后需重新验证

> 说明：验证码为前端校验，用于限制随意传播链接后的访问，不能替代真正的服务端鉴权。本地 `npm run dev` 不启用门禁，仅生产构建（GitHub Pages）需要验证。

## 本地模拟 Pages 构建

```bash
# 模拟子路径部署（把 exchange-app-coinlab 换成你的仓库名）
VITE_BASE_PATH=/coinlab/ npm run build:pages
npx vite preview
```

## 常见问题

| 问题 | 处理 |
|------|------|
| 页面空白 | 检查 Pages 的 base 路径是否与仓库名一致 |
| Actions 失败 | 仓库 Settings → Actions → General → 允许读写权限 |
| 404 刷新丢失 | 已自动生成 `404.html`（SPA 回退） |

## 向我提供的信息（如需代查部署）

- GitHub 用户名
- 仓库名（及是否 Private）
- Pages 是否已设为 GitHub Actions 源
