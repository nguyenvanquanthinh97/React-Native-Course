import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/Place";

interface PlaceFormProps {
  onCreatePlace: (place: Place) => void;
}

const PlaceForm: React.FC<PlaceFormProps> = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState("");
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  }>();

  const changeTitleHander = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = useCallback((imageUri: string) => {
    setSelectedImageUri(imageUri);
  }, []);

  const pickLocationHandler = useCallback(
    (location: { lat: number; lng: number; address: string }) => {
      setPickedLocation(location);
    },
    []
  );

  const savePlaceHandler = () => {
    if (!pickedLocation) return;

    const placeData = new Place(enteredTitle, selectedImageUri, pickedLocation);

    onCreatePlace(placeData);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={changeTitleHander}
        />
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: { fontWeight: "bold", marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
