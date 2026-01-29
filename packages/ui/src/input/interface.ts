import type { CSSProperties, InputHTMLAttributes, KeyboardEvent, ReactNode } from 'react';

export type InputSize = 'large' | 'middle' | 'small';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  disabled?: boolean;
  size?: InputSize;
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  allowClear?: boolean;
  onPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  style?: CSSProperties;
}
