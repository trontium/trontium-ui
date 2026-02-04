import type { ComponentSchema } from '../types';

/**
 * 深度优先遍历查找节点
 */
export const findNode = (
  nodes: ComponentSchema | ComponentSchema[],
  id: string,
): ComponentSchema | null => {
  const nodeList = Array.isArray(nodes) ? nodes : [nodes];

  for (const node of nodeList) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * 深度优先更新节点，返回新的树（Immutable pattern 简单模拟）
 */
export const updateNode = (
  nodes: ComponentSchema,
  id: string,
  newProps: Record<string, any>,
): ComponentSchema => {
  if (nodes.id === id) {
    return { ...nodes, props: { ...nodes.props, ...newProps } };
  }

  if (nodes.children) {
    return {
      ...nodes,
      children: nodes.children.map((child) => updateNode(child, id, newProps)),
    };
  }

  return nodes;
};

/**
 * 向指定 ID 的节点添加子节点
 */
export const addChildNode = (
  root: ComponentSchema,
  parentId: string,
  newNode: ComponentSchema,
): ComponentSchema => {
  if (root.id === parentId) {
    const newChildren = root.children ? [...root.children, newNode] : [newNode];
    return { ...root, children: newChildren };
  }

  if (root.children) {
    return {
      ...root,
      children: root.children.map((child) => addChildNode(child, parentId, newNode)),
    };
  }

  return root;
};

/**
 * 从树中移除指定 ID 的节点
 */
export const removeNode = (root: ComponentSchema, id: string): ComponentSchema | null => {
  if (root.id === id) {
    return null; // 如果移除的是根节点，这通常不被允许，但在递归中表示移除自己
  }

  if (root.children) {
    // 过滤掉要移除的节点
    const remainingChildren = root.children
      .map((child) => removeNode(child, id))
      .filter((child): child is ComponentSchema => child !== null);

    return {
      ...root,
      children: remainingChildren,
    };
  }

  return root;
};

/**
 * 在指定节点 ID 后面插入新节点
 */
export const insertAfterNode = (
  root: ComponentSchema,
  targetId: string,
  newNode: ComponentSchema,
): ComponentSchema => {
  // 如果根节点就是目标节点，我们无法在其“后面”插入（因为没有父节点列表），除非返回数组
  // 这里假设根节点不可被插入后面
  if (root.id === targetId) return root;

  if (root.children) {
    const index = root.children.findIndex((child) => child.id === targetId);
    if (index !== -1) {
      const newChildren = [...root.children];
      newChildren.splice(index + 1, 0, newNode);
      return { ...root, children: newChildren };
    }

    return {
      ...root,
      children: root.children.map((child) => insertAfterNode(child, targetId, newNode)),
    };
  }

  return root;
};
