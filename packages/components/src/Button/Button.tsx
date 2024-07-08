import React from 'react';
import classNames from 'classnames';
import useConfig from '../hooks/useConfig';
import LoadingIcon from './LoadingIcon';
import './style/index.scss';

import { ButtonProps } from './interface';

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type = 'default',
    htmlType = 'button',
    loading,
    href,
    target,
    danger,
    size,
    block,
    disabled,
    onClick,
    children,
    className: _className,
    style,
  } = props;

  const { prefixCls } = useConfig();
  const className = classNames(`${prefixCls}-btn`, _className, {
    [`${prefixCls}-btn-${type}`]: type,
    [`${prefixCls}-btn-danger`]: danger,
    [`${prefixCls}-btn-disabled`]: disabled,
    [`${prefixCls}-btn-small`]: size === 'small',
    [`${prefixCls}-btn-large`]: size === 'large',
    [`${prefixCls}-btn-block`]: block,
    [`${prefixCls}-btn-loading`]: loading,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    onClick && onClick(e);
  };

  const loadingNode = loading ? <LoadingIcon /> : null;
  if (type === 'link' && href) {
    return (
      <a className={className} href={disabled ? undefined : href} target={target}>
        {loadingNode}
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={handleClick} style={style} type={htmlType} disabled={disabled}>
      {loadingNode}
      {children}
    </button>
  );
};

export default Button;
