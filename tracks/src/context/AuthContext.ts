import AsyncStorage from "@react-native-async-storage/async-storage";

import { createDataContext } from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../helpers/NavigationRef";

interface StateInterface {
  token: string | null;
  errorMessage: string;
}

const reducer = (
  state: StateInterface,
  action: {
    type:
      | "add_error"
      | "signup"
      | "signin"
      | "clear_error_message"
      | "local_sign_in"
      | "signout";
    payload?: unknown;
  }
) => {
  switch (action.type) {
    case "local_sign_in": {
      const token = action.payload as string;
      return { ...state, token };
    }
    case "signup":
    case "signin": {
      const token = action.payload as string;
      return { ...state, token, errorMessage: "" };
    }
    case "signout": {
      return { ...state, token: null };
    }
    case "add_error": {
      const errorMessage = action.payload as string;
      return { ...state, errorMessage };
    }
    case "clear_error_message": {
      return { ...state, errorMessage: "" };
    }
    default:
      return state;
  }
};

const actions = {
  signup:
    (dispatch: Function) =>
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await trackerApi.post("/signup", { email, password });
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
        dispatch({
          type: "signup",
          dispatch: token,
        });

        navigate("TrackList");
      } catch (err) {
        dispatch({
          type: "add_error",
          payload: "Something went wrong with signup!",
        });
      }
    },

  signin:
    (dispatch: Function) =>
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await trackerApi.post("/signin", { email, password });
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
        dispatch({
          type: "signin",
          dispatch: token,
        });

        navigate("TrackList");
      } catch (err) {
        dispatch({
          type: "add_error",
          payload: "Something went wrong with signin!",
        });
      }
    },

  signout: (dispatch: Function) => async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("Signin");
  },

  clearErrorMessage: (dispatch: Function) => () => {
    dispatch({ type: "clear_error_message" });
  },

  tryLocalSignin: (dispatch: Function) => async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "local_sign_in", payload: token });
      navigate("TrackList");
    } else {
      navigate("Signup");
    }
  },
} as const;

export const { Context: AuthContext, Provider: AuthProvider } =
  createDataContext(reducer, actions, {
    token: null,
    errorMessage: "",
  });
