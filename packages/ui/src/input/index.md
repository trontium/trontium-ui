---
title: Input 输入框
group: 数据录入
---

## Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

### 代码演示

<code src="./demo/basic.tsx"></code>

### API

| 属性         | 说明                     | 类型                           | 默认值   |
| ------------ | ------------------------ | ------------------------------ | -------- |
| value        | 输入框内容               | `string`                       | -        |
| defaultValue | 输入框默认内容           | `string`                       | -        |
| disabled     | 是否禁用                 | `boolean`                      | `false`  |
| size         | 控件大小                 | `large` \| `middle` \| `small` | `middle` |
| prefix       | 前缀图标                 | `ReactNode`                    | -        |
| suffix       | 后缀图标                 | `ReactNode`                    | -        |
| allowClear   | 可以点击清除图标删除内容 | `boolean`                      | `false`  |
| onChange     | 输入框内容变化时的回调   | `function(e)`                  | -        |
| onPressEnter | 按下回车的回调           | `function(e)`                  | -        |
