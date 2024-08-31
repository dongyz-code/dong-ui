import { useContext } from 'react';
import ConfigContext from '../ConfigProvider/Context';

export default function useConfig() {
  return useContext(ConfigContext).globalConfig;
}
