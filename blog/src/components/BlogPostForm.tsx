import React, { FC, useState } from "react";
import { StyleSheet, View, TextInput, Text, Button } from "react-native";

interface BlogPostFormProps {
  onSubmit: (title: string, content: string) => void;
  initialValues?: { title: string; content: string };
}

const BlogPostForm: FC<BlogPostFormProps> = ({ initialValues, onSubmit }) => {
  const [title, setTitle] = useState(initialValues!.title);
  const [content, setContent] = useState(initialValues!.content);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button title="SAVE" onPress={() => onSubmit(title, content)} />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
  },
});

export default BlogPostForm;
