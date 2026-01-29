// src/virtual-list/__tests__/index.test.tsx
import React from 'react';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import VirtualList from '../index';

const data = Array.from({ length: 100 }).map((_, i) => ({ id: i, text: `Item ${i}` }));

describe('VirtualList Component', () => {
  it('renders correctly', () => {
    const { getByRole, getByText } = render(
      <VirtualList height={100} itemHeight={20} data={data} itemKey={(item) => item.id}>
        {(item) => <div>{item.text}</div>}
      </VirtualList>,
    );

    expect(getByRole('list')).toBeInTheDocument();
  });

  it('renders only visible items plus buffer', () => {
    // 容器高度 100，项高度 20 => 可见 5 个。加上 buffer 5 个，应渲染约 10 个。
    // 总数 100 个，如果没有虚拟列表，会渲染 100 个。
    const { container } = render(
      <VirtualList height={100} itemHeight={20} data={data} itemKey={(item) => item.id}>
        {(item) => <div className="list-item">{item.text}</div>}
      </VirtualList>,
    );

    const items = container.querySelectorAll('.list-item');
    // 5 visible + 5 buffer = 10. Might differ slightly due to Math.ceil but definitely less than 100
    expect(items.length).toBeLessThan(20);
    expect(items.length).toBeGreaterThan(0);
  });

  it('renders specific items initially', () => {
    const { getByText, queryByText } = render(
      <VirtualList height={100} itemHeight={20} data={data} itemKey={(item) => item.id}>
        {(item) => <div>{item.text}</div>}
      </VirtualList>,
    );

    // Initial should be there
    expect(getByText('Item 0')).toBeInTheDocument();
    // Item far away should not be there
    expect(queryByText('Item 90')).not.toBeInTheDocument();
  });
});
