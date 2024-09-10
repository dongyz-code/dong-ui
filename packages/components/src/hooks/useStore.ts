import { useDebugValue, useSyncExternalStore } from 'react';

type SetState<T extends Record<string, any>> = (partial: T | ((prevState: T) => T), replace?: boolean) => void;
type GetState<T extends Record<string, any>> = () => T;
type StoreApi<T extends Record<string, any>> = {
  setState: SetState<T>;
  getState: GetState<T>;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
  destroy: () => void;
};
type CreateState<T extends Record<string, any>> = (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => T;
type StoreSelector<T extends Record<string, any>, U> = (state: T) => U;

function createStore<T extends Record<string, any>>(createState: CreateState<T>) {
  /**
   * state 存储数据
   * listeners 存储监听函数
   */
  let state: T;
  const linsteners = new Set<(state: T, prevState: T) => void>();

  const setState: SetState<T> = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;

    if (!Object.is(nextState, state)) {
      const prevState = state;

      if (!replace) {
        state =
          typeof nextState !== 'object' || nextState === null ? nextState : Object.assign({}, prevState, nextState);
      } else {
        state = nextState;
      }

      linsteners.forEach((listener) => listener(state, prevState));
    }
  };

  const getState: GetState<T> = () => state;

  const subscribe = (listener: (state: T, prevState: T) => void) => {
    linsteners.add(listener);
    return () => linsteners.delete(listener);
  };

  const destroy = () => {
    linsteners.clear();
  };

  const api = {
    setState,
    getState,
    subscribe,
    destroy,
  };

  state = createState(setState, getState, api);

  return api;
}

function useStore<T extends Record<string, any>, U>(api: StoreApi<T>, selector: StoreSelector<T, U>) {
  // const [, forceRender] = useState(0);
  // useEffect(() => {
  //   api.subscribe((state, prevState) => {
  //     const newObj = selector(state);
  //     const oldObj = selector(prevState);
  //     if (newObj !== oldObj) {
  //       forceRender(Math.random());
  //     }
  //   });
  // }, []);
  // return selector(api.getState());

  // TODO: 使用useExternalState 这样返回值的时候就不能返回一个新对象，会导致无限循环
  // 后面写一个useShallow
  function getState() {
    return selector(api.getState());
  }
  const slice = useSyncExternalStore(api.subscribe, getState);
  useDebugValue(slice);
  return slice;
}

export function create<T extends Record<string, any>>(creteState: CreateState<T>) {
  const api = createStore(creteState);
  const useBoundStore = <U>(selector: StoreSelector<T, U>) => useStore(api, selector);
  // Object.assign(useBoundStore, api);
  return useBoundStore;
}
