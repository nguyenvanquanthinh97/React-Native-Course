import React, { useReducer } from "react";
import { View, FlatList } from "react-native";
import ColorCounter from "../components/ColorCounter";

const COLOR_INCREMENT = 15;

const initialState = {
  red: 0,
  green: 0,
  blue: 0,
};

type SquareScreenKey = keyof typeof initialState;
// type SquareScreenState = {
//   [k in SquareScreenKey]: typeof initialState[k];
// };
type SquareScreenState = Record<SquareScreenKey, number>;
type ActionReducer = "change_red" | "change_green" | "change_blue";

const reducer = (
  state: SquareScreenState,
  action: { type: ActionReducer; payload: number }
) => {
  const getUpdatedState = (color: SquareScreenKey) => {
    let updatedColor: number;

    updatedColor = state[color] + action.payload;
    if (updatedColor > 255) updatedColor = 255;
    else if (updatedColor < 0) updatedColor = 0;

    return { ...state, [color]: updatedColor };
  };

  switch (action.type) {
    case "change_red":
    case "change_green":
    case "change_blue":
      const colorKey = action.type.replace(
        /^.*_(.*)$/,
        "$1"
      ) as SquareScreenKey;
      return getUpdatedState(colorKey);

    default:
      return state;
  }
};

const SquareScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { red, green, blue } = state;

  return (
    <View>
      <FlatList
        data={["red", "green", "blue"] as SquareScreenKey[]}
        keyExtractor={(color) => color}
        renderItem={({ item: color }) => {
          const actionType = `change_${color}` as ActionReducer;
          return (
            <ColorCounter
              color={color}
              onIncrease={() =>
                dispatch({ type: actionType, payload: COLOR_INCREMENT })
              }
              onDecrease={() =>
                dispatch({ type: actionType, payload: -1 * COLOR_INCREMENT })
              }
            />
          );
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        }}
      />
    </View>
  );
};

export default SquareScreen;
