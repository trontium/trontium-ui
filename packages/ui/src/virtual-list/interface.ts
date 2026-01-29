// src/virtual-list/interface.ts
import type { CSSProperties, ReactNode } from 'react';

export interface VirtualListProps<T> {
  style?: CSSProperties;
  className?: string;
  /** 容器高度 */
  height: number;
  /** 每一项的高度 */
  itemHeight: number;
  /** 数据源 */
  data: T[];
  /** 获取每一项的唯一 key */
  itemKey: (item: T) => React.Key;
  /** 渲染每一项的函数 */
  children: (item: T, index: number) => ReactNode;
}
