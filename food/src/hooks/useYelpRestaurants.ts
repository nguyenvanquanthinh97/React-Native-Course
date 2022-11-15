import { useEffect, useReducer } from "react";
import yelp, { Business, YelpSearchResponse } from "../api/yelp";

interface ReducerState {
  results: Business[];
  loading: boolean;
  errorMessage: string;
}

interface ActionType {
  type:
    | "set_term"
    | "fetch_results_start"
    | "fetch_results_end"
    | "handling_error";
  payload?: unknown;
}

const reducer = (state: ReducerState, action: ActionType): ReducerState => {
  switch (action.type) {
    case "fetch_results_start":
      return { ...state, errorMessage: "", results: [], loading: true };
    case "fetch_results_end":
      const results = action.payload as Business[];
      return { ...state, results: results, loading: false };
    case "handling_error":
      const errorMessage = action.payload as string;
      return { ...state, errorMessage, results: [], loading: false };
    default:
      return state;
  }
};

const initialState: ReducerState = {
  results: [],
  loading: false,
  errorMessage: "",
};

type useYelpRestaurantsReturnType = [
  (searchTerm: string) => Promise<void>,
  Business[],
  string,
  boolean
];

export default (): useYelpRestaurantsReturnType => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { results, loading, errorMessage } = state;

  const searchApi = async (searchTerm: string) => {
    try {
      dispatch({ type: "fetch_results_start" });
      const response = await yelp.get("/search", {
        params: {
          term: searchTerm,
          location: "Melbourne",
          limit: 50,
        },
      });
      const data = response.data as YelpSearchResponse;

      dispatch({ type: "fetch_results_end", payload: data.businesses });
    } catch (err: any) {
      dispatch({
        type: "handling_error",
        payload: err?.message || "something wrong with it",
      });
    }
  };

  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, results, errorMessage, loading];
};
