import { EventEmitter, _getCurrentWatchId } from "expo-location";

const tenMetersWithDegrees = 0.0001;

const getLocation = (increment: number) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 0,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -122.0312186 + increment * tenMetersWithDegrees,
      latitude: 37.33233141 + increment * tenMetersWithDegrees,
    },
  };
};

let counter = 0;
setInterval(() => {
  EventEmitter.emit("Expo.locationChanged", {
    watchId: _getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
