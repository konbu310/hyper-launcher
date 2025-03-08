import {
  type Context,
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from "react";

// constate(useCounter, value => value.count)
//                      ^^^^^^^^^^^^^^^^^^^^
type Selector<Value> = (value: Value) => any;

// const [Provider, useCount, useIncrement] = constate(...)
//                  ^^^^^^^^^^^^^^^^^^^^^^
type SelectorHooks<Selectors> = {
  [K in keyof Selectors]: () => Selectors[K] extends (...args: any) => infer R
    ? R
    : never;
};

// const [Provider, useCounterContext] = constate(...)
// or               ^^^^^^^^^^^^^^^^^
// const [Provider, useCount, useIncrement] = constate(...)
//                  ^^^^^^^^^^^^^^^^^^^^^^
type Hooks<
  Value,
  Selectors extends Selector<Value>[],
> = Selectors["length"] extends 0 ? [() => Value] : SelectorHooks<Selectors>;

// const [Provider, useContextValue] = constate(useValue)
//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^
type ConstateTuple<Props, Value, Selectors extends Selector<Value>[]> = [
  FC<PropsWithChildren<Props>>,
  ...Hooks<Value, Selectors>,
];

const NO_PROVIDER = {};

function createUseContext(context: Context<any>): any {
  return () => useContext(context);
}

export function constate<Props, Value, Selectors extends Selector<Value>[]>(
  useValue: (props: Props) => Value,
  ...selectors: Selectors
): ConstateTuple<Props, Value, Selectors> {
  const contexts: Context<any>[] = [];
  const hooks = [] as unknown as Hooks<Value, Selectors>;

  const createEmptyContext = () => {
    const context = createContext(NO_PROVIDER);
    contexts.push(context);
    hooks.push(createUseContext(context));
  };

  if (selectors.length === 0) {
    createEmptyContext();
  } else {
    for (const _ of selectors) {
      createEmptyContext();
    }
  }

  const Provider: FC<PropsWithChildren<Props>> = (props) => {
    const value = useValue(props);
    let element = props.children;

    for (let i = contexts.length - 1; i >= 0; i--) {
      const context = contexts[i];
      if (!context) continue;
      const selector = selectors[i] || ((v) => v);
      element = (
        <context.Provider value={selector(value)}>{element}</context.Provider>
      );
    }
    return element;
  };

  return [Provider, ...hooks];
}
