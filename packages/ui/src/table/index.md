---
title: Table
group:
  title: Data Display
  order: 2
---

## Table

A Basic Table component.

### Basic Usage

<code src="./demo/basic.tsx"></code>

### Virtual Scroll

<code src="./demo/virtual-scroll.tsx"></code>

### Fixed Columns & Virtual Scroll

<code src="./demo/fixed-columns.tsx"></code>

### Complex Usage with Custom Render & Actions

<code src="./demo/complex.tsx"></code>

## API

### Table

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| columns | Columns of the table | `ColumnType[]` | - |
| dataSource | Data record array to be displayed | `any[]` | - |
| rowKey | Row's unique key | `string \| (record) => string` | `key` |
| scroll | Whether the table can be scrolled in y-direction | `{ y: number }` | - |
| style | Style of table container | `CSSProperties` | - |
| className | Class name of table container | `string` | - |

### ColumnType

| Property  | Description                      | Type                                  | Default |
| --------- | -------------------------------- | ------------------------------------- | ------- |
| title     | Title of this column             | `ReactNode`                           | -       |
| dataIndex | Display field of the data record | `string`                              | -       |
| key       | Unique key of this column        | `string`                              | -       |
| width     | Width of this column             | `string \| number`                    | -       |
| render    | Renderer of the table cell       | `(value, record, index) => ReactNode` | -       |
