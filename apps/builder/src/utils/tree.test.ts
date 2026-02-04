import { describe, expect, it } from 'vitest';

import { addChildNode, findNode, removeNode } from './tree';

import type { ComponentSchema } from '../types';

describe('Tree Utils', () => {
  const initialTree: ComponentSchema = {
    id: 'root',
    name: 'Page',
    props: {},
    children: [
      {
        id: 'child-1',
        name: 'Button',
        props: { text: 'Click Me' },
      },
    ],
  };

  it('should find a node by id - findNode', () => {
    const result = findNode(initialTree, 'child-1');
    expect(result).toBeDefined();
    expect(result?.name).toBe('Button');
  });

  it('should return null if node not found - findNode', () => {
    const result = findNode(initialTree, 'non-existent');
    expect(result).toBeNull();
  });

  it('should add a child node to a container - addChildNode', () => {
    const newNode: ComponentSchema = {
      id: 'new-node',
      name: 'Input',
      props: {},
    };
    const newTree = addChildNode(initialTree, 'root', newNode);

    expect(newTree.children).toHaveLength(2);
    expect(newTree.children?.[1].id).toBe('new-node');
    // Ensure immutability (basic check)
    expect(newTree).not.toBe(initialTree);
  });

  it('should remove a node by id - removeNode', () => {
    const newTree = removeNode(initialTree, 'child-1');
    // removeNode returns ComponentSchema | null. Since we removed a child, the root remains.
    expect(newTree).not.toBeNull();
    expect(newTree?.children).toHaveLength(0);
  });

  it('should recursively remove a nested node', () => {
    const deepTree: ComponentSchema = {
      id: 'root',
      name: 'Page',
      props: {},
      children: [
        {
          id: 'container',
          name: 'Container',
          props: {},
          children: [{ id: 'deep-child', name: 'Button', props: {} }],
        },
      ],
    };

    const result = removeNode(deepTree, 'deep-child');
    const container = result?.children?.[0];
    expect(container?.children).toHaveLength(0);
  });
});
