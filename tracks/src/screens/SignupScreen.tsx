import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationEvents } from "react-navigation";

import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";
import NavLink from "../components/NavLink";

const SignupScreen: StackScreenComponentType = ({}) => {
  const { state, signup, clearErrorMessage, tryLocalSignin } =
    useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SignupScreen;
