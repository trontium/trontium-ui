---
title: Form 表单
group: 数据录入
---

# Form 表单

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 代码演示

### 基本使用

<code src="./demo/basic.tsx"></code>

## API

### Form

| 参数      | 说明     | 类型          | 默认值 |
| --------- | -------- | ------------- | ------ |
| children  | 表单内容 | ReactNode     | -      |
| className | 类名     | string        | -      |
| style     | 样式     | CSSProperties | -      |

### Form.Item

| 参数     | 说明   | 类型      | 默认值 |
| -------- | ------ | --------- | ------ |
| label    | 标签名 | ReactNode | -      |
| name     | 字段名 | string    | -      |
| children | 控件   | ReactNode | -      |
