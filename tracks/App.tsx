import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { AuthProvider } from "./src/context/AuthContext";
import { setNavigation } from "./src/helpers/NavigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

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
        trackListFlow: createStackNavigator(
          {
            TrackList: TrackListScreen,
            TrackDetail: TrackDetailScreen,
          },
          { initialRouteName: "TrackList" }
        ),
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
    <AuthProvider>
      <App
        ref={(navigation) => {
          setNavigation(navigation);
        }}
      />
    </AuthProvider>
  );
};
