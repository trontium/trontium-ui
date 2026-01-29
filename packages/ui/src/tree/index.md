---
title: Tree 树形控件
group: 数据展示
---

## Tree 树形控件

多层次的结构列表。

### 代码演示

<code src="./demo/basic.tsx"></code>

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | treeNodes 数据 | `TreeDataNode[]` | `[]` |
| defaultExpandedKeys | 默认展开的节点 | `string[] \| number[]` | `[]` |
| selectedKeys | 选中节点 | `string[] \| number[]` | - |
| defaultSelectedKeys | 默认选中节点 | `string[] \| number[]` | `[]` |
| multiple | 是否支持多选 | `boolean` | `false` |
| onSelect | 点击树节点触发 | `(selectedKeys, info: { selected, selectedNodes, node, event }) => void` | - |
| onExpand | 展开/收起节点时触发 | `(expandedKeys, info: { expanded, node }) => void` | - |

#### TreeDataNode

| 属性       | 说明     | 类型               | 默认值  |
| ---------- | -------- | ------------------ | ------- |
| key        | key      | `string \| number` | -       |
| title      | 标题     | `ReactNode`        | -       |
| children   | 子节点   | `TreeDataNode[]`   | -       |
| disabled   | 禁用     | `boolean`          | `false` |
| selectable | 是否可选 | `boolean`          | `true`  |
