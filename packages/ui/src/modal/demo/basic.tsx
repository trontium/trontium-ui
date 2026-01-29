import React, { useState } from 'react';

import { Button, Modal } from '@trontium/ui';

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      <div>
        <Button type="primary" onClick={showModal}>
          Open Basic Modal
        </Button>
        <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>

      <div>
        <Button onClick={() => setIsModalOpen2(true)}>Custom Footer & Width</Button>
        <Modal
          title="Custom Modal"
          visible={isModalOpen2}
          onCancel={() => setIsModalOpen2(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalOpen2(false)}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={() => setIsModalOpen2(false)}>
              Submit
            </Button>,
          ]}
          width={600}
        >
          <p>This modal has a width of 600px and a custom footer.</p>
        </Modal>
      </div>
    </div>
  );
};
