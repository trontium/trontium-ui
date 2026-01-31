import React, { useState } from 'react';

import { Button, Table } from '@trontium/ui';

interface UserType {
  id: number;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}

const generateData = (count: number): UserType[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: i % 2 ? 'M' : 'F',
  }));

export default () => {
  const [data] = useState<UserType[]>(generateData(1000));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
      fixed: 'left' as const, // Fixed Left
      render: (text: string) => <a href="#">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 100,
      fixed: 'left' as const, // Fixed Left (Multiple)
    },
    { title: 'Street', dataIndex: 'street', width: 200 },
    { title: 'Building', dataIndex: 'building', width: 150 },
    { title: 'Door No.', dataIndex: 'number', width: 150 },
    { title: 'Company Address', dataIndex: 'companyAddress', width: 300 },
    { title: 'Company Name', dataIndex: 'companyName', width: 200 },
    { title: 'Gender', dataIndex: 'gender', width: 100 },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right' as const, // Fixed Right
      width: 150,
      render: () => (
        <Button type="primary" size="small">
          Action
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400 }}>
      <h3>Virtual Scroll + Fixed Columns</h3>
      <p>Scroll horizontally to see fixed columns effect.</p>
      <Table columns={columns} dataSource={data} rowKey="id" scroll={{ y: 300 }} />
    </div>
  );
};
