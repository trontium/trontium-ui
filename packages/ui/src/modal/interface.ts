import type React from 'react';

export interface ModalProps {
  /**
   * @description 对话框是否可见
   * @default false
   */
  visible?: boolean;
  /**
   * @description 标题
   */
  title?: React.ReactNode;
  /**
   * @description 底部内容，设置为 null 则不显示
   */
  footer?: React.ReactNode;
  /**
   * @description 点击确定回调
   */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * @description 点击遮罩层或右上角叉或取消按钮的回调
   */
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * @description 宽度
   * @default 520
   */
  width?: number | string;
  /**
   * @description 对话框垂直中心偏移量
   */
  style?: React.CSSProperties;
  /**
   * @description 容器类名
   */
  className?: string;
  /**
   * @description 是否显示右上角的关闭按钮
   * @default true
   */
  closable?: boolean;
  /**
   * @description 是否显示遮罩
   * @default true
   */
  mask?: boolean;
  /**
   * @description 点击遮罩是否允许关闭
   * @default true
   */
  maskClosable?: boolean;

  children?: React.ReactNode;
}
