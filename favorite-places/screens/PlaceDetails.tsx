import { useNavigation } from "@react-navigation/native";
import React, { useContext, useMemo } from "react";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";

import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { PlaceContext } from "../context/PlaceContext";
import { PlaceDetailStackNavigationProps } from "../types/stackScreens";

const PlaceDetail: React.FC<PlaceDetailStackNavigationProps> = ({
  navigation,
  route,
}) => {
  const { state: places } = useContext(PlaceContext);

  const id = route.params.id;
  const place = useMemo(() => places.find((place) => place.id === id), [id]);
  if (!place) return null;

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLocation: { lat: place.location.lat, lng: place.location.lng },
      viewMode: true,
    });
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.adress}>{place.location.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View On Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  adress: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetail;
