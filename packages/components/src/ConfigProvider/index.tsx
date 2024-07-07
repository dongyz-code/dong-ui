import { createContext } from 'react';

const defaultConfig = {
  prefixCls: 'd',
};

const ConfigContext = createContext({
  globalConfig: defaultConfig,
});

export default ConfigContext;
