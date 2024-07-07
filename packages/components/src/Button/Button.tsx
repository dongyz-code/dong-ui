import React from 'react';
import classNames from 'classnames';
import useConfig from '../hooks/useConfig';
import './style/index.scss';

import { ButtonProps } from './interface';

const Button: React.FC<ButtonProps> = (props) => {
  const { type = 'default', danger, disabled, onClick, children, className: _className, style } = props;
  const { prefixCls } = useConfig();
  const className = classNames(`${prefixCls}-btn`, _className, {
    [`${prefixCls}-btn-${type}`]: type,
    [`${prefixCls}-btn-danger`]: danger,
    [`${prefixCls}-btn-disabled`]: disabled,
  });

  return (
    <button className={className} onClick={onClick} style={style} type="button" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
