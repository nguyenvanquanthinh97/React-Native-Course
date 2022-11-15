import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import VerticalSpacing from "./VerticalSpacing";

interface NavLinkProps extends NavigationInjectedProps {
  routeName: string;
  text: string;
}

const NavLink: FC<NavLinkProps> = ({ navigation, routeName, text }) => {
  return (
    <>
      <VerticalSpacing>
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
          <Text style={styles.link}>{text}</Text>
        </TouchableOpacity>
      </VerticalSpacing>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
    marginLeft: 10,
    textAlign: "center",
  },
});

export default withNavigation(NavLink);
