import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, Image } from "react-native";
import { NavigationSwitchScreenProps, withNavigation } from "react-navigation";
import yelp, { YelpSearchDetailResponse } from "./api/yelp";

interface ResultsShowDetailProps extends NavigationSwitchScreenProps {}

const ResultsShowDetail: React.FC<ResultsShowDetailProps> = ({
  navigation,
}) => {
  const [result, setResult] = useState<YelpSearchDetailResponse | null>(null);

  const fetchApi = async (id: string) => {
    const response = await yelp.get(`/${id}`);
    const restaurant = response.data as YelpSearchDetailResponse;

    setResult(restaurant);
  };

  useEffect(() => {
    const id = navigation.getParam("id");
    fetchApi(id);
  }, []);

  if (!result) return null;

  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item: photo }) => (
          <Image style={styles.image} source={{ uri: photo }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
  },
});

export default ResultsShowDetail;
