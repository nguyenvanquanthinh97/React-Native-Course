import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { BlogContext, BlogContextValueInterface } from "../context/BlogContext";

const IndexScreen: SwitchScreenComponentType = ({ navigation }) => {
  const {
    state: blogPosts,
    addBlogPost,
    deleteBlogPost,
  } = useContext(BlogContext) as unknown as BlogContextValueInterface;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={blogPosts}
        keyExtractor={(blogPost) => String(blogPost.id)}
        renderItem={({ item: blogPost }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Show", { id: blogPost.id })}
          >
            <View style={styles.row}>
              <Text style={styles.title}>{blogPost.title}</Text>
              <TouchableOpacity onPress={() => deleteBlogPost(blogPost.id)}>
                <Feather style={styles.icon} name="trash" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerRightIcon}
        onPress={() => navigation.navigate("Create")}
      >
        <Feather style={styles.addBlogPostIcon} name="plus" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomColor: "gray",
    marginTop: 20,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
  headerRightIcon: {
    marginRight: 10,
  },
  addBlogPostIcon: {
    fontSize: 30,
  },
});

export default IndexScreen;
