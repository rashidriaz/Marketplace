import {
  createContext,
  createElement,
  FC,
  PropsWithChildren,
  useContext,
} from 'react';

export const createSingletonHook = <P, S>(
  useHook: (props: P) => S
): [() => S, FC<PropsWithChildren<P>>] => {
  const Context = createContext<S | undefined>(undefined);

  const SingletonHookProvider = ({
                                   children,
                                   ...props
                                 }: PropsWithChildren<P>) => {
    const value = useHook(props as P);
    return createElement(Context.Provider, { value }, children);
  };

  const useSingletonHook = (): S => {
    const value = useContext(Context);
    if (typeof value === 'undefined') {
      throw new Error(
        'Component must be a wrapped in a singleton hook Provider'
      );
    }
    return value;
  };

  return [useSingletonHook, SingletonHookProvider];
};
