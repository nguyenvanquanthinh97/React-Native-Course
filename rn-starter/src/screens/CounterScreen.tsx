import React, { useReducer } from "react";
import { StyleSheet, View, Button, Text } from "react-native";

interface ReducerState {
  counter: number;
}

interface ActionReducer {
  type: "increase_counter" | "decrease_counter";
}

const reducer = (state: ReducerState, action: ActionReducer) => {
  switch (action.type) {
    case "increase_counter":
      return { ...state, counter: state.counter + 1 };
    case "decrease_counter":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

const CounterScreen = () => {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const increaseHandler = () => {
    dispatch({ type: "increase_counter" });
  };

  const decreaseHandler = () => {
    dispatch({ type: "decrease_counter" });
  };

  return (
    <View>
      <Button title="Increase" onPress={increaseHandler} />
      <Button title="Decrease" onPress={decreaseHandler} />
      <Text>Current Count: {state.counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CounterScreen;
