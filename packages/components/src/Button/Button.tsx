import React from 'react';
import classNames from 'classnames';
import './style/index.scss';

import { ButtonProps } from './interface';

const Button: React.FC<ButtonProps> = (props) => {
  const { type = 'default', danger, onClick, children } = props;

  const className = classNames('dong-btn', {
    [`dong-btn-${type}`]: type,
    'dong-btn-danger': danger,
  });

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
