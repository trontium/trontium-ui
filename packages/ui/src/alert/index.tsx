import React from 'react';

export interface AlertProps {
  /**
   * @description       Alert Type
   * @default           'info'
   */
  kind?: 'info' | 'positive' | 'negative' | 'warning';
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const prefixCls = 'trontium-alert';

const Alert: React.FC<AlertProps> = ({ children, kind = 'info', className = '', ...rest }) => (
  <div className={`${prefixCls} ${prefixCls}-${kind} ${className}`} {...rest}>
    {children}
  </div>
);

export default Alert;
