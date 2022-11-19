import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

interface VerticalSpacingProps {
  children?: React.ReactNode | React.ReactNode[];
}

const VerticalSpacing: FC<VerticalSpacingProps> = ({ children }) => {
  return <View style={styles.spacing}>{children}</View>;
};

const styles = StyleSheet.create({
  spacing: {
    marginVertical: 15,
  },
});

export default VerticalSpacing;
