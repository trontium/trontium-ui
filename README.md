## Trontium UI

A React UI Library by zsq.

## 💻 预览

### 🚀 在线预览

> 文档地址：[https://trontium.github.io/react-ui-library-tutorial/](https://trontium.github.io/react-ui-library-tutorial/)
>
> _注：部署依赖 GitHub Actions，代码推送后需等待数分钟更新。_

### 🚆 本地预览

```bash
# 1. 克隆项目
git clone git@github.com:trontium/react-ui-library-tutorial.git

# 2. 进入项目目录
cd react-ui-library-tutorial

# 3. 安装依赖 (需提前安装 Node.js 和 pnpm)
pnpm install

# 4. 启动开发服务器
pnpm start
```

启动成功后，访问 [http://localhost:3000](http://localhost:3000) 即可查看文档。

## 🛠️ 项目脚本 (Scripts)

在根目录下可执行以下命令：

| 命令                                  | 说明                                     |
| ------------------------------------- | ---------------------------------------- |
| `pnpm start`                          | 启动本地文档开发服务器 (port: 3000)      |
| `pnpm build:site`                     | 构建文档站点 (输出构建产物)              |
| `pnpm build:ui`                       | 构建 UI 组件库产物 (lib/esm)             |
| `pnpm test:ui`                        | 运行组件单元测试                         |
| `pnpm --filter @trontium/ui run size` | 检查组件库 JS 包体积与 Tree-shaking 情况 |

## ✨ 特性更新

- **虚拟滚动 (Virtual Scroll)**: 为 Table 组件集成了虚拟列表支持，可流畅渲染万级数据。
- **工程化基建**: 完善了 ESLint/Prettier/Commitlint 规范，新增包体积监控 (Size Limit)。
