import React from 'react';

import { Button, Input } from '@trontium/ui';

// 使用我们自己的组件库构建编辑器
import type { ComponentSchema } from '../types';

interface SettingsPanelProps {
  selectedNode: ComponentSchema | null;
  onUpdate: (id: string, newProps: any) => void;
  onDelete: (id: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onUpdate,
  onDelete,
}) => {
  if (!selectedNode) {
    return <div style={{ padding: 20, color: '#999' }}>请点击左侧画布选择组件</div>;
  }

  const { props, id, name } = selectedNode;

  // 简单的表单处理
  const handleChange = (key: string, value: any) => {
    onUpdate(id, { [key]: value });
  };

  const handleStyleChange = (key: string, value: any) => {
    const newStyle = { ...props.style, [key]: value };
    onUpdate(id, { style: newStyle });
  };

  return (
    <div
      style={{
        width: 300,
        borderLeft: '1px solid #ddd',
        background: '#fff',
        padding: 20,
        height: '100%',
        overflow: 'auto',
      }}
    >
      <h3 style={{ marginBottom: 20 }}>属性配置: {name}</h3>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>ID</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              padding: '4px 11px',
              background: '#f5f5f5',
              borderRadius: 4,
              color: '#666',
              fontSize: 12,
              flex: 1,
            }}
          >
            {id}
          </div>
          <Button
            size="small"
            type="primary"
            onClick={() => onDelete(id)}
            disabled={name === 'Page' || name === 'Page'}
            danger
          >
            删除
          </Button>
        </div>
      </div>

      {/* 通用属性：文本内容 (children) */}
      {/* 只有非 void 元素才允许编辑 children，且排除容器组件 */}
      {!['Input', 'Image', 'img', 'br', 'hr', 'Card', 'Page'].includes(name) &&
        (typeof props.children === 'string' || props.children === undefined) && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>文本内容</label>
            <Input
              value={props.children || ''}
              onChange={(e: any) => handleChange('children', e.target.value)}
            />
          </div>
        )}

      {/* Button 特有属性 */}
      {name === 'Button' && (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>按钮类型</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['primary', 'default', 'dashed', 'text', 'link'].map((type) => (
                <Button
                  key={type}
                  size="small"
                  type={props.type === type ? 'primary' : 'default'}
                  onClick={() => handleChange('type', type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              尺寸 (Size)
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['small', 'middle', 'large'].map((size) => (
                <Button
                  key={size}
                  size="small"
                  type={props.size === size ? 'primary' : 'default'}
                  onClick={() => handleChange('size', size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ marginRight: 8 }}>危险按钮 (Danger)</label>
            <input
              type="checkbox"
              checked={!!props.danger}
              onChange={(e) => handleChange('danger', e.target.checked)}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ marginRight: 8 }}>禁用 (Disabled)</label>
            <input
              type="checkbox"
              checked={!!props.disabled}
              onChange={(e) => handleChange('disabled', e.target.checked)}
            />
          </div>
        </>
      )}

      {/* Input 特有属性 */}
      {name === 'Input' && (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              占位符 (Placeholder)
            </label>
            <Input
              value={props.placeholder || ''}
              onChange={(e: any) => handleChange('placeholder', e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ marginRight: 8 }}>禁用 (Disabled)</label>
            <input
              type="checkbox"
              checked={!!props.disabled}
              onChange={(e) => handleChange('disabled', e.target.checked)}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ marginRight: 8 }}>允许清空</label>
            <input
              type="checkbox"
              checked={!!props.allowClear}
              onChange={(e) => handleChange('allowClear', e.target.checked)}
            />
          </div>
        </>
      )}

      {/* Card 特有属性 */}
      {name === 'Card' && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>标题 (Title)</label>
          <Input
            value={props.title || ''}
            onChange={(e: any) => handleChange('title', e.target.value)}
          />
        </div>
      )}

      <hr style={{ margin: '20px 0', border: 0, borderTop: '1px solid #eee' }} />
      <h4 style={{ marginBottom: 12 }}>样式 (Style)</h4>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>宽度 (Width)</label>
          <Input
            value={props.style?.width || ''}
            onChange={(e: any) => handleStyleChange('width', e.target.value)}
            placeholder="auto"
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>高度 (Height)</label>
          <Input
            value={props.style?.height || ''}
            onChange={(e: any) => handleStyleChange('height', e.target.value)}
            placeholder="auto"
          />
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>背景色</label>
        <Input
          value={props.style?.background || props.style?.backgroundColor || ''}
          onChange={(e: any) => handleStyleChange('background', e.target.value)}
          placeholder="#ffffff"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>颜色</label>
        <Input
          value={props.style?.color || ''}
          onChange={(e: any) => handleStyleChange('color', e.target.value)}
          placeholder="#000000"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>内边距 (Padding)</label>
        <Input
          value={props.style?.padding || ''}
          onChange={(e: any) => handleStyleChange('padding', e.target.value)}
          placeholder="10px"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>外边距 (Margin)</label>
        <Input
          value={props.style?.margin || ''}
          onChange={(e: any) => handleStyleChange('margin', e.target.value)}
          placeholder="10px"
        />
      </div>
    </div>
  );
};
