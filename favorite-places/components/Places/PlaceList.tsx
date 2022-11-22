import React, { FC } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Place } from "../../models/Place";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import {
  AllPlacesStackNavigationProps,
  StackNavigatorParamList,
} from "../../types/stackScreens";

interface PlaceListProps {
  places: Place[];
}

const PlaceList: FC<PlaceListProps> = ({ places }) => {
  if (places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places add yet - starting to add some{" "}
        </Text>
      </View>
    );
  }

  const navigation =
    useNavigation<AllPlacesStackNavigationProps["navigation"]>();
  const placeItemSelectedHandler = (id: string) => {
    navigation.navigate("PlaceDetail", { id });
  };

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={({ item: place }) => (
        <PlaceItem
          place={place}
          onSelect={() => placeItemSelectedHandler(place.id)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

export default PlaceList;
