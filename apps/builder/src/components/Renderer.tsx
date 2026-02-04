import React, { createElement, forwardRef } from 'react';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Alert, Button, Input } from '@trontium/ui';

// 引入组件库
import type { ComponentSchema } from '../types';

// 简单的容器组件实现 - 需要支持 ref 转发以便 dnd-kit 定位
const Page = forwardRef<HTMLDivElement, any>(({ children, style, ...props }, ref) => (
  <div
    ref={ref}
    style={{ ...style, minHeight: '100%', paddingBottom: 50, background: '#fff' }}
    {...props}
  >
    {children}
  </div>
));

const Card = forwardRef<HTMLDivElement, any>(({ children, title, style, ...props }, ref) => (
  <div ref={ref} style={{ border: '1px solid #f0f0f0', borderRadius: 4, ...style }} {...props}>
    {title && (
      <div style={{ padding: '12px 24px', borderBottom: '1px solid #f0f0f0', fontWeight: 500 }}>
        {title}
      </div>
    )}
    <div style={{ padding: 24 }}>{children}</div>
  </div>
));

// 图片组件
const Image = forwardRef<HTMLImageElement, any>(({ src, style, ...props }, ref) => (
  <img
    ref={ref}
    src={src || 'https://via.placeholder.com/150'}
    style={{ maxWidth: '100%', display: 'block', ...style }}
    {...props}
  />
));

// 1. 组件映射表：将 JSON 中的 name 映射到实际组件
const componentMap: Record<string, React.ComponentType<any> | string> = {
  Button,
  Input,
  Alert,
  Page,
  Card,
  Image,
  // 默认回退组件
  div: 'div',
  span: 'span',
};

// 定义哪些组件可以作为放置目标 (Container)
// const DROPPABLE_COMPONENTS = ['Page', 'Card', 'div'];

// 定义 Void 元素（不能有 Children）
const VOID_ELEMENTS = ['Input', 'img', 'br', 'hr', 'Image'];

interface RendererProps {
  schema: ComponentSchema;
  selectedId?: string;
  onSelect?: (id: string) => void;
  isPreview?: boolean;
}

// 使用 React.memo 优化性能，避免不必要的重渲染
export const Renderer = React.memo(
  ({ schema, selectedId, onSelect, isPreview = false }: RendererProps) => {
    const { name, props, children, id } = schema;

    // 1. 判断是否为容器组件
    const isContainer = ['Page', 'Card', 'div'].includes(name);

    // 仅在编辑模式下启用 Droppable
    const droppable = useDroppable({
      id: id,
      disabled: isPreview, // 预览模式禁用拖拽
      data: {
        isContainer: isContainer,
        name: name,
      },
    });

    // 仅在编辑模式下启用 Draggable
    const isDraggable = !isPreview && name !== 'Page';
    const draggable = useDraggable({
      id: id,
      disabled: !isDraggable, // 如果 isDraggable 为 false，则禁用
      data: {
        isCanvas: true,
        type: name,
        id: id,
      },
    });

    // 获取实际组件
    const Component = componentMap[name] || componentMap.div;

    if (!Component) {
      console.warn(`Component ${name} not found`);
      return null;
    }

    // 交互逻辑：点击选中
    const isSelected = selectedId === id;

    const handleOnClick = (e: React.MouseEvent) => {
      // 预览模式下：允许原生点击事件（如果有的话），不进行编辑器选择
      if (isPreview) {
        if (props.onClick) props.onClick(e);
        return;
      }
      e.stopPropagation(); // 阻止冒泡，避免选中父级
      onSelect?.(id);
    };

    // 样式注入
    const combinedStyle: React.CSSProperties = {
      ...props.style,
      // 拖拽时的样式变换 (仅非预览)
      transform: draggable.transform ? CSS.Translate.toString(draggable.transform) : undefined,
      opacity: draggable.isDragging ? 0.5 : 1,

      // 仅在编辑模式下显示高亮
      outline:
        !isPreview && isSelected
          ? '2px solid #1890ff'
          : !isPreview && droppable.isOver
          ? '2px dashed #1890ff'
          : 'none',
      outlineOffset: -2,
      position: 'relative',
      cursor: !isPreview && isDraggable ? 'move' : 'default',
      zIndex: draggable.isDragging ? 999 : 'auto',
      transition: draggable.isDragging ? 'none' : 'all 0.2s',

      // 如果是 Page，确保占满高度
      ...(name === 'Page' ? { minHeight: '100%' } : {}),
    };

    // 组合 Refs
    const setRef = (node: HTMLElement | null) => {
      if (isDraggable) draggable.setNodeRef(node);
      droppable.setNodeRef(node); // 所有组件都是 drop target
    };

    // 组合 Props
    const combinedProps = {
      ...props,
      id,
      key: id,
      onClick: handleOnClick,
      style: combinedStyle,
      ref: setRef,
      // 注入拖拽事件监听器
      ...(isDraggable ? draggable.listeners : {}),
      ...(isDraggable ? draggable.attributes : {}),
    };

    // 处理 props.children
    let childrenToRender = props.children;

    // 只有当 schema 定义了非空子节点数组时，才覆盖 props.children
    if (children && Array.isArray(children) && children.length > 0) {
      childrenToRender = children.map((child: ComponentSchema) => (
        <Renderer
          key={child.id}
          schema={child}
          selectedId={selectedId}
          onSelect={onSelect}
          isPreview={isPreview}
        />
      ));
    } else if (typeof children === 'string') {
      // 保持 string 类型的 children
      childrenToRender = children;
    }

    // 如果是 Void 元素，强制不传入 children
    if (VOID_ELEMENTS.includes(name)) {
      childrenToRender = undefined;
    }

    return createElement(Component, combinedProps, childrenToRender);
  },
);
