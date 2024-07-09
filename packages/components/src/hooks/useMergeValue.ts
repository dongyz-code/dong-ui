import React, { useCallback, useEffect, useRef, useState } from 'react';

function hasValue<T>(value: T): value is NonNullable<T> {
  return value !== undefined;
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function useMergeValue<T>(
  defaultStateValue: T,
  props: {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { defaultValue, value: propsValue, onChange } = props;
  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState(() => {
    if (propsValue !== undefined) {
      return propsValue;
    } else if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      return defaultStateValue;
    }
  });

  const mergedValue = hasValue(propsValue) ? propsValue : stateValue;

  const setMergedValue = useCallback(
    (value: React.SetStateAction<T>) => {
      const res = isFunction(value) ? value(stateValue) : value;
      if (propsValue === undefined) {
        setStateValue(res);
      }
      onChange?.(res);
    },
    [stateValue]
  );

  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }

    isFirstRender.current = false;
  }, [propsValue]);

  return [mergedValue, setMergedValue];
}
