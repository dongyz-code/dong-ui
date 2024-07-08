import React from 'react';
import LoadingOne from '@icon-park/react/lib/icons/LoadingOne';
import './style/icon.scss';
import useConfig from '../hooks/useConfig';
import classNames from 'classnames';
import '@icon-park/react/styles/index.css';

export default function LoadingIcon() {
  const { prefixCls } = useConfig();
  const className = classNames(`${prefixCls}-btn-icon`, `${prefixCls}-btn-icon-loading`);
  return <LoadingOne size={12} className={className} spin />;
}
