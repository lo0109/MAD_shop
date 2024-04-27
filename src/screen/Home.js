import { useEffect, useState } from "react";
import { loadDataAndUpdate } from "../datamodel/data";
import { FlatList, Pressable, StyleSheet, Text, View , Image} from "react-native";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load and update data
        const data = await loadDataAndUpdate();

        // Update state with fetched products and categories
        setProducts(data.products);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => }> 
            <Image> source={{uri:item.image}} style={styles.image} </Image>
            <Text>Product: {item.title} </Text>
            <Text>Price: {item.price}</Text>
            <Text>Category: {item.category}</Text>
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
  image:{
    width: 50,
    height: 50,
    borderRadius:10,
  },
  list:{
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  }
});
