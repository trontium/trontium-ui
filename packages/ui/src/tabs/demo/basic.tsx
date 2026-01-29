import React from 'react';

import { Tabs } from '@trontium/ui';

const { TabPane } = Tabs;

export default () => {
  const onChange = (key: string | number) => {
    console.log(key);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Tab 4" key="4" disabled>
        Content of Tab Pane 4
      </TabPane>
    </Tabs>
  );
};
