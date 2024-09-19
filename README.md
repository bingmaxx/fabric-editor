# fabric-editor

### 起项目

```sh
# node & npm & pnpm 版本
node -v
v20.15.1

npm -v
10.7.0

pnpm -v
9.7.0

# 安装
pnpm i

# 本地运行
pnpm run dev

# 打包
pnpm run build
```


#### 部署到 GitHub Pages
项目使用 `Vite` 构建，[Vite - 部署静态站点 - GitHub Pages](https://cn.vitejs.dev/guide/static-deploy.html#github-pages) 文档介绍了如何配置 `vite.config.js` 文件，以及如何编写 `GitHub Actions`。

另外本项目使用 `pnpm`，因此上面文档中的 `GitHub Actions` 脚本需要修改，参考 [pnpm - 持续集成 - GitHub Actions](https://pnpm.io/zh/continuous-integration#github-actions) 文档。最终代码见 `.github/workflows/gp.yml` 文件。