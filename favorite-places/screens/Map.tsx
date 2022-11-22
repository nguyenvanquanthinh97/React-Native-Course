import React, { useLayoutEffect, useState, useCallback } from "react";
import MapView, { type MapPressEvent, Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";

import { MapStackNavigationProps } from "../types/stackScreens";
import IconButton from "../components/UI/IconButton";

const Map: React.FC<MapStackNavigationProps> = ({ navigation, route }) => {
  const initialLocation = route.params?.initialLocation;
  const viewMode = route.params?.viewMode;

  const [selectedLocation, setSelectedLocation] = useState<
    | {
        lat: number;
        lng: number;
      }
    | undefined
  >(initialLocation);

  const selectLocationHandler = (event: MapPressEvent) => {
    // Not allow to change marker location in viewMode
    if (viewMode) return;

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }

    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    // Not allow to save in viewMode
    if (viewMode) return;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={{
        latitude: selectedLocation?.lat || 37.78,
        longitude: selectedLocation?.lng || -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation ? (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      ) : null}
    </MapView>
  );
};

const styles = StyleSheet.create({ map: { flex: 1 } });

export default Map;
