import { useContext } from 'react';
import ConfigContext from '../ConfigProvider';

export default function useConfig() {
  return useContext(ConfigContext).globalConfig;
}
