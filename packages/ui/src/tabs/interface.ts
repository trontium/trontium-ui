import type { CSSProperties, ReactNode } from 'react';

export interface TabPaneProps {
  key?: string | number;
  tab: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface TabsProps {
  /**
   * @description 当前激活 tab 面板的 key
   */
  activeKey?: string | number;
  /**
   * @description 初始化选中面板的 key，如果没有设置 activeKey
   */
  defaultActiveKey?: string | number;
  /**
   * @description 切换面板的回调
   */
  onChange?: (activeKey: string | number) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
