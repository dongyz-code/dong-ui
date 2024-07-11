import React from 'react';
import { BasicSize } from '../types';

export interface InputProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  type?: string;
  size?: BasicSize;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
