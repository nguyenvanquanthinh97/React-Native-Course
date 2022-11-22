import React, { useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlaceList from "../components/Places/PlaceList";
import { PlaceContext } from "../context/PlaceContext";
import { AllPlacesStackNavigationProps } from "../types/stackScreens";

const AllPlaces: React.FC<AllPlacesStackNavigationProps> = () => {
  const { state: places, fetchPlaces } = useContext(PlaceContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchPlaces();
    }
  }, [isFocused]);

  return (
    <>
      <PlaceList places={places} />
    </>
  );
};

export default AllPlaces;
