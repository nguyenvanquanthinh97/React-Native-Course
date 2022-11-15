import React, { useReducer } from "react";

const createDataContext = <T, U extends string>(
  reducer: (state: T, action: { type: U; payload: unknown }) => T,
  actions: Record<string, (dispatch: AnyFunction) => AnyFunction>,
  initialState: T
) => {
  const Context = React.createContext<unknown>(null);

  const ContextProvider: React.FC<{
    children: React.ReactNode | React.ReactNode[];
  }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {} as Record<string, AnyFunction>;
    for (const key of Object.keys(actions)) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, ContextProvider };
};

export default createDataContext;
