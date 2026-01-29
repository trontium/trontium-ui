import type { CSSProperties, ReactNode } from 'react';

export interface TreeDataNode {
  key: string | number;
  title: ReactNode;
  children?: TreeDataNode[];
  disabled?: boolean;
  selectable?: boolean;
}

export interface TreeProps {
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 样式
   */
  style?: CSSProperties;
  /**
   * @description 树形数据
   */
  treeData?: TreeDataNode[];
  /**
   * @description 默认展开的节点
   */
  defaultExpandedKeys?: (string | number)[];
  /**
   * @description 选中节点
   */
  selectedKeys?: (string | number)[];
  /**
   * @description 默认选中节点
   */
  defaultSelectedKeys?: (string | number)[];
  /**
   * @description 是否支持多选
   */
  multiple?: boolean;
  /**
   * @description 点击树节点触发
   */
  onSelect?: (
    selectedKeys: (string | number)[],
    info: {
      selected: boolean;
      selectedNodes: TreeDataNode[];
      node: TreeDataNode;
      event: React.MouseEvent;
    },
  ) => void;
  /**
   * @description 展开/收起节点时触发
   */
  onExpand?: (
    expandedKeys: (string | number)[],
    info: { expanded: boolean; node: TreeDataNode },
  ) => void;
}
