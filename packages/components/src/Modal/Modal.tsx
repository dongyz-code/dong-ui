import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Close } from '@icon-park/react';
import classNames from 'classnames';
import useConfig from '../hooks/useConfig';
import Button from '../Button';

import type { ModalProps } from './interface';

const Modal: React.FC<ModalProps> = ({
  open,
  className,
  width,
  title,
  footer,
  okText,
  cancelText,
  zIndex,
  style,
  keyboard,
  maskClosable,
  onCancel,
  onOk,
  children,
}) => {
  const { prefixCls } = useConfig();

  const _classNames = classNames(`${prefixCls}-modal`, className, {
    [`${prefixCls}-modal-open`]: open,
  });

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={`${prefixCls}-modal-root`}>
      <div className={`${prefixCls}-modal-mask`}></div>
      <div className={`${prefixCls}-modal-wrap`} style={{ zIndex }}>
        <div className={_classNames} style={{ ...style, width }}>
          <div className={`${prefixCls}-modal-close`}>
            <Close theme="outline" onClick={() => onCancel?.()} />
          </div>

          {title && (
            <div className={`${prefixCls}-modal-header`}>
              <h3 className={`${prefixCls}-modal-title`}>{title}</h3>
            </div>
          )}

          <div className={`${prefixCls}-modal-body`}>{children}</div>

          <div className={`${prefixCls}-modal-footer`}>
            {footer ?? (
              <>
                <Button onClick={() => onCancel?.()}>{cancelText || '取消'}</Button>
                <Button type="primary" onClick={() => onOk?.()}>
                  {okText || '确定'}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
