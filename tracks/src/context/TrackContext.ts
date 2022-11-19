import { createDataContext } from "./createDataContext";
import { LocationObject } from "expo-location";

import trackerApi from "../api/tracker";

interface ReducerStateInterface {
  _id: string;
  locations: LocationObject[];
  name: string;
}

const reducer = (
  state: ReducerStateInterface[],
  action: { type: "fetch_tracks"; payload?: unknown }
) => {
  switch (action.type) {
    case "fetch_tracks": {
      const tracks = action.payload as ReducerStateInterface[];
      return tracks;
    }
    default:
      return state;
  }
};

const actions = {
  fetchTracks: (dispatch: Function) => async () => {
    const response = await trackerApi.get("/tracks");

    const tracks = response.data;
    dispatch({ type: "fetch_tracks", payload: tracks });
  },

  createTrack:
    (dispatch: Function) =>
    async (name: string, locations: LocationObject[]) => {
      await trackerApi.post("/tracks", { name, locations });
    },
};

export const { Context: TrackContext, Provider: TrackProvider } =
  createDataContext(reducer, actions, [] as ReducerStateInterface[]);
