import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Place } from "../models/Place";

export type StackNavigatorParamList = {
  AllPlaces: undefined;
  AddPlace: { pickedLocation?: { lat: number; lng: number } };
  Map:
    | { initialLocation?: { lat: number; lng: number }; viewMode?: boolean }
    | undefined;
  PlaceDetail: { id: string };
};

export type AllPlacesStackNavigationProps = NativeStackScreenProps<
  StackNavigatorParamList,
  "AllPlaces"
>;

export type PlaceDetailStackNavigationProps = NativeStackScreenProps<
  StackNavigatorParamList,
  "PlaceDetail"
>;

export type AddPlaceStackNavigationProps = NativeStackScreenProps<
  StackNavigatorParamList,
  "AddPlace"
>;

export type MapStackNavigationProps = NativeStackScreenProps<
  StackNavigatorParamList,
  "Map"
>;
