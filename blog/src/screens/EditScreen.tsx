import React, { useContext } from "react";

import BlogPostForm from "../components/BlogPostForm";
import { BlogContext, BlogContextValueInterface } from "../context/BlogContext";

const EditScreen: SwitchScreenComponentType = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state: blogPosts, editBlogPost } = useContext(
    BlogContext
  ) as unknown as BlogContextValueInterface;

  const blog = blogPosts.find((blogPost) => blogPost.id === id)!;

  return (
    <BlogPostForm
      initialValues={{ title: blog.title, content: blog.content }}
      onSubmit={(updatedTitle: string, updatedContent: string) => {
        editBlogPost(id, updatedTitle, updatedContent);
        navigation.pop();
      }}
    />
  );
};

export default EditScreen;
