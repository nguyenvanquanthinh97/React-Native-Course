import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";

import { AuthContext } from "../context/AuthContext";

const AccountScreen: BottomTabScreenComponentType = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 40 }}>AccountScreen</Text>

      <Button title="Signout" onPress={signout} />
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" />,
};

const styles = StyleSheet.create({});

export default AccountScreen;
