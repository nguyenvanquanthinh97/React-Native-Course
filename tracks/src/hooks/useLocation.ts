import { useState, useEffect } from "react";
import type { LocationObject, LocationSubscription } from "expo-location";

import {
  requestForegroundPermissionsAsync,
  Accuracy,
  watchPositionAsync,
} from "expo-location";

export default (
  shouldTrack: boolean,
  callback: (location: LocationObject) => void
) => {
  const [error, setError] = useState("");

  useEffect(() => {
    let subscriber: LocationSubscription | undefined;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }

        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      subscriber?.remove();
      subscriber = undefined;
    }

    return () => {
      subscriber?.remove();
    };
  }, [shouldTrack, callback]);

  return [error];
};
