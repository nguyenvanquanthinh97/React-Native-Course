import React, { useReducer } from "react";

export const createDataContext = <
  State,
  ActionType extends string,
  Actions = Record<string, Function>
>(
  reducer: (
    state: State,
    action: { type: ActionType; payload?: unknown }
  ) => State,
  actions: { [key in keyof Actions]: (dispatch: Function) => Actions[key] },
  initialState: State
) => {
  type ActionName = keyof Actions;
  type ContextType = Actions & {
    state: State;
  };

  const Context = React.createContext<ContextType>({} as any);

  const Provider: React.FC<{ children: React.ReactElement }> = ({
    children,
  }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions = {} as Actions;
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
