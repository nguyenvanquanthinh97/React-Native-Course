import React, { useContext } from "react";

import { PlaceContext } from "../context/PlaceContext";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/Place";
import { AddPlaceStackNavigationProps } from "../types/stackScreens";

const AddPlace: React.FC<AddPlaceStackNavigationProps> = ({ navigation }) => {
  const { addPlace } = useContext(PlaceContext);
  const createPlaceHandler = async (place: Place) => {
    await addPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
