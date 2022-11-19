import { useContext } from "react";

import { LocationContext } from "../context/LocationContext";
import { TrackContext } from "../context/TrackContext";
import { navigate } from "../helpers/NavigationRef";

export default () => {
  const {
    state: { name, locations },
    reset,
  } = useContext(LocationContext);

  const { createTrack } = useContext(TrackContext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();
    navigate("TrackList");
  };

  return [saveTrack];
};
