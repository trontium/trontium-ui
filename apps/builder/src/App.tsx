import { useState } from 'react';

import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { Button } from '@trontium/ui';

import { MaterialPanel } from './components/MaterialPanel';
import { Renderer } from './components/Renderer';
import { SettingsPanel } from './components/SettingsPanel';
import { useHistory } from './hooks/useHistory';
import { initialSchema } from './mock';
import type { ComponentSchema } from './types';
import { generateCode } from './utils/codegen';
import { addChildNode, findNode, insertAfterNode, removeNode, updateNode } from './utils/tree';

function App() {
  const {
    state: schema,
    setState: setSchema,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<ComponentSchema>(initialSchema);

  const [selectedId, setSelectedId] = useState<string>('root');
  const [isPreview, setIsPreview] = useState(false);

  // 配置传感器：要求拖拽移动 5px 后才触发
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const selectedNode = findNode(schema, selectedId);

  const handleUpdateProps = (id: string, newProps: any) => {
    setSchema((prev) => updateNode(prev, id, newProps));
  };

  const handleDeleteNode = (id: string) => {
    if (id === 'root') {
      alert('根节点不能删除');
      return;
    }
    setSchema((prev) => removeNode(prev, id) || prev);
    setSelectedId('root');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // 如果没有拖到有效区域
    if (!over) return;

    const targetId = over.id as string;

    // 情况 1: 从侧边栏拖入
    if (active.data.current?.isSidebar) {
      const type = active.data.current.type;
      const newNode: ComponentSchema = {
        id: Math.random().toString(36).substr(2, 9),
        name: type,
        props:
          type === 'Button'
            ? { children: 'New Button', type: 'primary' }
            : type === 'Input'
            ? { placeholder: 'New Input' }
            : type === 'Image'
            ? { src: 'https://via.placeholder.com/300x150' }
            : type === 'Card'
            ? { title: 'New Card', style: { background: '#fff', padding: 12, marginTop: 8 } }
            : {},
        children: [],
      };
      setSchema((prev) => addChildNode(prev, targetId, newNode));
      return;
    }

    // 情况 2: 画布内拖拽 (移动节点位置)
    if (active.data.current?.isCanvas) {
      const activeId = active.id as string;
      // 如果目标就是自己，忽略
      if (activeId === targetId) return;

      // 获取被拖拽的节点
      const draggedNode = findNode(schema, activeId);
      if (!draggedNode) return;

      setSchema((prev) => {
        // 1. 先从旧位置移除
        const withoutNode = removeNode(prev, activeId);
        if (!withoutNode) return prev; // 移除失败(比如是根节点)

        // 2. 判断是添加到容器内部，还是插入到节点后面
        const targetIsContainer = over.data.current?.isContainer;

        if (targetIsContainer) {
          // 如果是容器，添加到容器末尾
          return addChildNode(withoutNode, targetId, draggedNode);
        } else {
          // 如果是普通节点，插入到该节点后面 (Sibling)
          return insertAfterNode(withoutNode, targetId, draggedNode);
        }
      });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            padding: '0 20px',
            borderBottom: '1px solid #ddd',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
          }}
        >
          <h1 style={{ margin: 0, fontSize: 20 }}>Trontium Low-Code Engine</h1>

          <div style={{ marginLeft: 40, display: 'flex', gap: 8 }}>
            <Button size="small" onClick={undo} disabled={!canUndo}>
              撤销 (Undo)
            </Button>
            <Button size="small" onClick={redo} disabled={!canRedo}>
              重做 (Redo)
            </Button>
            <Button size="small" onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? '退出预览 (Exit)' : '预览 (Preview)'}
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                const code = generateCode(schema);
                console.log(code);
                alert('代码已生成到控制台 (F12 查看)！\n\n' + code.substring(0, 200) + '...');
              }}
            >
              出码 (Export)
            </Button>
          </div>

          <div style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>
            目前选中 ID: {selectedId}
          </div>
        </header>

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {/* 左侧 组件库 */}
          {!isPreview && <MaterialPanel />}

          {/* 中间 画布区域 */}
          {/* 移除旧的 CanvasDroppable 包装器，现在的 droppable 由 Renderer 组件自托管 */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: isPreview ? 0 : 10,
              background: '#f0f2f5',
            }}
          >
            <Renderer
              schema={schema}
              selectedId={isPreview ? '' : selectedId}
              onSelect={setSelectedId}
              isPreview={isPreview}
            />
          </div>

          {/* 右侧属性配置面板 */}
          {!isPreview && (
            <aside>
              <SettingsPanel
                selectedNode={selectedNode}
                onUpdate={handleUpdateProps}
                onDelete={handleDeleteNode}
              />
            </aside>
          )}
        </div>
      </div>
    </DndContext>
  );
}

export default App;
