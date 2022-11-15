import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const TrackListScreen: StackScreenComponentType = ({ navigation }) => {
  return (
    <View>
      <Text style={{ fontSize: 40 }}>TrackListScreen</Text>
      <Button
        title="Go to TrackDetail Screen"
        onPress={() => navigation.navigate("TrackDetail")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
