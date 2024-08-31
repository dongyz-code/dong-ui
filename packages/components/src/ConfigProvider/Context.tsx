import { createContext, RefObject } from 'react';
import { defaultConfig } from './constant';

import type { ConfigProviderProps } from './interface';
import type { MessageHook } from '../Message/Message';

const ConfigContext = createContext<{
  globalConfig: ConfigProviderProps;
  messageRef: RefObject<MessageHook>;
}>({
  globalConfig: defaultConfig,
  messageRef: {} as unknown as RefObject<MessageHook>,
});

export default ConfigContext;
