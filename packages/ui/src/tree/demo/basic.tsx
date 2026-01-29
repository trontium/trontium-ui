import React from 'react';

import { Tree } from '@trontium/ui';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'leaf', key: '0-0-1-0' }],
      },
    ],
  },
];

export default () => {
  const onSelect = (selectedKeys: (string | number)[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onExpand = (expandedKeys: (string | number)[], info: any) => {
    console.log('expanded', expandedKeys, info);
  };

  return (
    <Tree
      treeData={treeData}
      defaultExpandedKeys={['0-0-0', '0-0-1']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onExpand={onExpand}
    />
  );
};
