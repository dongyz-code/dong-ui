import React from 'react';

export interface LazyloadProps {
  className?: string;
  style?: React.CSSProperties;

  /** 占位 */
  placeholder?: React.ReactNode;
  /** 真实内容 */
  children: React.ReactNode;
  offset?: string | number;
  width?: string | number;
  height?: string | number;
  onContentVisible?: () => void;
}
