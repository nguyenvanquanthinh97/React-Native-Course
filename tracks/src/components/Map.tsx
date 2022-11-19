import React, { FC } from "react";
import { LocationObject } from "expo-location";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Circle, Polyline, type LatLng } from "react-native-maps";

interface MapProps {
  currentLocation?: LocationObject | LatLng | null;
  locations?: (LocationObject | LatLng)[];
}

const isLocationObject = (
  value: LocationObject | LatLng
): value is LocationObject => {
  return (value as LocationObject).coords !== undefined;
};

const Map: FC<MapProps> = ({ currentLocation, locations = [] }) => {
  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" style={styles.loading} />
      </View>
    );
  }

  const location = isLocationObject(currentLocation)
    ? currentLocation.coords
    : currentLocation;

  const latLngLocations = locations.map((location) =>
    isLocationObject(location) ? location.coords : location
  );

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={location}
        radius={30}
        strokeColor="rgba(30, 144, 255, 1)"
        fillColor="rgba(30, 144, 255, 0.4)"
      />
      <Polyline coordinates={latLngLocations} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, flexDirection: "row", justifyContent: "center" },
  loading: { alignSelf: "center" },
  map: {
    height: 250,
  },
});

export default Map;
