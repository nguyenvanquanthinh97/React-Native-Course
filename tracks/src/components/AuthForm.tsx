import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";

import VerticalSpacing from "./VerticalSpacing";

interface AuthFormProps {
  headerText: string;
  errorMessage?: string;
  submitButtonText: string;
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
}

const AuthForm: FC<AuthFormProps> = ({
  headerText,
  errorMessage,
  submitButtonText,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <VerticalSpacing>
        <Text h1 h1Style={{ textAlign: "center" }}>
          {headerText}
        </Text>
      </VerticalSpacing>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCompleteType={false}
      />
      <VerticalSpacing />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCompleteType={false}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <VerticalSpacing>
        <Button
          style={{ paddingHorizontal: 10 }}
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </VerticalSpacing>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 10,
  },
});

export default AuthForm;
