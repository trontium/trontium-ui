import React from 'react';
import ReactDOM from 'react-dom';

import type { MessageArgsProps, NoticeType } from './interface';
import type { MessageListRef } from './message-list';
import MessageList from './message-list';
import './style';

let messageInstance: MessageListRef | null = null;

function getMessageInstance(callback: (instance: MessageListRef) => void) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }

  const div = document.createElement('div');
  document.body.appendChild(div);

  ReactDOM.render(
    <MessageList
      ref={(instance) => {
        if (instance) {
          messageInstance = instance;
          callback(instance);
        }
      }}
    />,
    div,
  );
}

const notice = (args: MessageArgsProps) => {
  getMessageInstance((instance) => {
    instance.add(args);
  });
};

const api: any = {
  open: notice,
  destroy: () => {
    // Destroy logic implementation would go here
    if (messageInstance) {
      // Cleanup if needed
    }
  },
};

(['info', 'success', 'error', 'warning', 'loading'] as NoticeType[]).forEach((type) => {
  api[type] = (content: React.ReactNode, duration?: number, onClose?: () => void) => {
    if (typeof content === 'object' && content !== null && 'content' in (content as any)) {
      return api.open({ ...(content as object), type });
    }
    return api.open({ content, duration, type, onClose });
  };
});

export default api as {
  info: (content: React.ReactNode, duration?: number, onClose?: () => void) => void;
  success: (content: React.ReactNode, duration?: number, onClose?: () => void) => void;
  error: (content: React.ReactNode, duration?: number, onClose?: () => void) => void;
  warning: (content: React.ReactNode, duration?: number, onClose?: () => void) => void;
  loading: (content: React.ReactNode, duration?: number, onClose?: () => void) => void;
  open: (args: MessageArgsProps) => void;
  destroy: () => void;
};
