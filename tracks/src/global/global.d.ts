import type React from "react";
import type {
  NavigationParams,
  NavigationFocusInjectedProps,
} from "react-navigation";
import type { NavigationStackScreenComponent } from "react-navigation-stack";
import type {
  NavigationBottomTabScreenComponent,
  NavigationTabScreenProps,
} from "react-navigation-tabs";

export {};

declare global {
  type AnyFunction = (...args: any[]) => any;
  type StackScreenComponentType<T = unknown> = NavigationStackScreenComponent<
    NavigationParams,
    T
  >;
  type BottomTabScreenComponentType<T = unknown> =
    NavigationBottomTabScreenComponent<NavigationParams, T>;
  type withNavigationFocusBottomTabScreenComponentType<T = unknown> =
    React.ComponentType<
      NavigationTabScreenProps<NavigationParams, T> &
        NavigationFocusInjectedProps
    > & {
      navigationOptions?: NavigationBottomTabScreenComponent<
        NavigationParams,
        T
      >["navigationOptions"];
    };
}
