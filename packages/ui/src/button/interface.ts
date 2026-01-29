export interface ButtonProps {
  /**
   * @description       按钮类型
   * @default           default
   */
  type?: 'primary' | 'default' | 'danger' | 'link' | 'text' | 'dashed';
  /**
   * @description       按钮尺寸
   * @default           middle
   */
  size?: 'large' | 'middle' | 'small';
  /**
   * @description       是否包含图标
   */
  icon?: React.ReactNode;
  /**
   * @description       html title
   */
  title?: string;
  /**
   * @description       类名
   */
  className?: string;
  /**
   * @description       样式
   */
  style?: React.CSSProperties;
  /**
   * @description       子元素
   */
  children?: React.ReactNode;
  /**
   * @description       点击事件
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * @description       设置按钮载入状态
   * @default           false
   */
  loading?: boolean | { delay: number };
  /**
   * @description       按钮失效状态
   * @default           false
   */
  disabled?: boolean;
  /**
   * @description       设置 button 原生的 type 值
   * @default           button
   */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * @description       将按钮宽度调整为其父宽度的选项
   * @default           false
   */
  block?: boolean;
}

export type NativeButtonProps = ButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
export type AnchorButtonProps = ButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonType = Partial<NativeButtonProps & AnchorButtonProps>;
