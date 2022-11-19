import React from "react";
import { LogBox } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome } from "@expo/vector-icons";

import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { AuthProvider } from "./src/context/AuthContext";
import { LocationProvider } from "./src/context/LocationContext";
import { TrackProvider } from "./src/context/TrackContext";
import { setNavigation } from "./src/helpers/NavigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

// This help to ignore error _reactNative.Dimensions.removeEventListener
// This happens because i use react-navigation@v4 with latest Expo and react-native npm
LogBox.ignoreLogs(["_reactNative.Dimensions.removeEventListener"]);

const trackListFlow = createStackNavigator(
  {
    TrackList: TrackListScreen,
    TrackDetail: TrackDetailScreen,
  },
  { initialRouteName: "TrackList" }
);

trackListFlow.navigationOptions = {
  title: "List",
  tabBarIcon: <FontAwesome name="list" />,
};

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator(
      {
        Signup: SignupScreen,
        Signin: SigninScreen,
      },
      { initialRouteName: "Signup" }
    ),
    mainFlow: createBottomTabNavigator(
      {
        trackListFlow,
        TrackCreate: TrackCreateScreen,
        Account: AccountScreen,
      },
      { initialRouteName: "trackListFlow" }
    ),
  },
  {
    initialRouteName: "ResolveAuth",
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigation) => {
              setNavigation(navigation);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
