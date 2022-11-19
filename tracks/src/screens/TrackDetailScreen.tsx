import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import { TrackContext } from "../context/TrackContext";
import Map from "../components/Map";

const TrackDetailScreen: StackScreenComponentType = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state: tracks } = useContext(TrackContext);

  const track = tracks.find((track) => track._id === id);

  if (!track) return null;

  return (
    <View>
      <Text style={{ fontSize: 40 }}>{track.name}</Text>
      <Map locations={track.locations} currentLocation={track.locations[0]} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackDetailScreen;
