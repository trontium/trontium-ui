import React from 'react';

import { Button, message } from '@trontium/ui';

export default () => {
  const info = () => {
    message.info('This is a normal message');
  };

  const success = () => {
    message.success('This is a success message');
  };

  const error = () => {
    message.error('This is an error message');
  };

  const warning = () => {
    message.warning('This is a warning message');
  };

  const loading = () => {
    message.loading('Loading...', 2.5);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button type="primary" onClick={info}>
        Info
      </Button>
      <Button onClick={success}>Success</Button>
      <Button onClick={error} type="danger">
        Error
      </Button>
      <Button onClick={warning} type="dashed">
        Warning
      </Button>
      <Button onClick={loading}>Loading</Button>
    </div>
  );
};
