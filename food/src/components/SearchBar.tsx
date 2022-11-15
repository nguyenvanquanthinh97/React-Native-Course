import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (term: string) => void;
  onTermSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onTermSubmit,
}) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconSearchStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
        onEndEditing={onTermSubmit}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  iconSearchStyle: {
    fontSize: 25,
    alignSelf: "center",
  },
  inputStyle: {
    flex: 1,
    fontSize: 20,
    marginHorizontal: 15,
  },
});

export default SearchBar;
