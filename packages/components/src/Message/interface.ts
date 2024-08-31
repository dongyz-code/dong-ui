import React from 'react';

export type MessagePosition = 'top' | 'bottom';

export interface MessageProps {
  id?: number;
  style?: React.CSSProperties;
  type?: 'info' | 'success' | 'warning' | 'error';
  content?: React.ReactNode;
  duration?: number;
  position?: MessagePosition;
}

export interface MessageList {
  top: MessageProps[];
  bottom: MessageProps[];
}
