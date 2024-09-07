import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Schema from 'async-validator';
import { FormItemProps } from './interface';
import { FormContext } from './FormContext';
import useConfig from 'src/hooks/useConfig';
import { getValueFromEvent } from './utils';

const FormItem: React.FC<FormItemProps> = ({
  className,
  style,
  name,
  valuePropName = 'value',
  label,
  rules,
  children,
}) => {
  const { prefixCls } = useConfig();
  const [value, setValue] = useState<string | number | boolean>();
  const [error, setError] = useState<string>('');
  const { values, onValuesChange, validateRegister } = useContext(FormContext);

  const handleValidate = (value?: any) => {
    let errMsg: string | undefined = undefined;

    if (!name || !Array.isArray(rules)) {
      return errMsg;
    }

    const validator = new Schema({ [name]: rules });

    validator.validate({ [name]: value }, (errors) => {
      if (errors) {
        setError(errors[0].message!);
        errMsg = errors[0].message;
      } else {
        setError('');
        errMsg = undefined;
      }
    });
  };

  const cloneChildren = (() => {
    if (!name || !children) {
      return children;
    }

    if (React.Children.toArray(children).length > 1) {
      return children;
    }

    return React.cloneElement(children, {
      [valuePropName]: value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = getValueFromEvent(e);
        setValue(value);
        onValuesChange?.(name, value);
        handleValidate();
      },
    });
  })();

  useEffect(() => {
    if (name) {
      if (value !== values?.[name]) {
        setValue(values?.[name]);
      }
    }
  }, [values]);

  useEffect(() => {
    if (name) {
      validateRegister?.(name, () => handleValidate(value));
    }
  }, [value]);

  return (
    <div className={classNames(`${prefixCls}-form-item`, className)} style={style}>
      {label && <label className={`${prefixCls}-form-item-label`}>{label}</label>}
      {cloneChildren}
      {error && <div className={`${prefixCls}-form-item-error`}>{error}</div>}
    </div>
  );
};

export default FormItem;
