---
title: Modal 对话框
group:
  title: 反馈
  order: 2
---

# Modal 对话框

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

## 代码演示

<code src="./demo/basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 对话框是否可见 | `boolean` | `false` |
| title | 标题 | `ReactNode` | - |
| onOk | 点击确定回调 | `(e: MouseEvent) => void` | - |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | `(e: MouseEvent) => void` | - |
| width | 宽度 | `string \| number` | `520` |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `null` | `ReactNode` | - |
| closable | 是否显示右上角的关闭按钮 | `boolean` | `true` |
| mask | 是否展示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩层是否允许关闭 | `boolean` | `true` |
