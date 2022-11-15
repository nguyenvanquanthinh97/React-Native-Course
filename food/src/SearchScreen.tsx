import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import type { NavigationSwitchScreenProps } from "react-navigation";
import ResultsList from "./components/ResultsList";

import SearchBar from "./components/SearchBar";
import useRestaurants from "./hooks/useYelpRestaurants";

const SearchScreen: React.FC<NavigationSwitchScreenProps> = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useRestaurants();

  const filterResultsByPrice = (price: "$" | "$$" | "$$$") => {
    // price === '$' | '$$' | '$$$'
    return results.filter((result) => result.price === price);
  };

  return (
    <View style={styles.background}>
      <SearchBar
        value={term}
        onChangeText={(text) => setTerm(text)}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage && <Text>{errorMessage}</Text>}
      <ScrollView>
        <ResultsList
          title="Cost Effective"
          results={filterResultsByPrice("$")}
        />
        <ResultsList title="Bit Pricier" results={filterResultsByPrice("$$")} />
        <ResultsList
          title="Big Spender"
          results={filterResultsByPrice("$$$")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FFF",
    flex: 1,
  },
});

export default SearchScreen;
