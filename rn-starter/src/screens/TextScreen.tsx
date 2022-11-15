import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const TextScreen = () => {
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {password.length < 5 && (
        <Text style={styles.errorMessage}>
          Password must be longer than 5 characters
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 20,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  errorMessage: {
    color: "red",
  },
});

export default TextScreen;
