## Trontium UI

> A React UI Library by zsq to showcase engineering capabilities.

[![NPM Version](https://img.shields.io/npm/v/@trontium/ui?style=flat-square)](https://www.npmjs.com/package/@trontium/ui) [![Build Status](https://img.shields.io/github/actions/workflow/status/trontium/trontium-ui/release.yml?style=flat-square)](https://github.com/trontium/trontium-ui/actions) [![Coverage](https://img.shields.io/codecov/c/github/trontium/trontium-ui?style=flat-square)](https://app.codecov.io/gh/trontium/trontium-ui) [![License](https://img.shields.io/npm/l/@trontium/ui?style=flat-square)](./LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**Trontium UI** 是一款基于 React 18 + TypeScript 开发的现代化组件库，旨在展示企业级前端工程化实践。项目采用 Monorepo 架构，集成了全链路 CI/CD、自动化测试、暗色模式主题引擎以及虚拟滚动等高性能优化方案。

## ✨ 核心特性

- 🛡️ **TypeScript**: 全量 TypeScript 编写，提供完整的类型定义。
- 🎨 **主题定制**: 基于 CSS Variables 的动态主题引擎，内置深色模式 (Dark Mode) 支持。
- ⚡ **高性能**:
  - 支持 **Tree Shaking** (ES Module + sideEffects 优化)。
  - 内置 **Virtual Scroll** (虚拟滚动) 解决方案，轻松应对万级数据渲染。
- 🧪 **测试驱动**: 完备的单元测试 (Jest + Testing Library)，保障代码稳定性。
- 📦 **工程化**:
  - Monorepo (pnpm workspace) 管理。
  - 规范化 Git Workflow (Husky + Commitlint + Changesets)。
  - 自动化 CI/CD Pipeline (GitHub Actions)。

## 💻 预览

### 🚀 在线文档

> 文档地址：[https://trontium.github.io/trontium-ui/](https://trontium.github.io/trontium-ui/)

### 🚆 本地开发

```bash
# 1. 克隆项目
git clone git@github.com:trontium/trontium-ui.git

# 2. 进入项目目录
cd trontium-ui

# 3. 安装依赖 (需提前安装 Node.js 和 pnpm)
pnpm install

# 4. 启动开发服务器
pnpm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看文档。

## 📦 安装使用

```bash
npm install @trontium/ui
# OR
pnpm add @trontium/ui
```

### 基本用法

```tsx
import React from 'react';

import { Alert, Button } from '@trontium/ui';

export default () => (
  <>
    <Alert kind="positive">Hello Trontium UI!</Alert>
    <Button type="primary">点击我</Button>
  </>
);
```

### 按需加载

`@trontium/ui` 支持基于 ES Modules 的 Tree Shaking，无需额外配置即可实现按需加载。

## 🛠️ 项目脚本 (Scripts)

| 命令                                  | 说明                                     |
| ------------------------------------- | ---------------------------------------- |
| `pnpm start`                          | 启动本地文档开发服务器 (port: 3000)      |
| `pnpm build`                          | 构建所有产物 (文档 site + UI lib/esm)    |
| `pnpm test:ui`                        | 运行组件单元测试                         |
| `pnpm --filter @trontium/ui run size` | 检查组件库 JS 包体积与 Tree-shaking 情况 |
