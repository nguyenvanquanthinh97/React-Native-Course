// import "../mocks/mockLocation";

import React, { useContext, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import type { LocationObject } from "expo-location";
import { FontAwesome } from "@expo/vector-icons";

import { LocationContext } from "../context/LocationContext";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import VerticalSpacing from "../components/VerticalSpacing";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackCreateScreen: withNavigationFocusBottomTabScreenComponentType = ({
  isFocused,
}) => {
  const { state, addLocation, changeName, startRecording, stopRecording } =
    useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  const useLocationCallback = useCallback(
    (location: LocationObject) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );
  const [error] = useLocation(
    isFocused || state.recording,
    useLocationCallback
  );

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <Text style={{ fontSize: 40 }}>Create a Track</Text>
      <Map
        currentLocation={state.currentLocation}
        locations={state.locations}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <VerticalSpacing>
        <TrackForm
          trackingName={state.name}
          changetrackingName={changeName}
          isRecording={state.recording}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
        />
      </VerticalSpacing>
      {!state.recording && state.locations.length ? (
        <VerticalSpacing>
          <Button title="Save Track" onPress={saveTrack} />
        </VerticalSpacing>
      ) : null}
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Create",
  tabBarIcon: <FontAwesome name="plus" />,
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  error: { color: "red" },
});

export default withNavigationFocus(TrackCreateScreen);
