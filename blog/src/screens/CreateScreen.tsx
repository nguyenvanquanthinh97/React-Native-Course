import React, { useContext } from "react";
import BlogPostForm from "../components/BlogPostForm";
import { BlogContext, BlogContextValueInterface } from "../context/BlogContext";

const CreateScreen: SwitchScreenComponentType = ({ navigation }) => {
  const { addBlogPost } = useContext(
    BlogContext
  ) as unknown as BlogContextValueInterface;

  return (
    <BlogPostForm
      onSubmit={(title: string, content: string) => {
        addBlogPost(title, content);
        navigation.pop();
      }}
    />
  );
};

export default CreateScreen;
