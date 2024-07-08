import type {
  CSSProperties,
  HTMLProps,
  ReactNode,
  AnchorHTMLAttributes,
  MouseEventHandler,
  ButtonHTMLAttributes,
} from 'react';

export interface BasicButtonProps {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 是否加载中
   */
  loading?: boolean;

  /**
   * 将按钮宽度调制为其父元素宽度
   */
  block?: boolean;

  /**
   * 设置危险按钮
   */
  danger?: boolean;

  /**
   * 按钮类型
   */
  type?: 'default' | 'primary' | 'dashed' | 'text' | 'link';

  /**
   * HTML 原生按钮类型
   */
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];

  /**
   * 按钮尺寸
   */
  size?: 'large' | 'medium' | 'small';

  /**
   * 按钮形状
   */
  shape?: 'circle' | 'round';

  /**
   * 按钮链接
   */
  href?: string;

  /**
   * 按钮目标 相当于a标签的target属性 href属性存在时生效
   */
  target?: string;

  /**
   * 按钮点击事件
   */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export type AnchorButtonProps = {
  href?: string;
  target?: string;
  anchorProps?: HTMLProps<HTMLAnchorElement>;
} & BasicButtonProps &
  Omit<AnchorHTMLAttributes<any>, 'type' | 'onClick' | 'className'>;

export type ButtonProps = BasicButtonProps & AnchorButtonProps;
