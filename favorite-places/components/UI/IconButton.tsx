import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  color,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

export default IconButton;
