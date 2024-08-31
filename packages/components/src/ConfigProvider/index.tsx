import React, { useEffect, useRef } from 'react';
import ConfigContext from './Context';
import { MessageProvider } from '../Message/Message';
import { defaultConfig } from './constant';
import { deepMerge } from '../utils';

import type { PropsWithChildren } from 'react';
import type { MessageHook } from '../Message/Message';
import type { ConfigProviderProps } from './interface';

const ConfigProvider: React.FC<PropsWithChildren<{ config?: ConfigProviderProps }>> = ({ children, config }) => {
  const messageRef = useRef<MessageHook>(null);
  const mergeConfig = deepMerge(defaultConfig, config as ConfigProviderProps);

  useEffect(() => {
    document.documentElement.style.setProperty('--prefix', mergeConfig.prefixCls || defaultConfig.prefixCls!);
  }, [mergeConfig.prefixCls]);

  return (
    <ConfigContext.Provider
      value={{
        globalConfig: mergeConfig,
        messageRef: messageRef,
      }}
    >
      <MessageProvider ref={messageRef}></MessageProvider>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
