import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ComponentsScreen = () => {
  const name = "Leo";
  return (
    <View>
      <Text style={styles.header}>Getting started with react native!</Text>
      <Text style={styles.subHeader}>My name is {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 45,
  },
  subHeader: {
    fontSize: 20,
  },
});

export default ComponentsScreen;
