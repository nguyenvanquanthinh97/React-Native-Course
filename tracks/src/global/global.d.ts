import { NavigationParams } from "react-navigation";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { NavigationBottomTabScreenComponent } from "react-navigation-tabs";

export {};

declare global {
  type AnyFunction = (...args: any[]) => any;
  type StackScreenComponentType<T = unknown> = NavigationStackScreenComponent<
    NavigationParams,
    T
  >;
  type BottomTabScreenComponentType<T = unknown> =
    NavigationBottomTabScreenComponent<NavigationParams, T>;
}
