# GitHub Pages 发布步骤

这个项目已经准备好 GitHub Pages 静态发布版本。

## 当前发布方式：`gh-pages` 分支

当前 GitHub Pages 使用 `gh-pages` 分支发布静态文件：

1. 本地运行 `pnpm run build:github`。
2. 将 `dist-github/` 的内容推送到仓库的 `gh-pages` 分支。
3. 在仓库的 `Settings → Pages` 中，Source 选择 `Deploy from a branch`。
4. Branch 选择 `gh-pages`，文件夹选择 `/root`。
5. 等待 GitHub Pages 构建完成。

通常地址会是：

```text
https://你的GitHub用户名.github.io/takesometimetolive/
```

如果仓库名是 `你的GitHub用户名.github.io`，地址会是：

```text
https://你的GitHub用户名.github.io/
```

## 方式 B：只上传静态文件

本地运行：

```bash
pnpm run build:github
```

然后把 `dist-github/` 里的文件上传到任何静态托管平台。
