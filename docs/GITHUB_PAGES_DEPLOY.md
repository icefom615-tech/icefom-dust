# GitHub Pages 发布步骤

这个项目已经准备好 GitHub Pages 静态发布版本。

## 方式 A：推送源码后自动发布

1. 在 GitHub 新建一个公开仓库，例如 `takesometimetolive`。
2. 把本项目代码推送到仓库的 `main` 分支。
3. 打开仓库的 `Settings → Pages`。
4. `Build and deployment → Source` 选择 `GitHub Actions`。
5. 等待 `Actions → Deploy GitHub Pages` 跑完。
6. 访问 GitHub 给出的 Pages 地址。

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
