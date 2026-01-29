---
title: Button 按钮
group:
  title: 通用
  order: 1
---

# Button 按钮

按钮用于开始一个即时操作。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `primary` \| `default` \| `dashed` \| `danger` \| `link` \| `text` | `default` |
| size | 按钮尺寸 | `large` \| `middle` \| `small` | `middle` |
| loading | 设置按钮载入状态 | `boolean` \| `{ delay: number }` | `false` |
| disabled | 按钮失效状态 | `boolean` | `false` |
| block | 将按钮宽度调整为其父宽度的选项 | `boolean` | `false` |
| htmlType | 设置 button 原生的 type 值 | `button` \| `submit` \| `reset` | `button` |
| onClick | 点击按钮时的回调 | `(event: React.MouseEvent) => void` | - |
