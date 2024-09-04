import React from 'react';

export interface WatermarkProps extends React.PropsWithChildren {
  style?: React.CSSProperties;

  classsName?: string;

  fontStyle?: {
    /** 水印字体 */
    fontFamily: string;

    /** 水印字体粗细 */
    fontWeight?: string;

    /** 水印字体大小 */
    fontSize: string;

    /** 水字体颜色 */
    color: string;
  };

  /** 水印文字内容 */
  content?: string[];

  /** 图片源，优先级高于content */
  image?: string;

  /** 水印宽度 */
  width?: number;

  /** 水印高度 */
  height?: number;

  /** 水印旋转角度 */
  rotate?: number;

  /** 水印之间的间距 */
  gap?: [number, number];

  /** 水印距离左上角的距离 */
  offset?: [number, number];

  /** 水印元素的z-index */
  zIndex?: number;
}

export type WatermarkOptions = Omit<WatermarkProps, 'children' | 'style' | 'classsName'>;
