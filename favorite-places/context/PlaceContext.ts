import AsyncStorage from "@react-native-async-storage/async-storage";

import { Place } from "../models/Place";
import { createDataContext } from "./createDataContext";

const reducer = (
  state: Place[],
  action: { type: "fetch_places" | "add_place"; payload?: unknown }
) => {
  switch (action.type) {
    case "fetch_places": {
      const places = (action.payload as Place[]) || [];
      return [...places];
    }
    default:
      return state;
  }
};

const actions = {
  fetchPlaces: (dispatch: Function) => async () => {
    const places = JSON.parse((await AsyncStorage.getItem("places")) || "[]");

    dispatch({ type: "fetch_places", payload: places });
  },

  addPlace: (dispatch: Function) => async (place: Place) => {
    const places: Place[] = JSON.parse(
      (await AsyncStorage.getItem("places")) || "[]"
    );
    const updatedPlaces = [...places, place];
    await AsyncStorage.setItem("places", JSON.stringify(updatedPlaces));
  },
} as const;

export const { Context: PlaceContext, Provider: PlaceProvider } =
  createDataContext(reducer, actions, []);
