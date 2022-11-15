import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";

const AccountScreen: BottomTabScreenComponentType = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  return (
    <View>
      <Text style={{ fontSize: 40 }}>AccountScreen</Text>

      <Button title="Signout" onPress={signout} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
