import React from 'react';

const Loading: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--trontium-color-primary, #1890ff)' 
    }}>
      Loading...
    </div>
  );
};

export default Loading;
