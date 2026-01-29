---
title: Message 全局提示
group:
  title: 反馈 Feedback
  order: 1
---

# Message 全局提示

全局展示操作反馈信息。

## 何时使用

- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

组件提供了一些静态方法，使用方式和参数如下：

- `message.success(content, [duration])`
- `message.error(content, [duration])`
- `message.info(content, [duration])`
- `message.warning(content, [duration])`
- `message.loading(content, [duration])`

| 参数     | 说明                                          | 类型        | 默认值 |
| -------- | --------------------------------------------- | ----------- | ------ |
| content  | 提示内容                                      | `ReactNode` | -      |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭。 | `number`    | 3      |
