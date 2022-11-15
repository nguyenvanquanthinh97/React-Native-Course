import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ResultsShowDetail from "./src/ResultsShowDetail";
import SearchScreen from "./src/SearchScreen";

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    ResultsShow: ResultsShowDetail,
  },
  {
    initialRouteKey: "Search",
    defaultNavigationOptions: {
      title: "Business Search",
    },
  }
);

export default createAppContainer(navigator);
