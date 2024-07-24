import React from 'react';
import { createPortal } from 'react-dom';
import { Close } from '@icon-park/react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import useConfig from '../hooks/useConfig';
import Button from '../Button';

import './style/index.scss';

import type { ModalProps, MousePosition } from './interface';
import { getOffset } from './utils';

let mousePosition: MousePosition;

const getMousePosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };

  /** 受控模式下，用户不一定马上打开弹框，那这个位置就不可用 */
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

if (window.document.documentElement) {
  document.documentElement.addEventListener('click', getMousePosition, true);
}

const Modal: React.FC<ModalProps> = ({
  open,
  className,
  width = 500,
  title,
  footer,
  okText = '确定',
  cancelText = '取消',
  zIndex,
  style,
  keyboard = true,
  mask = true,
  maskClosable = true,
  onCancel,
  onOk,
  children,
}) => {
  const { prefixCls } = useConfig();
  const mouseRef = React.useRef<MousePosition>();

  const [realOpen, setRealOpen] = React.useState(false);
  const [transformOrigin, setTransformOrigin] = React.useState<string>();

  const styleTrans = transformOrigin ? { transformOrigin } : {};

  const _classNames = classNames(`${prefixCls}-modal`, className);

  const handleClickMask = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget) {
      onCancel?.();
    }
  };

  const onRender = (el: HTMLDivElement) => {
    let transformOrigin = '';
    const modalPosition = getOffset(el);

    if (modalPosition && mouseRef.current) {
      const { x, y } = mouseRef.current;
      const { top, left } = modalPosition;
      const transformX = x - left;
      const transformY = y - top;
      transformOrigin = `${transformX}px ${transformY}px`;
      setTransformOrigin(transformOrigin);
    }
  };

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (keyboard && e.key === 'Escape') {
        onCancel?.();
      }
    },
    [open, keyboard]
  );

  React.useEffect(() => {
    // 监听ESC按键关闭弹窗
    document.addEventListener('keydown', handleKeyDown);

    // 移除ESC按键关闭弹窗
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  return createPortal(
    <div>
      <div>
        {/* 蒙层 */}

        <CSSTransition in={open && mask} appear timeout={300} unmountOnExit classNames="fade-mask">
          <div className={`${prefixCls}-modal-mask`} onClick={handleClickMask}></div>
        </CSSTransition>

        {/* 模态框 */}
        <div className={`${prefixCls}-modal-wrapper`} style={{ zIndex, display: open || realOpen ? 'block' : 'none' }}>
          <CSSTransition
            in={open}
            timeout={300}
            appear
            unmountOnExit
            mountOnEnter
            classNames="zoom-modal"
            onEnter={(el?: HTMLElement) => {
              if (!el) return;
              mouseRef.current = mousePosition;
              setRealOpen(true);
              onRender(el as HTMLDivElement);
            }}
            onExited={() => {
              setRealOpen(false);
            }}
          >
            <div role="dialog" className={_classNames} style={{ zIndex, width, ...style, ...styleTrans }}>
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
                    <Button onClick={() => onCancel?.()}>{cancelText}</Button>
                    <Button type="primary" onClick={() => onOk?.()}>
                      {okText}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
