import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

interface ColorCounterProps {
  color: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

const ColorCounter: React.FC<ColorCounterProps> = ({
  color,
  onIncrease,
  onDecrease,
}) => {
  return (
    <View>
      <Text>Color: {color}</Text>
      <Button title={`Increase ${color}`} onPress={onIncrease} />
      <Button title={`Decrease ${color}`} onPress={onDecrease} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ColorCounter;
