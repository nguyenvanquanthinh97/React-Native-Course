import React, { useReducer } from "react";

export const createDataContext = <
  State,
  ActionType extends string,
  ActionName extends string
>(
  reducer: (
    state: State,
    action: { type: ActionType; payload?: unknown }
  ) => State,
  actions: Record<ActionName, (dispatch: AnyFunction) => AnyFunction>,
  initialState: State
) => {
  type ContextType = Record<ActionName, AnyFunction> & { state: State };
  const Context = React.createContext<ContextType>({} as any);

  const Provider: React.FC<{ children: React.ReactElement }> = ({
    children,
  }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions = {} as Record<ActionName, AnyFunction>;
    for (const key of Object.keys(actions) as ActionName[]) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
