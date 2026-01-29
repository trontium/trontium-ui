import React, { forwardRef, useImperativeHandle, useState } from 'react';

import type { MessageArgsProps } from './interface';
import MessageItem from './message-item';

const prefixCls = 'trontium-message';

export interface MessageListRef {
  add: (notice: MessageArgsProps) => void;
  remove: (key: React.Key) => void;
}

const MessageList = forwardRef<MessageListRef, any>((props, ref) => {
  const [notices, setNotices] = useState<MessageArgsProps[]>([]);

  useImperativeHandle(ref, () => ({
    add: (notice: MessageArgsProps) => {
      setNotices((prev) => {
        const filtered = notice.key ? prev.filter((n) => n.key !== notice.key) : prev;
        return [
          ...filtered,
          {
            ...notice,
            key: notice.key || `trontium-message-${Date.now()}-${Math.random()}`,
          },
        ];
      });
    },
    remove: (key: React.Key) => {
      setNotices((prev) => prev.filter((notice) => notice.key !== key));
    },
  }));

  const handleRemove = (key: React.Key) => {
    setNotices((prev) => prev.filter((notice) => notice.key !== key));
  };

  return (
    <div className={prefixCls}>
      {notices.map((notice) => {
        const { key, ...rest } = notice;
        const safeKey = key!;

        return <MessageItem key={safeKey} id={safeKey} {...rest} onRemove={handleRemove} />;
      })}
    </div>
  );
});

export default MessageList;
