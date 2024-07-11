import React from 'react';
import { InputProps } from './interface';
import { useMergeValue } from '../hooks/useMergeValue';
import classNames from 'classnames';
import useConfig from '../hooks/useConfig';
import './style/index.scss';

const Input: React.FC<InputProps> = (props) => {
  const {
    value,
    defaultValue,
    autoFocus,
    maxLength,
    placeholder,
    type = 'text',
    size = 'medium',
    style,
    className,
    disabled,
    onChange: propsOnChange,
  } = props;

  const { prefixCls } = useConfig();

  const _className = classNames(className, `${prefixCls}-input-${size}`, {
    [`${prefixCls}-input`]: true,
    [`${prefixCls}-input-disabled`]: disabled,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    propsOnChange?.(e);
    setInputValue(e.target.value);
  };

  const [inputValue, setInputValue] = useMergeValue('', {
    defaultValue,
    value,
  });

  return (
    <input
      style={style}
      disabled={disabled}
      className={_className}
      value={inputValue}
      onChange={onChange}
      type={type}
      autoFocus={autoFocus}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

export default Input;
