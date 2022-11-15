import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { NavigationSwitchScreenProps, withNavigation } from "react-navigation";
import type { Business } from "../api/yelp";
import ResultsDetail from "./ResultsDetail";

interface ResultsListProps {
  title: string;
  results: Business[];
  navigation: NavigationSwitchScreenProps["navigation"];
}

const ResultsList: React.FC<ResultsListProps> = ({
  title,
  results,
  navigation,
}) => {
  if (!results.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item: result }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ResultsShow", {
                id: result.id,
              })
            }
          >
            <ResultsDetail result={result} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 5,
  },
});

export default withNavigation(ResultsList);
