import type { LocationObject } from "expo-location";

import { createDataContext } from "./createDataContext";

interface StateInterface {
  name: string;
  recording: boolean;
  locations: LocationObject[];
  currentLocation: LocationObject | null;
}

const initialState: StateInterface = {
  name: "",
  recording: false,
  locations: [],
  currentLocation: null,
};

const reducer = (
  state: StateInterface,
  action: {
    type:
      | "updated_current_location"
      | "add_current_location"
      | "start_recording"
      | "stop_recording"
      | "change_name"
      | "reset";
    payload?: unknown;
  }
) => {
  switch (action.type) {
    case "add_current_location": {
      const currentLocation = action.payload as LocationObject;
      const updatedLocations = [...state["locations"], currentLocation];

      return { ...state, locations: updatedLocations, currentLocation };
    }
    case "updated_current_location": {
      const currentLocation = action.payload as LocationObject;

      return { ...state, currentLocation };
    }
    case "start_recording": {
      return { ...state, recording: true };
    }
    case "stop_recording": {
      return { ...state, recording: false };
    }
    case "change_name": {
      const name = action.payload as string;
      return { ...state, name };
    }
    case "reset":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

const actions = {
  startRecording: (dispatch: Function) => () => {
    dispatch({ type: "start_recording" });
  },

  stopRecording: (dispatch: Function) => () => {
    dispatch({ type: "stop_recording" });
  },

  addLocation:
    (dispatch: Function) =>
    (location: LocationObject, isRecording: boolean) => {
      dispatch({ type: "updated_current_location", payload: location });
      if (isRecording) {
        dispatch({ type: "add_current_location", payload: location });
      }
    },

  changeName: (dispatch: Function) => (name: string) => {
    dispatch({ type: "change_name", payload: name });
  },

  reset: (dispatch: Function) => () => {
    dispatch({ type: "reset" });
  },
};

export const { Context: LocationContext, Provider: LocationProvider } =
  createDataContext(reducer, actions, initialState);
