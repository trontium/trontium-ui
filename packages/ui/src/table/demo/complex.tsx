import React, { useState } from 'react';

import { Button, message, Table } from '@trontium/ui';

interface UserType {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'inactive';
}

const generateData = (count: number): UserType[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    role: i % 3 === 0 ? 'Admin' : 'User',
    status: i % 5 === 0 ? 'inactive' : 'active',
  }));

export default () => {
  const [data, setData] = useState<UserType[]>(generateData(1000));

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success(`User ${id} deleted`);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 100 },
    { title: 'Name', dataIndex: 'name', width: 200 },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 150,
      render: (text: string) => (
        <span style={{ color: text === 'Admin' ? 'red' : 'green', fontWeight: 'bold' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_: any, record: UserType) => (
        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => setData(generateData(1000))}>Reset Data</Button>
        <span style={{ marginLeft: 16 }}>Current Count: {data.length}</span>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" scroll={{ y: 300 }} />
    </div>
  );
};
