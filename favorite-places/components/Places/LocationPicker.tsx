import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { AddPlaceStackNavigationProps } from "../../types/stackScreens";
import { getAddress } from "../../utils/location";

interface LocationPickerProps {
  onPickLocation: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onPickLocation }) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const navigation = useNavigation();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const isFocused = useIsFocused();
  const route = useRoute<AddPlaceStackNavigationProps["route"]>();

  useEffect(() => {
    const mapPickedLocation = route.params?.pickedLocation && {
      lat: route.params.pickedLocation.lat,
      lng: route.params.pickedLocation.lng,
    };
    if (mapPickedLocation && isFocused) {
      setCurrentLocation(mapPickedLocation);
    }
  }, [isFocused, route.params]);

  useEffect(() => {
    const handleLocation = async () => {
      if (currentLocation) {
        const address = await getAddress(
          currentLocation.lat,
          currentLocation.lng
        );
        onPickLocation({ ...currentLocation, address });
      }
    };

    handleLocation();
  }, [onPickLocation, currentLocation]);

  const verifyPermission = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const { granted } = await requestPermission();
      return granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return locationPermissionInformation?.status === PermissionStatus.GRANTED;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    const currentLocation = await getCurrentPositionAsync();
    setCurrentLocation({
      lat: currentLocation.coords.latitude,
      lng: currentLocation.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map" as never);
  };

  const lat = currentLocation?.lat;
  const lng = currentLocation?.lng;
  let mapPreview = (
    <Text style={styles.fallbackText}>
      Please choose a method below to locate
    </Text>
  );
  if (lat && lng) {
    mapPreview = (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          title="Picked Location"
          coordinate={{ latitude: lat, longitude: lng }}
        />
      </MapView>
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    overflow: "hidden",
  },
  map: {
    height: 200,
  },
  fallbackText: { lineHeight: 200, textAlign: "center" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});

export default LocationPicker;
