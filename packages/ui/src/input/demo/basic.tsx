import React, { useState } from 'react';

import { Input } from '@trontium/ui';

export default () => {
  const [val, setVal] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Input placeholder="Basic usage" />

      <Input placeholder="Large size" size="large" />
      <Input placeholder="Small size" size="small" />

      <Input placeholder="Disabled" disabled />

      <Input placeholder="With prefix" prefix={<span style={{ color: '#999' }}>User</span>} />

      <Input placeholder="With suffix" suffix={<span style={{ color: '#999' }}>RMB</span>} />

      <Input
        placeholder="Allow clear"
        allowClear
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};
