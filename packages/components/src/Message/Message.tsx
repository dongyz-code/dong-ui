import React, { forwardRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useStore } from './useStore';
import useConfig from '../hooks/useConfig';

import type { MessagePosition, MessageProps } from './interface';

import './style/message.scss';

export interface MessageHook {
  add: (message: MessageProps) => void;
  remove: (id: number) => void;
  update: (id: number, message: MessageProps) => void;
  clearAll: () => void;
}

export const MessageProvider = forwardRef<MessageHook, {}>((props, ref) => {
  const { messageList, add, remove, update, clearAll } = useStore('top');
  const { prefixCls } = useConfig();

  const positions = Object.keys(messageList) as MessagePosition[];

  // useImperative 的一个问题，它并不是立刻修改 ref，而是会在之后的某个时间来修改。
  // useImperativeHandle(ref, () => {
  //   return {
  //     add,
  //     update,
  //     remove,
  //     clearAll,
  //   };
  // }, []);

  if ('current' in ref!) {
    ref.current = {
      add,
      update,
      remove,
      clearAll,
    };
  }

  const messageWrapper = (
    <div className="message-wrapper">
      {positions.map((position) => (
        <TransitionGroup key={position}>
          {messageList[position].map((item) => (
            <div key={item.id} className={`${prefixCls}-message-${position}`}>
              <CSSTransition timeout={1000} classNames={'message'}>
                <div
                  style={{
                    width: '100%',
                    lineHeight: '1.5',
                    border: '1px solid #ccc',
                    padding: '10px',
                    margin: '20px',
                  }}
                >
                  {item.content}
                </div>
              </CSSTransition>
            </div>
          ))}
        </TransitionGroup>
      ))}
    </div>
  );

  const el = useMemo(() => {
    const el = document.createElement('div');
    el.className = `wrapper`;

    document.body.appendChild(el);
    return el;
  }, []);

  return createPortal(messageWrapper, el);
});
