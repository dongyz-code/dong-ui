import React, { useRef, useState } from 'react';
import { FormContext } from './FormContext';

import type { FormProps } from './interface';
import classNames from 'classnames';
import useConfig from 'src/hooks/useConfig';

const Form: React.FC<FormProps> = ({
  children,
  className,
  style,
  initialValues,
  onFinish,
  onFinishFailed,
  ...rawFormProps
}) => {
  const { prefixCls } = useConfig();
  const [values, setValues] = useState(initialValues || {});
  const validateMap = useRef(new Map<string, Function>());
  const errors = useRef<Record<string, string>>({});

  const onValuesChange = (key: string, value: any) => {
    values[key] = value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const [key, validator] of validateMap.current) {
      if (typeof validator === 'function') {
        errors.current[key] = validator(values[key]);
      }
    }

    const errorList = Object.values(errors.current).filter(Boolean);

    if (errorList.length) {
      onFinishFailed?.(errorList);
    } else {
      onFinish?.(values);
    }
  };

  const handleValidateRegister = (name: string, cb: Function) => {
    validateMap.current.set(name, cb);
  };

  return (
    <FormContext.Provider value={{ values, setValues, onValuesChange, validateRegister: handleValidateRegister }}>
      <form
        {...rawFormProps}
        className={classNames(`${prefixCls}-form`, className)}
        style={style}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
