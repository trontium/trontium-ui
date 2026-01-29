import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';

import type { ModalProps } from './interface';

import Button from '../button';

const prefixCls = 'trontium-modal';

const Modal: React.FC<ModalProps> = (props) => {
  const {
    visible = false,
    title,
    footer,
    onOk,
    onCancel,
    width = 520,
    children,
    closable = true,
    mask = true,
    maskClosable = true,
    style,
    className,
  } = props;

  // Body scroll lock logic
  useEffect(() => {
    if (visible) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [visible]);

  if (!visible) return null;

  const handleMaskClick = (e: React.MouseEvent) => {
    // Stop propagation to prevent closing when clicking content if wrapper catches it?
    // Actually, mask is a sibling to wrap in our structure, so separate clicks are fine.
    // If wrapper was inside mask, we'd need stopPropagation.
    // Current structure:
    // div.modal
    //   div.mask (absolute fill)
    //   div.wrap (relative)

    if (maskClosable) {
      onCancel?.(e as any);
    }
  };

  const modalContent = (
    <div className={prefixCls}>
      {mask && <div className={`${prefixCls}-mask`} onClick={handleMaskClick} />}
      <div
        className={classNames(`${prefixCls}-wrap`, className)}
        style={{ width, ...style }}
        role="dialog"
        aria-modal="true"
      >
        {closable && (
          <button className={`${prefixCls}-close`} onClick={onCancel as any}>
            <span className={`${prefixCls}-close-x`}>×</span>
          </button>
        )}

        {title && (
          <div className={`${prefixCls}-header`}>
            <div className={`${prefixCls}-title`}>{title}</div>
          </div>
        )}

        <div className={`${prefixCls}-body`}>{children}</div>

        {footer !== null && (
          <div className={`${prefixCls}-footer`}>
            {footer ? (
              footer
            ) : (
              <>
                <Button onClick={onCancel as any}>取消</Button>
                <Button type="primary" onClick={onOk as any}>
                  确定
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
