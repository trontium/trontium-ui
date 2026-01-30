import React from 'react';

import { Table } from '../../index';

const columns = [
  { title: 'Name', dataIndex: 'name', width: 150 },
  { title: 'Age', dataIndex: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address' },
];

const data = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `User ${i}`,
  age: 20 + (i % 50),
  address: `Street ${i}, City, Country`,
}));

export default () => {
  return (
    <div style={{ height: 400 }}>
      <h3>Virtual Scroll (10,000 items)</h3>
      <Table columns={columns} dataSource={data} scroll={{ y: 300 }} rowKey="id" />
    </div>
  );
};
