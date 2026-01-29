import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import React, { forwardRef, useState } from 'react';

import classNames from 'classnames';

import type { InputProps } from './interface';
import './style';

const prefixCls = 'trontium-input';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    style,
    disabled,
    size = 'middle',
    prefix,
    suffix,
    allowClear,
    onChange,
    onPressEnter,
    addonBefore,
    addonAfter,
    ...restProps
  } = props;

  const [focused, setFocused] = useState(false);
  const rawValue = props.value;
  // Simple check for allowClear visibility: must have value and not be disabled
  const showClear =
    allowClear && !disabled && rawValue !== undefined && rawValue !== null && rawValue !== '';

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    props.onBlur?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e);
    }
    props.onKeyDown?.(e);
  };

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (onChange) {
      // Create a synthetic event or just a simple object that satisfies the interface
      // This is a limitation of not controlling the input ref directly for mutation
      const event = {
        ...e,
        target: { ...e.target, value: '' },
        currentTarget: { ...e.currentTarget, value: '' },
      };
      // @ts-ignore
      onChange(event as ChangeEvent<HTMLInputElement>);
    }
  };

  const renderClearIcon = () => {
    if (!showClear) return null;
    return (
      <span
        className={`${prefixCls}-suffix ${prefixCls}-clear-icon`}
        onClick={handleClear}
        style={{ cursor: 'pointer', color: '#ccc', fontSize: 12 }}
      >
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8.1-3.5-8.1-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8.1-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8.1 3.5 8.1 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
        </svg>
      </span>
    );
  };

  // Condition to use wrapper
  const isWrapped = prefix || suffix || allowClear;

  if (isWrapped) {
    return (
      <span
        className={classNames(
          `${prefixCls}-wrapper`,
          {
            [`${prefixCls}-wrapper-focused`]: focused,
            [`${prefixCls}-wrapper-disabled`]: disabled,
            [`${prefixCls}-wrapper-lg`]: size === 'large',
            [`${prefixCls}-wrapper-sm`]: size === 'small',
          },
          className,
        )}
        style={style}
      >
        {prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}
        <input
          ref={ref}
          className={prefixCls}
          disabled={disabled}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          {...restProps}
        />
        {renderClearIcon()}
        {suffix && <span className={`${prefixCls}-suffix`}>{suffix}</span>}
      </span>
    );
  }

  return (
    <input
      ref={ref}
      className={classNames(
        prefixCls,
        {
          [`${prefixCls}-lg`]: size === 'large',
          [`${prefixCls}-sm`]: size === 'small',
          [`${prefixCls}-disabled`]: disabled,
        },
        className,
      )}
      style={style}
      disabled={disabled}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...restProps}
    />
  );
});

export default Input;
