import React, { useEffect } from 'react';

import classNames from 'classnames';

import type { MessageArgsProps } from './interface';

const prefixCls = 'trontium-message';

export interface MessageItemProps extends MessageArgsProps {
  id: React.Key;
  onRemove: (id: React.Key) => void;
}

const MessageItem: React.FC<MessageItemProps> = (props) => {
  const { id, content, duration = 3, type = 'info', onRemove, onClose, className, style } = props;

  useEffect(() => {
    if (duration !== null && duration !== 0) {
      const timer = setTimeout(() => {
        onRemove(id);
        if (onClose) onClose();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onRemove, onClose]);

  const classes = classNames(`${prefixCls}-notice`, className, {
    [`${prefixCls}-${type}`]: type,
  });

  return (
    <div className={classes} style={style}>
      <div className={`${prefixCls}-notice-content`}>
        <div className={`${prefixCls}-custom-content`}>
          <span className={`${prefixCls}-${type}-icon`}>
            {type === 'success' && '✅'}
            {type === 'error' && '❌'}
            {type === 'info' && 'ℹ️'}
            {type === 'warning' && '⚠️'}
            {type === 'loading' && '⟳'}
          </span>
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
