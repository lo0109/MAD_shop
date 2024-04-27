import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const url = "https://fakestoreapi.com/products/";

export const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  const selectCat = (i) => {
    navigation.navigate("Product", { i });
  };

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch(url + "categories");
        const data = await res.json();
        setCategories(data);
      } catch (e) {
        console.error("error in fetchCat");
      }
    };
    fetchCat();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => selectCat(item)}>
            <Text>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {},
});
