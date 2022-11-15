import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import type { NavigationSwitchScreenProps } from "react-navigation";

interface HomeScreenProps extends NavigationSwitchScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation: { navigate },
}) => {
  return (
    <View>
      <Text style={styles.text}>Hello</Text>
      <Button
        title="Go to Components Demo"
        onPress={() => navigate("Components")}
      />

      <Button title="Go to List Demo" onPress={() => navigate("List")} />

      <Button title="Go to Image Demo" onPress={() => navigate("Image")} />

      <Button title="Go to Counter Demo" onPress={() => navigate("Counter")} />

      <Button title="Go to Color Demo" onPress={() => navigate("Color")} />

      <Button title="Go to Square Demo" onPress={() => navigate("Square")} />

      <Button title="Go to Text Demo" onPress={() => navigate("Text")} />

      <Button title="Go to Box Demo" onPress={() => navigate("Box")} />

      {/* <TouchableOpacity onPress={() => navigate("List")}>
        <Text>Go to List Demo</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  buttonSpacing: {
    margin: 20,
  },
});

export default HomeScreen;
