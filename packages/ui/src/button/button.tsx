import React from 'react';

import classNames from 'classnames';

import type { AnchorButtonProps, ButtonProps, NativeButtonProps } from './interface';

const prefixCls = 'trontium-btn';

const Button: React.FC<ButtonProps & (NativeButtonProps | AnchorButtonProps)> = (props) => {
  const {
    type = 'default',
    size = 'middle',
    className,
    children,
    disabled,
    loading = false,
    block = false,
    htmlType = 'button',
    style,
    onClick,
    ...restProps
  } = props;

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-disabled`]: disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  const iconNode = loading ? <span className={`${prefixCls}-loading-icon`}>⟳</span> : null;

  if (type === 'link') {
    return (
      <a
        className={classes}
        style={style}
        onClick={handleClick}
        {...(restProps as AnchorButtonProps)}
      >
        {iconNode}
        {children}
      </a>
    );
  }

  return (
    <button
      {...(restProps as NativeButtonProps)}
      type={htmlType}
      className={classes}
      style={style}
      disabled={disabled}
      onClick={handleClick}
    >
      {iconNode}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
