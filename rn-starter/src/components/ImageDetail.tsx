import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

interface ImageDetailProps {
  title: string;
  imageSource: Object;
  score: number;
}

const ImageDetail: React.FC<ImageDetailProps> = ({
  title,
  imageSource,
  score,
}) => {
  return (
    <View>
      <Image source={imageSource} />
      <Text>{title}</Text>
      <Text>Image score - {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageDetail;
