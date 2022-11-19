import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import { TrackContext } from "../context/TrackContext";

const TrackListScreen: StackScreenComponentType = ({ navigation }) => {
  const { state: tracks, fetchTracks } = useContext(TrackContext);
  return (
    <View>
      <NavigationEvents onDidFocus={fetchTracks} />
      <Button
        title="Go to TrackDetail Screen"
        onPress={() => navigation.navigate("TrackDetail")}
      />
      <FlatList
        data={tracks}
        keyExtractor={(track) => track._id}
        renderItem={({ item: track }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TrackDetail", { id: track._id })
            }
          >
            <ListItem hasTVPreferredFocus={false} tvParallaxProperties={false}>
              <ListItem.Content>
                <ListItem.Title>{track.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron tvParallaxProperties={false} />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

TrackListScreen.navigationOptions = { title: "Tracks" };

const styles = StyleSheet.create({});

export default TrackListScreen;
