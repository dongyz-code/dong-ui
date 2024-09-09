import React from 'react';

export interface FormContextProps {
  values?: Record<string, any>;
  setValues?: (values: Record<string, any>) => void;
  onValuesChange?: (key: string, value: any) => void;
  validateRegister?: (name: string, cb: Function) => void;
}

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (error: Record<string, any>) => void;
}

export interface FormItemProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  label?: React.ReactNode;
  rules?: Record<string, any>[];
  children: React.ReactElement;
  valuePropName?: string;
  required?: boolean;
  colon?: boolean;
}
