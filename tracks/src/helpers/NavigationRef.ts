import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
} from "react-navigation";

let navigation: NavigationContainerComponent | null;

export const setNavigation = (nav: NavigationContainerComponent | null) => {
  navigation = nav;
};

export const navigate = (routeName: string, params?: NavigationParams) => {
  navigation &&
    navigation.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
};
