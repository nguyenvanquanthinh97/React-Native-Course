import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";

interface OutlinedButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode | React.ReactNode[];
  onPress: () => void;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  icon,
  onPress,
  children,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary500,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: { marginRight: 6 },
  text: { color: Colors.primary500 },
});

export default OutlinedButton;
