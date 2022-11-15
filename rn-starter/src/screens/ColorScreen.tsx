import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button, ColorValue } from "react-native";

const ColorScreen = () => {
  const [colors, setColors] = useState<ColorValue[]>([]);

  const addColorHandler = () => {
    setColors((prevColors) => [...prevColors, generateRandomColor()]);
  };

  return (
    <View>
      <Button title="Add a Color" onPress={addColorHandler} />
      <FlatList
        keyExtractor={(color) => color as string}
        data={colors}
        renderItem={({ item: color }) => (
          <View
            style={{
              ...styles.defaultStyle,
              backgroundColor: color,
            }}
          />
        )}
      />
    </View>
  );
};

const generateRandomColor = (): ColorValue => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

const styles = StyleSheet.create({
  defaultStyle: {
    width: 100,
    height: 100,
    backgroundColor: "cyan",
  },
});

export default ColorScreen;
