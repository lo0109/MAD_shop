import { useEffect, useState } from "react";
import { loadDataAndUpdate } from "../datamodel/data";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

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
      <View style={styles.list}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => console.log("Pressed: ", item.id)}
              style={styles.item}
            >
              <View style={styles.detail}>
                <View>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </View>

                <View style={styles.description}>
                  <View>
                    <Text style={styles.title}>{item.title} </Text>
                  </View>
                  <View>
                    <Text style={styles.price}>Price: ${item.price}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  list: {
    padding: 10,
    width: "100%",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  detail: {
    // padding: 10,
    flexDirection: "row",
    // backgroundColor: "green",
  },
  description: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    // backgroundColor: "red",
  },
  title: {
    width: 230,
    fontSize: 20,
    fontWeight: "bold",
    // backgroundColor: "yellow",
    flexDirection: "column",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "right",
  },
});
