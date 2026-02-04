// apps/builder/src/components/MaterialPanel.tsx
import React from 'react';

import { useDraggable } from '@dnd-kit/core';

interface MaterialItemProps {
  type: string;
  label: string;
}

const MaterialItem: React.FC<MaterialItemProps> = ({ type, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${type}`,
    data: {
      isSidebar: true,
      type,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        position: 'relative' as const,
        cursor: 'grabbing',
      }
    : {
        marginBottom: 12,
        cursor: 'grab',
      };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div
        style={{
          padding: '8px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: 4,
          background: '#fff',
        }}
      >
        {label} ({type})
      </div>
    </div>
  );
};

export const MaterialPanel = () => {
  return (
    <div style={{ width: 250, borderRight: '1px solid #ddd', padding: 20, background: '#fff' }}>
      <h3 style={{ marginBottom: 20 }}>组件库</h3>
      <MaterialItem type="Button" label="按钮" />
      <MaterialItem type="Input" label="输入框" />
      <MaterialItem type="Card" label="卡片" />
      <MaterialItem type="Image" label="图片" />
      <MaterialItem type="Alert" label="警告提示" />
    </div>
  );
};
