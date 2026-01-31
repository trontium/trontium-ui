---
title: Form 表单
group: 数据录入
---

# Form 表单

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 代码演示

### 基本使用

<code src="./demo/basic.tsx"></code>

### 表单验证与控制

<code src="./demo/complex.tsx"></code>

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | `FormInstance` | - |
| initialValues | 表单默认值 | `object` | - |
| onFinish | 提交表单且数据验证成功后回调事件 | `function(values)` | - |
| onFinishFailed | 提交表单且数据验证失败后回调事件 | `function({ values, errorFields, outOfDate })` | - |
| onValuesChange | 字段值更新时触发回调事件 | `function(changedValues, allValues)` | - |
| children | 表单内容 | `ReactNode` | - |
| className | 类名 | `string` | - |
| style | 样式 | `CSSProperties` | - |

### Form.Item

| 参数     | 说明             | 类型           | 默认值 |
| -------- | ---------------- | -------------- | ------ |
| name     | 字段名，支持数组 | `NamePath`     | -      |
| label    | 标签名           | `ReactNode`    | -      |
| rules    | 校验规则         | `Rule[]`       | -      |
| children | 任何表单控件     | `ReactElement` | -      |
| name     | 字段名           | string         | -      |
| children | 控件             | ReactNode      | -      |
