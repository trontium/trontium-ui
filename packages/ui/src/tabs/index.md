---
title: Tabs 标签页
group: 数据展示
---

## Tabs 标签页

选项卡切换组件。

### 代码演示

<code src="./demo/basic.tsx"></code>

### API

#### Tabs

| 属性             | 说明                    | 类型                                    | 默认值 |
| ---------------- | ----------------------- | --------------------------------------- | ------ |
| activeKey        | 当前激活 tab 面板的 key | `string` \| `number`                    | -      |
| defaultActiveKey | 初始化选中面板的 key    | `string` \| `number`                    | -      |
| onChange         | 切换面板的回调          | `(activeKey: string \| number) => void` | -      |

#### Tabs.TabPane

| 属性     | 说明             | 类型        | 默认值  |
| -------- | ---------------- | ----------- | ------- |
| tab      | 选项卡头显示文字 | `ReactNode` | -       |
| key      | 对应 activeKey   | `string`    | -       |
| disabled | 是否禁用         | `boolean`   | `false` |
