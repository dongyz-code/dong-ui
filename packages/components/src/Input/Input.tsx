import React from 'react';
import { InputProps } from './interface';
import { useMergeValue } from '../hooks/useMergeValue';

const Input: React.FC<InputProps> = (props) => {
  const { value, defaultValue, onChange: propsOnChange } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    propsOnChange?.(e);
    setInputValue(e.target.value);
  };

  const [inputValue, setInputValue] = useMergeValue('', {
    defaultValue,
    value,
  });

  return <input value={inputValue} onChange={onChange} type="text" />;
};

export default Input;
