import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";

const BoxModel = () => {
  console.log(StyleSheet.absoluteFill);
  return (
    <ScrollView style={{ margin: 10 }}>
      <View style={styles.viewOneStyle}>
        <Text style={styles.textOneStyle}>Child 1#</Text>
        <Text style={styles.textTwoStyle}>Child 2#</Text>
        <Text style={styles.textThreeStyle}>Child 3#</Text>
      </View>
      <View style={styles.viewFlexStyle}>
        <View style={styles.blockFlexLightRed}></View>
        <View style={styles.blockFlexLightGreen}></View>
        <View style={styles.blockFlexLightPurpil}></View>
      </View>
      <View style={styles.viewPositionStyle}>
        <View style={styles.blockPositionLightRed}></View>
        <View style={styles.blockPositionLightGreen}></View>
        <View style={styles.blockPositionLightPurpil}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewOneStyle: {
    borderWidth: 3,
    borderColor: "black",
    height: 200,
    alignItems: "flex-end",
    marginVertical: 10,
  },
  textOneStyle: {
    borderWidth: 1,
    borderColor: "red",
    flex: 1,
  },
  textTwoStyle: {
    borderWidth: 1,
    borderColor: "red",
    flex: 1,
    fontSize: 18,
    ...(StyleSheet.absoluteFill as Object),
    // Above equals to {"position": "absolute", "top": 0, "left": 0, "right": 0, "bottom": 0}
  },
  textThreeStyle: {
    borderWidth: 1,
    borderColor: "red",
    flex: 1,
  },
  viewFlexStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 200,
    marginVertical: 10,
    alignItems: "flex-start",
  },
  blockFlexLightRed: {
    backgroundColor: "#FFCCCB",
    width: 100,
    height: 100,
  },
  blockFlexLightGreen: {
    backgroundColor: "#5ced73",
    width: 100,
    height: 100,
    alignSelf: "flex-end",
  },
  blockFlexLightPurpil: {
    backgroundColor: "#B19CD8",
    width: 100,
    height: 100,
  },
  viewPositionStyle: {
    height: 200,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blockPositionLightRed: {
    backgroundColor: "#FFCCCB",
    width: 100,
    height: 100,
  },
  blockPositionLightGreen: {
    backgroundColor: "#5ced73",
    width: 100,
    height: 100,
    top: 100,
  },
  blockPositionLightPurpil: {
    backgroundColor: "#B19CD8",
    width: 100,
    height: 100,
  },
});

export default BoxModel;
