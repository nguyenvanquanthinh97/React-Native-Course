import { ReactElement } from "react";
import { NavigationParams } from "react-navigation";
import type {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

export {};

declare global {
  type AnyFunction = (...args: any[]) => any;
  type SwitchScreenComponentType<T = unknown> = NavigationStackScreenComponent<
    NavigationParams,
    T
  >;
}
