import React from 'react';

export type ModalProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;

  /** 对话框是否可见 */
  open: boolean;

  /** 点击Esc时是否可关闭 */
  keyboard?: boolean;

  /** 点击蒙层是否可关闭 */
  maskClosable?: boolean;

  /** 设置Modal的z-index */
  zIndex?: number;

  /** 设置Modal的宽度 */
  width?: number | string;

  /** 标题 */
  title?: React.ReactNode;

  /** 底部内容 */
  footer?: React.ReactNode;

  /** 取消按钮文字 */
  cancelText?: React.ReactNode;

  /** 确定按钮文字 */
  okText?: React.ReactNode;

  /** 点击遮罩层或右上角叉或取消按钮的回调 */
  onCancel?: () => void;

  /** 点击确定按钮的回调 */
  onOk?: () => void;
};
