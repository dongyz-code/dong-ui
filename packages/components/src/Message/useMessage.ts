import { useContext } from 'react';
import ConfigContext from '../ConfigProvider/Context';

export function useMessage() {
  const { messageRef } = useContext(ConfigContext);
  if (!messageRef) {
    throw new Error('Message component is not initialized');
  }
  return messageRef.current!;
}
