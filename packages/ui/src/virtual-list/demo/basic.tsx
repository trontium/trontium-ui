// src/virtual-list/demo/basic.tsx
import React from 'react';

import VirtualList from '../index';
import '../style';

// Create a large dataset
const data = Array.from({ length: 10000 }).map((_, i) => ({
  id: i,
  content: `Row Item ${i}`,
  description: `This is the description for item ${i}`,
}));

export default () => {
  return (
    <div style={{ padding: 20 }}>
      <h3>10,000 Items Virtual List</h3>
      <p>Scroll down to see the virtual rendering in action. Only visible items are rendered.</p>

      <VirtualList height={300} itemHeight={50} data={data} itemKey={(item) => item.id}>
        {(item, index) => (
          <div
            style={{
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              borderBottom: '1px solid #f0f0f0',
              boxSizing: 'border-box',
              backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
            }}
          >
            <span style={{ fontWeight: 500 }}>{item.id}</span>
            <span>{item.content}</span>
            <span style={{ color: '#999', fontSize: 12 }}>{item.description}</span>
          </div>
        )}
      </VirtualList>
    </div>
  );
};
