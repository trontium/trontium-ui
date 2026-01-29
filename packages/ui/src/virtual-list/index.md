---
title: VirtualList 虚拟列表
group:
  title: 数据Display
  order: 2
---

# VirtualList 虚拟列表

高性能列表组件，用于展示海量数据。

## 何时使用

- 当需要展示成千上万条数据时。
- 当页面性能因为 DOM 节点过多而下降时。

## 代码演示

### 基础用法

渲染 10,000 条数据，保持流畅滚动。

<code src="./demo/basic.tsx"></code>

## API

| 属性       | 说明                           | 类型                                    | 默认值 |
| ---------- | ------------------------------ | --------------------------------------- | ------ |
| height     | 列表容器高度                   | `number`                                | -      |
| itemHeight | 每一项的固定高度               | `number`                                | -      |
| data       | 数据源数组                     | `T[]`                                   | -      |
| itemKey    | 获取每一项的唯一 key           | `(item: T) => React.Key`                | -      |
| children   | 渲染每一项的函数 (Render Prop) | `(item: T, index: number) => ReactNode` | -      |
| className  | 自定义类名                     | `string`                                | -      |
| style      | 自定义样式                     | `CSSProperties`                         | -      |
