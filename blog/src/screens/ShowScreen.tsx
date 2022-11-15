import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { BlogContext, BlogContextValueInterface } from "../context/BlogContext";

const ShowScreen: SwitchScreenComponentType = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state: blogPosts } = useContext(
    BlogContext
  ) as unknown as BlogContextValueInterface;

  const blogPost = blogPosts.find((blogPost) => blogPost.id === id)!;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{blogPost.title}</Text>
      <Text style={styles.content}>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity
          style={styles.headerRightIcon}
          onPress={() =>
            navigation.navigate("Edit", { id: navigation.getParam("id") })
          }
        >
          <MaterialIcons style={styles.icon} name="edit" />
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
    margin: 5,
  },
  title: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 30,
    fontSize: 18,
  },
  content: {
    marginVertical: 20,
    fontSize: 16,
  },
  headerRightIcon: {
    marginRight: 10,
  },
  icon: {
    fontSize: 30,
    color: "black",
  },
});

export default ShowScreen;
