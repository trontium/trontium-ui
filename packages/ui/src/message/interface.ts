import type React from 'react';

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface MessageConfig {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
  rtl?: boolean;
}

export interface MessageArgsProps {
  key?: React.Key;
  content: React.ReactNode;
  duration?: number | null;
  type?: NoticeType;
  onClose?: () => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

export interface MessageItemProps extends MessageArgsProps {
  noticeId: React.Key;
  onRemove: (key: React.Key) => void;
}
