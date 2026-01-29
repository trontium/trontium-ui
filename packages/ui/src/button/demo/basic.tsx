import React from 'react';

import { Button } from '@trontium/ui';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
    <Button type="link">Link</Button>
    <Button type="text">Text</Button>
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
  </div>
);
